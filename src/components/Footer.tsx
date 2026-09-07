import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl">Ateukeng Brice</p>
            <p className="mt-2 text-sm text-paper/60">L&rsquo;identité avant les objectifs.</p>
            <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">
              #ServirPourInspirer
            </p>
          </div>

          <FooterCol
            title="Le projet"
            links={[
              { href: "/a-propos", label: "À propos" },
              { href: "/contact", label: "Contact" },
              { href: "/communaute", label: "Communauté" },
            ]}
          />
          <FooterCol
            title="Ressources"
            links={[
              { href: "/ressources", label: "Bibliothèque de ressources" },
              { href: "/bibliotheque", label: "Livres & programmes" },
              { href: "/reflexions", label: "Réflexions" },
            ]}
          />
          <FooterCol
            title="Légal"
            links={[
              { href: "/confidentialite", label: "Confidentialité" },
              { href: "/conditions", label: "Conditions" },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ateukeng Brice — L&rsquo;introverti. Tous droits réservés.</span>
          <span>Conçu pour ceux qui pensent beaucoup et parlent parfois moins.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/40">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-paper/70 hover:text-gold">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
