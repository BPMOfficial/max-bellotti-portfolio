"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_STATS, PROFILE } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Counter({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // ease-out-quint so it lands rather than crawls
      setN(Math.round(to * (1 - Math.pow(1 - p, 5))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);

  // before the count starts — and whenever motion is reduced — show the value
  return <>{run ? n : to}</>;
}

export function Hero() {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLit(true), reduced ? 0 : 180);
    return () => clearTimeout(t);
  }, [reduced]);

  const name = "MAX BELLOTTI";
  const draw = (delayMs: number, len = 1200) =>
    reduced
      ? { strokeDashoffset: 0 }
      : {
          strokeDasharray: len,
          strokeDashoffset: lit ? 0 : len,
          transition: `stroke-dashoffset 1100ms cubic-bezier(.2,.7,.2,1) ${delayMs}ms`,
        };

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src="/img/hero/autocross-pan.jpg"
        alt="The Global Formula Racing car on course during autocross at Formula SAE Michigan, panned at speed."
        fill
        priority
        sizes="100vw"
        className="object-cover object-[63%_center] lg:object-center"
        style={{ filter: "saturate(0.92) contrast(1.06) brightness(0.78)" }}
      />

      {/* grade — keeps type legible over a bright sky */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ground via-ground/55 to-ground/25 lg:via-ground/62 lg:to-ground/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ground/88 via-ground/25 to-ground/45"
      />

      {/* drafting overlay — lives in the sky above the car so it never
          collides with the type below */}
      <svg
        aria-hidden
        className="absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="var(--cyan)" strokeWidth="1.25" opacity="0.55">
          <line x1="640" y1="364" x2="640" y2="262" style={draw(300, 160)} />
          <line x1="1180" y1="364" x2="1180" y2="262" style={draw(380, 160)} />
          <line x1="640" y1="280" x2="1180" y2="280" style={draw(560, 580)} />
        </g>
        <g fill="var(--cyan)" opacity={lit ? 0.8 : 0}
          style={{ transition: "opacity 400ms 950ms" }}>
          <path d="M640 280 l14 -5 v10 z" />
          <path d="M1180 280 l-14 -5 v10 z" />
        </g>

        {/* datum feature symbols */}
        <g opacity={lit ? 0.8 : 0} style={{ transition: "opacity 500ms 1050ms" }}>
          <path d="M640 364 l-9 -16 h18 z" fill="none" stroke="var(--signal)" strokeWidth="1.3" />
          <path d="M1180 364 l-9 -16 h18 z" fill="none" stroke="var(--signal)" strokeWidth="1.3" />
          <text x="640" y="392" fill="var(--signal)" fontSize="15" textAnchor="middle"
            fontFamily="var(--font-jbmono), monospace" letterSpacing="2">A</text>
          <text x="1180" y="392" fill="var(--signal)" fontSize="15" textAnchor="middle"
            fontFamily="var(--font-jbmono), monospace" letterSpacing="2">B</text>
        </g>

        {/* corner ticks */}
        <g stroke="var(--steel-dim)" strokeWidth="1" opacity={lit ? 0.55 : 0}
          style={{ transition: "opacity 600ms 200ms" }}>
          <path d="M40 40 h34 M40 40 v34" />
          <path d="M1560 40 h-34 M1560 40 v34" />
          <path d="M40 860 h34 M40 860 v-34" />
          <path d="M1560 860 h-34 M1560 860 v-34" />
        </g>
      </svg>

      {/* annotation — anchored in the layout, with its own leader so the line
          always meets the block no matter how the photo crops */}
      <div
        aria-hidden
        className="absolute right-8 top-[15%] z-[1] hidden w-[320px] lg:block"
        style={{ opacity: lit ? 1 : 0, transition: "opacity 600ms 1250ms" }}
      >
        <svg
          className="absolute -left-[170px] top-0 h-[280px] w-[170px] overflow-visible"
          viewBox="0 0 170 280"
          fill="none"
        >
          <path
            d="M6 274 L112 22 L170 22"
            stroke="var(--amber)"
            strokeWidth="1.15"
            opacity="0.8"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={lit ? 0 : 1}
            style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.2,.7,.2,1) 900ms" }}
          />
          <circle cx="6" cy="274" r="4.5" fill="none" stroke="var(--amber)" strokeWidth="1.3" />
        </svg>
        <div className="mono bg-ground/70 py-1 text-right text-[11px] leading-[1.75] tracking-[0.14em] uppercase backdrop-blur-[2px]">
          <div className="text-amber">FSAE Michigan 2026</div>
          <div className="text-steel">1st overall · Global Formula Racing</div>
          <div className="text-steel-dim">DHBW Ravensburg / Oregon State</div>
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-28 pt-28 md:px-8 md:pb-32">
        <p
          className="mono mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] tracking-[0.24em] text-steel uppercase"
          style={{ opacity: lit ? 1 : 0, transition: "opacity 600ms 200ms" }}
        >
          <span className="inline-block h-px w-8 bg-signal align-middle" />
          Mechanical Engineering
          <span className="text-line-bright">/</span>
          Aerospace Focus
        </p>

        <h1 className="display text-[clamp(2.75rem,10.5vw,9.5rem)] text-chalk">
          <span className="sr-only">{name}</span>
          <span aria-hidden className="block">
            {name.split("").map((c, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  opacity: lit ? 1 : 0,
                  transform: lit ? "none" : "translateY(0.22em)",
                  transition: `opacity 520ms cubic-bezier(.2,.7,.2,1) ${260 + i * 34}ms, transform 520ms cubic-bezier(.2,.7,.2,1) ${260 + i * 34}ms`,
                }}
              >
                {c === " " ? " " : c}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="mt-6 max-w-2xl text-balance text-[15px] leading-relaxed text-steel md:text-[17px]"
          style={{ opacity: lit ? 1 : 0, transition: "opacity 700ms 800ms" }}
        >
          {PROFILE.summary}
        </p>

        {/* stat strip */}
        <dl
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4 md:max-w-4xl"
          style={{ opacity: lit ? 1 : 0, transition: "opacity 700ms 1000ms" }}
        >
          {HERO_STATS.map((s, i) => (
            <div key={s.k}>
              <dd className="display flex items-baseline text-[clamp(1.75rem,4vw,2.75rem)] text-chalk">
                <Counter to={Number(s.v)} run={lit && !reduced} />
                {s.suffix && (
                  <span className="mono ml-1 text-[11px] tracking-widest text-signal">
                    {s.suffix}
                  </span>
                )}
              </dd>
              <dt className="label mt-1.5 block" style={{ transitionDelay: `${i * 60}ms` }}>
                {s.k}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* dial-indicator scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-14 right-5 z-10 hidden md:right-8 md:block"
        style={{ opacity: lit ? 1 : 0, transition: "opacity 700ms 1400ms" }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke="var(--line-bright)" strokeWidth="1" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="26"
              y1="4"
              x2="26"
              y2={i % 6 === 0 ? 10 : 7}
              stroke="var(--line-bright)"
              strokeWidth="1"
              transform={`rotate(${i * 15} 26 26)`}
            />
          ))}
          <line
            x1="26"
            y1="26"
            x2="26"
            y2="9"
            stroke="var(--signal)"
            strokeWidth="1.5"
            style={
              reduced
                ? { transform: "rotate(35deg)", transformOrigin: "26px 26px" }
                : {
                    transformOrigin: "26px 26px",
                    animation: "dial 3.2s cubic-bezier(.5,0,.5,1) infinite",
                  }
            }
          />
          <circle cx="26" cy="26" r="2" fill="var(--signal)" />
        </svg>
        <style>{`@keyframes dial{0%,100%{transform:rotate(-28deg)}50%{transform:rotate(44deg)}}`}</style>
      </div>
    </section>
  );
}
