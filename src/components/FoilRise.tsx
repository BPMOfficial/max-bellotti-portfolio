"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The N30 rising onto its foils, driven by scroll: the waterline drops away,
 * the ride-height dimension opens up, and the flow past the struts accelerates.
 */
export function FoilRise() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(0);
  const p = reduced ? 1 : scrolled;

  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const span = r.height + window.innerHeight * 0.5;
        setScrolled(Math.max(0, Math.min(1, (window.innerHeight * 0.85 - r.top) / span)));
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

  const foiling = p > 0.62;

  return (
    <div ref={wrap} className="border border-line bg-panel">
      <div className="mono flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-[10px] tracking-[0.16em] uppercase">
        <span className="text-signal">N30 · lift-lock foiling</span>
        <span className="ml-auto flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              background: foiling ? "var(--cyan)" : "var(--steel-dim)",
              boxShadow: foiling ? "0 0 8px var(--cyan)" : "none",
              transition: "background 300ms, box-shadow 300ms",
            }}
          />
          <span className={foiling ? "text-cyan" : "text-steel-dim"}>
            {foiling ? "Hull clear" : "Displacement"}
          </span>
        </span>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src="/img/navier/n30-foiling.jpg"
          alt="The Navier N30 up on its foils on Lake Tahoe, hull fully clear of the water."
          fill
          sizes="(max-width:1024px) 100vw, 1100px"
          className="object-cover"
        />

        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 562"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* waterline — falls away as the boat comes up */}
          <g style={{ transform: `translateY(${p * 46}px)`, transition: "transform 120ms linear" }}>
            <line x1="0" y1="416" x2="1000" y2="416" stroke="var(--cyan)" strokeWidth="1.5" opacity="0.7" />
            <line x1="0" y1="416" x2="1000" y2="416" stroke="var(--cyan)" strokeWidth="6" opacity="0.12" />
          </g>

          {/* ride-height dimension */}
          <g opacity={p > 0.25 ? 0.85 : 0} style={{ transition: "opacity 400ms" }}>
            <line x1="120" y1="370" x2="120" y2={416 + p * 46} stroke="var(--amber)" strokeWidth="1" />
            <path d="M120 370 l-4 8 h8 z" fill="var(--amber)" />
            <path d={`M120 ${416 + p * 46} l-4 -8 h8 z`} fill="var(--amber)" />
            <line x1="96" y1="370" x2="144" y2="370" stroke="var(--amber)" strokeWidth="1" opacity="0.6" />
          </g>

          {/* accelerating flow past the struts */}
          <g stroke="var(--cyan)" strokeWidth="1.5" opacity={0.2 + p * 0.5}>
            {[452, 478, 504, 530].map((y, i) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="1000"
                y2={y}
                strokeDasharray={`${24 + p * 90} ${40 - p * 16}`}
                style={
                  reduced
                    ? undefined
                    : {
                        animation: `flow ${2.4 - p * 1.6}s linear ${i * -0.35}s infinite`,
                      }
                }
              />
            ))}
          </g>
        </svg>
        <style>{`@keyframes flow{to{stroke-dashoffset:-260}}`}</style>
      </div>

      <dl className="mono grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line px-4 py-3 text-[10px] tracking-[0.14em] uppercase sm:grid-cols-4">
        {[
          { k: "Length", v: "30 ft" },
          { k: "Drive", v: "Electric" },
          { k: "System", v: "Lift-lock foils" },
          { k: "State", v: foiling ? "Foilborne" : "Hullborne" },
        ].map((s) => (
          <div key={s.k}>
            <dt className="text-steel-dim">{s.k}</dt>
            <dd className={`mt-0.5 ${s.k === "State" && foiling ? "text-cyan" : "text-chalk"}`}>
              {s.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
