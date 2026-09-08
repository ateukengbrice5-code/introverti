"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

interface NavItem {
  href: string;
  label: string;
}

export default function HeaderBar({
  navItems,
  accountHref,
  accountLabel,
  children,
}: {
  navItems: NavItem[];
  accountHref: string;
  accountLabel: string;
  children: ReactNode;
}) {
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

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/15 bg-ink/95 shadow-[0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md"
            : "border-white/10 bg-ink/80 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {children}

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-paper/70 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href={accountHref}
              className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-paper/80 transition-colors hover:border-gold/60 hover:text-gold"
            >
              {accountLabel}
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
      </header>

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-xl text-paper/90 transition-colors hover:text-gold"
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
