import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Client Supabase côté serveur, lié à la session de l'utilisateur connecté.
 * Toutes les routes API du test l'utilisent : RLS s'applique donc normalement
 * (chaque utilisateur ne peut agir que sur ses propres sessions/réponses).
 *
 * SSO Ateb ID : quand AUTH_COOKIE_DOMAIN est défini (ex. ".atebsinspire.com"),
 * le cookie de session devient lisible par tous les sous-domaines Ateb
 * (evolution., finance., etc.) — voir DECISION-LOG.md. En local (variable
 * absente), le cookie reste host-only, comportement inchangé.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const cookieDomain = process.env.AUTH_COOKIE_DOMAIN;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: cookieDomain
        ? { domain: cookieDomain, path: "/", sameSite: "lax", secure: true }
        : { path: "/", sameSite: "lax" },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Appelé depuis un Server Component sans écriture possible — sans danger ici,
            // le middleware Next.js gère le refresh de session.
          }
        },
      },
    }
  );
}
