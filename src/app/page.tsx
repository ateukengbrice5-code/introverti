import Link from "next/link";
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
  ["ATEB’S INSPIRE", "Réflexions, articles, livres, formations et contenus.", "/reflexions"],
  ["ATEB’S ID", "Comprendre ton profil et ta personnalité.", "/se-decouvrir/test"],
  ["ATEB’S EVOLUTION", "Objectifs, habitudes, progression et accompagnement.", "/parcours"],
  ["ATEB’S CONNECT", "Relations et rencontres pensées différemment.", "/communaute"],
  ["ATEB’S FINANCE", "Comprendre, organiser et faire évoluer tes finances.", "/ressources"],
  ["ATEB’S BUSINESS", "Outils et solutions pour tes projets et entreprises.", "/ressources"],
];

const books = [
  ["01", "L’identité avant les objectifs", "Un manifeste pour avancer sans devenir quelqu’un d’autre."],
  ["02", "Le calme comme force", "Comprendre ce que ton monde intérieur rend possible."],
];

export default async function Home() {
  const articles = await getArticles().catch(() => []);
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-line">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-center px-6 py-24 lg:px-10">
          <p className="eyebrow">ATEB’S INSPIRE / 001</p>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.06em] text-pretty">
            L’identité<br /><span className="text-gold">avant</span> les objectifs.
          </h1>
          <div className="mt-12 flex max-w-2xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-paper/65">Comprends qui tu es. Construis qui tu veux devenir.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/se-decouvrir/test" className="button-primary">Découvrir mon profil <span aria-hidden="true">↗</span></Link>
              <Link href="/a-propos" className="button-quiet">Explorer l’univers <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <p className="mt-24 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-paper/35">Un espace pour celles et ceux qui pensent profondément.</p>
        </div>
      </section>

      <section className="border-b border-line bg-iron/25">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-32">
          <div><p className="eyebrow">Déconstruire</p><h2 className="section-title mt-5">Et si tu n’étais pas timide&nbsp;?</h2></div>
          <div><p className="max-w-2xl text-2xl leading-snug text-paper/85 md:text-3xl">Certaines personnes ont simplement une autre manière de réfléchir, de communiquer, de créer des relations, de prendre des décisions et de récupérer leur énergie.</p><div className="mt-14 grid border-t border-line sm:grid-cols-2">{["Introversion ≠ timidité", "Introversion ≠ manque de confiance", "Introversion ≠ faiblesse", "Introversion ≠ antisocialité"].map((item) => <div key={item} className="border-b border-line py-5 text-sm text-paper/65 sm:even:pl-8">{item}</div>)}</div></div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="max-w-2xl"><p className="eyebrow">Le parcours</p><h2 className="section-title mt-5">Je me comprends. Je m’accepte. Je me construis.</h2></div><div className="mt-16 grid border-t border-line md:grid-cols-2 lg:grid-cols-3">{journey.map(([number, title, copy]) => <div key={number} className="group border-b border-line py-8 md:pr-8 lg:nth-[3n+2]:border-l lg:nth-[3n+2]:pl-8 lg:nth-[3n+3]:border-l lg:nth-[3n+3]:pl-8"><span className="font-mono text-xs text-gold">{number}</span><h3 className="mt-8 font-display text-3xl group-hover:text-gold">{title}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/55">{copy}</p></div>)}</div></div>
      </section>

      <section className="border-b border-line bg-gold text-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-32"><div className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">La porte d’entrée</p><h2 className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.88] tracking-[-0.05em]">Avant de construire ta vie, comprends celui qui doit la vivre.</h2></div><Link href="/se-decouvrir/test" className="button-dark">Découvrir mon profil <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="border-b border-line"><div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Un même écosystème</p><h2 className="section-title mt-5">Six portes. Une même direction.</h2></div><p className="max-w-sm text-sm leading-relaxed text-paper/55">Pas besoin de tout explorer aujourd’hui. Commence par l’endroit qui te ressemble.</p></div><div className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">{universes.map(([title, copy, href]) => <Link href={href} key={title} className="group border-b border-line py-8 sm:pr-8 lg:nth-[3n+2]:border-l lg:nth-[3n+2]:pl-8 lg:nth-[3n+3]:border-l lg:nth-[3n+3]:pl-8"><p className="font-mono text-[0.65rem] tracking-[0.16em] text-gold">{title}</p><p className="mt-5 max-w-xs text-lg leading-snug text-paper/75 group-hover:text-paper">{copy}</p><span className="mt-8 inline-block text-sm text-paper/40 group-hover:text-gold">Entrer dans cet univers ↗</span></Link>)}</div></div></section>

      <section className="border-b border-line bg-iron/25"><div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow">À lire</p><h2 className="section-title mt-5">Des réflexions pour aller plus loin.</h2></div><Link href="/reflexions" className="button-quiet hidden sm:inline-flex">Tous les articles ↗</Link></div><div className="mt-16 grid gap-10 md:grid-cols-3">{articles.slice(0, 3).map((article) => <Link key={article.slug} href={`/reflexions/${article.slug}`} className="group border-t border-line pt-5"><p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-gold">{article.category} · {article.reading_minutes} min</p><h3 className="mt-6 font-display text-2xl leading-tight group-hover:text-gold">{article.title}</h3><p className="mt-4 text-sm leading-relaxed text-paper/55">{article.excerpt}</p></Link>)}</div></div></section>

      <section className="border-b border-line"><div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex items-end justify-between"><div><p className="eyebrow">La bibliothèque</p><h2 className="section-title mt-5">Des livres à garder près de soi.</h2></div><Link href="/bibliotheque" className="button-quiet hidden sm:inline-flex">Voir la bibliothèque ↗</Link></div><div className="mt-16 grid gap-px bg-line md:grid-cols-2">{books.map(([number, title, copy]) => <Link href="/bibliotheque" key={number} className="group bg-ink p-8 md:p-12"><span className="font-mono text-xs text-gold">{number}</span><h3 className="mt-16 max-w-sm font-display text-4xl leading-tight group-hover:text-gold">{title}</h3><p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/55">{copy}</p><span className="mt-12 inline-block text-sm text-paper/50 group-hover:text-gold">Découvrir le livre ↗</span></Link>)}</div></div></section>

      <section><div className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32"><p className="eyebrow">La lettre ATEB’S</p><h2 className="section-title mt-5">Quelques lignes pour mieux te comprendre.</h2><p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-paper/60">Des réflexions, des idées et des outils pour avancer sans devenir quelqu’un d’autre.</p><div className="mx-auto mt-10 max-w-md"><Newsletter /></div></div></section>
    </div>
  );
}
