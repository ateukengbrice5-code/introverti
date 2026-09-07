import { getSupabase } from "@/lib/supabase/client";
import { Resource, Product } from "@/lib/types";

export async function getResources(): Promise<Resource[]> {
  const { data, error } = await getSupabase().from("resources").select("*").order("slug");
  if (error) throw error;
  return data as Resource[];
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await getSupabase().from("products").select("*").order("slug");
  if (error) throw error;
  return data as Product[];
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const { data, error } = await getSupabase().from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Product) ?? undefined;
}
