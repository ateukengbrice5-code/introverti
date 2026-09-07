import Link from "next/link";

const columns = [
  { title: "Explorer", links: [["/se-decouvrir/test", "ATEB’S ID"], ["/reflexions", "Articles"], ["/bibliotheque", "Livres"], ["/parcours", "Expériences"]] },
  { title: "L’écosystème", links: [["/parcours", "ATEB’S Evolution"], ["/communaute", "ATEB’S Connect"], ["/ressources", "ATEB’S Finance"], ["/ressources", "ATEB’S Business"]] },
  { title: "Nous retrouver", links: [["#", "Instagram"], ["#", "Facebook"], ["#", "TikTok"], ["#", "YouTube"], ["#", "LinkedIn"]] },
];
export default function Footer() { return <footer className="border-t border-line"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20"><div className="grid gap-14 lg:grid-cols-[1.5fr_2fr]"><div><Link href="/" className="font-display text-3xl">ATEB’S INSPIRE</Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">L’identité avant les objectifs.</p></div><div className="grid gap-10 sm:grid-cols-3">{columns.map((column) => <div key={column.title}><p className="eyebrow text-paper/45">{column.title}</p><ul className="mt-5 flex flex-col gap-3">{column.links.map(([href, label]) => <li key={label}><Link href={href} className="text-sm text-paper/65 transition-colors hover:text-gold">{label}</Link></li>)}</ul></div>)}</div></div><div className="mt-20 flex flex-col gap-3 border-t border-line pt-5 text-[.68rem] text-paper/35 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} ATEB’S INSPIRE</span><span>L’identité avant les objectifs.</span></div></div></footer>; }
