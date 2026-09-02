"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STAGES = [
  { k: "Insert", v: "Pin enters the slot mouth" },
  { k: "Lift", v: "Axial travel up the leg" },
  { k: "Turn", v: "Circumferential index" },
  { k: "Detent", v: "Drops into the lock" },
];

/**
 * The cap's pin-in-slot travel, unrolled: lift, turn, locking detent. The pin
 * runs the path on a loop so the mechanism reads at a glance.
 */
export function BayonetPath() {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [t, setT] = useState(reduced ? 0.86 : 0);
  const [pt, setPt] = useState({ x: 30, y: 150 });

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let visible = false;
    const el = pathRef.current;
    if (!el) return;

    const start = performance.now();
    const loop = (now: number) => {
      const cycle = 3600;
      const phase = ((now - start) % cycle) / cycle;
      // dwell at the locked position for the last third
      const eased = phase < 0.68 ? phase / 0.68 : 1;
      setT(eased);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "80px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    const p = el.getPointAtLength(len * t);
    setPt({ x: p.x, y: p.y });
  }, [t]);

  const stage = t < 0.08 ? 0 : t < 0.46 ? 1 : t < 0.82 ? 2 : 3;

  return (
    <div className="border border-line bg-panel">
      <div className="mono flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-[10px] tracking-[0.16em] uppercase">
        <span className="text-signal">Bayonet slot · unrolled</span>
        <span className="ml-auto text-cyan/80">{STAGES[stage].k}</span>
      </div>

      <svg viewBox="0 0 460 200" className="block w-full" fill="none"
        role="img"
        aria-label="Diagram of the bayonet slot unrolled flat: the pin enters at the slot mouth, lifts axially, turns circumferentially, then drops into a locking detent.">
        {/* body wall hatch */}
        <g stroke="var(--line)" strokeWidth="1">
          {Array.from({ length: 26 }).map((_, i) => (
            <line key={i} x1={i * 20 - 40} y1="200" x2={i * 20 + 40} y2="0" opacity="0.35" />
          ))}
        </g>
        <rect x="0.5" y="0.5" width="459" height="199" stroke="var(--line-bright)" />

        {/* the slot itself, drawn wide and dark */}
        <path
          d="M30 175 L30 92 L300 92 L300 128 L340 128"
          stroke="var(--ground)"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={pathRef}
          d="M30 175 L30 92 L300 92 L300 128 L340 128"
          stroke="var(--line-bright)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* travelled portion */}
        <path
          d="M30 175 L30 92 L300 92 L300 128 L340 128"
          stroke="var(--signal)"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - t}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* the pin */}
        <circle cx={pt.x} cy={pt.y} r="9" fill="var(--cyan)" opacity="0.22" />
        <circle cx={pt.x} cy={pt.y} r="5.5" fill="var(--cyan)" />

        {/* labels */}
        <g className="mono" fontSize="9" letterSpacing="1.6" fill="var(--steel-dim)">
          <text x="30" y="193" textAnchor="middle">MOUTH</text>
          <text x="165" y="80" textAnchor="middle">LIFT</text>
          <text x="300" y="80" textAnchor="middle">TURN</text>
          <text x="352" y="152">DETENT</text>
        </g>
        <path d="M340 128 l-6 -5 v10 z" fill="var(--signal)" />
      </svg>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line px-4 py-3 sm:grid-cols-4">
        {STAGES.map((s, i) => (
          <div key={s.k}>
            <dt
              className={`mono text-[10px] tracking-[0.14em] uppercase ${i === stage ? "text-signal" : "text-steel-dim"}`}
              style={{ transition: "color 300ms" }}
            >
              {String(i + 1).padStart(2, "0")} {s.k}
            </dt>
            <dd className="mt-0.5 text-[12px] leading-snug text-steel-dim">{s.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
