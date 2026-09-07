import Link from "next/link";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import HeaderNav from "./HeaderNav";

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

  const accountHref = user ? "/dashboard" : "/connexion";
  const accountLabel = user ? "Mon espace" : "Connexion";

  return (
    <header className="relative border-b border-white/10 bg-ink">
      {/* Bandeau photo + identité */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-banner.svg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-ink" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-16 text-center sm:py-20">
          <Link href="/" className="flex flex-col items-center gap-4 font-display text-paper">
            <Image src="/logo.svg" alt="Ateukeng Brice — L'introverti" width={40} height={40} priority />
            <span className="flex flex-col items-center gap-3">
              <span className="text-4xl tracking-tight sm:text-5xl">Ateukeng Brice</span>
              <span className="flex items-center gap-4">
                <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                  L&rsquo;introverti
                </span>
                <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
              </span>
            </span>
          </Link>

          <p className="max-w-md font-serif italic text-sm leading-relaxed text-paper/70 sm:text-base">
            Comprendre son monde intérieur pour mieux vivre le monde extérieur.
          </p>
        </div>
      </div>

      <HeaderNav nav={nav} accountHref={accountHref} accountLabel={accountLabel} />
    </header>
  );
}
