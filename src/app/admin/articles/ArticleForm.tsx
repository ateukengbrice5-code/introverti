"use client";

import { useState } from "react";
import { Article, Category } from "@/lib/types";

// Transforme un titre en slug propre : minuscules, sans accents, mots
// séparés par des tirets, sans caractères spéciaux.
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève les accents (é -> e, ï -> i, etc.)
    .replace(/[^a-z0-9]+/g, "-") // tout ce qui n'est pas alphanumérique -> tiret
    .replace(/^-+|-+$/g, ""); // enlève les tirets en début/fin
}

export default function ArticleForm({
  action,
  article,
  categories,
  slugEditable = true,
}: {
  action: (formData: FormData) => void;
  article?: Article;
  categories: Category[];
  slugEditable?: boolean;
}) {
  const [slug, setSlug] = useState(article?.slug ?? "");
  // Tant que l'utilisateur n'a pas touché au champ slug lui-même, on le
  // régénère automatiquement à chaque frappe dans le titre. Dès qu'il édite
  // le slug à la main, on arrête de le toucher pour ne pas écraser son choix.
  const [slugTouched, setSlugTouched] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-5">
      <Field label="Slug (URL, ex. mon-titre-darticle)">
        <input
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          required
          disabled={!slugEditable}
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm disabled:opacity-50 focus:border-gold"
        />
      </Field>

      <Field label="Titre">
        <input
          name="title"
          defaultValue={article?.title}
          onChange={(e) => {
            if (!slugTouched && slugEditable) setSlug(slugify(e.target.value));
          }}
          required
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold"
        />
      </Field>

      <Field label="Sous-titre">
        <input name="subtitle" defaultValue={article?.subtitle} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Catégorie">
          <select name="category" defaultValue={article?.category} required className="w-full border border-white/20 bg-ink px-3 py-2 text-sm focus:border-gold">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Auteur">
          <input name="author" defaultValue={article?.author ?? "Ateukeng Brice"} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date de publication">
          <input type="date" name="published_at" defaultValue={article?.published_at} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
        </Field>
        <Field label="Temps de lecture (minutes)">
          <input type="number" min={1} name="reading_minutes" defaultValue={article?.reading_minutes ?? 4} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
        </Field>
      </div>

      <Field label="Image de couverture (jpg, png ou webp)">
        <input
          type="file"
          name="cover_image"
          accept="image/png,image/jpeg,image/webp"
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-gold file:px-3 file:py-1.5 file:text-ink"
        />
        {article?.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element -- aperçu simple dans un formulaire, pas de <Image> nécessaire ici
          <img
            src={article.cover_image_url}
            alt="Couverture actuelle"
            className="mt-3 h-32 w-auto rounded-lg border border-white/10 object-cover"
          />
        )}
        <p className="mt-2 text-xs text-paper/40">
          Laisser vide pour {article ? "conserver l'image actuelle" : "publier sans image"}.
        </p>
      </Field>

      <Field label="Légende de l'image (affichée sous la couverture)">
        <input name="cover_note" defaultValue={article?.cover_note} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>

      <Field label="Extrait (affiché dans les listes)">
        <textarea name="excerpt" defaultValue={article?.excerpt} required rows={2} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>

      <Field label="Corps de l'article — un paragraphe par bloc, séparés par une ligne vide">
        <textarea
          name="body"
          defaultValue={article?.body.join("\n\n")}
          required
          rows={12}
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm leading-relaxed focus:border-gold"
        />
      </Field>

      <Field label="Articles associés (slugs séparés par des virgules, optionnel)">
        <input name="related" defaultValue={article?.related?.join(", ")} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>

      <Field label="Statut">
        <select name="status" defaultValue={article?.status ?? "draft"} required className="w-full border border-white/20 bg-ink px-3 py-2 text-sm focus:border-gold">
          <option value="draft">Brouillon</option>
          <option value="review">En relecture</option>
          <option value="scheduled">Programmé</option>
          <option value="published">Publié</option>
          <option value="archived">Archivé</option>
        </select>
      </Field>

      <div className="mt-2 flex items-center gap-4">
        <button type="submit" className="border border-gold bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-transparent hover:text-gold">
          {article ? "Enregistrer" : "Publier l'article"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-paper/50">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
