"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function parseBody(raw: string): string[] {
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function parseSlugList(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function articleFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    published_at: String(formData.get("published_at") ?? "").trim(),
    reading_minutes: Number(formData.get("reading_minutes") ?? 0),
    cover_note: String(formData.get("cover_note") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: parseBody(String(formData.get("body") ?? "")),
    related: parseSlugList(String(formData.get("related") ?? "")),
    status: String(formData.get("status") ?? "draft").trim(),
  };
}

const COVER_BUCKET = "article-images";

/**
 * Upload le fichier "cover_image" du formulaire (s'il y en a un) vers le
 * bucket public Supabase Storage et renvoie son URL publique. Renvoie
 * `undefined` si aucun fichier n'a été choisi (on garde alors l'image
 * existante), pour ne jamais écraser cover_image_url par erreur.
 */
async function uploadCoverImageIfProvided(formData: FormData, slug: string): Promise<string | undefined> {
  const file = formData.get("cover_image");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const supabase = getSupabaseAdmin();
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${slug}-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(COVER_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) throw new Error(`Échec de l'upload de l'image : ${uploadError.message}`);

  const { data } = supabase.storage.from(COVER_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function revalidateArticleSurfaces(slug?: string) {
  revalidatePath("/reflexions");
  revalidatePath("/");
  revalidatePath("/admin/articles");
  if (slug) revalidatePath(`/reflexions/${slug}`);
}

export async function createArticle(formData: FormData) {
  const article = articleFromForm(formData);
  if (!article.slug) throw new Error("Le slug est obligatoire.");

  const cover_image_url = await uploadCoverImageIfProvided(formData, article.slug);

  const { error } = await getSupabaseAdmin()
    .from("articles")
    .insert({ ...article, ...(cover_image_url && { cover_image_url }) });
  if (error) throw new Error(error.message);

  revalidateArticleSurfaces(article.slug);
  redirect("/admin/articles");
}

export async function updateArticle(slug: string, formData: FormData) {
  const article = articleFromForm(formData);
  const cover_image_url = await uploadCoverImageIfProvided(formData, slug);

  const { error } = await getSupabaseAdmin()
    .from("articles")
    .update({
      title: article.title,
      subtitle: article.subtitle,
      category: article.category,
      author: article.author,
      published_at: article.published_at,
      reading_minutes: article.reading_minutes,
      cover_note: article.cover_note,
      excerpt: article.excerpt,
      body: article.body,
      related: article.related,
      status: article.status,
      ...(cover_image_url && { cover_image_url }),
    })
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidateArticleSurfaces(slug);
  redirect("/admin/articles");
}

export async function deleteArticle(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;

  const { error } = await getSupabaseAdmin().from("articles").delete().eq("slug", slug);
  if (error) throw new Error(error.message);

  revalidateArticleSurfaces(slug);
  redirect("/admin/articles");
}
