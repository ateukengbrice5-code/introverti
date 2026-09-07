import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/data/articles";
import ArticleForm from "../ArticleForm";
import { createArticle } from "../actions";

export const metadata: Metadata = { title: "Admin · Nouvel article", robots: { index: false, follow: false } };

export default async function NewArticlePage() {
  const categories = await getCategories();
  return (
    <div>
      <Link href="/admin/articles" className="text-xs text-gold hover:underline">← Articles</Link>
      <h1 className="mt-4 font-display text-3xl">Nouvel article</h1>
      <div className="mt-8 max-w-2xl">
        <ArticleForm action={createArticle} categories={categories} />
      </div>
    </div>
  );
}
