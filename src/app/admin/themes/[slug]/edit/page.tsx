import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getTheme } from "@/lib/data/themes";
import ThemeForm from "../../ThemeForm";
import { updateTheme, deleteTheme } from "../../actions";

export const metadata: Metadata = { title: "Admin · Modifier le thème", robots: { index: false, follow: false } };

export default async function EditThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = await getTheme(slug, { includeDrafts: true });
  if (!theme) notFound();
  const boundUpdate = updateTheme.bind(null, slug);

  return (
    <div>
      <Link href="/admin/themes" className="text-xs text-gold hover:underline">← Thèmes</Link>
      <h1 className="mt-4 font-display text-3xl">Modifier « {theme.title} »</h1>
      <div className="mt-8 max-w-2xl">
        <ThemeForm action={boundUpdate} theme={theme} slugEditable={false} />
      </div>
      <form action={deleteTheme} className="mt-10 border-t border-white/10 pt-6">
        <input type="hidden" name="slug" value={theme.slug} />
        <button type="submit" className="text-sm text-red-400/80 hover:text-red-400">Supprimer définitivement ce thème</button>
      </form>
    </div>
  );
}
