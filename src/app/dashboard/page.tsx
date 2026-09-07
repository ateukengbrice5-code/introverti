import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/auth/actions";

export const metadata: Metadata = { title: "Ton espace", robots: { index: false, follow: false } };

const cards = [
  { title: "Ton profil", desc: "Résultat de ton dernier questionnaire de découverte.", href: "/se-decouvrir/resultat" },
  { title: "Tes parcours", desc: "Progression sur les parcours commencés.", href: "/parcours" },
  { title: "Articles sauvegardés", desc: "Tes favoris dans Réflexions.", href: "/reflexions" },
  { title: "Tes ressources", desc: "Fiches et exercices enregistrés.", href: "/ressources" },
];

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { data: profile } = await supabase
    .from("core_profile")
    .select("first_name")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: behavioral } = await supabase
    .from("behavioral_profile")
    .select("introversion_level")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <>
      <PageIntro
        eyebrow="Espace personnel"
        title={profile?.first_name ? `Bonjour, ${profile.first_name}.` : "Ton espace."}
        lead={
          behavioral
            ? "Voici un aperçu de ton fonctionnement et de ce que tu peux explorer ensuite."
            : "Tu n'as pas encore passé le questionnaire de découverte — c'est la première étape pour personnaliser ton espace."
        }
      />
      <div className="mx-auto max-w-5xl px-6 py-16">
        {!behavioral && (
          <Link
            href="/se-decouvrir/test"
            className="mb-8 block border border-gold bg-gold/10 px-6 py-4 text-sm text-gold hover:bg-gold/20"
          >
            Passer le questionnaire de découverte →
          </Link>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((c) => (
            <Link key={c.title} href={c.href} className="group border border-white/10 p-6 hover:border-gold">
              <p className="font-display text-xl group-hover:text-gold">{c.title}</p>
              <p className="mt-2 text-sm text-paper/60">{c.desc}</p>
            </Link>
          ))}
        </div>
        <form action={signOutAction} className="mt-10">
          <button type="submit" className="text-sm text-paper/50 hover:text-gold hover:underline">
            Se déconnecter
          </button>
        </form>
      </div>
    </>
  );
}
