import { getSupabase } from "@/lib/supabase/client";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { Resource, Product } from "@/lib/types";

export async function getResources(): Promise<Resource[]> {
  const { data, error } = await getSupabase().from("resources").select("*").order("slug");
  if (error) throw error;
  return data as Resource[];
}

/**
 * Variantes admin : clé service_role (contourne le RLS), voient tous les
 * statuts. Réservées aux pages sous /admin.
 */
export async function getResourcesAdmin(): Promise<Resource[]> {
  const { data, error } = await getSupabaseAdmin().from("resources").select("*").order("slug");
  if (error) throw error;
  return data as Resource[];
}

export async function getResourceAdmin(slug: string): Promise<Resource | undefined> {
  const { data, error } = await getSupabaseAdmin().from("resources").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Resource) ?? undefined;
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
