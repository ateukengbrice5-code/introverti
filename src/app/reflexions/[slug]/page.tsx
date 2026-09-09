import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticle, getCategory } from "@/lib/data/articles";
import ArticleSharing from "@/components/ArticleSharing";

// Pas de generateStaticParams ici : le Header (racine du layout) lit les
// cookies de session à chaque requête, ce qui rend tout le site dynamique.
// Pré-générer cette route en statique entrait en conflit avec ça et faisait
// planter (digest DYNAMIC_SERVER_USAGE) le premier chargement de tout
// nouvel article publié après le build. Rendu 100% à la demande à la place —
// cohérent avec la promesse de l'admin : "immédiatement visible, sans
// déploiement".

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

      <p className="eyebrow mt-6">{category?.label ?? article.category}</p>
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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.cover_image_url}
          alt={article.cover_note}
          className="mt-8 aspect-video w-full rounded object-cover"
        />
      )}
      <p className="mt-8 border-l-2 border-gold/60 pl-4 text-sm italic text-paper/50">{article.cover_note}</p>

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
