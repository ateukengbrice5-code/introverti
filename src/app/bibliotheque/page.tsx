import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { getProducts } from "@/lib/data/library";

export const metadata: Metadata = {
  title: "Bibliothèque",
  description: "Livres, ebooks, carnets et programmes du projet.",
};

export default async function BibliothequePage() {
  const products = await getProducts();
  return (
    <>
      <PageIntro
        eyebrow="Bibliothèque"
        title="Livres, carnets et programmes."
        lead="Le paiement n'est pas encore branché en V1 — l'architecture est prête pour le connecter."
      />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.slug} className="flex flex-col border border-white/10 p-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-gold">{p.kind}</p>
              <p className="mt-3 font-display text-xl">{p.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/60">{p.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-lg">{p.price_eur} €</span>
                <button
                  type="button"
                  className="border border-gold px-4 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-ink"
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
