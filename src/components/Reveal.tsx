"use client";

import { useOnceInView } from "@/hooks/useInView";

/**
 * The one reveal primitive. Under reduced motion the CSS transition duration is
 * clamped globally, so this collapses to an instant, fully legible render.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const [ref, seen] = useOnceInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : `translateY(${y}px)`,
        transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: seen ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
