import { getSupabase } from "@/lib/supabase/client";
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
