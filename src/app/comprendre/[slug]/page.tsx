import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getThemes, getTheme } from "@/lib/data/themes";

export async function generateStaticParams() {
  const themes = await getThemes();
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const theme = await getTheme(slug);
  if (!theme) return {};
  return { title: theme.title, description: theme.standfirst };
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = await getTheme(slug);
  if (!theme) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/comprendre" className="text-xs text-gold hover:underline">
        ← Comprendre
      </Link>
      <p className="eyebrow mt-6">Comprendre</p>
      <h1 className="mt-4 font-display text-4xl leading-tight">{theme.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-paper/70">{theme.standfirst}</p>

      <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-paper/80">
        {theme.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {theme.distinctions && (
        <div className="mt-12 border border-white/10 p-6">
          <p className="eyebrow">Ce qu&rsquo;on peut affirmer</p>
          <dl className="mt-4 flex flex-col gap-4 text-sm">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-paper/40">Fait établi</dt>
              <dd className="mt-1 text-paper/80">{theme.distinctions.fait}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-paper/40">Hypothèse</dt>
              <dd className="mt-1 text-paper/80">{theme.distinctions.hypothese}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-paper/40">Réflexion éditoriale</dt>
              <dd className="mt-1 text-paper/80">{theme.distinctions.reflexion}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-14 border-t border-white/10 pt-8">
        <Link
          href="/se-decouvrir/test"
          className="inline-block border border-gold px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Comprendre comment cela s&rsquo;applique à toi →
        </Link>
      </div>
    </article>
  );
}
