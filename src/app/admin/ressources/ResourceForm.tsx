"use client";

import { useState } from "react";
import { Resource } from "@/lib/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const types: Resource["type"][] = ["ebook", "fiche", "exercice", "audio", "video"];

export default function ResourceForm({
  action,
  resource,
  slugEditable = true,
}: {
  action: (formData: FormData) => void;
  resource?: Resource;
  slugEditable?: boolean;
}) {
  const [slug, setSlug] = useState(resource?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-5">
      <Field label="Slug (URL)">
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
      <Field label="Type">
        <select name="type" defaultValue={resource?.type ?? "fiche"} className="w-full border border-white/20 bg-ink px-3 py-2 text-sm focus:border-gold">
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Titre">
        <input
          name="title"
          defaultValue={resource?.title}
          onChange={(e) => {
            if (!slugTouched && slugEditable) setSlug(slugify(e.target.value));
          }}
          required
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold"
        />
      </Field>
      <Field label="Description">
        <textarea name="description" defaultValue={resource?.description} required rows={3} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <Field label="Format (ex. « PDF, 2 pages »)">
        <input name="format_note" defaultValue={resource?.format_note} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <Field label="Lien vidéo (YouTube ou Vimeo — optionnel, affiché si le type est « video »)">
        <input
          name="video_url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          defaultValue={resource?.video_url ?? ""}
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold"
        />
      </Field>
      <div className="mt-2">
        <button type="submit" className="border border-gold bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-transparent hover:text-gold">
          {resource ? "Enregistrer" : "Créer la ressource"}
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
