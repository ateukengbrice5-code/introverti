import Link from "next/link";
import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-6">
        <Link href="/" className="flex flex-col items-center gap-3 font-display text-paper">
          <Image src="/logo.svg" alt="Ateukeng Brice — L'introverti" width={32} height={32} priority />
          <span className="flex flex-col items-center gap-2">
            <span className="text-lg tracking-tight">Ateukeng Brice</span>
            <span className="flex items-center gap-3">
              <span className="h-px w-6 bg-gold/60" aria-hidden="true" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                L&rsquo;introverti
              </span>
              <span className="h-px w-6 bg-gold/60" aria-hidden="true" />
            </span>
          </span>
        </Link>

        <div className="hidden w-full items-center justify-center gap-1 border-t border-white/10 pt-4 md:flex">
          <nav className="flex flex-wrap items-center justify-center gap-1">
            {nav.map((item, i) => (
              <span key={item.href} className="flex items-center gap-1">
                {i > 0 && <span className="mx-1 h-3 w-px bg-white/15" aria-hidden="true" />}
                <Link
                  href={item.href}
                  className="px-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-paper/70 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <span className="mx-2 h-3 w-px bg-white/15" aria-hidden="true" />

          <Link href={accountHref} className="px-2 text-sm text-paper/70 transition-colors hover:text-gold">
            {accountLabel}
          </Link>

          <Link
            href="/se-decouvrir/test"
            className="ml-3 border border-gold/60 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Commencer
          </Link>
        </div>

        <MobileMenu accountHref={accountHref} accountLabel={accountLabel} />
      </div>
    </header>
  );
}

function MobileMenu({ accountHref, accountLabel }: { accountHref: string; accountLabel: string }) {
  return (
    <details className="relative md:hidden">
      <summary className="list-none cursor-pointer select-none rounded border border-white/15 px-3 py-2 text-xs font-mono uppercase tracking-widest text-paper/80">
        Menu
      </summary>
      <div className="absolute right-0 mt-3 w-60 border border-white/10 bg-iron/95 p-4 shadow-xl backdrop-blur">
        <nav className="flex flex-col gap-3">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-paper/85 hover:text-gold">
              {item.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-white/10" />
          <Link href={accountHref} className="text-sm text-paper/70 hover:text-gold">
            {accountLabel}
          </Link>
          <Link href="/se-decouvrir/test" className="text-sm text-gold">
            Commencer →
          </Link>
        </nav>
      </div>
    </details>
  );
}
