import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getArticles, getCategories } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Réflexions",
  description: "Le magazine du projet : introversion, relations, travail, leadership, société, Afrique, témoignages.",
};

export default async function ReflexionsPage() {
  const [articles, categories] = await Promise.all([getArticles(), getCategories()]);
  const labelFor = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;

  return (
    <>
      <PageIntro
        eyebrow="Réflexions"
        title="Un magazine, pas un blog de développement personnel."
        lead="Des textes courts, un angle assumé à chaque fois."
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Chaque catégorie mène vers /reflexions/categorie/[slug] : les
            articles restent accessibles sous /reflexions/[slug], mais sont
            aussi navigables par catégorie sans dupliquer leur URL. */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/reflexions/categorie/${c.slug}`}
              className="border border-white/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-paper/50 hover:border-gold hover:text-gold"
            >
              {c.label}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/reflexions/${article.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-iron/[0.06]">
                {article.cover_image_url && (
                  <Image
                    src={article.cover_image_url}
                    alt={article.cover_note || article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                )}
              </div>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-paper/40">
                {labelFor(article.category)} · {article.reading_minutes} min
              </p>
              <h2 className="mt-2 font-display text-xl leading-snug group-hover:text-gold">{article.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
