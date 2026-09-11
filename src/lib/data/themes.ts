import { getSupabase } from "@/lib/supabase/client";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { Theme } from "@/lib/types";

type ThemeRow = {
  slug: string;
  title: string;
  standfirst: string;
  body: string[];
  fait: string | null;
  hypothese: string | null;
  reflexion: string | null;
  status: Theme["status"];
  cover_image_url: string | null;
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
    status: row.status,
    cover_image_url: row.cover_image_url ?? undefined,
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

/**
 * Variantes admin : clé service_role (contourne le RLS), voient tous les
 * statuts. Réservées aux pages sous /admin.
 */
export async function getThemesAdmin(): Promise<Theme[]> {
  const { data, error } = await getSupabaseAdmin().from("themes").select("*").order("slug");
  if (error) throw error;
  return (data as ThemeRow[]).map(mapTheme);
}

export async function getThemeAdmin(slug: string): Promise<Theme | undefined> {
  const { data, error } = await getSupabaseAdmin().from("themes").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapTheme(data as ThemeRow) : undefined;
}
