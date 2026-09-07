import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = { title: "Conditions" };

export default function ConditionsPage() {
  return (
    <>
      <PageIntro eyebrow="Légal" title="Conditions d'utilisation" />
      <div className="mx-auto max-w-2xl px-6 py-16 text-sm leading-relaxed text-paper/70">
        <p>
          Cette page sera complétée avec les conditions générales d&rsquo;utilisation définitives
          avant la mise en production.
        </p>
      </div>
    </>
  );
}
