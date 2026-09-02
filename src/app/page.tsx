import Image from "next/image";
import { SECTIONS, type Section as SectionType } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Hud } from "@/components/Hud";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";
import { SheetFrame } from "@/components/SheetFrame";
import { Toolpath } from "@/components/Toolpath";
import { MaterialRemoval } from "@/components/MaterialRemoval";
import { DrawingSheet } from "@/components/DrawingSheet";
import { BayonetPath } from "@/components/BayonetPath";
import { FoilRise } from "@/components/FoilRise";
import { GeometryReport } from "@/components/GeometryReport";
import { LinkageCycle } from "@/components/LinkageCycle";
import { SkillsDro } from "@/components/SkillsDro";
import { Timeline } from "@/components/Timeline";
import { SoftwareCard } from "@/components/SoftwareCard";
import { Coursework } from "@/components/Coursework";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const TOTAL = 10;
const S = Object.fromEntries(SECTIONS.map((s) => [s.id, s])) as Record<
  string,
  SectionType
>;

const FSAE_NODES = [
  {
    code: "G00 X0 Y0",
    when: "Sep 2025",
    text: "Joined the Global Formula Racing manufacturing group — the joint DHBW Ravensburg / Oregon State programme.",
  },
  {
    code: "G01 Z-12.400",
    when: "2025–26",
    text: "Cut outboard suspension hardware in aluminium and steel: tie rods, uprights and clevises, machined to the suspension group's drawings.",
  },
  {
    code: "G43 H01",
    when: "Winter 2026",
    text: "Modelled a retaining plate in Siemens NX tying the accumulator to the chassis geometry.",
  },
  {
    code: "M06 T04",
    when: "Winter 2026",
    text: "Validated the plate with 3D-printed prototypes before committing any metal.",
  },
  {
    code: "G54 P1",
    when: "Spring 2026",
    text: "Produced the ASME Y14.5 drawings used in the suspension outboard cost report.",
  },
  {
    code: "G01 F220",
    when: "Jun 2026",
    text: "Travelled with the team to Michigan International Speedway and worked the event — tech inspection, paddock turnaround and grid.",
  },
  {
    code: "M30",
    when: "Jun 2026",
    text: "Global Formula Racing took the overall win at Formula SAE Michigan 2026.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <Hud />

      <main className="grid-ground">
        <Hero />

        {/* 01 — Formula SAE */}
        <Section {...S.fsae} sheet={1} total={TOTAL}>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
            <div className="lg:sticky lg:top-24">
              <Toolpath nodes={FSAE_NODES} />
            </div>
            <div>
              <Gallery photos={S.fsae.photos.slice(0, 4)} cols={2} />
              <h3 className="mono mt-12 mb-4 border-b border-line pb-2 text-[10px] tracking-[0.2em] text-signal uppercase">
                Formula SAE Michigan 2026
              </h3>
              <Gallery photos={S.fsae.photos.slice(4)} cols={2} feature />
            </div>
          </div>
        </Section>

        {/* 02 — Machine shop */}
        <Section {...S.shop} sheet={2} total={TOTAL}>
          <Reveal>
            <MaterialRemoval />
          </Reveal>
          <div className="mt-12">
            <Gallery photos={S.shop.photos.slice(0, 8)} cols={4} />
          </div>
          <h3 className="mono mt-14 mb-4 border-b border-line pb-2 text-[10px] tracking-[0.2em] text-signal uppercase">
            Qualifications — cut to print, measured and signed off
          </h3>
          <Gallery photos={S.shop.photos.slice(8)} cols={3} />
        </Section>

        {/* 03 — CAD & drafting */}
        <Section {...S.cad} sheet={3} total={TOTAL}>
          <Reveal>
            <DrawingSheet />
          </Reveal>
          <div className="mt-12">
            <Gallery photos={S.cad.photos.slice(1)} cols={3} />
          </div>
        </Section>

        {/* 04 — Precision manufacturing */}
        <Section {...S.precision} sheet={4} total={TOTAL}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Reveal>
              <BayonetPath />
            </Reveal>
            <Reveal delay={100}>
              <Gallery photos={S.precision.photos.slice(3, 6)} cols={3} />
            </Reveal>
          </div>
          <h3 className="mono mt-14 mb-4 border-b border-line pb-2 text-[10px] tracking-[0.2em] text-signal uppercase">
            Prototype to product
          </h3>
          <Gallery
            photos={[
              ...S.precision.photos.slice(6),
              ...S.precision.photos.slice(0, 3),
            ]}
            cols={3}
          />
        </Section>

        {/* 05 — Navier */}
        <Section {...S.navier} sheet={5} total={TOTAL}>
          <Reveal>
            <FoilRise />
          </Reveal>
          <div className="mt-12">
            <Gallery photos={S.navier.photos.slice(1)} cols={3} />
          </div>
        </Section>

        {/* 06 — Wirz Aerospace Lab */}
        <Section {...S.wirz} sheet={6} total={TOTAL}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <Reveal>
              <figure className="border border-line bg-panel">
                <div className="mono flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-line px-4 py-2.5 text-[10px] tracking-[0.16em] uppercase">
                  <span className="text-signal">Hall effect thruster</span>
                  <span className="ml-auto text-steel-dim">Vacuum chamber viewport</span>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <Image
                    src="/img/wirz/plasma-discharge.jpg"
                    alt="A plasma discharge running inside one of the lab's vacuum chambers, between the Helmholtz coils on the optical breadboard."
                    fill
                    sizes="(max-width:1024px) 100vw, 700px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-line px-4 py-3 text-[12.5px] leading-relaxed text-steel-dim">
                  A plasma discharge running inside one of the lab&apos;s vacuum
                  chambers, between the Helmholtz coils on the optical breadboard.
                  Photographed through the chamber viewport during a test run.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={100}>
              <GeometryReport />
              <p className="mt-4 text-[14px] leading-relaxed text-steel-dim">
                Imported STEP geometry is rarely simulation-ready. Each chamber is
                measured, checked for sealed cavities and mating references, then
                the interior plasma volume is extracted as its own solid so COMSOL
                has a fluid domain to solve in.
              </p>
            </Reveal>
          </div>

          <h3 className="mono mt-14 mb-4 border-b border-line pb-2 text-[10px] tracking-[0.2em] text-signal uppercase">
            Chamber hardware & geometry preparation
          </h3>
          <Gallery photos={S.wirz.photos.slice(1)} cols={4} />
        </Section>

        {/* 07 — Maintenance */}
        <Section {...S.maintenance} sheet={7} total={TOTAL}>
          <Reveal>
            <LinkageCycle />
          </Reveal>
          <div className="mt-12">
            <Gallery photos={S.maintenance.photos} cols={2} />
          </div>
        </Section>

        {/* 08 — Coursework */}
        <section id="course" className="scroll-mt-20 border-t border-line py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-5 md:px-8">
            <SheetFrame index="08" kicker="Analysis" sheet={8} total={TOTAL}>
              <Reveal>
                <p className="mono mb-4 flex items-center gap-3 text-[10px] tracking-[0.22em] text-signal uppercase">
                  <span className="inline-block h-px w-7 bg-signal" />
                  08 — Analysis
                </p>
                <h2 className="display text-[clamp(2rem,5.2vw,3.75rem)] text-chalk">
                  Coursework
                </h2>
                <p className="mt-6 max-w-3xl text-[15.5px] leading-relaxed text-steel md:text-[17px]">
                  The analytical half of the same work. Dynamics, strength of
                  materials and quantum physics are what let me argue that a part
                  will hold before I cut it — and what makes a COMSOL result
                  something to check rather than something to believe.
                </p>
              </Reveal>
              <div className="mt-10">
                <Coursework />
              </div>
            </SheetFrame>
          </div>
        </section>

        {/* 09 — Software */}
        <section id="software" className="scroll-mt-20 border-t border-line py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-5 md:px-8">
            <SheetFrame index="09" kicker="Software" sheet={9} total={TOTAL}>
              <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  <Reveal>
                    <p className="mono mb-4 flex items-center gap-3 text-[10px] tracking-[0.22em] text-signal uppercase">
                      <span className="inline-block h-px w-7 bg-signal" />
                      09 — Software
                    </p>
                    <h2 className="display text-[clamp(2rem,5.2vw,3.75rem)] text-chalk">
                      The Forsaken Path
                    </h2>
                  </Reveal>
                  <Reveal delay={90}>
                    <p className="mt-6 max-w-3xl text-[15.5px] leading-relaxed text-steel md:text-[17px]">
                      A dungeon-crawler ARPG built for Roblox in Luau — and the
                      place I work out systems thinking away from metal. It is
                      architected the way a test rig is: trust boundaries drawn
                      first, state made reproducible, and every balance decision
                      checked against an offline simulation before it ships.
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={120} className="lg:pt-2">
                  <dl className="divide-y divide-line border-y border-line">
                    {[
                      { k: "Language", v: "Luau" },
                      { k: "Sync", v: "Rojo — filesystem to Studio" },
                      { k: "Balance", v: "Offline harnesses in Lune" },
                      { k: "Assets", v: "Headless Blender generation" },
                      { k: "Persistence", v: "(baseId, itemLevel, rarity, seed)" },
                    ].map((s) => (
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
              </div>
              <div className="mt-12">
                <Reveal>
                  <SoftwareCard />
                </Reveal>
              </div>
            </SheetFrame>
          </div>
        </section>

        {/* 10 — Skills & experience */}
        <section id="profile" className="scroll-mt-20 border-t border-line py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-5 md:px-8">
            <SheetFrame index="10" kicker="Profile" sheet={10} total={TOTAL}>
              <Reveal>
                <p className="mono mb-4 flex items-center gap-3 text-[10px] tracking-[0.22em] text-signal uppercase">
                  <span className="inline-block h-px w-7 bg-signal" />
                  10 — Profile
                </p>
                <h2 className="display text-[clamp(2rem,5.2vw,3.75rem)] text-chalk">
                  Skills & Experience
                </h2>
              </Reveal>

              <div className="mt-12">
                <SkillsDro />
              </div>

              <h3 className="mono mt-16 mb-8 border-b border-line pb-2 text-[10px] tracking-[0.2em] text-signal uppercase">
                Experience
              </h3>
              <Timeline />

              <Reveal delay={120}>
                <dl className="mono mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8 sm:grid-cols-4">
                  {[
                    { k: "Degree", v: "B.S. Mechanical Engineering" },
                    { k: "Focus", v: "Aerospace" },
                    { k: "School", v: "Oregon State Honors College" },
                    { k: "Expected", v: "June 2028" },
                  ].map((s) => (
                    <div key={s.k}>
                      <dt className="text-[10px] tracking-[0.16em] text-steel-dim uppercase">
                        {s.k}
                      </dt>
                      <dd className="mt-1 text-[13px] leading-snug text-chalk">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </SheetFrame>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
