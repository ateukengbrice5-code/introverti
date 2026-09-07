import Link from "next/link";
import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "La communauté",
  description: "Un endroit où tu n'as pas besoin de justifier ton silence.",
};

export default function CommunautePage() {
  return (
    <>
      <PageIntro eyebrow="Communauté" title="Un endroit où tu n'as pas besoin de justifier ton silence." />
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-base leading-relaxed text-paper/75">
          La communauté est la prochaine étape du projet. Elle n&rsquo;existe pas encore sous sa
          forme complète : les fondations techniques sont posées — profils, progression, favoris,
          discussions — mais volontairement pas construites en V1 pour ne pas ralentir l&rsquo;essentiel.
        </p>
        <p className="mt-5 text-base leading-relaxed text-paper/75">
          En attendant, la newsletter et les réflexions publiées chaque semaine sont le premier
          espace d&rsquo;échange. La communauté ouvrira progressivement, avec les personnes déjà inscrites.
        </p>
        <Link
          href="/#newsletter"
          className="mt-8 inline-block border border-gold px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Être prévenu·e à l&rsquo;ouverture
        </Link>
      </div>
    </>
  );
}
