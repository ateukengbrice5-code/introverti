"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function parseBody(raw: string) {
  return raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

function themeFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    standfirst: String(formData.get("standfirst") ?? "").trim(),
    body: parseBody(String(formData.get("body") ?? "")),
    fait: String(formData.get("fait") ?? "").trim() || null,
    hypothese: String(formData.get("hypothese") ?? "").trim() || null,
    reflexion: String(formData.get("reflexion") ?? "").trim() || null,
    status: String(formData.get("status") ?? "draft").trim(),
  };
}

const COVER_BUCKET = "article-images";

/**
 * Upload le fichier "cover_image" du formulaire (s'il y en a un) vers le
 * bucket public Supabase Storage et renvoie son URL publique. Renvoie
 * `undefined` si aucun fichier n'a été choisi, pour ne jamais écraser
 * cover_image_url par erreur.
 */
async function uploadCoverImageIfProvided(formData: FormData, slug: string): Promise<string | undefined> {
  const file = formData.get("cover_image");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const supabase = getSupabaseAdmin();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `themes/${slug}-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(COVER_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) throw new Error(`Échec de l'upload de l'image : ${uploadError.message}`);

  const { data } = supabase.storage.from(COVER_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function revalidate(slug?: string) {
  revalidatePath("/comprendre");
  revalidatePath("/");
  revalidatePath("/admin/themes");
  if (slug) revalidatePath(`/comprendre/${slug}`);
}

export async function createTheme(formData: FormData) {
  const theme = themeFromForm(formData);
  if (!theme.slug) throw new Error("Le slug est obligatoire.");
  const cover_image_url = await uploadCoverImageIfProvided(formData, theme.slug);
  const { error } = await getSupabaseAdmin()
    .from("themes")
    .insert({ ...theme, ...(cover_image_url && { cover_image_url }) });
  if (error) throw new Error(error.message);
  revalidate(theme.slug);
  redirect("/admin/themes");
}

export async function updateTheme(slug: string, formData: FormData) {
  const theme = themeFromForm(formData);
  const cover_image_url = await uploadCoverImageIfProvided(formData, slug);
  const { error } = await getSupabaseAdmin()
    .from("themes")
    .update({
      title: theme.title,
      standfirst: theme.standfirst,
      body: theme.body,
      fait: theme.fait,
      hypothese: theme.hypothese,
      reflexion: theme.reflexion,
      status: theme.status,
      ...(cover_image_url && { cover_image_url }),
    })
    .eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidate(slug);
  redirect("/admin/themes");
}

export async function deleteTheme(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;
  const { error } = await getSupabaseAdmin().from("themes").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidate(slug);
  redirect("/admin/themes");
}
