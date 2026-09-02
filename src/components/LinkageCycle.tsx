"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A bell-crank and sweep-bar cycle, of the kind a pinsetter runs every few
 * seconds. The point is the phase relationship, not a faithful AMC schematic.
 */
export function LinkageCycle() {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [a, setA] = useState(reduced ? 0.7 : 0);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = false;
    const start = performance.now();
    const loop = (now: number) => {
      setA(((now - start) % 4200) / 4200);
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

  const th = a * Math.PI * 2;
  // crank
  const cx = 90, cy = 100, r = 34;
  const px = cx + r * Math.cos(th), py = cy + r * Math.sin(th);
  // slider (sweep bar) on a horizontal track
  const L = 150;
  const sx = px + Math.sqrt(Math.max(0, L * L - (py - cy) * (py - cy)));
  // spotting table rises and falls out of phase
  const tableY = 44 + 26 * (0.5 - 0.5 * Math.cos(th + Math.PI * 0.6));

  const phase =
    a < 0.25 ? "SWEEP" : a < 0.5 ? "TABLE DOWN" : a < 0.75 ? "SET" : "TABLE UP";

  return (
    <div className="border border-line bg-panel">
      <div className="mono flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-[10px] tracking-[0.16em] uppercase">
        <span className="text-signal">Machine cycle</span>
        <span className="text-steel-dim">AMC-8270</span>
        <span className="ml-auto text-cyan/80">{phase}</span>
      </div>

      <svg
        ref={ref}
        viewBox="0 0 380 200"
        className="block w-full"
        fill="none"
        role="img"
        aria-label="Animated diagram of a bell-crank driving a sweep bar while a spotting table rises and falls out of phase — the linkage cycle of a bowling pinsetter."
      >
        {/* pin deck */}
        <line x1="20" y1="176" x2="360" y2="176" stroke="var(--line-bright)" strokeWidth="1.5" />
        {Array.from({ length: 10 }).map((_, i) => {
          const col = i < 4 ? i : i < 7 ? i - 4 : i < 9 ? i - 7 : 0;
          const row = i < 4 ? 0 : i < 7 ? 1 : i < 9 ? 2 : 3;
          return (
            <rect
              key={i}
              x={236 + col * 17 + row * 8.5}
              y={168 - row * 3}
              width="6"
              height="8"
              fill="var(--steel-dim)"
              opacity="0.8"
            />
          );
        })}

        {/* spotting table */}
        <g style={{ transform: `translateY(${tableY}px)` }}>
          <rect x="228" y="40" width="112" height="12" fill="var(--panel-2)" stroke="var(--steel-dim)" strokeWidth="1" />
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={i} x1={240 + i * 22} y1="52" x2={240 + i * 22} y2="64" stroke="var(--amber)" strokeWidth="1.5" />
          ))}
        </g>

        {/* crank */}
        <circle cx={cx} cy={cy} r={r} stroke="var(--line-bright)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="var(--signal)" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r="5" fill="var(--signal)" />

        {/* connecting rod to the sweep bar */}
        <line x1={px} y1={py} x2={sx} y2={cy} stroke="var(--cyan)" strokeWidth="2" />
        <circle cx={px} cy={py} r="4" fill="var(--cyan)" />

        {/* sweep bar on its track */}
        <line x1="150" y1={cy} x2="330" y2={cy} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
        <g style={{ transform: `translateX(${sx - 240}px)` }}>
          <rect x="232" y={cy - 8} width="16" height="16" fill="var(--panel-2)" stroke="var(--cyan)" strokeWidth="1.5" />
          <line x1="240" y1={cy + 8} x2="240" y2="170" stroke="var(--cyan)" strokeWidth="2" />
          <rect x="212" y="164" width="56" height="7" fill="var(--cyan)" opacity="0.65" />
        </g>

        <g className="mono" fontSize="9" letterSpacing="1.6" fill="var(--steel-dim)">
          <text x="90" y="152" textAnchor="middle">BELL CRANK</text>
          <text x="284" y="30" textAnchor="middle">SPOTTING TABLE</text>
          <text x="30" y="192">PIN DECK</text>
        </g>
      </svg>
    </div>
  );
}
