import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, MoveRight } from "lucide-react";
import Newsletter from "@/components/Newsletter";
import { getArticles } from "@/lib/data/articles";

const journey = [
  ["01", "Comprendre", "Découvrir ta personnalité, tes mécanismes et tes forces."],
  ["02", "S’accepter", "Arrêter de considérer tes différences comme des défauts."],
  ["03", "Se construire", "Développer confiance, communication et identité."],
  ["04", "Évoluer", "Transformer la compréhension de soi en habitudes et actions."],
  ["05", "Se connecter", "Créer des relations cohérentes avec ta personnalité."],
  ["06", "Réaliser", "Transformer ton potentiel en projets et résultats."],
];

const universes = [
  ["01", "ATEB’S INSPIRE", "Réflexions, articles, livres, formations et contenus.", "/reflexions"],
  ["02", "ATEB’S ID", "Comprendre ton profil et ta personnalité.", "/se-decouvrir/test"],
  ["03", "ATEB’S EVOLUTION", "Objectifs, habitudes, progression et accompagnement.", "/parcours"],
  ["04", "ATEB’S CONNECT", "Relations et rencontres pensées différemment.", "/communaute"],
  ["05", "ATEB’S FINANCE", "Comprendre, organiser et faire évoluer tes finances.", "/ressources"],
  ["06", "ATEB’S BUSINESS", "Outils et solutions pour tes projets et entreprises.", "/ressources"],
];

const books = [
  ["01", "L’identité avant les objectifs", "Un manifeste pour avancer sans devenir quelqu’un d’autre."],
  ["02", "Le calme comme force", "Comprendre ce que ton monde intérieur rend possible."],
];

