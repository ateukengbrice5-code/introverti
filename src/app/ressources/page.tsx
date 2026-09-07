import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getResources } from "@/lib/data/library";
import { getEmbedUrl } from "@/lib/video";

export const metadata: Metadata = {
  title: "Ressources",
  description: "Fiches pratiques, exercices et audios pour avancer à ton rythme.",
};

const typeLabels: Record<string, string> = {
  ebook: "Ebook",
  fiche: "Fiche pratique",
  exercice: "Exercice",
  audio: "Audio",
  video: "Vidéo",
};

export default async function RessourcesPage() {
  const resources = await getResources();
  return (
    <>
      <PageIntro
        eyebrow="Ressources"
        title="Une bibliothèque d'outils concrets."
        lead="Des formats courts, pensés pour être utilisés, pas seulement lus."
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {resources.map((r) => {
            const embedUrl = r.type === "video" ? getEmbedUrl(r.video_url) : null;
            return (
              <li key={r.slug} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-gold">{typeLabels[r.type]}</p>
                  <p className="mt-2 font-display text-xl">{r.title}</p>
                  <p className="mt-1 max-w-xl text-sm text-paper/60">{r.description}</p>
                  {embedUrl && (
                    <div className="mt-4 aspect-video w-full max-w-xl overflow-hidden rounded border border-white/10">
                      <iframe
                        src={embedUrl}
                        title={r.title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
                <span className="whitespace-nowrap text-xs text-paper/40 sm:pt-6">{r.format_note}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
