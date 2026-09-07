import { getSupabase } from "@/lib/supabase/client";
import { ProfileType } from "@/lib/types";

export async function getProfileTypes(): Promise<ProfileType[]> {
  const { data, error } = await getSupabase().from("profile_types").select("*").order("slug");
  if (error) throw error;
  return data as ProfileType[];
}

export async function getProfileType(slug: string): Promise<ProfileType | undefined> {
  const { data, error } = await getSupabase().from("profile_types").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as ProfileType) ?? undefined;
}
