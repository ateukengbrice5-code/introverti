import { Theme } from "@/lib/types";

export default function ThemeForm({
  action,
  theme,
  slugEditable = true,
}: {
  action: (formData: FormData) => void;
  theme?: Theme;
  slugEditable?: boolean;
}) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <Field label="Slug (URL)">
        <input name="slug" defaultValue={theme?.slug} required disabled={!slugEditable} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm disabled:opacity-50 focus:border-gold" />
      </Field>
      <Field label="Titre">
        <input name="title" defaultValue={theme?.title} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <Field label="Chapô (résumé en une phrase)">
        <textarea name="standfirst" defaultValue={theme?.standfirst} required rows={2} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <Field label="Corps — un paragraphe par bloc, séparés par une ligne vide">
        <textarea name="body" defaultValue={theme?.body.join("\n\n")} required rows={8} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm leading-relaxed focus:border-gold" />
      </Field>
      <p className="text-xs text-paper/40">Optionnel — distinction fait / hypothèse / réflexion éditoriale :</p>
      <Field label="Fait établi">
        <input name="fait" defaultValue={theme?.distinctions?.fait} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <Field label="Hypothèse">
        <input name="hypothese" defaultValue={theme?.distinctions?.hypothese} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <Field label="Réflexion éditoriale">
        <input name="reflexion" defaultValue={theme?.distinctions?.reflexion} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <div className="mt-2">
        <button type="submit" className="border border-gold bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-transparent hover:text-gold">
          {theme ? "Enregistrer" : "Créer le thème"}
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
