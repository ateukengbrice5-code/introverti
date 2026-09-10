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

function revalidateArticleSurfaces(slug?: string) {
  revalidatePath("/reflexions");
  revalidatePath("/");
  revalidatePath("/admin/articles");
  if (slug) revalidatePath(`/reflexions/${slug}`);
}

export async function createArticle(formData: FormData) {
  const article = articleFromForm(formData);
  if (!article.slug) throw new Error("Le slug est obligatoire.");

  const { error } = await getSupabaseAdmin().from("articles").insert(article);
  if (error) throw new Error(error.message);

  revalidateArticleSurfaces(article.slug);
  redirect("/admin/articles");
}

export async function updateArticle(slug: string, formData: FormData) {
  const article = articleFromForm(formData);

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
