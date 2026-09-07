"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function parseSteps(raw: string) {
  return raw
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...rest] = line.split("|").map((p) => p.trim());
      return { title: title || line, description: rest.join(" | ") || "" };
    });
}

function parseSlugList(raw: string) {
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function journeyFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    audience: String(formData.get("audience") ?? "").trim(),
    duration: String(formData.get("duration") ?? "").trim(),
    objective: String(formData.get("objective") ?? "").trim(),
    steps: parseSteps(String(formData.get("steps") ?? "")),
    resources: parseSlugList(String(formData.get("resources") ?? "")),
  };
}

function revalidate(slug?: string) {
  revalidatePath("/parcours");
  revalidatePath("/admin/parcours");
  if (slug) revalidatePath(`/parcours/${slug}`);
}

export async function createJourney(formData: FormData) {
  const journey = journeyFromForm(formData);
  if (!journey.slug) throw new Error("Le slug est obligatoire.");
  const { error } = await getSupabaseAdmin().from("journeys").insert(journey);
  if (error) throw new Error(error.message);
  revalidate(journey.slug);
  redirect("/admin/parcours");
}

export async function updateJourney(slug: string, formData: FormData) {
  const journey = journeyFromForm(formData);
  const { error } = await getSupabaseAdmin()
    .from("journeys")
    .update({
      title: journey.title,
      audience: journey.audience,
      duration: journey.duration,
      objective: journey.objective,
      steps: journey.steps,
      resources: journey.resources,
    })
    .eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidate(slug);
  redirect("/admin/parcours");
}

export async function deleteJourney(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;
  const { error } = await getSupabaseAdmin().from("journeys").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidate(slug);
  redirect("/admin/parcours");
}
