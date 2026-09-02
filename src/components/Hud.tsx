"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/useReducedMotion";

export const NAV = [
  { id: "top", index: "00", label: "Datum" },
  { id: "fsae", index: "01", label: "Formula SAE" },
  { id: "shop", index: "02", label: "Machine Shop" },
  { id: "cad", index: "03", label: "CAD & Drafting" },
  { id: "precision", index: "04", label: "Precision Mfg" },
  { id: "navier", index: "05", label: "Navier" },
  { id: "wirz", index: "06", label: "Wirz Aerospace" },
  { id: "maintenance", index: "07", label: "Maintenance" },
  { id: "course", index: "08", label: "Coursework" },
  { id: "software", index: "09", label: "Software" },
  { id: "profile", index: "10", label: "Experience" },
];

/**
 * The persistent viewport instrumentation: section readout, scroll depth as a
 * Z coordinate, a tick-marked progress rule, and a CAD-viewport crosshair that
 * tracks the pointer. Crosshair is fine-pointer only and off under reduced
 * motion; the readouts stay in both cases because they are information.
 */
export function Hud() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [depth, setDepth] = useState(0);
  const [active, setActive] = useState(NAV[0]);
  const xy = useRef<HTMLDivElement>(null);
  const vline = useRef<HTMLDivElement>(null);
  const hline = useRef<HTMLDivElement>(null);

  // scroll depth + active section
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setDepth(max > 0 ? window.scrollY / max : 0);

        const mid = window.innerHeight * 0.4;
        let current = NAV[0];
        for (const n of NAV) {
          const el = document.getElementById(n.id);
          if (el && el.getBoundingClientRect().top <= mid) current = n;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // crosshair — written straight to the DOM, never through React state
  useEffect(() => {
    if (!fine || reduced) return;
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (vline.current) vline.current.style.transform = `translateX(${x}px)`;
      if (hline.current) hline.current.style.transform = `translateY(${y}px)`;
      if (xy.current) {
        xy.current.style.transform = `translate(${x + 16}px, ${y + 16}px)`;
        xy.current.textContent = `X ${String(Math.round(x)).padStart(4, "0")}  Y ${String(
          Math.round(y),
        ).padStart(4, "0")}`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [fine, reduced]);

  const showCrosshair = fine && !reduced;

  return (
    <>
      {showCrosshair && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-40 hidden lg:block">
          <div
            ref={vline}
            className="absolute left-0 top-0 h-full w-px bg-cyan/15"
            style={{ willChange: "transform" }}
          />
          <div
            ref={hline}
            className="absolute left-0 top-0 h-px w-full bg-cyan/15"
            style={{ willChange: "transform" }}
          />
          <div
            ref={xy}
            className="mono absolute left-0 top-0 text-[10px] tracking-widest text-cyan/60"
            style={{ willChange: "transform" }}
          />
        </div>
      )}

      {/* corner readouts */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 hidden select-none px-5 pb-3 md:block"
      >
        <div className="mono flex items-end justify-between text-[10px] tracking-[0.2em] text-steel-dim uppercase">
          <span>
            <span className="text-signal">SEC {active.index}</span>
            <span className="mx-2 text-line-bright">/</span>
            <span className="text-steel">{active.label}</span>
          </span>
          <span className="text-cyan/70">
            Z {depth.toFixed(4)}
          </span>
        </div>
        {/* tick rule */}
        <div className="relative mt-1.5 h-3 w-full border-t border-line">
          <div
            className="absolute left-0 top-0 h-px bg-signal"
            style={{ width: `${depth * 100}%`, transition: "width 90ms linear" }}
          />
          {Array.from({ length: 41 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-0 w-px bg-line-bright"
              style={{
                left: `${(i / 40) * 100}%`,
                height: i % 5 === 0 ? "9px" : "4px",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
