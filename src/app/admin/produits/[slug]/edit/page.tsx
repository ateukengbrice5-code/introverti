import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProducts } from "@/lib/data/library";
import ProductForm from "../../ProductForm";
import { updateProduct, deleteProduct } from "../../actions";

export const metadata: Metadata = { title: "Admin · Modifier le produit", robots: { index: false, follow: false } };

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const boundUpdate = updateProduct.bind(null, slug);

  return (
    <div>
      <Link href="/admin/produits" className="text-xs text-gold hover:underline">← Produits</Link>
      <h1 className="mt-4 font-display text-3xl">Modifier « {product.title} »</h1>
      <div className="mt-8 max-w-xl">
        <ProductForm action={boundUpdate} product={product} slugEditable={false} />
      </div>
      <form action={deleteProduct} className="mt-10 border-t border-white/10 pt-6">
        <input type="hidden" name="slug" value={product.slug} />
        <button type="submit" className="text-sm text-red-400/80 hover:text-red-400">Supprimer définitivement ce produit</button>
      </form>
    </div>
  );
}
