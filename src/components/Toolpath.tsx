"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type Node = { code: string; when: string; text: string };

const STEP = 104;
const JOG = 46;

/**
 * The section timeline drawn as a machining toolpath: a serpentine the cutter
 * runs down as you scroll, with each milestone a node it passes through.
 *
 * Progress is measured against the whole enclosing section rather than this
 * block, so the pass paces with the section you are actually reading and
 * finishes as you reach the end of it — the block itself is sticky, so the
 * cutter stays on screen the whole way down.
 */
export function Toolpath({ nodes }: { nodes: Node[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(0);
  const p = reduced ? 1 : scrolled;

  const h = nodes.length * STEP;

  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    const track = el.closest("section") ?? el;
    let raf = 0;
    const read = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = track.getBoundingClientRect();
        const vh = window.innerHeight;
        // p reaches 1 shortly before the section's bottom clears the viewport
        const travel = Math.max(1, r.height - vh * 0.8);
        setScrolled(Math.max(0, Math.min(1, (vh * 0.55 - r.top) / travel)));
      });
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // serpentine: down the spine, jogging out at each node
  const pts: [number, number][] = [[JOG, 8]];
  nodes.forEach((_, i) => {
    const y = 8 + i * STEP + STEP * 0.5;
    pts.push([JOG, y - 22], [JOG + 22, y], [JOG, y + 22]);
  });
  pts.push([JOG, h]);
  const d = pts.map((pt, i) => `${i ? "L" : "M"}${pt[0]} ${pt[1]}`).join(" ");

  const cutY = 8 + p * (h - 8);
  const activeCount = nodes.filter((_, i) => cutY >= 8 + i * STEP + STEP * 0.5).length;

  return (
    <div ref={wrap} className="relative">
      <div className="mono mb-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line pb-2.5 text-[10px] tracking-[0.16em] text-steel-dim uppercase">
        <span className="text-signal">Toolpath</span>
        <span>N{String(activeCount).padStart(2, "0")} / N{String(nodes.length).padStart(2, "0")}</span>
        <span className="ml-auto text-cyan/70">Z {(-cutY / 10).toFixed(3)}</span>
      </div>

      <div className="relative" style={{ height: h }}>
        <svg
          aria-hidden
          className="absolute left-0 top-0 h-full"
          width={JOG + 30}
          viewBox={`0 0 ${JOG + 30} ${h}`}
          fill="none"
        >
          <path d={d} stroke="var(--line-bright)" strokeWidth="1" strokeDasharray="4 4" />
          <path
            d={d}
            stroke="var(--signal)"
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - p}
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
          {nodes.map((_, i) => {
            const y = 8 + i * STEP + STEP * 0.5;
            const on = cutY >= y;
            return (
              <g key={i}>
                <circle
                  cx={JOG + 22}
                  cy={y}
                  r={on ? 5 : 3.5}
                  fill={on ? "var(--signal)" : "var(--ground)"}
                  stroke={on ? "var(--signal)" : "var(--line-bright)"}
                  strokeWidth="1.5"
                  style={{ transition: "r 220ms, fill 220ms, stroke 220ms" }}
                />
                {on && (
                  <circle
                    cx={JOG + 22}
                    cy={y}
                    r="11"
                    fill="none"
                    stroke="var(--signal)"
                    strokeWidth="1"
                    opacity="0.28"
                  />
                )}
              </g>
            );
          })}
          {/* the cutter */}
          {p > 0.001 && p < 0.999 && (
            <g transform={`translate(${JOG} ${cutY})`}>
              <path d="M-7 -12 L7 -12 L0 2 Z" fill="var(--cyan)" />
              <rect x="-8" y="-24" width="16" height="12" fill="var(--panel-2)" stroke="var(--cyan)" strokeWidth="1" />
            </g>
          )}
        </svg>

        <ol className="relative" style={{ marginLeft: JOG + 46 }}>
          {nodes.map((n, i) => {
            const y = 8 + i * STEP + STEP * 0.5;
            const on = cutY >= y;
            return (
              <li
                key={n.code}
                className="absolute left-0 right-0 -translate-y-1/2"
                style={{
                  top: y,
                  opacity: on ? 1 : 0.32,
                  transform: `translateY(-50%) translateX(${on ? 0 : 8}px)`,
                  transition: "opacity 420ms, transform 420ms",
                }}
              >
                <div className="mono flex flex-wrap items-baseline gap-x-3 text-[10px] tracking-[0.14em] uppercase">
                  <span className={on ? "text-signal" : "text-steel-dim"}>
                    N{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-cyan/70">{n.code}</span>
                  <span className="text-steel-dim">{n.when}</span>
                </div>
                <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-steel">
                  {n.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
