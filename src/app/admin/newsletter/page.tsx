import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Admin · Newsletter", robots: { index: false, follow: false } };

export default async function AdminNewsletterPage() {
  const { data, error } = await getSupabaseAdmin()
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  const subscribers = error ? [] : data;

  return (
    <div>
      <p className="eyebrow">Newsletter</p>
      <h1 className="mt-2 font-display text-3xl">Inscrits ({subscribers.length})</h1>
      <p className="mt-2 text-sm text-paper/55">Lecture seule ici — l&rsquo;envoi se fait via ton fournisseur d&rsquo;e-mailing une fois branché.</p>

      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {subscribers.map((s) => (
          <li key={s.id} className="flex items-center justify-between py-3 text-sm">
            <span>{s.email}</span>
            <span className="text-xs text-paper/40">
              {new Date(s.subscribed_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </li>
        ))}
        {subscribers.length === 0 && <p className="py-8 text-sm text-paper/50">Aucun inscrit pour l&rsquo;instant.</p>}
      </ul>
    </div>
  );
}
