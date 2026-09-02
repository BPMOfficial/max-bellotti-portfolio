import { PROFILE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line pb-20 pt-10 md:pb-24">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="display text-[15px] tracking-tight text-chalk">MAX BELLOTTI</p>
          <p className="mono mt-1 text-[10px] tracking-[0.16em] text-steel-dim uppercase">
            {PROFILE.role} · {PROFILE.school}
          </p>
          <p className="mono mt-0.5 text-[10px] tracking-[0.16em] text-steel-dim uppercase">
            {PROFILE.grad}
          </p>
        </div>
        <p className="mono max-w-md text-[10px] leading-relaxed tracking-[0.1em] text-steel-dim uppercase md:text-right">
          Event photography by Formula SAE and Global Formula Racing team
          photographers. Navier imagery courtesy of Navier. All other photographs
          and CAD by Max Bellotti.
        </p>
      </div>
    </footer>
  );
}
