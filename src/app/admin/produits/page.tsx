import Link from "next/link";
import type { Metadata } from "next";
import { getProducts } from "@/lib/data/library";
import { deleteProduct } from "./actions";

export const metadata: Metadata = { title: "Admin · Produits", robots: { index: false, follow: false } };

export default async function AdminProductsPage() {
  const products = await getProducts();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Bibliothèque</p>
          <h1 className="mt-2 font-display text-3xl">Produits</h1>
        </div>
        <Link href="/admin/produits/new" className="border border-gold px-4 py-2 text-sm text-gold hover:bg-gold hover:text-ink">
          + Nouveau produit
        </Link>
      </div>
      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {products.map((p) => (
          <li key={p.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg">{p.title}</p>
              <p className="text-xs text-paper/40">{p.kind} · {p.price_eur} € · /{p.slug}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/produits/${p.slug}/edit`} className="text-xs text-gold hover:underline">Modifier</Link>
              <form action={deleteProduct}>
                <input type="hidden" name="slug" value={p.slug} />
                <button type="submit" className="text-xs text-red-400/80 hover:text-red-400">Supprimer</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}