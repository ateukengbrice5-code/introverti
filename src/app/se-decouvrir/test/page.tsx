import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import TestClient from "./TestClient";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Le questionnaire de fonctionnement",
  description: "40 questions pour dégager une première lecture de ton fonctionnement personnel.",
};

export default async function TestPage() {
  // Le résultat est lié au profil comportemental du compte (voir behavioral_profile),
  // donc le test nécessite d'être connecté — pas de passage anonyme.
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?from=/se-decouvrir/test");
  }

  return (
    <>
      <PageIntro
        eyebrow="Se découvrir · Le questionnaire"
        title="40 questions, aucune bonne réponse."
        lead="Réponds spontanément. Ce questionnaire dégage une lecture nuancée de ton fonctionnement — pas un diagnostic psychologique."
      />
      <div className="mx-auto max-w-2xl px-6 py-16">
        <TestClient />
      </div>
    </>
  );
}
