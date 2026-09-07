import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/data/articles";

/**
 * Image de partage générée à la volée (convention Next.js opengraph-image) —
 * pas de fichier image à héberger, cohérent avec la contrainte déjà posée
 * sur Article.cover_note ("pas d'asset binaire en V1"). Reprend les couleurs
 * de marque du site (--ink, --gold, --paper — voir globals.css).
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0b0b0c",
          color: "#f6f3ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#b08d57", textTransform: "uppercase" }}>
          Ateb&apos;s Inspire — L&apos;introverti
        </div>
        <div style={{ display: "flex", fontSize: 56, lineHeight: 1.2, maxWidth: 1000 }}>
          {article?.title ?? "Ateb's Inspire"}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#f6f3ec99" }}>
          {article?.subtitle ?? "L'identité avant les objectifs."}
        </div>
      </div>
    ),
    { ...size },
  );
}
