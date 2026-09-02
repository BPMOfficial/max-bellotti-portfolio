"use client";

import { useEffect, useRef, useState } from "react";
import { dpr, useReducedMotion } from "@/hooks/useReducedMotion";

type Chip = { x: number; y: number; vx: number; vy: number; life: number; r: number };

/** Finished profile: half-height of the part at a given x, in canvas units. */
const W = 1000;
const H = 260;
const X0 = 90;
const X1 = 910;
const CY = H / 2;
const STOCK = 74;

function profileAt(x: number): number {
  // a stepped, turned part — collar, shank, relief, nose chamfer
  const t = (x - X0) / (X1 - X0);
  if (t < 0.14) return 70;
  if (t < 0.2) return 70 - (t - 0.14) * (28 / 0.06); // shoulder
  if (t < 0.52) return 42;
  if (t < 0.58) return 42 - (t - 0.52) * (12 / 0.06);
  if (t < 0.82) return 30;
  if (t < 0.88) return 30 + (t - 0.82) * (10 / 0.06); // relief
  if (t < 0.96) return 40 - (t - 0.88) * (14 / 0.08); // chamfer to nose
  return 26;
}

export function MaterialRemoval() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const progress = useRef(0);
  const chips = useRef<Chip[]>([]);
  const [readout, setReadout] = useState({ z: 0, d: 0.748 });

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const ratio = dpr();
    const resize = () => {
      cv.width = W * ratio;
      cv.height = H * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();

    let visible = false;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      },
      { rootMargin: "150px 0px" },
    );
    io.observe(el);

    const readProgress = () => {
      const r = el.getBoundingClientRect();
      // 0 when the block's top reaches 80% of the viewport, 1 when its bottom
      // passes 35% — a comfortable travel for a single scroll gesture
      const span = r.height + window.innerHeight * 0.45;
      const p = (window.innerHeight * 0.8 - r.top) / span;
      progress.current = Math.max(0, Math.min(1, p));
    };
    readProgress();
    window.addEventListener("scroll", readProgress, { passive: true });
    window.addEventListener("resize", () => {
      resize();
      readProgress();
    });

    let raf = 0;
    let last = performance.now();
    let lastCut = X0;

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(48, now - last);
      last = now;

      const p = reduced ? 0.72 : progress.current;
      const cutX = X0 + (X1 - X0) * p;

      // --- chips spawn at the cutting edge while it advances ---
      if (!reduced && cutX > lastCut + 0.4 && p > 0.01 && p < 0.995) {
        const n = Math.min(4, Math.ceil((cutX - lastCut) / 3));
        for (let i = 0; i < n; i++) {
          chips.current.push({
            x: cutX,
            y: CY - profileAt(cutX) - 2,
            vx: 0.06 + Math.random() * 0.12,
            vy: -(0.09 + Math.random() * 0.16),
            life: 1,
            r: 0.7 + Math.random() * 1.3,
          });
        }
      }
      if (cutX > lastCut) lastCut = cutX;
      if (cutX < lastCut - 4) {
        lastCut = cutX;
        chips.current.length = 0;
      }

      // --- integrate chips ---
      for (const c of chips.current) {
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.vy += 0.0016 * dt;
        c.life -= 0.0016 * dt;
      }
      chips.current = chips.current.filter((c) => c.life > 0).slice(-160);

      // --- draw ---
      ctx.clearRect(0, 0, W, H);

      // uncut stock, to the right of the tool
      ctx.fillStyle = "#2b3037";
      ctx.beginPath();
      ctx.rect(cutX, CY - STOCK, X1 - cutX, STOCK * 2);
      ctx.fill();
      ctx.strokeStyle = "#3d444d";
      ctx.lineWidth = 1;
      ctx.stroke();

      // finished profile, to the left
      ctx.fillStyle = "#454d57";
      ctx.beginPath();
      ctx.moveTo(X0, CY - profileAt(X0));
      for (let x = X0; x <= cutX; x += 2) ctx.lineTo(x, CY - profileAt(x));
      for (let x = cutX; x >= X0; x -= 2) ctx.lineTo(x, CY + profileAt(x));
      ctx.closePath();
      ctx.fill();

      // machined-surface highlight
      ctx.strokeStyle = "#9aa4ae";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(X0, CY - profileAt(X0));
      for (let x = X0; x <= cutX; x += 2) ctx.lineTo(x, CY - profileAt(x));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(X0, CY + profileAt(X0));
      for (let x = X0; x <= cutX; x += 2) ctx.lineTo(x, CY + profileAt(x));
      ctx.stroke();

      // chuck jaws
      ctx.fillStyle = "#1b1f24";
      ctx.fillRect(30, CY - 96, 62, 192);
      ctx.strokeStyle = "#3d444d";
      ctx.strokeRect(30.5, CY - 95.5, 61, 191);
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(30, CY - 96 + i * 32 + 16);
        ctx.lineTo(92, CY - 96 + i * 32 + 16);
        ctx.stroke();
      }

      // centreline, dash-dot
      ctx.strokeStyle = "rgba(63,217,224,0.45)";
      ctx.lineWidth = 1;
      ctx.setLineDash([18, 5, 3, 5]);
      ctx.beginPath();
      ctx.moveTo(20, CY);
      ctx.lineTo(W - 20, CY);
      ctx.stroke();
      ctx.setLineDash([]);

      // chips
      for (const c of chips.current) {
        ctx.globalAlpha = Math.max(0, c.life) * 0.9;
        ctx.fillStyle = c.life > 0.6 ? "#f2a93b" : "#8a9199";
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // tool: a triangular insert riding the cut
      if (p > 0.002 && p < 0.999) {
        const ty = CY - profileAt(cutX);
        ctx.fillStyle = "#d6202e";
        ctx.beginPath();
        ctx.moveTo(cutX, ty - 1);
        ctx.lineTo(cutX + 26, ty - 34);
        ctx.lineTo(cutX - 20, ty - 34);
        ctx.closePath();
        ctx.fill();
        // holder
        ctx.fillStyle = "#20242a";
        ctx.fillRect(cutX - 22, ty - 62, 50, 30);
        ctx.strokeStyle = "#4a525b";
        ctx.strokeRect(cutX - 21.5, ty - 61.5, 49, 29);
        // spark at the edge
        ctx.fillStyle = "rgba(242,169,59,0.8)";
        ctx.beginPath();
        ctx.arc(cutX, ty, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // finished-length dimension once the pass completes
      if (p > 0.97) {
        ctx.strokeStyle = "rgba(63,217,224,0.7)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(X0, CY + 108);
        ctx.lineTo(X1, CY + 108);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(X0, CY + 103);
        ctx.lineTo(X0, CY + 113);
        ctx.moveTo(X1, CY + 103);
        ctx.lineTo(X1, CY + 113);
        ctx.stroke();
      }

      const z = p * 3.2;
      const dHere = (profileAt(cutX) / STOCK) * 0.748;
      setReadout((r) =>
        Math.abs(r.z - z) > 0.004 || Math.abs(r.d - dHere) > 0.0008
          ? { z, d: p > 0.995 ? 0.5282 : dHere }
          : r,
      );

      if (visible && !reduced) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", readProgress);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={wrap} className="border border-line bg-panel">
      {/* DRO */}
      <div className="mono flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line px-4 py-2.5 text-[11px] tracking-[0.12em] uppercase">
        <span className="text-steel-dim">Sharp manual lathe · DRO</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="text-steel-dim">Z</span>
          <span className="text-cyan tabular-nums">
            {readout.z.toFixed(4)}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-steel-dim">⌀</span>
          <span
            className={`tabular-nums ${readout.d <= 0.5283 ? "text-signal" : "text-chalk"}`}
          >
            {readout.d.toFixed(4)}
          </span>
          <span className="text-steel-dim">in</span>
        </span>
      </div>

      <canvas
        ref={canvas}
        role="img"
        aria-label="Diagram of a turning pass: a lathe tool travels along bar stock held in a chuck, cutting it down to a stepped profile and finishing at a diameter of 0.5282 inches."
        className="block w-full"
        style={{ aspectRatio: `${W} / ${H}` }}
      />

      <p className="border-t border-line px-4 py-2.5 text-[12px] leading-relaxed text-steel-dim">
        Scroll to run the pass. The target is the real hand-written dimension
        from the bench photo below — <span className="mono text-signal">.5282 in</span>.
      </p>
    </div>
  );
}
