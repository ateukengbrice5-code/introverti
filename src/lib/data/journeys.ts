import { getSupabase } from "@/lib/supabase/client";
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
