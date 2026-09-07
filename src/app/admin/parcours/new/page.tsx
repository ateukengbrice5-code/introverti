import Link from "next/link";
import type { Metadata } from "next";
import JourneyForm from "../JourneyForm";
import { createJourney } from "../actions";

export const metadata: Metadata = { title: "Admin · Nouveau parcours", robots: { index: false, follow: false } };

export default function NewJourneyPage() {
  return (
    <div>
      <Link href="/admin/parcours" className="text-xs text-gold hover:underline">← Parcours</Link>
      <h1 className="mt-4 font-display text-3xl">Nouveau parcours</h1>
      <div className="mt-8 max-w-2xl">
        <JourneyForm action={createJourney} />
      </div>
    </div>
  );
}
