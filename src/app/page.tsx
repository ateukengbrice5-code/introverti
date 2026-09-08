import Link from "next/link";
import Compass from "@/components/Compass";
import Newsletter from "@/components/Newsletter";
import { getThemes } from "@/lib/data/themes";
import { getAxes } from "@/lib/data/axes";
import { getArticles } from "@/lib/data/articles";

export default async function Home() {
  const [themes, axes, articles] = await Promise.all([getThemes(), getAxes(), getArticles()]);
  const previewThemes = themes.filter((t) =>
    ["introversion", "timidite", "confiance", "leadership"].includes(t.slug)
  );

  return (
    <div className="bg-paper text-ink">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-0 opacity-[0.06]" aria-hidden="true">
          <Compass axes={axes} size={520} />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Ateukeng Brice — L&rsquo;introverti
          </p>
          <h1 className="mt-6 font-display text-4xl font-normal leading-[1.15] tracking-tight sm:text-5xl">
            Tu n&rsquo;as pas besoin de devenir extraverti pour prendre ta place.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/60">
            Comprendre qui tu es. Comprendre comment tu fonctionnes. Et apprendre à utiliser
            cette différence comme une force.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/se-decouvrir/test"
              className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Commencer à me découvrir
            </Link>
            <Link
              href="/a-propos"
              className="text-sm text-ink/70 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
            >
              Explorer le projet
            </Link>
          </div>
        </div>
      </section>

      {/* LE PROBLÈME */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Le problème</p>
        <h2 className="mt-4 font-display text-3xl font-normal leading-snug">
          Et si le problème n&rsquo;était pas ton introversion&nbsp;?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/60">
          « Tu ne parles jamais. » « Tu devrais être plus sociable. » Ce sont des raccourcis. Ils
          confondent un fonctionnement avec un défaut, et poussent à se corriger plutôt qu&rsquo;à
          se comprendre.
        </p>
      </section>

      {/* COMPRENDRE */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Comprendre</p>
            <h2 className="mt-3 font-display text-3xl font-normal">Dix sujets, sans jargon inutile.</h2>
          </div>
          <Link href="/comprendre" className="text-sm text-ink/70 underline underline-offset-4 hover:text-gold">
            Tout comprendre →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {previewThemes.map((theme) => (
            <Link
              key={theme.slug}
              href={`/comprendre/${theme.slug}`}
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-md"
            >
              <p className="font-display text-lg">{theme.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/55">{theme.standfirst}</p>
              <span className="mt-5 inline-block text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
                Lire →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SE DÉCOUVRIR */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Se découvrir</p>
        <h2 className="mt-4 font-display text-3xl font-normal leading-snug">
          Avant de travailler sur tes objectifs, commence par comprendre ton fonctionnement.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink/60">
          Un questionnaire d&rsquo;introspection — pas un diagnostic — pour dégager un premier
          profil : tes forces probables, tes frictions possibles, un parcours recommandé.
        </p>
        <Link
          href="/se-decouvrir/test"
          className="mt-8 inline-block rounded-full border border-gold px-7 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Découvrir mon profil
        </Link>
      </section>

      {/* LES 7 AXES */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-gold">
          Le parcours central
        </p>
        <h2 className="mt-4 text-center font-display text-3xl font-normal">
          Les 7 axes d&rsquo;introspection.
        </h2>

        <ol className="mt-12 flex flex-col divide-y divide-ink/10">
          {axes.map((axis) => (
            <li key={axis.slug} className="grid gap-2 py-7 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-sm text-gold">{String(axis.index).padStart(2, "0")}</span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-lg">{axis.name}</span>
                  <span className="text-sm text-ink/50">{axis.intent}</span>
                </div>
                <p className="mt-2 max-w-xl text-sm italic leading-relaxed text-ink/70">
                  {axis.question}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* RÉFLEXIONS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Réflexions</p>
            <h2 className="mt-3 font-display text-3xl font-normal">Un magazine, pas un blog.</h2>
          </div>
          <Link href="/reflexions" className="text-sm text-ink/70 underline underline-offset-4 hover:text-gold">
            Tous les articles →
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`/reflexions/${article.slug}`} className="group block">
              <div className="aspect-[4/3] rounded-2xl bg-iron/[0.06]" aria-hidden="true" />
              <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-ink/40">
                {article.category} · {article.reading_minutes} min
              </p>
              <h3 className="mt-2 font-display text-xl leading-snug group-hover:text-gold">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Newsletter</p>
          <h2 className="mt-4 font-display text-3xl font-normal">
            Quelques minutes pour mieux te comprendre.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-ink/60">
            Des réflexions, des outils et des idées pour les personnes qui pensent beaucoup mais
            parlent parfois moins.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}
