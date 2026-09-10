import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/data/articles";

/**
 * Image de partage générée à la volée (convention Next.js opengraph-image).
 * Si l'article a une image de couverture (Supabase Storage), on l'affiche en
 * fond avec un dégradé + le titre par-dessus, pour que les liens partagés
 * (WhatsApp, Facebook, X, iMessage...) montrent la vraie photo. Sans image,
 * on retombe sur la carte texte de marque (--ink, --gold, --paper).
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (article?.cover_image_url) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            backgroundColor: "#0b0b0c",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- généré via @vercel/og (satori), next/image non supporté ici */}
          <img
            src={article.cover_image_url}
            alt=""
            width={size.width}
            height={size.height}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "64px 72px",
              background: "linear-gradient(180deg, rgba(11,11,12,0) 30%, rgba(11,11,12,0.92) 100%)",
              color: "#f6f3ec",
              fontFamily: "sans-serif",
            }}
          >
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#b08d57", textTransform: "uppercase" }}>
              Ateb&apos;s Inspire — L&apos;introverti
            </div>
            <div style={{ display: "flex", fontSize: 48, lineHeight: 1.2, maxWidth: 1050, marginTop: 16 }}>
              {article.title}
            </div>
          </div>
        </div>
      ),
      { ...size },
    );
  }

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
