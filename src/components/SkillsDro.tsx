"use client";

import { useEffect, useRef, useState } from "react";
import { SKILLS, TIER_FILL, TIER_LABEL, type Tier } from "@/lib/content";
import { useOnceInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TIER_COLOR: Record<Tier, string> = {
  primary: "var(--signal)",
  certified: "var(--cyan)",
  working: "var(--steel-dim)",
};

/** The bar overshoots its target and settles, like a DRO finding a value. */
function Bar({
  name,
  tier,
  note,
  run,
  delay,
}: {
  name: string;
  tier: Tier;
  note?: string;
  run: boolean;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const target = TIER_FILL[tier];
  const [settled, setSettled] = useState(0);
  const v = reduced ? (run ? target : 0) : settled;
  const raf = useRef(0);

  useEffect(() => {
    if (!run || reduced) return;
    const t0 = performance.now() + delay;
    const dur = 1150;
    const tick = (now: number) => {
      const t = (now - t0) / dur;
      if (t < 0) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      if (t >= 1) {
        setSettled(target);
        return;
      }
      const e = 1 - Math.pow(2, -9 * t) * Math.cos(t * 13.5);
      setSettled(Math.max(0, target * e));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [run, target, delay, reduced]);

  return (
    <li className="group">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[13.5px] text-steel transition-colors group-hover:text-chalk">
          {name}
        </span>
        <span
          className="mono text-[10px] tracking-[0.14em] uppercase"
          style={{ color: TIER_COLOR[tier] }}
        >
          {TIER_LABEL[tier]}
        </span>
      </div>
      <div className="relative mt-1.5 h-[3px] w-full bg-line">
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${Math.min(100, v)}%`, background: TIER_COLOR[tier] }}
        />
        <div
          className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-chalk/60"
          style={{ left: `${Math.min(100, v)}%` }}
        />
      </div>
      {note && (
        <p className="mono mt-1 text-[9.5px] tracking-[0.12em] text-steel-dim uppercase">
          {note}
        </p>
      )}
    </li>
  );
}

export function SkillsDro() {
  const [ref, seen] = useOnceInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-3">
        {SKILLS.map((g, gi) => (
          <div key={g.group}>
            <h3 className="mono mb-4 border-b border-line pb-2 text-[10px] tracking-[0.2em] text-signal uppercase">
              {g.group}
            </h3>
            <ul className="space-y-4">
              {g.items.map((s, i) => (
                <Bar
                  key={s.name}
                  name={s.name}
                  tier={s.tier}
                  note={s.note}
                  run={seen}
                  delay={gi * 90 + i * 70}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mono mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-4 text-[10px] tracking-[0.12em] text-steel-dim uppercase">
        <span>
          <span className="text-signal">Primary</span> — used on the work shown here
        </span>
        <span>
          <span className="text-cyan">Certified</span> — signed iLabs qualification
        </span>
        <span>Working — real project use</span>
      </p>
    </div>
  );
}
