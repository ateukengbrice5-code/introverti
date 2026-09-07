"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * admin_users n'a pas de colonne email (seulement user_id, qui référence
 * auth.users) — pour retrouver un compte par email on passe par l'API admin
 * Auth de Supabase (auth.admin.listUsers), pas par une table postgrest.
 * Le site est encore petit : une seule page suffit largement.
 */
async function findUserByEmail(email: string) {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw new Error(error.message);
  const normalized = email.trim().toLowerCase();
  return data.users.find((u) => u.email?.toLowerCase() === normalized) ?? null;
}

export async function addAdminAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    redirect("/admin/admins?error=email_manquant");
  }

  const user = await findUserByEmail(email);
  if (!user) {
    redirect(
      `/admin/admins?error=${encodeURIComponent(
        "Aucun compte avec cet e-mail. La personne doit d'abord s'inscrire sur le site."
      )}`
    );
  }

  const admin = getSupabaseAdmin();
  const { error } = await admin
    .from("admin_users")
    .insert({ user_id: user.id })
    .select()
    .single();

  if (error) {
    // Déjà admin (conflit sur la clé primaire user_id) — pas une vraie erreur pour l'utilisateur.
    if (error.code === "23505") {
      redirect("/admin/admins?error=Ce compte est déjà admin.");
    }
    redirect(`/admin/admins?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/admins");
  redirect("/admin/admins?success=ajoute");
}

export async function removeAdminAction(formData: FormData) {
  const userId = String(formData.get("user_id") ?? "");
  if (!userId) return;

  const admin = getSupabaseAdmin();

  // Filet de sécurité : ne jamais retirer le dernier admin restant, ça
  // fermerait /admin à tout le monde sans moyen simple de revenir en arrière.
  const { count } = await admin
    .from("admin_users")
    .select("user_id", { count: "exact", head: true });

  if ((count ?? 0) <= 1) {
    redirect(
      `/admin/admins?error=${encodeURIComponent(
        "Impossible de retirer le dernier admin restant."
      )}`
    );
  }

  const { error } = await admin.from("admin_users").delete().eq("user_id", userId);
  if (error) {
    redirect(`/admin/admins?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/admins");
  redirect("/admin/admins?success=retire");
}
