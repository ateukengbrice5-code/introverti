import Link from "next/link";
import Compass from "@/components/Compass";
import Newsletter from "@/components/Newsletter";
import { getThemes } from "@/lib/data/themes";
import { getAxes } from "@/lib/data/axes";
import { getArticles } from "@/lib/data/articles";

const problemPhrases = [
  "« Tu ne parles jamais. »",
  "« Tu devrais être plus sociable. »",
  "« Tu manques de confiance. »",
  "« Il faut sortir de ta zone de confort. »",
];

const sommaire = [
  { n: "01", href: "#probleme", label: "Le problème" },
  { n: "02", href: "#comprendre", label: "Comprendre" },
  { n: "03", href: "#se-decouvrir", label: "Se découvrir" },
  { n: "04", href: "#axes", label: "Les 7 axes" },
  { n: "05", href: "#reflexions", label: "Réflexions" },
  { n: "06", href: "#newsletter", label: "S'abonner" },
];

const archetypes = [
  "L'Observateur",
  "Le Penseur",
  "Le Créatif",
  "Le Stratégique",
  "Le Sensible",
  "Le Sélectif",
];

export default async function Home() {
  const [themes, axes, articles] = await Promise.all([getThemes(), getAxes(), getArticles()]);
  const previewThemes = themes.filter((t) =>
    ["introversion", "timidite", "confiance", "leadership"].includes(t.slug)
  );
  const [featuredArticle, ...otherArticles] = articles.slice(0, 3);

  return (
    <>
      {/* MASTHEAD — bandeau de revue */}
      <div className="border-b border-white/10 bg-iron/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-paper/40">
          <span>L&rsquo;introverti — Édition Nº 01</span>
          <span className="hidden sm:inline">Comprendre · Se découvrir · Avancer</span>
        </div>
      </div>

      {/* HERO + SOMMAIRE */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[1.3fr_0.9fr] md:py-28">
          <div>
            <p className="eyebrow">Ateukeng Brice — L&rsquo;introverti</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-[3.4rem]">
              Tu n&rsquo;as pas besoin de devenir extraverti pour prendre ta place.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70 first-letter:mr-1 first-letter:float-left first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-gold">
              Comprendre qui tu es. Comprendre comment tu fonctionnes. Et apprendre à utiliser
              cette différence comme une force.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/se-decouvrir/test"
                className="border border-gold bg-gold px-6 py-3 text-center text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-gold"
              >
                Commencer à me découvrir
              </Link>
              <Link
                href="/a-propos"
                className="border border-white/20 px-6 py-3 text-center text-sm text-paper/80 transition-colors hover:border-gold hover:text-gold"
              >
                Explorer le projet
              </Link>
            </div>

            <div className="mt-16" aria-hidden="true">
              <Compass axes={axes} size={280} />
            </div>
          </div>

          {/* Sommaire — colonne de revue */}
          <nav aria-label="Sommaire de la page" className="border-l border-white/10 pl-8">
            <p className="eyebrow">Dans cette édition</p>
            <ol className="mt-6 flex flex-col gap-5">
              {sommaire.map((item) => (
                <li key={item.n}>
                  <a href={item.href} className="group flex items-baseline gap-4">
                    <span className="font-mono text-xs text-gold">{item.n}</span>
                    <span className="font-display text-lg leading-snug text-paper/85 group-hover:text-gold">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* LE PROBLÈME */}
      <section id="probleme" className="border-b border-white/10 bg-iron/40 scroll-mt-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow">§01 — Le problème</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
              Et si le problème n&rsquo;était pas ton introversion&nbsp;?
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/70 first-letter:mr-1 first-letter:float-left first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-gold">
              Ce sont des raccourcis. Ils confondent un fonctionnement avec un défaut, et
              poussent à se corriger plutôt qu&rsquo;à se comprendre. Ce projet existe pour
              déconstruire ces raccourcis, un à un.
            </p>
          </div>

          {/* Marginalia — citations en notes de bas de page */}
          <ol className="flex flex-col gap-4 border-l border-white/10 pl-6">
            {problemPhrases.map((phrase, i) => (
              <li key={phrase} className="flex gap-3">
                <span className="font-mono text-xs text-gold">{i + 1}.</span>
                <span className="font-display text-base italic leading-snug text-paper/60">
                  {phrase}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* COMPRENDRE L'INTROVERSION — index façon sommaire de revue */}
      <section id="comprendre" className="border-b border-white/10 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">§02 — Comprendre</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">Dix sujets, sans jargon inutile.</h2>
            </div>
            <Link href="/comprendre" className="text-sm text-gold hover:underline">
              Tout comprendre →
            </Link>
          </div>

          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {previewThemes.map((theme, i) => (
              <li key={theme.slug}>
                <Link
                  href={`/comprendre/${theme.slug}`}
                  className="group grid gap-2 py-7 transition-colors hover:bg-iron/40 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="font-display text-xl">{theme.title}</span>
                    <span className="mt-1 block max-w-xl text-sm leading-relaxed text-paper/60">
                      {theme.standfirst}
                    </span>
                  </span>
                  <span className="text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100 sm:text-right">
                    Lire →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QUI ES-TU ? */}
      <section id="se-decouvrir" className="border-b border-white/10 bg-iron/40 scroll-mt-16">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow">§03 — Se découvrir</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              Avant de travailler sur tes objectifs, commence par comprendre ton fonctionnement.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/70">
              Un questionnaire d&rsquo;introspection — pas un diagnostic — pour dégager un premier
              profil : tes forces probables, tes frictions possibles, et un parcours recommandé
              pour avancer.
            </p>
            <Link
              href="/se-decouvrir/test"
              className="mt-8 inline-block border border-gold px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Découvrir mon profil
            </Link>
          </div>

          {/* Marginalia — archétypes en notes, pas en cartes */}
          <div className="border-l border-white/10 pl-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-paper/40">
              Profils possibles
            </p>
            <ol className="mt-5 flex flex-col gap-3">
              {archetypes.map((label, i) => (
                <li key={label} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-base text-paper/80">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* LES 7 AXES */}
      <section id="axes" className="border-b border-white/10 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="eyebrow">§04 — Le parcours central</p>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-paper/40">
              {String(axes.length).padStart(2, "0")} entrées
            </span>
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-3xl sm:text-4xl">
            Les 7 axes d&rsquo;introspection.
          </h2>
          <p className="mt-4 max-w-xl text-base text-paper/70">
            Un parcours, pas un système médical. Chaque axe propose une question, un exercice, des
            ressources.
          </p>

          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {axes.map((axis) => (
              <li key={axis.slug} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-10">
                <span className="font-display text-2xl text-gold">
                  {String(axis.index).padStart(2, "0")}
                </span>
                <span className="font-display text-lg">{axis.name}</span>
                <span className="text-sm text-paper/60 sm:ml-auto sm:text-right">{axis.intent}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RÉFLEXIONS — sommaire de magazine */}
      <section id="reflexions" className="border-b border-white/10 bg-iron/40 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">§05 — Réflexions</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">Un magazine, pas un blog.</h2>
            </div>
            <Link href="/reflexions" className="text-sm text-gold hover:underline">
              Tous les articles →
            </Link>
          </div>

          <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr]">
            {featuredArticle && (
              <Link href={`/reflexions/${featuredArticle.slug}`} className="group block">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-gold">
                  À la une · {featuredArticle.category} · {featuredArticle.reading_minutes} min
                </p>
                <h3 className="mt-3 font-display text-3xl leading-snug group-hover:text-gold">
                  {featuredArticle.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/70 first-letter:mr-1 first-letter:float-left first-letter:font-display first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-gold">
                  {featuredArticle.excerpt}
                </p>
                <p className="mt-4 font-mono text-xs uppercase tracking-widest text-paper/40">
                  Ateukeng Brice
                </p>
              </Link>
            )}

            <ol className="flex flex-col divide-y divide-white/10 border-y border-white/10 md:border-y-0 md:border-l md:pl-8">
              {otherArticles.map((article, i) => (
                <li key={article.slug} className="py-6 first:pt-0 md:first:pt-0">
                  <Link href={`/reflexions/${article.slug}`} className="group block">
                    <span className="font-mono text-xs text-gold">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <h4 className="mt-2 font-display text-lg leading-snug group-hover:text-gold">
                      {article.title}
                    </h4>
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-paper/40">
                      {article.category} · {article.reading_minutes} min
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* NEWSLETTER — abonnement à l'édition */}
      <section id="newsletter" className="scroll-mt-16">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="eyebrow">§06 — S&rsquo;abonner</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            Quelques minutes pour mieux te comprendre.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-paper/70">
            Des réflexions, des outils et des idées pour les personnes qui pensent beaucoup mais
            parlent parfois moins.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <Newsletter />
          </div>
          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-widest text-paper/30">
            Une édition, pas un flux — aucun spam.
          </p>
        </div>
      </section>
    </>
  );
}
