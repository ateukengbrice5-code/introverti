import { Journey } from "@/lib/types";

export default function JourneyForm({
  action,
  journey,
  slugEditable = true,
}: {
  action: (formData: FormData) => void;
  journey?: Journey;
  slugEditable?: boolean;
}) {
  const stepsText = journey?.steps.map((s) => `${s.title} | ${s.description}`).join("\n");

  return (
    <form action={action} className="flex flex-col gap-5">
      <Field label="Slug (URL)">
        <input name="slug" defaultValue={journey?.slug} required disabled={!slugEditable} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm disabled:opacity-50 focus:border-gold" />
      </Field>
      <Field label="Titre">
        <input name="title" defaultValue={journey?.title} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <Field label="Public visé">
        <input name="audience" defaultValue={journey?.audience} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Durée indicative">
          <input name="duration" defaultValue={journey?.duration} required className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
        </Field>
        <Field label="Ressources associées (slugs, virgules)">
          <input name="resources" defaultValue={journey?.resources.join(", ")} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
        </Field>
      </div>
      <Field label="Objectif">
        <textarea name="objective" defaultValue={journey?.objective} required rows={2} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-gold" />
      </Field>
      <Field label="Étapes — une par ligne, au format « Titre | Description »">
        <textarea name="steps" defaultValue={stepsText} required rows={8} className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm leading-relaxed focus:border-gold" />
      </Field>
      <div className="mt-2">
        <button type="submit" className="border border-gold bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-transparent hover:text-gold">
          {journey ? "Enregistrer" : "Créer le parcours"}
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
