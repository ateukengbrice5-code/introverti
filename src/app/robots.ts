import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard", "/se-decouvrir/resultat", "/admin"] }],
    sitemap: "https://ateukengbrice-introverti.example/sitemap.xml",
  };
}
