export default function PageIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="border-b border-white/10 bg-iron/30">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70">{lead}</p>}
      </div>
    </div>
  );
}
