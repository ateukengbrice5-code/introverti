import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Route de callback de confirmation d'e-mail — n'existait pas du tout avant
 * (voir DECISION-LOG.md, 06/09/2026). Sans elle, le lien de confirmation
 * envoyé par Supabase n'avait aucune page applicative à atteindre : la
 * personne confirmait son adresse côté Supabase, mais sans obtenir de
 * session ni être renvoyée où elle voulait aller (ex. le test de
 * personnalité après un clic depuis un réseau social).
 *
 * Reçoit `code` (échangé contre une session — flux PKCE de @supabase/ssr) et
 * `next` (où renvoyer la personne une fois connectée, ex. /se-decouvrir/test).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/connexion?error=lien_invalide&from=${encodeURIComponent(next)}`);
}
