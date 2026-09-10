import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getResourceAdmin } from "@/lib/data/library";
import ResourceForm from "../../ResourceForm";
import { updateResource, deleteResource } from "../../actions";

export const metadata: Metadata = { title: "Admin · Modifier la ressource", robots: { index: false, follow: false } };

export default async function EditResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = await getResourceAdmin(slug);
  if (!resource) notFound();
  const boundUpdate = updateResource.bind(null, slug);

  return (
    <div>
      <Link href="/admin/ressources" className="text-xs text-gold hover:underline">← Ressources</Link>
      <h1 className="mt-4 font-display text-3xl">Modifier « {resource.title} »</h1>
      <div className="mt-8 max-w-xl">
        <ResourceForm action={boundUpdate} resource={resource} slugEditable={false} />
      </div>
      <form action={deleteResource} className="mt-10 border-t border-white/10 pt-6">
        <input type="hidden" name="slug" value={resource.slug} />
        <button type="submit" className="text-sm text-red-400/80 hover:text-red-400">Supprimer définitivement cette ressource</button>
      </form>
    </div>
  );
}
