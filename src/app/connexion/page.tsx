import Link from "next/link";
import type { Metadata } from "next";
import { signInAction } from "@/lib/auth/actions";

export const metadata: Metadata = { title: "Connexion" };

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="eyebrow">Connexion</p>
      <h1 className="mt-4 font-display text-3xl">Retrouve ton espace.</h1>
      {error && (
        <p className="mt-4 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error === "champs_manquants"
            ? "Merci de renseigner ton e-mail et ton mot de passe."
            : error === "lien_invalide"
            ? "Ce lien de confirmation n'est plus valide — connecte-toi directement."
            : "Connexion impossible — vérifie tes identifiants."}
        </p>
      )}
      <form action={signInAction} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="from" value={from ?? "/dashboard"} />
        <div>
          <label htmlFor="email" className="text-xs text-paper/50">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold" />
        </div>
        <div>
          <label htmlFor="password" className="text-xs text-paper/50">Mot de passe</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold" />
        </div>
        <button type="submit" className="mt-2 border border-gold bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-transparent hover:text-gold">
          Se connecter
        </button>
      </form>
      <p className="mt-6 text-sm text-paper/50">
        Pas encore de compte ?{" "}
        <Link href={`/inscription${from ? `?from=${encodeURIComponent(from)}` : ""}`} className="text-gold hover:underline">
          S&rsquo;inscrire
        </Link>
      </p>
    </div>
  );
}
