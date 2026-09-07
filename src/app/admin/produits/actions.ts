"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function productFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    kind: String(formData.get("kind") ?? "livre").trim(),
    description: String(formData.get("description") ?? "").trim(),
    price_eur: Number(formData.get("price_eur") ?? 0),
  };
}

function revalidate() {
  revalidatePath("/bibliotheque");
  revalidatePath("/admin/produits");
}

export async function createProduct(formData: FormData) {
  const product = productFromForm(formData);
  if (!product.slug) throw new Error("Le slug est obligatoire.");
  const { error } = await getSupabaseAdmin().from("products").insert(product);
  if (error) throw new Error(error.message);
  revalidate();
  redirect("/admin/produits");
}

export async function updateProduct(slug: string, formData: FormData) {
  const product = productFromForm(formData);
  const { error } = await getSupabaseAdmin()
    .from("products")
    .update({
      title: product.title,
      kind: product.kind,
      description: product.description,
      price_eur: product.price_eur,
    })
    .eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidate();
  redirect("/admin/produits");
}

export async function deleteProduct(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;
  const { error } = await getSupabaseAdmin().from("products").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidate();
  redirect("/admin/produits");
}
