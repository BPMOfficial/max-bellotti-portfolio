"use client";

import Image from "next/image";
import { useOnceInView } from "@/hooks/useInView";

const CALLOUTS = [
  { x: 26, y: 24, tx: 8, ty: 12, label: "4 orthographic views" },
  { x: 52, y: 52, tx: 34, ty: 78, label: "Section B-B" },
  { x: 79, y: 32, tx: 92, ty: 16, label: "Shaded isometric" },
  { x: 82, y: 62, tx: 93, ty: 80, label: "Detail A · scale 1:1" },
  { x: 45, y: 88, tx: 24, ty: 95, label: "Title block · A-size border" },
];

/**
 * The NX drawing sheet with its own anatomy annotated. Leader lines draw in
 * when the sheet comes into view, the way you'd talk somebody through a print.
 */
export function DrawingSheet() {
  const [ref, seen] = useOnceInView<HTMLDivElement>("-8% 0px");

  return (
    <figure ref={ref} className="border border-line bg-panel">
      <div className="mono flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-[10px] tracking-[0.16em] uppercase">
        <span className="text-signal">Siemens NX · drawing sheet</span>
        <span className="ml-auto text-steel-dim">Dimensioned in inches</span>
      </div>

      <div className="relative aspect-[1400/1062] w-full bg-[#f4f5f6]">
        <Image
          src="/img/cad/nx-drawing-sheet.jpg"
          alt="A full Siemens NX drawing sheet with title block: four orthographic views, a section B-B, a shaded isometric and a detail A at 1:1, dimensioned in inches on an A-size border."
          fill
          sizes="(max-width:1024px) 100vw, 1100px"
          className="object-contain"
        />

        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {CALLOUTS.map((c, i) => (
            <g key={c.label}>
              <path
                d={`M${c.x} ${c.y} L${c.tx} ${c.ty}`}
                stroke="var(--signal)"
                strokeWidth="0.18"
                fill="none"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={seen ? 0 : 1}
                style={{ transition: `stroke-dashoffset 700ms ease-out ${300 + i * 140}ms` }}
              />
              <circle
                cx={c.x}
                cy={c.y}
                r="0.7"
                fill="var(--signal)"
                opacity={seen ? 1 : 0}
                style={{ transition: `opacity 300ms ${700 + i * 140}ms` }}
              />
            </g>
          ))}
        </svg>

        {CALLOUTS.map((c, i) => (
          <span
            key={c.label}
            aria-hidden
            className="mono absolute hidden -translate-y-1/2 whitespace-nowrap bg-ground/90 px-1.5 py-0.5 text-[9px] tracking-[0.12em] text-signal uppercase sm:block"
            style={{
              left: `${c.tx}%`,
              top: `${c.ty}%`,
              transform: `translate(${c.tx > 60 ? "-100%" : "0"}, -50%)`,
              opacity: seen ? 1 : 0,
              transition: `opacity 400ms ${800 + i * 140}ms`,
            }}
          >
            {c.label}
          </span>
        ))}
      </div>

      <figcaption className="border-t border-line px-4 py-3 text-[12.5px] leading-relaxed text-steel-dim">
        Four orthographic views, a section B-B, a shaded isometric and a detail A
        at 1:1 — dimensioned in inches on an A-size border with a full title block.
      </figcaption>
    </figure>
  );
}
