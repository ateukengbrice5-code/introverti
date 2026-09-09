"use client";

import { useState } from "react";
import { Product } from "@/lib/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const kinds: Product["kind"][] = ["livre", "ebook", "carnet", "programme"];

export default function ProductForm({
  action,
  product,
  slugEditable = true,
}: {
  action: (formData: FormData) => void;
  product?: Product;
  slugEditable?: boolean;
}) {
  const [slug, setSlug] = useState(product?.slug ?? "");
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
      <Field label="Titre">
        <input
          name="title"
          defaultValue={product?.title}
          onChange={(e) => {
            if (!slugTouched && slugEditable) setSlug(slugify(e.target.value));
          }}
          required
          className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Type">
          <select name="kind" defaultValue={product?.kind ?? "livre"} className="w-full border border-white/20 bg-ink px-3 py-2 text-sm focus:border-gold">
            {kinds.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </Field>
        <Field label="Prix (€)">
          <input type="number" min={0} step="0.01" name="price_eur" defaultValue={product?.price_eur} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
        </Field>
      </div>
      <Field label="Description">
        <textarea name="description" defaultValue={product?.description} required rows={3} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <div className="mt-2">
        <button type="submit" className="border border-gold bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-transparent hover:text-gold">
          {product ? "Enregistrer" : "Créer le produit"}
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
