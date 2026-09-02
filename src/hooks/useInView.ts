"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Gates work on visibility. Every rAF loop on this site hangs off this so
 * nothing burns frames while it is scrolled off screen.
 *
 * Initial state is always false so the server and client agree on the first
 * render; where IntersectionObserver is missing entirely we flip to visible on
 * the next frame rather than leaving content hidden forever.
 */
export function useInView<T extends HTMLElement>(
  rootMargin = "120px 0px",
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

/** Fires once and stays true — for reveals that should not replay. */
export function useOnceInView<T extends HTMLElement>(
  rootMargin = "-12% 0px",
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, rootMargin]);

  return [ref, seen];
}
