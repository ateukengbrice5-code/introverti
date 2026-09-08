import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { interpretBehavioralProfile } from "@/lib/profile/interpret";
import ResultSharing from "@/components/ResultSharing";

export const metadata: Metadata = {
  title: "Ton profil",
  robots: { index: false, follow: true },
};

export default async function ResultatPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?from=/se-decouvrir/resultat");
  }

  const { data: profile } = await supabase
    .from("behavioral_profile")
    .select(
      "introversion_level, stimulation_sociale, introspection, expression, organisation, adaptation, decision, profondeur_relationnelle, version"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="eyebrow">Ton profil</p>
        <h1 className="mt-4 font-display text-3xl">Tu n&rsquo;as pas encore de résultat.</h1>
        <p className="mt-4 text-sm text-paper/60">
          Passe le questionnaire de fonctionnement pour découvrir ta première lecture.
        </p>
        <Link
          href="/se-decouvrir/test"
          className="mt-6 inline-block border border-gold px-5 py-2.5 text-sm text-gold hover:bg-gold hover:text-ink"
        >
          Commencer le questionnaire
        </Link>
      </div>
    );
  }

  const result = interpretBehavioralProfile(profile);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Ton profil</p>
      <h1 className="mt-4 font-display text-4xl">{result.titre}</h1>
      <p className="mt-5 text-lg leading-relaxed text-paper/75">{result.description}</p>

      <p className="mt-8 max-w-xl text-xs text-paper/40">
        Cette lecture est construite à partir de tes réponses, pas un diagnostic psychologique.
        Elle sert de point de départ, pas de verdict définitif — tu peux la revoir à tout moment.
      </p>

      {result.caracteristiques.length > 0 && (
        <div className="mt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">Ce qui te caractérise</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-paper/80">
            {result.caracteristiques.map((c) => (
              <li key={c}>— {c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-gold">Forces potentielles</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-paper/80">
            {result.forces.map((s) => (
              <li key={s}>— {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">Points de vigilance</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-paper/80">
            {result.vigilance.length > 0 ? (
              result.vigilance.map((s) => <li key={s}>— {s}</li>)
            ) : (
              <li>Rien de particulier ne ressort de ce côté pour l&rsquo;instant.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">Fonctionnement social</p>
          <p className="mt-2 text-sm leading-relaxed text-paper/80">{result.fonctionnementSocial}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">Communication</p>
          <p className="mt-2 text-sm leading-relaxed text-paper/80">{result.communication}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">Travail &amp; environnement</p>
          <p className="mt-2 text-sm leading-relaxed text-paper/80">{result.travail}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">Relations</p>
          <p className="mt-2 text-sm leading-relaxed text-paper/80">{result.relations}</p>
        </div>
      </div>

      <div className="mt-10 border border-white/10 p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-paper/40">Rapport à la solitude</p>
        <p className="mt-2 text-sm leading-relaxed text-paper/80">{result.solitude}</p>
      </div>

      <div className="mt-10 border border-white/10 p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-gold">Conseils d&rsquo;évolution</p>
        {result.conseils.map((a) => (
          <p key={a} className="mt-2 text-sm leading-relaxed text-paper/80">
            {a}
          </p>
        ))}
      </div>

      <ResultSharing titre={result.titre} />

      <div className="mt-8">
        <Link href="/se-decouvrir/test" className="text-sm text-paper/60 hover:text-gold">
          Refaire le questionnaire →
        </Link>
      </div>
    </div>
  );
}
