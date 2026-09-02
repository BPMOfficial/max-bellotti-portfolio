"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
 * The AMF 82-70 cycle, in side elevation.
 *
 * Sequence, as the machine actually runs it on a first ball: the ball strikes
 * the cushion and trips the machine; the sweep drops to its guard position in
 * front of the deck; the table descends and the respot cells close around the
 * necks of the pins still standing; the table lifts, holding them; the sweep
 * strokes back across the deck, pushing the deadwood into the pit, then
 * returns to guard; the table descends again and respots the standing pins;
 * table and sweep return to rest.
 *
 * Running continuously underneath all of that: the pit conveyor, which carries
 * ball and pins to the back, the ball return that diverts the ball off to the
 * side, and the circular pin elevator that lifts pins to the distributor for
 * the next full rack.
 */

const DECK_Y = 250;
const TABLE_UP = 96;
const TABLE_DOWN = 224;
const TABLE_X0 = 214;
const TABLE_X1 = 338;

/** Which pins are left standing after the first ball. */
const STANDING = new Set([0, 2, 5, 7]);

/**
 * The rack as it projects into a side elevation: four rows stepping back and
 * up, so the ten pins stay individually readable rather than a single clump.
 */
const PINS = Array.from({ length: 10 }, (_, i) => {
  const row = i < 4 ? 0 : i < 7 ? 1 : i < 9 ? 2 : 3;
  const col = i < 4 ? i : i < 7 ? i - 4 : i < 9 ? i - 7 : 0;
  return { x: 234 + col * 27 + row * 13.5, dy: -row * 8 };
});

const PHASES: [number, string, string][] = [
  [0.0, "Ball", "Ball strikes the pins"],
  [0.12, "Guard", "Sweep drops in front of the deck"],
  [0.22, "Table down", "Respot cells close on standing pins"],
  [0.36, "Table up", "Standing pins lifted clear"],
  [0.48, "Sweep", "Deadwood pushed into the pit"],
  [0.62, "Return", "Sweep back to guard"],
  [0.72, "Respot", "Standing pins set back down"],
  [0.86, "Ready", "Table and sweep to rest"],
];

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

function Pin({ x, y, fallen }: { x: number; y: number; fallen: boolean }) {
  return (
    <g
      transform={`translate(${x} ${y}) ${fallen ? "rotate(-82) translate(0 -6)" : ""}`}
    >
      <path
        d="M0 0 c-4.2 0 -5.6 -2.4 -5.6 -4.6 c0 -2.6 3 -3.8 3.6 -6.4 c0.5 -2.2 -1.7 -2.9 -1.7 -5 c0 -2.2 1.7 -3.6 3.7 -3.6 c2 0 3.7 1.4 3.7 3.6 c0 2.1 -2.2 2.8 -1.7 5 c0.6 2.6 3.6 3.8 3.6 6.4 c0 2.2 -1.4 4.6 -5.6 4.6 z"
        fill="var(--chalk)"
        opacity="0.88"
      />
      <path d="M-2.4 -12.2 h4.8" stroke="var(--signal)" strokeWidth="1.4" opacity="0.8" />
    </g>
  );
}

