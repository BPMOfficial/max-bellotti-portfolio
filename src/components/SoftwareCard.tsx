"use client";

import { useEffect, useState } from "react";
import { SOFTWARE } from "@/lib/content";
import { useOnceInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SoftwareCard() {
  const [ref, seen] = useOnceInView<HTMLDivElement>("-10% 0px");
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const n = reduced && seen ? SOFTWARE.pillars.length : typed;

  useEffect(() => {
    if (!seen || reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= SOFTWARE.pillars.length) clearInterval(id);
    }, 320);
    return () => clearInterval(id);
  }, [seen, reduced]);

  return (
    <div ref={ref} className="border border-line bg-panel">
      {/* terminal chrome */}
      <div className="mono flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line px-4 py-2.5 text-[10px] tracking-[0.16em] uppercase">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-signal/70" />
          <span className="h-2 w-2 rounded-full bg-amber/70" />
          <span className="h-2 w-2 rounded-full bg-cyan/70" />
        </span>
        <span className="text-steel-dim">forsaken-path — design pillars</span>
        <span className="ml-auto flex gap-2 text-steel-dim">
          {SOFTWARE.stack.map((s) => (
            <span key={s} className="border border-line px-1.5 py-0.5">
              {s}
            </span>
          ))}
        </span>
      </div>

      <div className="px-4 py-4">
        <p className="mono text-[12.5px] leading-relaxed text-steel">
          <span className="text-cyan">$</span> cat docs/pillars.md
        </p>

        <ol className="mt-4 space-y-4">
          {SOFTWARE.pillars.map((p, i) => (
            <li
              key={p.k}
              style={{
                opacity: i < n ? 1 : 0,
                transform: i < n ? "none" : "translateY(6px)",
                transition: "opacity 320ms, transform 320ms",
              }}
            >
              <h4 className="mono flex items-baseline gap-2.5 text-[12px] tracking-[0.1em] text-chalk">
                <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                {p.k}
              </h4>
              <p className="mt-1 max-w-3xl pl-7 text-[14px] leading-relaxed text-steel-dim">
                {p.v}
              </p>
            </li>
          ))}
        </ol>

        <p
          className="mono mt-5 text-[12.5px] text-steel"
          style={{ opacity: n >= SOFTWARE.pillars.length ? 1 : 0, transition: "opacity 400ms" }}
        >
          <span className="text-cyan">$</span> <span className="blink text-chalk">▊</span>
        </p>
      </div>

      <ul className="divide-y divide-line border-t border-line">
        {SOFTWARE.extras.map((e) => (
          <li key={e} className="px-4 py-2.5 text-[13.5px] leading-relaxed text-steel-dim">
            <span aria-hidden className="mono mr-2 text-signal">→</span>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
