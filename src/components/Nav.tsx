"use client";

import { useEffect, useState } from "react";
import { NAV } from "./Hud";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-ground/85 backdrop-blur-md" : ""
      }`}
    >
      {/* before the bar goes solid the hero sky sits behind it, so carry a
          scrim to keep the index legible */}
      {!solid && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ground/90 via-ground/55 to-transparent"
        />
      )}
      <div className="relative mx-auto flex max-w-[1600px] items-center gap-4 px-5 py-3 md:px-8">
        <a href="#top" className="group flex items-baseline gap-2.5">
          <span className="display text-[15px] tracking-tight text-chalk">
            MAX BELLOTTI
          </span>
          <span className="mono hidden whitespace-nowrap text-[10px] tracking-[0.2em] text-steel-dim uppercase sm:inline">
            ME · Aero
          </span>
        </a>

        <nav aria-label="Sections" className="ml-auto hidden xl:block">
          <ul className="flex items-center">
            {NAV.slice(1).map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="mono group flex items-center gap-1.5 whitespace-nowrap rounded-sm px-2 py-1.5 text-[10px] tracking-[0.1em] text-steel uppercase transition-colors hover:text-chalk"
                >
                  <span className="text-signal/60 transition-colors group-hover:text-signal">
                    {n.index}
                  </span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contact"
          className="mono ml-auto hidden rounded-sm border border-line-bright px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-chalk uppercase transition-colors hover:border-signal hover:text-signal xl:ml-4 xl:block"
        >
          Contact
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="mono ml-auto rounded-sm border border-line-bright px-3 py-1.5 text-[10px] tracking-[0.16em] text-chalk uppercase xl:hidden"
        >
          {open ? "Close" : "Index"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="border-t border-line bg-ground/97 backdrop-blur-md xl:hidden"
        >
          <ul className="mx-auto max-w-[1600px] px-5 py-2 md:px-8">
            {NAV.slice(1).map((n) => (
              <li key={n.id} className="border-b border-line/60 last:border-0">
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="mono flex items-center gap-3 py-3 text-[11px] tracking-[0.14em] text-steel uppercase"
                >
                  <span className="text-signal">{n.index}</span>
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mono flex items-center gap-3 py-3 text-[11px] tracking-[0.14em] text-chalk uppercase"
              >
                <span className="text-signal">→</span> Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
