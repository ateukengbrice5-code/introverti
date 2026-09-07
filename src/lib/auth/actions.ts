"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * URL absolue du site, pour construire emailRedirectTo (Supabase exige une
 * URL absolue, jamais relative). NEXT_PUBLIC_SITE_URL prendra le relais une
 * fois le nom de domaine acheté (voir DECISION-LOG.md, 31/08/2026) ; en
 * attendant, on retombe sur l'hôte de la requête courante (fonctionne aussi
 * bien en local qu'en preview).
 */
async function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  const host = h.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

/**
 * Inscription réelle via Supabase Auth (compte unique Ateb's Inspire).
 * Le trigger on_auth_user_created (atebs-inspire-core) crée automatiquement
 * la ligne core_profile correspondante — rien à faire ici de ce côté.
 */
export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const firstName = String(formData.get("name") ?? "").trim();
  const from = String(formData.get("from") ?? "/dashboard");

  if (!email || !password) {
    redirect(`/inscription?error=champs_manquants&from=${encodeURIComponent(from)}`);
  }

  const supabase = await createSupabaseServerClient();
  const base = await siteUrl();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName || null, language: "fr" },
      // Reçu par /auth/callback une fois l'e-mail confirmé — permet de
      // renvoyer la personne exactement où elle voulait aller (ex. le test
      // de personnalité) au lieu de toujours retomber sur /dashboard. Voir
      // DECISION-LOG.md, 06/09/2026.
      emailRedirectTo: `${base}/auth/callback?next=${encodeURIComponent(from)}`,
    },
  });

  if (error) {
    redirect(`/inscription?error=${encodeURIComponent(error.message)}&from=${encodeURIComponent(from)}`);
  }

  // Confirmation d'e-mail exigée (voir PHASE-1) : pas de session immédiate.
  redirect("/inscription?success=verifie_ton_email");
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/dashboard");

  if (!email || !password) {
    redirect(`/connexion?error=champs_manquants&from=${encodeURIComponent(from)}`);
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/connexion?error=${encodeURIComponent(error.message)}&from=${encodeURIComponent(from)}`);
  }

  redirect(from || "/dashboard");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/connexion");
}
