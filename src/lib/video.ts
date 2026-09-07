/**
 * Convertit un lien YouTube/Vimeo "normal" (celui qu'on copie dans la barre
 * d'adresse ou le bouton Partager) en URL embarquable dans une <iframe>.
 * Retourne null si le lien n'est reconnu ni comme YouTube ni comme Vimeo —
 * dans ce cas, on n'affiche pas de lecteur plutôt que d'embarquer n'importe
 * quoi.
 */
export function getEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    const u = new URL(url);

    // youtube.com/watch?v=XXXX / youtube.com/shorts/XXXX
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v") ?? u.pathname.split("/shorts/")[1];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // youtu.be/XXXX
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // vimeo.com/XXXX
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }

    return null;
  } catch {
    return null;
  }
}
