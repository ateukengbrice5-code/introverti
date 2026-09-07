import Link from "next/link";
import type { Metadata } from "next";
import { getArticles } from "@/lib/data/articles";
import { deleteArticle } from "./actions";

export const metadata: Metadata = { title: "Admin · Articles", robots: { index: false, follow: false } };

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Réflexions</p>
          <h1 className="mt-2 font-display text-3xl">Articles</h1>
        </div>
        <Link href="/admin/articles/new" className="border border-gold px-4 py-2 text-sm text-gold hover:bg-gold hover:text-ink">
          + Nouvel article
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {articles.map((a) => (
          <li key={a.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg">{a.title}</p>
              <p className="text-xs text-paper/40">{a.category} · {a.published_at} · /{a.slug}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/reflexions/${a.slug}`} target="_blank" className="text-xs text-paper/50 hover:text-gold">
                Voir
              </Link>
              <Link href={`/admin/articles/${a.slug}/edit`} className="text-xs text-gold hover:underline">
                Modifier
              </Link>
              <form action={deleteArticle}>
                <input type="hidden" name="slug" value={a.slug} />
                <button type="submit" className="text-xs text-red-400/80 hover:text-red-400">
                  Supprimer
                </button>
              </form>
            </div>
          </li>
        ))}
        {articles.length === 0 && <p className="py-8 text-sm text-paper/50">Aucun article pour l&rsquo;instant.</p>}
      </ul>
    </div>
  );
}
