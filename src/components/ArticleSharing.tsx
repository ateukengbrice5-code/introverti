"use client";

import { useState } from "react";

/**
 * Remplace l'ancien bouton "Partager cet article", qui n'avait aucun
 * comportement (pas de onClick). Deux blocs :
 * - Partage : Web Share API native si disponible (mobile surtout), sinon
 *   liens directs vers les réseaux + copie du lien.
 * - Citation suggérée : rend l'attribution correcte plus facile que de ne
 *   pas la mettre pour quiconque copie le texte ailleurs — rien ne peut
 *   empêcher la copie elle-même, seulement en réduire la friction pour bien
 *   faire (voir DECISION-LOG.md, 06/09/2026).
 */
export default function ArticleSharing({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState<"link" | "citation" | null>(null);

  const url = typeof window !== "undefined" ? window.location.href : `/reflexions/${slug}`;
  const citation = `« ${title} », initialement publié sur Ateb's Inspire — ${url}`;

  const copy = async (text: string, which: "link" | "citation") => {
    await navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // annulé par la personne — rien à faire
      }
    } else {
      copy(url, "link");
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8">
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-paper/40">Partager</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={share}
            className="border border-white/15 px-5 py-2.5 text-sm text-paper/70 hover:border-gold hover:text-gold"
          >
            Partager cet article
          </button>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-paper/50 hover:text-gold"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-paper/50 hover:text-gold"
          >
            X
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-paper/50 hover:text-gold"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-paper/50 hover:text-gold"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={() => copy(url, "link")}
            className="text-sm text-paper/50 hover:text-gold"
          >
            {copied === "link" ? "Lien copié ✓" : "Copier le lien"}
          </button>
        </div>
      </div>

      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-paper/40">Citer cet article</p>
        <div className="mt-3 flex flex-col gap-3 border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm italic text-paper/60">{citation}</p>
          <button
            type="button"
            onClick={() => copy(citation, "citation")}
            className="shrink-0 self-start border border-white/15 px-4 py-2 text-xs text-paper/70 hover:border-gold hover:text-gold sm:self-auto"
          >
            {copied === "citation" ? "Copié ✓" : "Copier la citation"}
          </button>
        </div>
      </div>
    </div>
  );
}
