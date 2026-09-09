import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getJourney } from "@/lib/data/journeys";
import { getResources } from "@/lib/data/library";

// Voir le commentaire équivalent dans src/app/reflexions/[slug]/page.tsx.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = await getJourney(slug);
  if (!journey) return {};
  return { title: journey.title, description: journey.objective };
}

export default async function JourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [journey, resources] = await Promise.all([getJourney(slug), getResources()]);
  if (!journey) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/parcours" className="text-xs text-gold hover:underline">
        ← Parcours
      </Link>
      <p className="eyebrow mt-6">{journey.audience}</p>
      <h1 className="mt-4 font-display text-4xl leading-tight">{journey.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-paper/75">{journey.objective}</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gold">Durée indicative — {journey.duration}</p>

      <ol className="mt-10 flex flex-col divide-y divide-white/10 border-y border-white/10">
        {journey.steps.map((s, i) => (
          <li key={s.title} className="flex gap-5 py-6">
            <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-display text-lg">{s.title}</p>
              <p className="mt-1 text-sm text-paper/65">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>

      {journey.resources.length > 0 && (
        <div className="mt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">Ressources associées</p>
          <ul className="mt-3 flex flex-col gap-1">
            {journey.resources.map((slug2) => {
              const r = resources.find((r) => r.slug === slug2);
              if (!r) return null;
              return (
                <li key={slug2}>
                  <Link href="/ressources" className="font-display text-lg hover:text-gold">
                    {r.title} →
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-14 border-t border-white/10 pt-8">
        <Link
          href="/se-decouvrir/test"
          className="inline-block border border-gold px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Voir si ce parcours te correspond →
        </Link>
      </div>
    </div>
  );
}
