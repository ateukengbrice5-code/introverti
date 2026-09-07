import Link from "next/link";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getAxes } from "@/lib/data/axes";

export const metadata: Metadata = {
  title: "Se découvrir",
  description: "Un questionnaire de fonctionnement personnel et un parcours en sept axes pour comprendre ton fonctionnement.",
};

export default async function SeDecouvrirPage() {
  const axes = await getAxes();
  return (
    <>
      <PageIntro
        eyebrow="Se découvrir"
        title="Avant de travailler sur tes objectifs, commence par comprendre ton fonctionnement."
        lead="Deux points d'entrée : un questionnaire pour dégager une première lecture de ton fonctionnement, et un parcours en sept axes pour aller plus loin, à ton rythme."
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border border-white/10 p-8">
            <p className="eyebrow">40 questions · ~15 minutes</p>
            <h2 className="mt-4 font-display text-2xl">Le questionnaire de fonctionnement</h2>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">
              Un outil de compréhension de soi, pas un diagnostic. Il ne classe pas dans une
              catégorie unique — il dresse une lecture nuancée de ton fonctionnement sur
              plusieurs dimensions (énergie sociale, introspection, expression, organisation...).
            </p>
            <Link
              href="/se-decouvrir/test"
              className="mt-6 inline-block border border-gold px-5 py-2.5 text-sm text-gold hover:bg-gold hover:text-ink"
            >
              Commencer le questionnaire
            </Link>
          </div>

          <div className="border border-white/10 p-8">
            <p className="eyebrow">Parcours long</p>
            <h2 className="mt-4 font-display text-2xl">Les 7 axes d&rsquo;introspection</h2>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">
              Identité, fonctionnement, énergie, relations, confiance, expression, impact : sept
              entrées pour explorer ton fonctionnement en profondeur.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {axes.map((a) => (
                <li key={a.slug} className="font-mono text-[0.65rem] uppercase tracking-wider text-paper/50">
                  {String(a.index).padStart(2, "0")} {a.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