export default async function Home() {
  const articles = await getArticles().catch(() => []);
  return (
    <main className="overflow-hidden">
      <section className="hero-shell border-b border-line">
        <div className="mx-auto flex min-h-[calc(100vh-5.5rem)] max-w-7xl flex-col justify-between px-6 py-10 lg:px-10 lg:py-14">
          <div className="flex items-center justify-between text-[.62rem] uppercase tracking-[.22em] text-paper/35"><span>Journal d’une identité</span><span className="hidden sm:inline">Paris · 2026</span></div>
          <div className="py-24 lg:py-32"><p className="eyebrow">ATEB’S INSPIRE <span className="text-paper/25">/ 001</span></p><h1 className="hero-title mt-8 max-w-6xl font-display">L’identité <em>avant</em><br />les objectifs.</h1><div className="mt-12 grid gap-10 border-t border-line pt-7 md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-md text-lg leading-relaxed text-paper/65">Comprends qui tu es.<br className="hidden sm:block" /> Construis qui tu veux devenir.</p><div className="flex flex-col gap-3 sm:flex-row"><Link href="/se-decouvrir/test" className="button-primary">Découvrir mon profil <ArrowUpRight aria-hidden="true" /></Link><Link href="#univers" className="button-quiet">Explorer l’univers <ArrowDownRight aria-hidden="true" /></Link></div></div></div>
          <div className="flex items-center gap-3 font-mono text-[.62rem] uppercase tracking-[.2em] text-paper/35"><span className="h-px w-10 bg-gold/70" /> Un espace pour celles et ceux qui pensent profondément.</div>
        </div>
      </section>

      <section className="border-b border-line bg-iron/25"><div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[.7fr_1.3fr] lg:px-10 lg:py-32"><div><p className="eyebrow">01 / Déconstruire</p><h2 className="section-title mt-5">Et si tu n’étais pas timide&nbsp;?</h2></div><div><p className="max-w-2xl text-2xl leading-snug text-paper/85 md:text-3xl">Certaines personnes ont simplement une autre manière de réfléchir, de communiquer, de créer des relations, de prendre des décisions et de récupérer leur énergie.</p><div className="mt-14 grid border-t border-line sm:grid-cols-2">{["Introversion ≠ timidité", "Introversion ≠ manque de confiance", "Introversion ≠ faiblesse", "Introversion ≠ antisocialité"].map((item, index) => <div key={item} className="flex items-start gap-5 border-b border-line py-5 text-sm text-paper/65 sm:even:pl-8"><span className="font-mono text-[.62rem] text-gold/70">0{index + 1}</span><span>{item}</span></div>)}</div></div></div></section>

      <section className="border-b border-line"><div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div className="max-w-2xl"><p className="eyebrow">02 / Le parcours</p><h2 className="section-title mt-5">Je me comprends.<br />Je m’accepte.<br />Je me construis.</h2></div><p className="max-w-xs text-sm leading-relaxed text-paper/50">Une progression en six mouvements, de l’introspection à la réalisation.</p></div><div className="mt-16 grid border-t border-line md:grid-cols-2 lg:grid-cols-3">{journey.map(([number, title, copy]) => <div key={number} className="journey-card group border-b border-line py-8 md:pr-8 lg:nth-[3n+2]:border-l lg:nth-[3n+2]:pl-8 lg:nth-[3n+3]:border-l lg:nth-[3n+3]:pl-8"><span className="font-mono text-xs text-gold">{number}</span><h3 className="mt-10 font-display text-3xl group-hover:text-gold">{title}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/55">{copy}</p><MoveRight className="mt-8 text-paper/25 transition-all group-hover:translate-x-2 group-hover:text-gold" aria-hidden="true" /></div>)}</div></div></section>

      <section className="id-panel border-b border-line bg-gold text-ink"><div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-32"><div className="max-w-4xl"><p className="font-mono text-xs uppercase tracking-[.2em] text-ink/60">03 / La porte d’entrée</p><h2 className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[.88] tracking-[-.05em]">Avant de construire ta vie, comprends celui qui doit la vivre.</h2></div><Link href="/se-decouvrir/test" className="button-dark shrink-0">Découvrir mon profil <ArrowUpRight aria-hidden="true" /></Link></div></section>

      <section id="univers" className="border-b border-line"><div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">04 / Un même écosystème</p><h2 className="section-title mt-5">Six portes.<br />Une même direction.</h2></div><p className="max-w-sm text-sm leading-relaxed text-paper/55">Pas besoin de tout explorer aujourd’hui. Commence par l’endroit qui te ressemble.</p></div><div className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">{universes.map(([number, title, copy, href]) => <Link href={href} key={title} className="universe-card group border-b border-line py-8 sm:pr-8 lg:nth-[3n+2]:border-l lg:nth-[3n+2]:pl-8 lg:nth-[3n+3]:border-l lg:nth-[3n+3]:pl-8"><div className="flex items-center justify-between"><span className="font-mono text-[.62rem] tracking-[.16em] text-gold">{number}</span><ArrowUpRight className="text-paper/25 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" aria-hidden="true" /></div><p className="mt-8 font-mono text-[.65rem] tracking-[.16em] text-paper/80">{title}</p><p className="mt-5 max-w-xs text-lg leading-snug text-paper/60 group-hover:text-paper">{copy}</p><span className="mt-8 inline-block text-xs uppercase tracking-[.12em] text-paper/35 group-hover:text-gold">Entrer dans cet univers</span></Link>)}</div></div></section>

      <section className="border-b border-line bg-iron/25"><div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow">05 / À lire</p><h2 className="section-title mt-5">Des réflexions<br />pour aller plus loin.</h2></div><Link href="/reflexions" className="button-quiet hidden sm:inline-flex">Tous les articles <ArrowUpRight aria-hidden="true" /></Link></div><div className="mt-16 grid gap-10 md:grid-cols-3">{articles.slice(0, 3).map((article, index) => <Link key={article.slug} href={`/reflexions/${article.slug}`} className="group border-t border-line pt-5"><div className="flex justify-between"><p className="font-mono text-[.62rem] uppercase tracking-[.16em] text-gold">{article.category} · {article.reading_minutes} min</p><span className="font-mono text-[.62rem] text-paper/25">0{index + 1}</span></div><h3 className="mt-6 font-display text-2xl leading-tight group-hover:text-gold">{article.title}</h3><p className="mt-4 text-sm leading-relaxed text-paper/55">{article.excerpt}</p><span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-paper/35 group-hover:text-gold">Lire <ArrowUpRight aria-hidden="true" /></span></Link>)}</div></div></section>

      <section className="border-b border-line"><div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex items-end justify-between"><div><p className="eyebrow">06 / La bibliothèque</p><h2 className="section-title mt-5">Des livres à garder<br />près de soi.</h2></div><Link href="/bibliotheque" className="button-quiet hidden sm:inline-flex">Voir la bibliothèque <ArrowUpRight aria-hidden="true" /></Link></div><div className="mt-16 grid gap-px bg-line md:grid-cols-2">{books.map(([number, title, copy]) => <Link href="/bibliotheque" key={number} className="book-card group bg-ink p-8 md:p-12"><span className="font-mono text-xs text-gold">{number}</span><h3 className="mt-16 max-w-sm font-display text-4xl leading-tight group-hover:text-gold">{title}</h3><p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/55">{copy}</p><span className="mt-12 inline-flex items-center gap-2 text-xs uppercase tracking-[.12em] text-paper/40 group-hover:text-gold">Découvrir le livre <ArrowUpRight aria-hidden="true" /></span></Link>)}</div></div></section>

      <section><div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32"><p className="eyebrow">07 / La lettre ATEB’S</p><h2 className="section-title mt-5">Quelques lignes pour mieux te comprendre.</h2><p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-paper/60">Des réflexions, des idées et des outils pour avancer sans devenir quelqu’un d’autre.</p><div className="mx-auto mt-10 max-w-md"><Newsletter /></div></div></section>
    </main>
  );
}
