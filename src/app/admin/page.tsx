import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { addAdminAction, removeAdminAction } from "./actions";

export const metadata: Metadata = { title: "Admin · Admins", robots: { index: false, follow: false } };

async function getAdmins() {
  const admin = getSupabaseAdmin();

  const { data: rows, error } = await admin
    .from("admin_users")
    .select("user_id, granted_at")
    .order("granted_at", { ascending: true });
  if (error) throw new Error(error.message);

  // admin_users n'a pas d'email — on le récupère via l'API admin Auth et on
  // recoupe par id. Le site est petit, une seule page (1000) suffit largement.
  const { data: usersList, error: usersError } = await admin.auth.admin.listUsers({
    perPage: 1000,
  });
  if (usersError) throw new Error(usersError.message);

  return (rows ?? []).map((row) => ({
    user_id: row.user_id,
    granted_at: row.granted_at as string,
    email: usersList.users.find((u) => u.id === row.user_id)?.email ?? "(compte introuvable)",
  }));
}

export default async function AdminAdminsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;
  const admins = await getAdmins();

  return (
    <div>
      <div>
        <p className="eyebrow">Administration</p>
        <h1 className="mt-2 font-display text-3xl">Admins</h1>
        <p className="mt-2 text-sm text-paper/55">
          Comptes habilités à accéder à cet espace. Ajouter quelqu&rsquo;un nécessite qu&rsquo;il ait
          déjà un compte sur le site.
        </p>
      </div>

      {error && (
        <p className="mt-6 border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}
      {success === "ajoute" && (
        <p className="mt-6 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
          Compte ajouté aux admins.
        </p>
      )}
      {success === "retire" && (
        <p className="mt-6 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
          Compte retiré des admins.
        </p>
      )}

      <form action={addAdminAction} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="email" className="text-xs text-paper/50">
            E-mail du compte à ajouter
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="personne@exemple.com"
            className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold"
          />
        </div>
        <button
          type="submit"
          className="border border-gold bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-transparent hover:text-gold"
        >
          Ajouter
        </button>
      </form>

      <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {admins.map((a) => (
          <li
            key={a.user_id}
            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-display text-lg">{a.email}</p>
              <p className="text-xs text-paper/40">
                Admin depuis le {new Date(a.granted_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <form action={removeAdminAction}>
              <input type="hidden" name="user_id" value={a.user_id} />
              <button type="submit" className="text-xs text-red-400/80 hover:text-red-400">
                Retirer
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
