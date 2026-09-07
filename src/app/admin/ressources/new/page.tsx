import Link from "next/link";
import type { Metadata } from "next";
import ResourceForm from "../ResourceForm";
import { createResource } from "../actions";

export const metadata: Metadata = { title: "Admin · Nouvelle ressource", robots: { index: false, follow: false } };

export default function NewResourcePage() {
  return (
    <div>
      <Link href="/admin/ressources" className="text-xs text-gold hover:underline">← Ressources</Link>
      <h1 className="mt-4 font-display text-3xl">Nouvelle ressource</h1>
      <div className="mt-8 max-w-xl">
        <ResourceForm action={createResource} />
      </div>
    </div>
  );
}
