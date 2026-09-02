"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * Photo grid with a keyboard-navigable lightbox. Captions come straight from
 * the portfolio PDF and double as alt text, so nothing is described twice.
 */
export function Gallery({
  photos,
  cols = 3,
  feature = false,
}: {
  photos: Photo[];
  cols?: 2 | 3 | 4;
  /** render the first photo full-width above the grid */
  feature?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? null : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, move]);

  const head = feature ? photos[0] : null;
  const rest = feature ? photos.slice(1) : photos;
  const gridCols =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      {head && (
        <Reveal className="mb-4">
          <Tile photo={head} index={0} onOpen={setOpen} tall />
        </Reveal>
      )}
      <div className={`grid grid-cols-1 gap-4 ${gridCols}`}>
        {rest.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 70}>
            <Tile photo={p} index={feature ? i + 1 : i} onOpen={setOpen} />
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].caption}
          className="fixed inset-0 z-[100] flex flex-col bg-ground/97 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div className="mono flex items-center justify-between border-b border-line px-5 py-3 text-[10px] tracking-[0.18em] text-steel-dim uppercase">
            <span>
              <span className="text-signal">
                {String(open + 1).padStart(2, "0")}
              </span>{" "}
              / {String(photos.length).padStart(2, "0")}
            </span>
            <span className="hidden sm:block">← → to page · ESC to close</span>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="rounded-sm border border-line-bright px-2.5 py-1 text-chalk"
            >
              Close
            </button>
          </div>

          <div
            className="relative flex-1 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[open].src}
              alt={photos[open].alt}
              fill
              sizes="100vw"
              className="object-contain p-4"
            />
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => move(-1)}
              className="mono absolute left-2 top-1/2 -translate-y-1/2 rounded-sm border border-line-bright bg-ground/70 px-3 py-4 text-chalk hover:border-signal"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => move(1)}
              className="mono absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border border-line-bright bg-ground/70 px-3 py-4 text-chalk hover:border-signal"
            >
              →
            </button>
          </div>

          <p
            className="border-t border-line px-5 py-4 text-[13px] leading-relaxed text-steel"
            onClick={(e) => e.stopPropagation()}
          >
            {photos[open].caption}
          </p>
        </div>
      )}
    </>
  );
}

function Tile({
  photo,
  index,
  onOpen,
  tall = false,
}: {
  photo: Photo;
  index: number;
  onOpen: (i: number) => void;
  tall?: boolean;
}) {
  return (
    <figure className="group">
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="relative block w-full overflow-hidden border border-line bg-panel"
        aria-label={`Enlarge: ${photo.caption}`}
      >
        <div className={`relative w-full ${tall ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={tall ? "(max-width:1024px) 100vw, 1100px" : "(max-width:640px) 100vw, (max-width:1024px) 50vw, 380px"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            style={{ objectPosition: photo.pos ?? "center" }}
          />
        </div>
        {/* corner ticks + index, drawn on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-cyan" />
          <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-cyan" />
          <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-cyan" />
          <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-cyan" />
          <span className="mono absolute bottom-2.5 right-6 text-[10px] tracking-widest text-cyan">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
      </button>
      <figcaption className="mt-2.5 text-[12.5px] leading-relaxed text-steel-dim">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
