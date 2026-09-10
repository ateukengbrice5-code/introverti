import Link from "next/link";
import type { Metadata } from "next";
import { getThemes } from "@/lib/data/themes";
import { deleteTheme } from "./actions";
import StatusBadge from "@/components/StatusBadge";

export const metadata: Metadata = { title: "Admin · Thèmes", robots: { index: false, follow: false } };

export default async function AdminThemesPage() {
  const themes = await getThemes({ includeDrafts: true });
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Comprendre</p>
          <h1 className="mt-2 font-display text-3xl">Thèmes</h1>
        </div>
        <Link href="/admin/themes/new" className="border border-gold px-4 py-2 text-sm text-gold hover:bg-gold hover:text-ink">
          + Nouveau thème
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {themes.map((t) => (
          <li key={t.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-lg">{t.title}</p>
                <StatusBadge status={t.status} />
              </div>
              <p className="text-xs text-paper/40">/{t.slug}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/comprendre/${t.slug}`} target="_blank" className="text-xs text-paper/50 hover:text-gold">Voir</Link>
              <Link href={`/admin/themes/${t.slug}/edit`} className="text-xs text-gold hover:underline">Modifier</Link>
              <form action={deleteTheme}>
                <input type="hidden" name="slug" value={t.slug} />
                <button type="submit" className="text-xs text-red-400/80 hover:text-red-400">Supprimer</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}