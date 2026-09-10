import Link from "next/link";
import type { Metadata } from "next";
import { getResources } from "@/lib/data/library";
import { deleteResource } from "./actions";
import StatusBadge from "@/components/StatusBadge";

export const metadata: Metadata = { title: "Admin · Ressources", robots: { index: false, follow: false } };

export default async function AdminResourcesPage() {
  const resources = await getResources({ includeDrafts: true });
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Ressources</p>
          <h1 className="mt-2 font-display text-3xl">Ressources</h1>
        </div>
        <Link href="/admin/ressources/new" className="border border-gold px-4 py-2 text-sm text-gold hover:bg-gold hover:text-ink">
          + Nouvelle ressource
        </Link>
      </div>
      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {resources.map((r) => (
          <li key={r.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-lg">{r.title}</p>
                <StatusBadge status={r.status} />
              </div>
              <p className="text-xs text-paper/40">{r.type} · /{r.slug}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/ressources/${r.slug}/edit`} className="text-xs text-gold hover:underline">Modifier</Link>
              <form action={deleteResource}>
                <input type="hidden" name="slug" value={r.slug} />
                <button type="submit" className="text-xs text-red-400/80 hover:text-red-400">Supprimer</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}