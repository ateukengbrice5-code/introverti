import { getSupabase } from "@/lib/supabase/client";
import { Axis } from "@/lib/types";

export async function getAxes(): Promise<Axis[]> {
  const { data, error } = await getSupabase().from("axes").select("*").order("index");
  if (error) throw error;
  return data as Axis[];
}

export async function getAxis(slug: string): Promise<Axis | undefined> {
  const { data, error } = await getSupabase().from("axes").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as Axis) ?? undefined;
}
