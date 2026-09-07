import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/**
 * Protège /admin par le compte Supabase Auth déjà utilisé pour le reste du
 * site — plus de mot de passe partagé (voir DECISION-LOG.md, 01/09/2026).
 * Non connecté → /connexion (avec retour automatique sur la page demandée).
 * Connecté mais pas admin → /admin/acces-refuse.
 *
 * SSO Ateb ID : AUTH_COOKIE_DOMAIN (ex. ".atebsinspire.com") rend le cookie de
 * session lisible par tous les sous-domaines Ateb — voir DECISION-LOG.md.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieDomain = process.env.AUTH_COOKIE_DOMAIN;

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: cookieDomain
        ? { domain: cookieDomain, path: "/", sameSite: "lax", secure: true }
        : { path: "/", sameSite: "lax" },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (pathname === "/admin/acces-refuse") {
    return response;
  }

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/acces-refuse";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
