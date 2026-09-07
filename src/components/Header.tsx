import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import HeaderNav from "./HeaderNav";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/se-decouvrir/test", label: "ATEB’S ID" },
  { href: "/reflexions", label: "Articles" },
  { href: "/bibliotheque", label: "Livres" },
  { href: "/parcours", label: "Expériences" },
  { href: "/communaute", label: "Connect" },
];

export default async function Header() {
  let user = null;
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    // Le header public reste disponible pendant qu’un environnement Supabase est configuré.
  }
  const accountHref = user ? "/dashboard" : "/connexion";
  const accountLabel = user ? "Mon espace" : "Connexion";

  return <header className="border-b border-line bg-ink"><div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10"><Link href="/" className="flex items-center gap-3" aria-label="ATEB’S INSPIRE, accueil"><span className="grid size-8 place-items-center border border-gold font-display text-lg text-gold">A</span><span className="hidden font-mono text-[.68rem] uppercase tracking-[.18em] text-paper sm:inline">ATEB’S INSPIRE</span></Link><HeaderNav nav={nav} accountHref={accountHref} accountLabel={accountLabel} /></div></header>;
}
