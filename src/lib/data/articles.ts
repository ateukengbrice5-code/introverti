import { getSupabase } from "@/lib/supabase/client";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { Article, Category } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await getSupabase().from("categories").select("*").order("slug");
  if (error) throw error;
  return data as Category[];
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const { data, error } = await getSupabase().from("categories").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Category) ?? undefined;
}

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await getSupabase()
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data as Article[];
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const { data, error } = await getSupabase().from("articles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Article) ?? undefined;
}

/**
 * Articles d'une catégorie donnée. Les articles restent accessibles via leur
 * URL canonique /reflexions/[slug] ; cette fonction sert uniquement les pages
 * de navigation par catégorie (/reflexions/categorie/[slug]).
 */
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const { data, error } = await getSupabase()
    .from("articles")
    .select("*")
    .eq("category", categorySlug)
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data as Article[];
}

/**
 * Variantes admin : utilisent la clé service_role (contourne le RLS), donc
 * voient TOUS les statuts (draft, review, scheduled, published, archived).
 * Réservées aux pages sous /admin — ne jamais les utiliser sur le site public.
 */
export async function getArticlesAdmin(): Promise<Article[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data as Article[];
}

export async function getArticleAdmin(slug: string): Promise<Article | undefined> {
  const { data, error } = await getSupabaseAdmin().from("articles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Article) ?? undefined;
}
