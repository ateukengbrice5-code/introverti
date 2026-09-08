import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getJourney } from "@/lib/data/journeys";
import JourneyForm from "../../JourneyForm";
import { updateJourney, deleteJourney } from "../../actions";

export const metadata: Metadata = { title: "Admin · Modifier le parcours", robots: { index: false, follow: false } };

export default async function EditJourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = await getJourney(slug);
  if (!journey) notFound();
  const boundUpdate = updateJourney.bind(null, slug);

  return (
    <div>
      <Link href="/admin/parcours" className="text-xs text-gold hover:underline">← Parcours</Link>
      <h1 className="mt-4 font-display text-3xl">Modifier « {journey.title} »</h1>
      <div className="mt-8 max-w-2xl">
        <JourneyForm action={boundUpdate} journey={journey} slugEditable={false} />
      </div>
      <form action={deleteJourney} className="mt-10 border-t border-white/10 pt-6">
        <input type="hidden" name="slug" value={journey.slug} />
        <button type="submit" className="text-sm text-red-400/80 hover:text-red-400">Supprimer définitivement ce parcours</button>
      </form>
    </div>
  );
}
