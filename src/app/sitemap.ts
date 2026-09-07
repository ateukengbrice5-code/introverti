import type { MetadataRoute } from "next";
import { getThemes } from "@/lib/data/themes";
import { getArticles } from "@/lib/data/articles";
import { getJourneys } from "@/lib/data/journeys";

const base = "https://ateukengbrice-introverti.example";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [themes, articles, journeys] = await Promise.all([getThemes(), getArticles(), getJourneys()]);

  const staticRoutes = [
    "",
    "/comprendre",
    "/se-decouvrir",
    "/se-decouvrir/test",
    "/parcours",
    "/reflexions",
    "/ressources",
    "/bibliotheque",
    "/communaute",
    "/a-propos",
    "/contact",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  const themeRoutes = themes.map((t) => ({ url: `${base}/comprendre/${t.slug}`, lastModified: new Date() }));
  const articleRoutes = articles.map((a) => ({ url: `${base}/reflexions/${a.slug}`, lastModified: a.published_at }));
  const journeyRoutes = journeys.map((j) => ({ url: `${base}/parcours/${j.slug}`, lastModified: new Date() }));

  return [...staticRoutes, ...themeRoutes, ...articleRoutes, ...journeyRoutes];
}
