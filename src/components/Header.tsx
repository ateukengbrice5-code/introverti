import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import HeaderBar from "./HeaderBar";

const nav = [
  { href: "/comprendre", label: "Comprendre" },
  { href: "/se-decouvrir", label: "Se découvrir" },
  { href: "/parcours", label: "Parcours" },
  { href: "/reflexions", label: "Réflexions" },
  { href: "/ressources", label: "Ressources" },
  { href: "/communaute", label: "Communauté" },
];

export default async function Header() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data } = await supabase.rpc("is_admin");
    isAdmin = !!data;
  }

  const accountHref = user ? "/dashboard" : "/connexion";
  const accountLabel = user ? "Mon espace" : "Connexion";

  // Le lien Admin n'apparaît que pour les comptes admin — inutile de
  // l'exposer à tout le monde, la route est de toute façon protégée par
  // le middleware (is_admin() côté serveur), ceci est juste une question
  // de clarté de la navigation.
  const navItems = isAdmin ? [...nav, { href: "/admin", label: "Admin" }] : nav;

  return (
    <HeaderBar navItems={navItems} accountHref={accountHref} accountLabel={accountLabel}>
      <Link href="/" className="font-display text-lg tracking-tight text-paper">
        Ateukeng Brice
        <span className="ml-2 hidden font-mono text-[0.65rem] uppercase tracking-[0.16em] text-gold sm:inline">
          L&rsquo;introverti
        </span>
      </Link>
    </HeaderBar>
  );
}