export function LinkageCycle() {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [t, setT] = useState(reduced ? 0.52 : 0);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = false;
    const start = performance.now();
    const loop = (now: number) => {
      setT(((now - start) % 9000) / 9000);
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

  // --- table: down, up, down, up ---
  const travel = TABLE_DOWN - TABLE_UP;
  const tableY =
    TABLE_UP +
    travel * ease(seg(t, 0.22, 0.36)) -
    travel * ease(seg(t, 0.36, 0.48)) +
    travel * ease(seg(t, 0.72, 0.86)) -
    travel * ease(seg(t, 0.86, 1.0));

  // --- sweep: drops to guard, strokes back, returns, lifts ---
  const sweepBottom = 200 + 50 * ease(seg(t, 0.12, 0.22)) - 50 * ease(seg(t, 0.86, 1.0));
  const sweepX =
    205 + 140 * ease(seg(t, 0.48, 0.62)) - 140 * ease(seg(t, 0.62, 0.72));

  // pins ride the table between the cells closing and the respot releasing
  const held = t >= 0.36 && t < 0.86;
  const knockedAt = 0.085;
  const fallen = t >= knockedAt;

  // --- ball: down the lane, into the pit, out along the return ---
  const roll = seg(t, 0, 0.1);
  const drop = seg(t, 0.1, 0.17);
  const across = seg(t, 0.17, 0.27);
  const back = seg(t, 0.27, 0.46);
  const ball =
    back > 0
      ? { x: 486 - 466 * ease(back), y: 292, on: back < 1 }
      : across > 0
        ? { x: 372 + 114 * across, y: 270, on: true }
        : drop > 0
          ? { x: 330 + 42 * drop, y: 241 + 29 * drop * drop, on: true }
          : { x: 20 + 310 * roll, y: 241, on: roll > 0 };

  const current = [...PHASES].reverse().find(([at]) => t >= at) ?? PHASES[0];
  const wheel = t * 720;
  const dist = 232 + 196 * (0.5 - 0.5 * Math.cos(t * Math.PI * 4));

  return (
    <div className="border border-line bg-panel">
      <div className="mono flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-[10px] tracking-[0.16em] uppercase">
        <span className="text-signal">Machine cycle</span>
        <span className="text-steel-dim">AMF 82-70</span>
        <span className="ml-auto text-cyan/85">{current[1]}</span>
      </div>

      {/* the drawing has a legibility floor — below it, let it scroll */}
      <div className="overflow-x-auto">
      <div className="mx-auto w-full min-w-[500px] max-w-3xl px-4 py-2">
      <svg
        ref={ref}
        viewBox="0 0 560 310"
        className="block w-full"
        fill="none"
        role="img"
        aria-label="Animated side-elevation diagram of an AMF 82-70 pinsetter cycle: the sweep drops to guard, the spotting table descends and grips the standing pins, the table lifts, the sweep clears the deadwood into the pit, then the table respots the standing pins. The pit conveyor, ball return and circular pin elevator run continuously."
      >
        {/* ---------- structure ---------- */}
        {/* lane and pin deck */}
        <line x1="8" y1={DECK_Y} x2="210" y2={DECK_Y} stroke="var(--line-bright)" strokeWidth="1.5" />
        <line x1="210" y1={DECK_Y} x2="342" y2={DECK_Y} stroke="var(--steel-dim)" strokeWidth="2.5" />
        <line x1="210" y1={DECK_Y + 4} x2="342" y2={DECK_Y + 4} stroke="var(--signal)" strokeWidth="1" opacity="0.5" />

        {/* pit: cushion, floor, conveyor */}
        <path d="M342 250 L342 284 L516 284" stroke="var(--line-bright)" strokeWidth="1.5" />
        <rect x="342" y="196" width="7" height="54" fill="var(--line-bright)" opacity="0.55" />
        <line
          x1="352"
          y1="277"
          x2="510"
          y2="277"
          stroke="var(--cyan)"
          strokeWidth="1.5"
          opacity="0.5"
          strokeDasharray="12 9"
          style={reduced ? undefined : { animation: "beltRun 1.1s linear infinite" }}
        />

        {/* ball return */}
        <line x1="12" y1="292" x2="500" y2="292" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 5" />

        {/* ---------- pin elevator ---------- */}
        <g transform="translate(478 200)">
          <circle r="44" stroke="var(--line-bright)" strokeWidth="1.5" />
          <circle r="30" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4" />
          <g style={{ transform: `rotate(${wheel}deg)` }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              const cx = Math.cos(a) * 37;
              const cy = Math.sin(a) * 37;
              return (
                <g key={i}>
                  <line
                    x1={Math.cos(a) * 12}
                    y1={Math.sin(a) * 12}
                    x2={cx}
                    y2={cy}
                    stroke="var(--line-bright)"
                    strokeWidth="1"
                  />
                  {i % 3 === 0 && <circle cx={cx} cy={cy} r="4" fill="var(--amber)" opacity="0.85" />}
                </g>
              );
            })}
          </g>
          <circle r="4" fill="var(--line-bright)" />
        </g>

        {/* ---------- distributor ---------- */}
        <line x1="222" y1="72" x2="440" y2="72" stroke="var(--line-bright)" strokeWidth="1.5" />
        <path d="M440 72 L470 72 L478 150" stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4" />
        <g style={{ transform: `translateX(${dist - 232}px)` }}>
          <rect x="224" y="64" width="26" height="16" fill="var(--panel-2)" stroke="var(--amber)" strokeWidth="1.2" />
          <path d="M237 80 v9" stroke="var(--amber)" strokeWidth="1.2" />
        </g>

        {/* ---------- spotting table ---------- */}
        <g style={{ transform: `translateY(${tableY - TABLE_UP}px)` }}>
          {/* guides */}
          <line x1={TABLE_X0 + 6} y1="60" x2={TABLE_X0 + 6} y2={TABLE_UP} stroke="var(--line)" strokeWidth="1" />
          <line x1={TABLE_X1 - 6} y1="60" x2={TABLE_X1 - 6} y2={TABLE_UP} stroke="var(--line)" strokeWidth="1" />
          <rect
            x={TABLE_X0}
            y={TABLE_UP}
            width={TABLE_X1 - TABLE_X0}
            height="15"
            fill="var(--panel-2)"
            stroke="var(--cyan)"
            strokeWidth="1.4"
          />
          <text
            className="mono"
            x={TABLE_X1 + 10}
            y={TABLE_UP + 12}
            fontSize="8.5"
            letterSpacing="1.5"
            fill="var(--steel-dim)"
          >
            SPOTTING TABLE
          </text>
          {/* ten respot cells */}
          {PINS.map((p, i) => (
            <rect
              key={i}
              x={p.x - 5}
              y={TABLE_UP + 15 + p.dy}
              width="10"
              height={held && STANDING.has(i) ? 13 : 9}
              fill="none"
              stroke={held && STANDING.has(i) ? "var(--cyan)" : "var(--steel-dim)"}
              strokeWidth="1.2"
            />
          ))}
        </g>

        {/* ---------- pins ---------- */}
        {PINS.map((p, i) => {
          const standing = STANDING.has(i);
          if (standing) {
            const y = held ? tableY + 41 + p.dy : DECK_Y + p.dy;
            return <Pin key={i} x={p.x} y={y} fallen={false} />;
          }
          // deadwood: lies on the deck, then rides the sweep into the pit and
          // stays gone — it does not come back when the sweep returns
          const push = t >= 0.48 ? 140 * ease(seg(t, 0.48, 0.62)) : 0;
          const x = p.x + push;
          if (x > 344) return null;
          return <Pin key={i} x={x} y={DECK_Y + p.dy} fallen={fallen} />;
        })}

        {/* ---------- sweep ---------- */}
        <g style={{ transform: `translateX(${sweepX - 205}px)` }}>
          <line x1="205" y1="140" x2="205" y2={sweepBottom - 24} stroke="var(--line-bright)" strokeWidth="2" />
          <rect
            x="199"
            y={sweepBottom - 26}
            width="12"
            height="26"
            fill="var(--panel-2)"
            stroke="var(--signal)"
            strokeWidth="1.4"
          />
          <rect x="193" y={sweepBottom - 6} width="24" height="6" fill="var(--signal)" opacity="0.75" />
        </g>

        {/* ---------- ball ---------- */}
        {ball.on && (
          <g>
            <circle cx={ball.x} cy={ball.y} r="8.5" fill="var(--steel-dim)" />
            <circle cx={ball.x} cy={ball.y} r="8.5" fill="none" stroke="var(--chalk)" strokeWidth="1" opacity="0.5" />
          </g>
        )}

        {/* ---------- labels ---------- */}
        <g className="mono" fontSize="8.5" letterSpacing="1.5" fill="var(--steel-dim)">
          <text x="10" y={DECK_Y - 8}>LANE</text>
          <text x="214" y={DECK_Y + 18}>PIN DECK</text>
          <text x="352" y="298">PIT CONVEYOR</text>
          <text x="12" y="306">BALL RETURN</text>
          <text x="440" y="152" textAnchor="middle">PIN ELEVATOR</text>
          <text x="224" y="58">DISTRIBUTOR</text>
          <text x="150" y="146">SWEEP</text>
        </g>
      </svg>
      </div>
      </div>
      <style>{`@keyframes beltRun{to{stroke-dashoffset:-42}}`}</style>

      <ol className="grid grid-cols-2 gap-x-5 gap-y-2.5 border-t border-line px-4 py-3.5 sm:grid-cols-4">
        {PHASES.map(([at, label, detail], i) => {
          const next = PHASES[i + 1]?.[0] ?? 1;
          const on = t >= at && t < next;
          return (
            <li key={label}>
              <span
                className={`mono block text-[10px] tracking-[0.12em] uppercase ${on ? "text-signal" : "text-steel-dim"}`}
                style={{ transition: "color 260ms" }}
              >
                {String(i + 1).padStart(2, "0")} {label}
              </span>
              <span
                className={`mt-0.5 block text-[11.5px] leading-snug ${on ? "text-steel" : "text-steel-dim/70"}`}
                style={{ transition: "color 260ms" }}
              >
                {detail}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
