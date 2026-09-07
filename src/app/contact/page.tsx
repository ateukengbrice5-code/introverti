import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Écris-nous." lead="Une question, une idée de collaboration, un retour sur le site : ce formulaire arrive directement dans la boîte du projet." />
      <div className="mx-auto max-w-xl px-6 py-16">
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="c-name" className="text-xs text-paper/50">Nom</label>
            <input id="c-name" type="text" autoComplete="name" className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold" />
          </div>
          <div>
            <label htmlFor="c-email" className="text-xs text-paper/50">Email</label>
            <input id="c-email" type="email" autoComplete="email" className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold" />
          </div>
          <div>
            <label htmlFor="c-message" className="text-xs text-paper/50">Message</label>
            <textarea id="c-message" rows={5} className="mt-1 w-full border border-white/20 bg-transparent px-4 py-3 text-sm focus:border-gold" />
          </div>
          <button type="submit" className="mt-2 self-start border border-gold bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-transparent hover:text-gold">
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
}
