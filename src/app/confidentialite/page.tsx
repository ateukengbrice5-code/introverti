import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = { title: "Confidentialité" };

export default function ConfidentialitePage() {
  return (
    <>
      <PageIntro eyebrow="Légal" title="Confidentialité" />
      <div className="mx-auto max-w-2xl px-6 py-16 text-sm leading-relaxed text-paper/70">
        <p>
          Cette page sera complétée avec la politique de confidentialité définitive avant la mise
          en production (données collectées : inscription, questionnaire, newsletter ; base de
          données : Supabase ; aucune donnée vendue à des tiers).
        </p>
      </div>
    </>
  );
}
