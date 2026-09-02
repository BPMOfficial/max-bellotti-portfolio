"use client";

import { useSyncExternalStore } from "react";
import { PERSONAL, PROFILE } from "@/lib/content";
import { Reveal } from "./Reveal";

const subscribeNever = () => () => {};

export function Contact() {
  // assembled on the client only, so the plain address is not sitting in the
  // served markup for a scraper to lift
  const mail = useSyncExternalStore(
    subscribeNever,
    () => `${PROFILE.email[0]}@${PROFILE.email[1]}`,
    () => "",
  );

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <Reveal>
          <p className="mono mb-4 flex items-center gap-3 text-[10px] tracking-[0.22em] text-signal uppercase">
            <span className="inline-block h-px w-7 bg-signal" />
            Contact
          </p>
          <h2 className="display max-w-4xl text-[clamp(2rem,6vw,4.5rem)] text-chalk">
            Looking for a summer 2027 internship in aerospace or hardware.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={mail ? `mailto:${mail}` : undefined}
              className="mono group inline-flex items-center gap-3 border border-line-bright px-5 py-3 text-[12px] tracking-[0.14em] text-chalk uppercase transition-colors hover:border-signal hover:text-signal"
            >
              <span className="text-signal transition-colors group-hover:text-signal">→</span>
              {mail || "Loading address…"}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mono inline-flex items-center gap-3 border border-line px-5 py-3 text-[12px] tracking-[0.14em] text-steel uppercase transition-colors hover:border-line-bright hover:text-chalk"
            >
              {PROFILE.linkedinLabel}
              <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <dl className="mono mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8 sm:grid-cols-4 lg:max-w-4xl">
            {PERSONAL.map((p) => (
              <div key={p.k}>
                <dt className="text-[10px] tracking-[0.16em] text-steel-dim uppercase">
                  {p.k}
                </dt>
                <dd className="mt-1 text-[15px] text-chalk">{p.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
