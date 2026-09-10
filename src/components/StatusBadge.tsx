import type { ContentStatus } from "@/lib/types";

const LABELS: Record<ContentStatus, string> = {
  draft: "Brouillon",
  review: "En relecture",
  scheduled: "Programmé",
  published: "Publié",
  archived: "Archivé",
};

const STYLES: Record<ContentStatus, string> = {
  draft: "border-white/20 text-paper/50",
  review: "border-blue-400/40 text-blue-300",
  scheduled: "border-purple-400/40 text-purple-300",
  published: "border-emerald-400/40 text-emerald-300",
  archived: "border-white/10 text-paper/30",
};

export default function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span className={`inline-block border px-2 py-0.5 text-[10px] uppercase tracking-wide ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}
