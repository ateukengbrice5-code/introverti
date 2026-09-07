import Link from "next/link";
import type { Metadata } from "next";
import { signUpAction } from "@/lib/auth/actions";

export const metadata: Metadata = { title: "Inscription" };

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string; from?: string }>;
}) {
  const { error, success, from } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="eyebrow">Inscription</p>
      <h1 className="mt-4 font-display text-3xl">Crée ton espace personnel.</h1>

      {success === "verifie_ton_email" && (
        <p className="mt-4 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
          Compte créé — vérifie ta boîte mail pour confirmer ton adresse. Le lien de confirmation
          t&rsquo;amènera directement là où tu voulais aller.
        </p>
      )}
      {error && (
        <p className="mt-4 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error === "champs_manquants"
            ? "Merci de renseigner un e-mail et un mot de passe."
            : "Inscription impossible — réessaie."}
        </p>
      )}

      <form action={signUpAction} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="from" value={from ?? "/dashboard"} />
        <div>
          <label htmlFor="name" className="text-xs text-paper/50">Prénom</label>
          <input id="name" name="name" type="text" autoComplete="given-name" className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold" />
        </div>
        <div>
          <label htmlFor="email" className="text-xs text-paper/50">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold" />
        </div>
        <div>
          <label htmlFor="password" className="text-xs text-paper/50">Mot de passe</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold" />
        </div>
        <button type="submit" className="mt-2 border border-gold bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-transparent hover:text-gold">
          Créer mon compte
        </button>
      </form>
      <p className="mt-6 text-sm text-paper/50">
        Déjà inscrit·e ?{" "}
        <Link href={`/connexion${from ? `?from=${encodeURIComponent(from)}` : ""}`} className="text-gold hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
