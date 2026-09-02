"use client";

import { useOnceInView } from "@/hooks/useInView";

const ZONES_Y = ["A", "B", "C", "D"];
const ZONES_X = ["1", "2", "3", "4", "5"];

/**
 * Wraps a section in an ASME-style drawing sheet border: zone letters down the
 * side, numbers across the top, and a title block in the corner. The border
 * strokes itself in when the section first comes into view.
 */
export function SheetFrame({
  index,
  kicker,
  sheet,
  total,
  scale = "1:1",
  children,
}: {
  index: string;
  kicker: string;
  sheet: number;
  total: number;
  scale?: string;
  children: React.ReactNode;
}) {
  const [ref, seen] = useOnceInView<HTMLDivElement>("-6% 0px");

  return (
    <div ref={ref} className="relative">
      {/* zone rulers — decorative, hidden from assistive tech */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute left-0 top-0 h-full w-6 border-r border-line/70">
          {ZONES_Y.map((z, i) => (
            <span
              key={z}
              className="mono absolute left-1/2 -translate-x-1/2 text-[10px] text-steel-dim/70"
              style={{ top: `${(i + 0.5) * (100 / ZONES_Y.length)}%` }}
            >
              {z}
            </span>
          ))}
        </div>
        <div className="absolute left-6 right-0 top-0 h-6 border-b border-line/70">
          {ZONES_X.map((z, i) => (
            <span
              key={z}
              className="mono absolute top-1/2 -translate-y-1/2 text-[10px] text-steel-dim/70"
              style={{ left: `${(i + 0.5) * (100 / ZONES_X.length)}%` }}
            >
              {z}
            </span>
          ))}
        </div>
        {/* the stroking border */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke="var(--line-bright)"
            strokeWidth="1"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={seen ? 0 : 100}
            style={{ transition: "stroke-dashoffset 1600ms cubic-bezier(.2,.7,.2,1)" }}
          />
        </svg>
      </div>

      <div className="lg:pl-10 lg:pt-10">{children}</div>

      {/* title block */}
      <div
        aria-hidden
        className="mono mt-10 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-3 text-[10px] tracking-[0.16em] text-steel-dim uppercase lg:ml-10"
      >
        <span className="text-signal">SECTION {index}</span>
        <span>{kicker}</span>
        <span className="hidden sm:inline">SCALE {scale}</span>
        <span className="ml-auto">
          SHEET {String(sheet).padStart(2, "0")} OF {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
