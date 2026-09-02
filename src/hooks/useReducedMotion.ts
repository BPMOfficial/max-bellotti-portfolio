"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Subscribe to a media query the way React wants external stores subscribed. */
function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * True when the visitor has asked for reduced motion. Every animated component
 * reads this and renders one static, representative frame instead of looping.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on fine pointers — the crosshair HUD stays off on touch. */
export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** Caps device pixel ratio so canvases stay cheap on retina displays. */
export function dpr(): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, 2);
}
