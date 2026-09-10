import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getArticlesByCategory, getCategories, getCategory } from "@/lib/data/articles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.label} — Réflexions`,
    description: category.description ?? `Les articles du magazine Réflexions dans la catégorie ${category.label}.`,
  };
}

export default async function ReflexionsCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, articles, categories] = await Promise.all([
    getCategory(slug),
    getArticlesByCategory(slug),
    getCategories(),
  ]);
  if (!category) notFound();

  return (
    <>
      <PageIntro
        eyebrow="Réflexions"
        title={category.label}
        lead={category.description ?? "Les articles du magazine dans cette catégorie."}
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/reflexions"
            className="border border-white/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-paper/50 hover:border-gold hover:text-gold"
          >
            Tous
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/reflexions/categorie/${c.slug}`}
              className={`border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest ${
                c.slug === slug
                  ? "border-gold text-gold"
                  : "border-white/10 text-paper/50 hover:border-gold hover:text-gold"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {articles.length === 0 ? (
          <p className="mt-10 text-sm text-paper/50">
            Pas encore d&apos;article publié dans cette catégorie.
          </p>
        ) : (
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
                  {category.label} · {article.reading_minutes} min
                </p>
                <h2 className="mt-2 font-display text-xl leading-snug group-hover:text-gold">{article.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
