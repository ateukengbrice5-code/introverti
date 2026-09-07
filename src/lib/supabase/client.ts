import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase pour la lecture de contenu public (RLS : lecture publique
 * sur categories, articles, themes, axes, profile_types, quiz_questions,
 * journeys, resources, products — voir la migration initial_schema).
 * La clé utilisée est la clé publique (publishable/anon) : elle est prévue
 * pour être exposée côté client, la sécurité réelle vient des policies RLS.
 */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Variables Supabase manquantes : renseigne NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local"
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
