import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticleAdmin, getCategories } from "@/lib/data/articles";
import ArticleForm from "../../ArticleForm";
import { updateArticle, deleteArticle } from "../../actions";

export const metadata: Metadata = { title: "Admin · Modifier l'article", robots: { index: false, follow: false } };

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, categories] = await Promise.all([getArticleAdmin(slug), getCategories()]);
  if (!article) notFound();

  const boundUpdate = updateArticle.bind(null, slug);

  return (
    <div>
      <Link href="/admin/articles" className="text-xs text-gold hover:underline">← Articles</Link>
      <h1 className="mt-4 font-display text-3xl">Modifier « {article.title} »</h1>
      <div className="mt-8 max-w-2xl">
        <ArticleForm action={boundUpdate} article={article} categories={categories} slugEditable={false} />
      </div>

      <form action={deleteArticle} className="mt-10 border-t border-white/10 pt-6">
        <input type="hidden" name="slug" value={article.slug} />
        <button type="submit" className="text-sm text-red-400/80 hover:text-red-400">
          Supprimer définitivement cet article
        </button>
      </form>
    </div>
  );
}
