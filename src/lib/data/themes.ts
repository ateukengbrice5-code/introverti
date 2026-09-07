import { getSupabase } from "@/lib/supabase/client";
import { Theme } from "@/lib/types";

type ThemeRow = {
  slug: string;
  title: string;
  standfirst: string;
  body: string[];
  fait: string | null;
  hypothese: string | null;
  reflexion: string | null;
};

function mapTheme(row: ThemeRow): Theme {
  return {
    slug: row.slug,
    title: row.title,
    standfirst: row.standfirst,
    body: row.body,
    distinctions:
      row.fait && row.hypothese && row.reflexion
        ? { fait: row.fait, hypothese: row.hypothese, reflexion: row.reflexion }
        : undefined,
  };
}

export async function getThemes(): Promise<Theme[]> {
  const { data, error } = await getSupabase().from("themes").select("*").order("slug");
  if (error) throw error;
  return (data as ThemeRow[]).map(mapTheme);
}

export async function getTheme(slug: string): Promise<Theme | undefined> {
  const { data, error } = await getSupabase().from("themes").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapTheme(data as ThemeRow) : undefined;
}
