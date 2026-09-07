import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase avec la clé service_role : contourne le RLS. Réservé
 * strictement au code serveur (Server Actions, Route Handlers, Server
 * Components sous /admin) — ne jamais importer depuis un fichier "use client".
 * Le paquet `server-only` fait planter le build si ça arrive par erreur.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY manquant. Récupère-le dans Supabase → Project Settings → API → service_role, et ajoute-le dans .env.local. Ne jamais l'exposer côté client."
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
