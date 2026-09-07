import Link from "next/link";
import type { Metadata } from "next";
import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export const metadata: Metadata = { title: "Admin · Nouveau produit", robots: { index: false, follow: false } };

export default function NewProductPage() {
  return (
    <div>
      <Link href="/admin/produits" className="text-xs text-gold hover:underline">← Produits</Link>
      <h1 className="mt-4 font-display text-3xl">Nouveau produit</h1>
      <div className="mt-8 max-w-xl">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
