import Link from "next/link";
import { signOutAction } from "@/lib/auth/actions";

const nav = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/parcours", label: "Parcours" },
  { href: "/admin/themes", label: "Thèmes" },
  { href: "/admin/ressources", label: "Ressources" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/admins", label: "Admins" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
      <aside className="w-48 shrink-0">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-gold">Admin</p>
        <nav className="mt-4 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-2 py-1.5 text-sm text-paper/70 hover:bg-white/5 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={signOutAction} className="mt-8">
          <button type="submit" className="text-xs text-paper/40 hover:text-gold">
            Se déconnecter
          </button>
        </form>
        <Link href="/" className="mt-3 block text-xs text-paper/40 hover:text-gold">
          ← Retour au site
        </Link>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
