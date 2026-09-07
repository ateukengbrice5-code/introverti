"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search } from "lucide-react";

type NavItem = { href: string; label: string };

export default function HeaderNav({
  nav,
  accountHref,
  accountLabel,
}: {
  nav: NavItem[];
  accountHref: string;
  accountLabel: string;
}) {
  const pathname = usePathname();

  return (
    <div className="border-t border-white/10 bg-ink/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-6 py-4">
        <Link href="/" aria-label="Accueil" className="text-gold transition-colors hover:text-gold/80">
          <Home className="h-4 w-4" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {nav.map((item, i) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <span key={item.href} className="flex items-center gap-1">
                {i > 0 && <span className="mx-1 h-3 w-px bg-white/15" aria-hidden="true" />}
                <Link
                  href={item.href}
                  className={`border-b-2 px-2 pb-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors ${
                    isActive
                      ? "border-gold text-gold"
                      : "border-transparent text-paper/70 hover:text-gold"
                  }`}
                >
                  {item.label}
                </Link>
              </span>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href={accountHref} className="text-sm text-paper/70 transition-colors hover:text-gold">
            {accountLabel}
          </Link>
          <Link
            href="/recherche"
            aria-label="Rechercher"
            className="text-paper/70 transition-colors hover:text-gold"
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <MobileMenu nav={nav} accountHref={accountHref} accountLabel={accountLabel} />
      </div>
    </div>
  );
}

function MobileMenu({
  nav,
  accountHref,
  accountLabel,
}: {
  nav: NavItem[];
  accountHref: string;
  accountLabel: string;
}) {
  return (
    <details className="relative md:hidden">
      <summary className="list-none cursor-pointer select-none rounded border border-white/15 px-3 py-2 text-xs font-mono uppercase tracking-widest text-paper/80">
        Menu
      </summary>
      <div className="absolute right-0 z-10 mt-3 w-60 border border-white/10 bg-iron/95 p-4 shadow-xl backdrop-blur">
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
          <Link href="/recherche" className="text-sm text-gold">
            Rechercher
          </Link>
        </nav>
      </div>
    </details>
  );
}
