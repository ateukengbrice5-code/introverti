import { getSupabase } from "@/lib/supabase/client";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { Journey } from "@/lib/types";

export async function getJourneys(): Promise<Journey[]> {
  const { data, error } = await getSupabase().from("journeys").select("*").order("slug");
  if (error) throw error;
  return data as Journey[];
}

export async function getJourney(slug: string): Promise<Journey | undefined> {
  const { data, error } = await getSupabase().from("journeys").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Journey) ?? undefined;
}

/**
 * Variantes admin : clé service_role (contourne le RLS), voient tous les
 * statuts. Réservées aux pages sous /admin.
 */
export async function getJourneysAdmin(): Promise<Journey[]> {
  const { data, error } = await getSupabaseAdmin().from("journeys").select("*").order("slug");
  if (error) throw error;
  return data as Journey[];
}

export async function getJourneyAdmin(slug: string): Promise<Journey | undefined> {
  const { data, error } = await getSupabaseAdmin().from("journeys").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Journey) ?? undefined;
}
