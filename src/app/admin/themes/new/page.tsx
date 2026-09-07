import Link from "next/link";
import type { Metadata } from "next";
import ThemeForm from "../ThemeForm";
import { createTheme } from "../actions";

export const metadata: Metadata = { title: "Admin · Nouveau thème", robots: { index: false, follow: false } };

export default function NewThemePage() {
  return (
    <div>
      <Link href="/admin/themes" className="text-xs text-gold hover:underline">← Thèmes</Link>
      <h1 className="mt-4 font-display text-3xl">Nouveau thème</h1>
      <div className="mt-8 max-w-2xl">
        <ThemeForm action={createTheme} />
      </div>
    </div>
  );
}
