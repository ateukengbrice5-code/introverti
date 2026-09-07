"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function resourceFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    type: String(formData.get("type") ?? "fiche").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    format_note: String(formData.get("format_note") ?? "").trim(),
    video_url: String(formData.get("video_url") ?? "").trim() || null,
  };
}

function revalidate() {
  revalidatePath("/ressources");
  revalidatePath("/admin/ressources");
}

export async function createResource(formData: FormData) {
  const resource = resourceFromForm(formData);
  if (!resource.slug) throw new Error("Le slug est obligatoire.");
  const { error } = await getSupabaseAdmin().from("resources").insert(resource);
  if (error) throw new Error(error.message);
  revalidate();
  redirect("/admin/ressources");
}

export async function updateResource(slug: string, formData: FormData) {
  const resource = resourceFromForm(formData);
  const { error } = await getSupabaseAdmin()
    .from("resources")
    .update({
      type: resource.type,
      title: resource.title,
      description: resource.description,
      format_note: resource.format_note,
      video_url: resource.video_url,
    })
    .eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidate();
  redirect("/admin/ressources");
}

export async function deleteResource(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;
  const { error } = await getSupabaseAdmin().from("resources").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidate();
  redirect("/admin/ressources");
}
