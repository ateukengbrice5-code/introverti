import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Accès refusé", robots: { index: false, follow: false } };

export default function AccesRefusePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-16 text-center">
      <p className="eyebrow">Administration</p>
      <h1 className="mt-4 font-display text-2xl">Ce compte n&rsquo;a pas accès à l&rsquo;admin.</h1>
      <p className="mt-2 text-sm text-paper/55">
        Tu es connecté, mais ton compte n&rsquo;est pas habilité pour l&rsquo;espace admin.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 border border-gold bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-transparent hover:text-gold"
      >
        Retour à mon espace
      </Link>
    </div>
  );
}
