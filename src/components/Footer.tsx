import { PROFILE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line pb-20 pt-10 md:pb-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <p className="display text-[15px] tracking-tight text-chalk">MAX BELLOTTI</p>
        <p className="mono mt-1 text-[10px] tracking-[0.16em] text-steel-dim uppercase">
          {PROFILE.role} · {PROFILE.school}
        </p>
        <p className="mono mt-0.5 text-[10px] tracking-[0.16em] text-steel-dim uppercase">
          {PROFILE.grad}
        </p>
      </div>
    </footer>
  );
}
