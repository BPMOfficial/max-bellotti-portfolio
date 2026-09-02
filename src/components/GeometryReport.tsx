"use client";

import { useEffect, useState } from "react";
import { useOnceInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Straight out of the lab's own geometry check on DienerSubsectionV1.stp. */
const ROWS: [string, string][] = [
  ["Bounding box", "1140.00 × 580.00 × 1140.00 mm"],
  ["Diagonal", "1713.36 mm"],
  ["Enclosed volume", "0.1223 m³   (122,315,056 mm³)"],
  ["Surface area", "4,763,614 mm²"],
  ["Centroid", "(0.00, −290.00, −0.00) mm"],
  ["Topology", "1 solid · 1 shell · 114 faces · 300 edges · 0 free edges"],
  ["Surface types", "62 planar · 52 cylindrical"],
  ["Bolt circle", "4 × ⌀85.000 mm on a 442.295 mm BCD"],
  ["Bores", "16 total · largest ⌀85.000 × 40.00 deep"],
  ["Bosses / shafts", "2 · largest ⌀280.00 mm"],
  ["Extracted fluid domain", "368,399,446 mm³"],
];

export function GeometryReport() {
  const [ref, seen] = useOnceInView<HTMLDivElement>("-10% 0px");
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const n = reduced && seen ? ROWS.length + 1 : typed;

  useEffect(() => {
    if (!seen || reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i > ROWS.length) clearInterval(id);
    }, 105);
    return () => clearInterval(id);
  }, [seen, reduced]);

  return (
    <div ref={ref} className="border border-line bg-panel">
      <div className="mono flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line px-4 py-2.5 text-[10px] tracking-[0.16em] uppercase">
        <span className="text-signal">Geometry report</span>
        <span className="text-steel-dim">DienerSubsectionV1.stp</span>
      </div>

      <dl className="divide-y divide-line">
        {ROWS.map(([k, v], i) => (
          <div
            key={k}
            className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-baseline sm:gap-6"
            style={{
              opacity: i < n ? 1 : 0,
              transform: i < n ? "none" : "translateY(4px)",
              transition: "opacity 240ms, transform 240ms",
            }}
          >
            <dt className="mono w-full text-[10px] tracking-[0.14em] text-steel-dim uppercase sm:w-52 sm:shrink-0">
              {k}
            </dt>
            <dd className="mono text-[12.5px] tabular-nums text-chalk">{v}</dd>
          </div>
        ))}
      </dl>

      <div
        className="mono flex items-center gap-3 border-t border-line px-4 py-3 text-[11px] tracking-[0.16em] uppercase"
        style={{
          opacity: n > ROWS.length ? 1 : 0,
          transition: "opacity 400ms",
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-cyan"
          style={{ boxShadow: "0 0 8px var(--cyan)" }}
        />
        <span className="text-cyan">COMSOL: Ready</span>
        <span className="text-steel-dim">0 blockers · 0 warnings</span>
      </div>
    </div>
  );
}
