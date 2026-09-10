import Link from "next/link";
import type { Metadata } from "next";
import { getJourneysAdmin } from "@/lib/data/journeys";
import { deleteJourney } from "./actions";
import StatusBadge from "@/components/StatusBadge";

export const metadata: Metadata = { title: "Admin · Parcours", robots: { index: false, follow: false } };

export default async function AdminJourneysPage() {
  const journeys = await getJourneysAdmin();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Parcours</p>
          <h1 className="mt-2 font-display text-3xl">Parcours</h1>
        </div>
        <Link href="/admin/parcours/new" className="border border-gold px-4 py-2 text-sm text-gold hover:bg-gold hover:text-ink">
          + Nouveau parcours
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {journeys.map((j) => (
          <li key={j.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-lg">{j.title}</p>
                <StatusBadge status={j.status} />
              </div>
              <p className="text-xs text-paper/40">{j.duration} · /{j.slug}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/parcours/${j.slug}`} target="_blank" className="text-xs text-paper/50 hover:text-gold">Voir</Link>
              <Link href={`/admin/parcours/${j.slug}/edit`} className="text-xs text-gold hover:underline">Modifier</Link>
              <form action={deleteJourney}>
                <input type="hidden" name="slug" value={j.slug} />
                <button type="submit" className="text-xs text-red-400/80 hover:text-red-400">Supprimer</button>
              </form>
            </div>
          </li>
        ))}
        {journeys.length === 0 && <p className="py-8 text-sm text-paper/50">Aucun parcours pour l&rsquo;instant.</p>}
      </ul>
    </div>
  );
}