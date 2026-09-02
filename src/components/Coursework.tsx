import Image from "next/image";
import { COURSES, COURSEWORK } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Coursework() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {COURSEWORK.map((c, i) => (
          <Reveal key={c.src} delay={i * 60}>
            <figure className="group">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-line bg-panel">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(max-width:768px) 50vw, 260px"
                  className="object-cover object-top opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
                {/* scanline sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(63,217,224,0.18), transparent)",
                    animation: "scan 2.2s linear infinite",
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 border border-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                />
              </div>
              <figcaption className="mono mt-2 text-[10px] tracking-[0.12em] text-steel-dim uppercase">
                {c.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={220}>
        <ul className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
          {COURSES.map((c) => (
            <li
              key={c}
              className="mono border border-line px-2.5 py-1 text-[10px] tracking-[0.12em] text-steel-dim uppercase transition-colors hover:border-line-bright hover:text-steel"
            >
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}
