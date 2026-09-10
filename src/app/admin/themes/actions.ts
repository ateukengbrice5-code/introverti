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

function revalidate(slug?: string) {
  revalidatePath("/comprendre");
  revalidatePath("/");
  revalidatePath("/admin/themes");
  if (slug) revalidatePath(`/comprendre/${slug}`);
}

export async function createTheme(formData: FormData) {
  const theme = themeFromForm(formData);
  if (!theme.slug) throw new Error("Le slug est obligatoire.");
  const { error } = await getSupabaseAdmin().from("themes").insert(theme);
  if (error) throw new Error(error.message);
  revalidate(theme.slug);
  redirect("/admin/themes");
}

export async function updateTheme(slug: string, formData: FormData) {
  const theme = themeFromForm(formData);
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
