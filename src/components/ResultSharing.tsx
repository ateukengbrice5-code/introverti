"use client";

import { useState } from "react";

/**
 * Partage du résultat de test — sur le même principe qu'ArticleSharing, mais
 * volontairement différent sur un point : on ne partage jamais l'URL privée
 * du résultat (/se-decouvrir/resultat exige d'être connecté et n'affiche que
 * le profil du compte courant — la partager telle quelle enverrait la
 * personne qui clique sur une redirection de connexion, ou pire, sur SON
 * PROPRE résultat si elle est déjà connectée, jamais sur celui de
 * l'expéditeur). On partage donc un texte (titre + invitation à faire le
 * test), avec un lien vers le questionnaire public — jamais les dimensions
 * détaillées, cohérent avec le principe du site : le résultat n'est pas une
 * étiquette à exhiber, juste un point de départ personnel.
 */
export default function ResultSharing({ titre }: { titre: string }) {
  const [copied, setCopied] = useState(false);

  const testUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/se-decouvrir/test`
      : "/se-decouvrir/test";
  const text = `Mon profil sur Ateb's Inspire : « ${titre} ». Découvre le tien :`;

  const copy = async () => {
    await navigator.clipboard.writeText(`${text} ${testUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Mon profil Ateb's Inspire", text, url: testUrl });
      } catch {
        // annulé par la personne — rien à faire
      }
    } else {
      copy();
    }
  };

  const encodedUrl = encodeURIComponent(testUrl);
  const encodedText = encodeURIComponent(text);

  return (
    <div className="mt-14 border-t border-white/10 pt-8">
      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-paper/40">
        Partager mon profil
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={share}
          className="border border-gold/60 px-5 py-2.5 text-sm text-gold hover:bg-gold hover:text-ink"
        >
          Partager
        </button>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-paper/50 hover:text-gold"
        >
          Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-paper/50 hover:text-gold"
        >
          X
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-paper/50 hover:text-gold"
        >
          WhatsApp
        </a>
        <button type="button" onClick={copy} className="text-sm text-paper/50 hover:text-gold">
          {copied ? "Copié ✓" : "Copier le texte"}
        </button>
      </div>
    </div>
  );
}
