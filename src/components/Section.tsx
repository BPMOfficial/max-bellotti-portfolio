import { SheetFrame } from "./SheetFrame";
import { Reveal } from "./Reveal";
import type { Spec } from "@/lib/content";

export function Section({
  id,
  index,
  kicker,
  title,
  lede,
  body,
  specs,
  sheet,
  total,
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lede: string;
  body?: string[];
  specs?: Spec[];
  sheet: number;
  total: number;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <SheetFrame index={index} kicker={kicker} sheet={sheet} total={total}>
          <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <Reveal>
                <p className="mono mb-4 flex items-center gap-3 text-[10px] tracking-[0.22em] text-signal uppercase">
                  <span className="inline-block h-px w-7 bg-signal" />
                  {index} — {kicker}
                </p>
                <h2 className="display text-[clamp(2rem,5.2vw,3.75rem)] text-chalk">
                  {title}
                </h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="mt-6 max-w-3xl text-[15.5px] leading-relaxed text-steel md:text-[17px]">
                  {lede}
                </p>
              </Reveal>
              {body?.map((b, i) => (
                <Reveal key={i} delay={140 + i * 60}>
                  <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-steel-dim">
                    {b}
                  </p>
                </Reveal>
              ))}
            </div>

            {specs && (
              <Reveal delay={120} className="lg:pt-2">
                <dl className="divide-y divide-line border-y border-line">
                  {specs.map((s) => (
                    <div key={s.k} className="py-2.5">
                      <dt className="mono text-[10px] tracking-[0.14em] text-steel-dim uppercase">
                        {s.k}
                      </dt>
                      <dd className="mono mt-1 text-[12.5px] leading-snug text-chalk">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>

          {children && <div className="mt-12">{children}</div>}
        </SheetFrame>
      </div>
    </section>
  );
}
