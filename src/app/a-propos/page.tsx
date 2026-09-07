import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'histoire et la philosophie du projet Ateukeng Brice — L'introverti.",
};

export default function AProposPage() {
  return (
    <>
      <PageIntro eyebrow="À propos" title="L'identité avant les objectifs." />
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="flex flex-col gap-5 text-base leading-relaxed text-paper/80">
          <p>
            On demande constamment aux gens ce qu&rsquo;ils veulent accomplir. On leur demande
            beaucoup moins souvent qui ils sont réellement et comment ils fonctionnent.
          </p>
          <p>
            Ce projet est né de ce constat. Il ne cherche pas à transformer les introvertis en
            extravertis, ni à leur vendre une méthode de plus. Il cherche à leur donner un
            vocabulaire pour se comprendre — et, à partir de là, à décider ce qu&rsquo;ils veulent
            en faire.
          </p>
          <p>
            Nous ne défendons pas l&rsquo;idée que les introvertis seraient supérieurs, plus
            intelligents ou plus profonds que les extravertis. Nous défendons l&rsquo;idée que
            deux fonctionnements différents méritent d&rsquo;être compris pour ce qu&rsquo;ils
            sont, sans hiérarchie.
          </p>
          <p>
            Le projet est porté par Ateukeng Brice, avec une attention particulière aux réalités
            culturelles africaines, où la vie communautaire dense rend parfois plus difficile
            l&rsquo;expression d&rsquo;un besoin de retrait.
          </p>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-gold">#ServirPourInspirer</p>
      </div>
    </>
  );
}
