import { Axis } from "@/lib/types";

/**
 * "Le Cadran" — motif signature du projet : les 7 axes d'introspection
 * représentés comme un cadran, pas comme un diagramme scientifique. Rotation
 * très lente, purement ambiante (désactivée si prefers-reduced-motion).
 * Reçoit les axes en prop (chargés depuis Supabase par la page parente).
 */
export default function Compass({ axes, size = 420 }: { axes: Axis[]; size?: number }) {
  const center = 240;
  const outerR = 210;
  const tickR = 186;
  const labelR = 158;

  const points = axes.map((axis, i) => {
    const angle = (i / axes.length) * 2 * Math.PI - Math.PI / 2;
    return {
      axis,
      x1: center + Math.cos(angle) * outerR,
      y1: center + Math.sin(angle) * outerR,
      x2: center + Math.cos(angle) * tickR,
      y2: center + Math.sin(angle) * tickR,
      lx: center + Math.cos(angle) * labelR,
      ly: center + Math.sin(angle) * labelR,
    };
  });

  return (
    <svg
      viewBox="0 0 480 480"
      width={size}
      height={size}
      role="img"
      aria-label="Cadran des sept axes d'introspection"
      className="max-w-full"
    >
      <circle cx={center} cy={center} r={outerR} fill="none" stroke="var(--line-strong, rgba(246,243,236,0.22))" strokeWidth="0.75" />
      <circle cx={center} cy={center} r={outerR - 40} fill="none" stroke="rgba(246,243,236,0.08)" strokeWidth="0.5" />

      <g className="compass-ring">
        {points.map((p) => (
          <line
            key={p.axis.slug}
            x1={p.x1}
            y1={p.y1}
            x2={p.x2}
            y2={p.y2}
            stroke="var(--gold, #b08d57)"
            strokeWidth="1"
            opacity={0.8}
          />
        ))}
        {points.map((p) => (
          <text
            key={p.axis.slug + "-n"}
            x={p.lx}
            y={p.ly}
            fill="var(--gold, #b08d57)"
            fontFamily="var(--font-mono)"
            fontSize="11"
            textAnchor="middle"
            opacity={0.9}
          >
            {String(p.axis.index).padStart(2, "0")}
          </text>
        ))}
      </g>

      <circle cx={center} cy={center} r={3} fill="var(--gold, #b08d57)" />
      <text
        x={center}
        y={center + 34}
        textAnchor="middle"
        fill="rgba(246,243,236,0.55)"
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="2"
      >
        7 AXES
      </text>
    </svg>
  );
}
