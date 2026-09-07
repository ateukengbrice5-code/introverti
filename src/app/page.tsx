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

export default async function Home() {
  const [themes, axes, articles] = await Promise.all([getThemes(), getAxes(), getArticles()]);
  const previewThemes = themes.filter((t) =>
    ["introversion", "timidite", "confiance", "leadership"].includes(t.slug)
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">Ateukeng Brice — L&rsquo;introverti</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-[3.4rem]">
              Tu n&rsquo;as pas besoin de devenir extraverti pour prendre ta place.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70">
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
          </div>

          <div className="flex justify-center md:justify-end" aria-hidden="true">
            <Compass axes={axes} size={420} />
          </div>
        </div>
      </section>

      {/* LE PROBLÈME */}
      <section className="border-b border-white/10 bg-iron/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="eyebrow">Le problème</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
            Et si le problème n&rsquo;était pas ton introversion ?
          </h2>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {problemPhrases.map((phrase) => (
              <li
                key={phrase}
                className="border border-white/10 px-5 py-4 font-display text-lg italic text-paper/70"
              >
                {phrase}
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-paper/70">
            Ce sont des raccourcis. Ils confondent un fonctionnement avec un défaut, et poussent à
            se corriger plutôt qu&rsquo;à se comprendre. Ce projet existe pour déconstruire ces
            raccourcis, un à un.
          </p>
        </div>
      </section>

      {/* COMPRENDRE L'INTROVERSION */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Comprendre</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">Dix sujets, sans jargon inutile.</h2>
            </div>
            <Link href="/comprendre" className="text-sm text-gold hover:underline">
              Tout comprendre →
            </Link>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {previewThemes.map((theme) => (
              <Link
                key={theme.slug}
                href={`/comprendre/${theme.slug}`}
                className="group bg-ink px-6 py-8 transition-colors hover:bg-iron/60"
              >
                <p className="font-display text-xl">{theme.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{theme.standfirst}</p>
                <span className="mt-5 inline-block text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Lire →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUI ES-TU ? */}
      <section className="border-b border-white/10 bg-iron/40">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Se découvrir</p>
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

          <div className="grid grid-cols-2 gap-3 font-mono text-xs uppercase tracking-widest text-paper/50">
            {["L'Observateur", "Le Penseur", "Le Créatif", "Le Stratégique", "Le Sensible", "Le Sélectif"].map(
              (label) => (
                <div key={label} className="border border-white/10 px-4 py-5 text-paper/70">
                  {label}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* LES 7 AXES */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow">Le parcours central</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl sm:text-4xl">Les 7 axes d&rsquo;introspection.</h2>
          <p className="mt-4 max-w-xl text-base text-paper/70">
            Un parcours, pas un système médical. Chaque axe propose une question, un exercice, des
            ressources.
          </p>

          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {axes.map((axis) => (
              <li key={axis.slug} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="font-mono text-sm text-gold">{String(axis.index).padStart(2, "0")}</span>
                <span className="font-display text-lg">{axis.name}</span>
                <span className="text-sm text-paper/60 sm:ml-auto sm:text-right">{axis.intent}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RÉFLEXIONS */}
      <section className="border-b border-white/10 bg-iron/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Réflexions</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">Un magazine, pas un blog.</h2>
            </div>
            <Link href="/reflexions" className="text-sm text-gold hover:underline">
              Tous les articles →
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <Link key={article.slug} href={`/reflexions/${article.slug}`} className="group block">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-paper/40">
                  {article.category} · {article.reading_minutes} min
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug group-hover:text-gold">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="eyebrow">Newsletter</p>
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
        </div>
      </section>
    </>
  );
}
