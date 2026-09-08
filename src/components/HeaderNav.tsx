"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

// Icônes inline — lucide-react n'est pas une dépendance du projet, pas la peine
// de l'ajouter juste pour deux glyphes.
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9v-6h6v6h2.5a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Empêche le scroll du fond quand le panneau mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <>
      <div
        className={`sticky top-0 z-40 border-t border-b transition-all duration-300 ${
          scrolled
            ? "border-white/15 bg-ink/95 shadow-[0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md"
            : "border-white/10 bg-ink/95"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-6 py-4">
          <Link href="/" aria-label="Accueil" className="text-gold transition-colors hover:text-gold/80">
            <HomeIcon className="h-4 w-4" />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {nav.map((item, i) => (
              <span key={item.href} className="flex items-center gap-1">
                {i > 0 && <span className="mx-1 h-3 w-px bg-white/15" aria-hidden="true" />}
                <Link
                  href={item.href}
                  className={`border-b-2 px-2 pb-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors ${
                    isActive(item.href)
                      ? "border-gold text-gold"
                      : "border-transparent text-paper/70 hover:text-gold"
                  }`}
                >
                  {item.label}
                </Link>
              </span>
            ))}
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
              <SearchIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/se-decouvrir/test"
              className="border border-gold/60 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Commencer
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded border border-white/15 px-3 py-2 text-xs font-mono uppercase tracking-widest text-paper/80 md:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Panneau coulissant */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-[80%] max-w-sm flex-col border-l border-white/10 bg-iron px-6 py-6 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-gold">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="rounded border border-white/15 px-2 py-1 text-xs text-paper/70 hover:text-gold"
            aria-label="Fermer le menu"
          >
            Fermer
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-xl transition-colors ${
                isActive(item.href) ? "text-gold" : "text-paper/90 hover:text-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="my-6 h-px bg-white/10" />

        <div className="flex flex-col gap-4">
          <Link
            href={accountHref}
            onClick={() => setMenuOpen(false)}
            className="rounded-full border border-white/15 px-4 py-2 text-center text-sm text-paper/80 hover:border-gold/60 hover:text-gold"
          >
            {accountLabel}
          </Link>
          <Link
            href="/recherche"
            onClick={() => setMenuOpen(false)}
            className="text-center text-sm text-gold"
          >
            Rechercher
          </Link>
          <Link
            href="/se-decouvrir/test"
            onClick={() => setMenuOpen(false)}
            className="border border-gold bg-gold px-4 py-2 text-center text-sm font-medium text-ink hover:bg-transparent hover:text-gold"
          >
            Commencer →
          </Link>
        </div>
      </div>
    </>
  );
}
