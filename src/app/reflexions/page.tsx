import Link from "next/link";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getArticles, getCategories } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Réflexions",
  description: "Le magazine du projet : introversion, relations, travail, leadership, société, Afrique, témoignages.",
};

export default async function ReflexionsPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  return (
    <>
      <PageIntro
        eyebrow="Réflexions"
        title="Un magazine, pas un blog de développement personnel."
        lead="Des textes courts, un angle assumé à chaque fois."
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.slug}
              className="border border-white/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-paper/50"
            >
              {c.label}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/reflexions/${article.slug}`} className="group block">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-paper/40">
                {article.category} · {article.reading_minutes} min
              </p>
              <h2 className="mt-3 font-display text-xl leading-snug group-hover:text-gold">{article.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
