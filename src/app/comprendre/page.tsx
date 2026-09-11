import Link from "next/link";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getThemes } from "@/lib/data/themes";

export const metadata: Metadata = {
  title: "Comprendre l'introversion",
  description:
    "Introversion, timidité, confiance en soi, solitude, sensibilité, relations, travail, leadership, entrepreneuriat : dix sujets expliqués sans jargon.",
};

export default async function ComprendrePage() {
  const themes = await getThemes();
  return (
    <>
      <PageIntro
        eyebrow="Comprendre"
        title="Comprendre l'introversion"
        lead="Introversion, timidité, anxiété sociale, solitude, manque de confiance : des mots qu'on confond souvent. Chaque page distingue ce qui relève du fait établi, de l'hypothèse et de la réflexion éditoriale."
      />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <Link
              key={theme.slug}
              href={`/comprendre/${theme.slug}`}
              className="group flex flex-col bg-ink transition-colors hover:bg-iron/60"
            >
              {theme.cover_image_url && (
                // eslint-disable-next-line @next/next/no-img-element -- grille simple, pas de dimensions fixes connues à l'avance
                <img
                  src={theme.cover_image_url}
                  alt=""
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="px-6 py-8">
                <p className="font-display text-xl">{theme.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{theme.standfirst}</p>
                <span className="mt-5 inline-block text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Lire →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
