import Link from "next/link";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getJourneys } from "@/lib/data/journeys";

export const metadata: Metadata = {
  title: "Parcours",
  description: "Des parcours de développement personnel adaptés à des situations concrètes.",
};

export default async function ParcoursPage() {
  const journeys = await getJourneys();
  return (
    <>
      <PageIntro
        eyebrow="Parcours"
        title="Des parcours selon tes besoins, pas selon une méthode unique."
        lead="Chaque parcours a un objectif, une durée, des étapes concrètes et des ressources associées."
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {journeys.map((j) => (
            <li key={j.slug}>
              <Link href={`/parcours/${j.slug}`} className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-xl group-hover:text-gold">{j.title}</p>
                  <p className="mt-1 text-sm text-paper/55">{j.audience}</p>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-paper/40">{j.duration}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
