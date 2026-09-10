import Link from "next/link";

/**
 * Modifié le 08/09/2026 pour introduire progressivement l'écosystème Ateb's
 * Inspire (voir DECISION-LOG.md) : uniquement le footer, rien d'autre.
 * L'Introverti reste identifié comme le seul univers disponible ; les
 * autres noms Ateb sont affichés à titre informatif, non cliquables, tant
 * qu'ils n'existent pas — pas de faux liens, pas de pages "Coming Soon".
 */

const explore = [
  { href: "/", label: "Accueil" },
  { href: "/comprendre", label: "Comprendre l'introversion" },
  { href: "/se-decouvrir", label: "Se découvrir" },
  { href: "/parcours", label: "Parcours" },
  { href: "/reflexions", label: "Réflexions" },
  { href: "/ressources", label: "Ressources" },
  { href: "/communaute", label: "Communauté" },
];

const legal = [
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/conditions", label: "Conditions d'utilisation" },
  { href: "/contact", label: "Contact" },
];

const universe = [
  { label: "L'Introverti", status: "Disponible" as const, href: "/" },
  { label: "Ateb ID", status: "En préparation" as const },
  { label: "Ateb's Evolution", status: "En préparation" as const },
  { label: "Ateb's Connect", status: "En préparation" as const },
  { label: "Ateb's Finance", status: "En préparation" as const },
  { label: "Ateb's Business", status: "En préparation" as const },
  { label: "Ateb's Chat", status: "En préparation" as const },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_0.9fr]">
          {/* 1. Identité — Ateb's Inspire */}
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-gold">Ateb&rsquo;s Inspire</p>
            <p className="mt-3 max-w-xs text-sm text-paper/60">
              Un écosystème pensé pour mieux comprendre, évoluer et construire sa vie.
            </p>
            <p className="mt-3 max-w-xs text-sm text-paper/40">
              L&rsquo;Introverti est le premier univers actuellement disponible.
            </p>
          </div>

          {/* 2. Explorer */}
          <FooterCol title="Explorer" links={explore} />

          {/* 3. L'univers Ateb's Inspire — informatif, discret, non cliquable sauf L'Introverti */}
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/40">
              L&rsquo;univers Ateb&rsquo;s Inspire
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {universe.map((u) => (
                <li key={u.label} className="flex items-center justify-between gap-3">
                  {u.href ? (
                    <Link href={u.href} className="text-sm text-paper/70 hover:text-gold">
                      {u.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-paper/40">{u.label}</span>
                  )}
                  <span
                    className={
                      u.status === "Disponible"
                        ? "shrink-0 font-mono text-[0.6rem] uppercase tracking-wider text-gold"
                        : "shrink-0 font-mono text-[0.6rem] uppercase tracking-wider text-paper/25"
                    }
                  >
                    {u.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Légal */}
          <FooterCol title="Informations" links={legal} />
        </div>

        {/* Signature */}
        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-paper/40">
          <span className="font-mono uppercase tracking-[0.14em] text-paper/50">Ateb&rsquo;s Inspire</span>
          <span>© {new Date().getFullYear()} Ateukeng Brice. Tous droits réservés.</span>
          <span className="text-paper/30">L&rsquo;Introverti — un univers Ateb&rsquo;s Inspire.</span>
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
