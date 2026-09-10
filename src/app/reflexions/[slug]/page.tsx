import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getArticle, getCategory } from "@/lib/data/articles";
import ArticleSharing from "@/components/ArticleSharing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const url = `/reflexions/${slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      siteName: "Ateb's Inspire — L'introverti",
      locale: "fr_FR",
      publishedTime: article.published_at,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const category = await getCategory(article.category);
  const related = await Promise.all((article.related ?? []).map((s) => getArticle(s)));

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/reflexions" className="text-xs text-gold hover:underline">
        ← Réflexions
      </Link>

      <Link href={`/reflexions/categorie/${article.category}`} className="eyebrow mt-6 inline-block hover:text-gold">
        {category?.label ?? article.category}
      </Link>
      <h1 className="mt-4 font-display text-4xl leading-tight">{article.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-paper/70">{article.subtitle}</p>

      <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-paper/40">
        <span>{article.author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.published_at}>
          {new Date(article.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </time>
        <span aria-hidden="true">·</span>
        <span>{article.reading_minutes} min de lecture</span>
      </div>

      {article.cover_image_url && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={article.cover_image_url}
            alt={article.cover_note || article.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 42rem, 100vw"
          />
        </div>
      )}
      {article.cover_note && (
        <p className="mt-3 border-l-2 border-gold/60 pl-4 text-sm italic text-paper/50">{article.cover_note}</p>
      )}

      <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-paper/85">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <ArticleSharing title={article.title} slug={article.slug} />

      {related.some(Boolean) && (
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">À lire aussi</p>
          <ul className="mt-4 flex flex-col gap-2">
            {related.map(
              (r) =>
                r && (
                  <li key={r.slug}>
                    <Link href={`/reflexions/${r.slug}`} className="font-display text-xl hover:text-gold">
                      {r.title} →
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </article>
  );
}
