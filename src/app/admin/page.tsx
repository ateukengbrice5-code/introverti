import Link from "next/link";
import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Tableau de bord admin", robots: { index: false, follow: false } };

const tables = [
  { key: "articles", label: "Articles", href: "/admin/articles" },
  { key: "journeys", label: "Parcours", href: "/admin/parcours" },
  { key: "themes", label: "Thèmes", href: "/admin/themes" },
  { key: "resources", label: "Ressources", href: "/admin/ressources" },
  { key: "products", label: "Produits", href: "/admin/produits" },
  { key: "newsletter_subscribers", label: "Inscrits newsletter", href: "/admin/newsletter" },
] as const;

export default async function AdminDashboard() {
  const supabase = getSupabaseAdmin();
  const counts = await Promise.all(
    tables.map(async (t) => {
      const { count, error } = await supabase.from(t.key).select("*", { count: "exact", head: true });
      return { ...t, count: error ? null : count };
    })
  );

  return (
    <div>
      <p className="eyebrow">Tableau de bord</p>
      <h1 className="mt-3 font-display text-3xl">Contenu du site</h1>
      <p className="mt-2 max-w-lg text-sm text-paper/60">
        Toute modification ici est immédiatement visible sur le site public — aucun déploiement requis.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((t) => (
          <Link key={t.key} href={t.href} className="group border border-white/10 p-6 hover:border-gold">
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">{t.label}</p>
            <p className="mt-2 font-display text-3xl group-hover:text-gold">
              {t.count ?? "—"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
