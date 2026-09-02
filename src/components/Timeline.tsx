import { EXPERIENCE } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Timeline() {
  return (
    <ol className="relative border-l border-line pl-6 md:pl-10">
      {EXPERIENCE.map((r, i) => (
        <Reveal as="li" key={r.org} delay={i * 60} className="relative pb-10 last:pb-0">
          <span
            aria-hidden
            className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 md:-left-[42px]"
            style={{
              background: r.current ? "var(--signal)" : "var(--ground)",
              border: `1.5px solid ${r.current ? "var(--signal)" : "var(--line-bright)"}`,
              boxShadow: r.current ? "0 0 0 4px rgba(214,32,46,0.14)" : "none",
            }}
          />
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="display text-[19px] tracking-tight text-chalk">{r.org}</h3>
            {r.current && (
              <span className="mono rounded-sm border border-signal/50 px-1.5 py-0.5 text-[9px] tracking-[0.16em] text-signal uppercase">
                Current
              </span>
            )}
            <span className="mono ml-auto text-[10px] tracking-[0.14em] text-steel-dim uppercase">
              {r.when}
            </span>
          </div>
          <p className="mono mt-1 text-[10px] tracking-[0.14em] text-steel-dim uppercase">
            {r.title} · {r.place}
          </p>
          <ul className="mt-3 space-y-1.5">
            {r.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-[14px] leading-relaxed text-steel">
                <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-line-bright" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}
