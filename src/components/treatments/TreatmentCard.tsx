"use client";
import Link from "next/link";
import { Clock } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { SampleBadge } from "@/components/ui/SampleBadge";
import type { Treatment } from "@/types";

/**
 * POINTER-RESPONSIVE LIGHT: on pointermove we write the cursor position (as %)
 * into CSS variables --mx/--my on the card. The ::before-style overlay below
 * reads them in a radial-gradient, so the light follows the pointer with no
 * React re-render (cheap, smooth). Hidden on touch (no hover).
 */
export function TreatmentCard({ t, tall = false }: { t: Treatment; tall?: boolean }) {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <article onPointerMove={onMove} className="group relative flex flex-col bg-espresso text-ivory transition-transform duration-700 ease-calm hover:-translate-y-2">
      <div className={`relative overflow-hidden ${tall ? "aspect-[4/5]" : "aspect-[4/4.6]"}`}>
        <SmartImage src={t.image} alt={t.alt} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="transition-transform duration-[1400ms] ease-calm group-hover:scale-[1.07]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgb(var(--c-champagne) / 0.22), transparent 60%)" }} />
        {t.isSample && <div className="absolute left-4 top-4"><SampleBadge tone="dark" /></div>}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <h3 className="text-[1.7rem] leading-tight">{t.name}</h3>
        <p className="text-ivory/70">{t.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-ivory/15 pt-4 text-sm text-ivory/75">
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-champagne" aria-hidden />{t.duration}</span>
          <span>{t.price}</span>
        </div>
        <Link href={`/booking?treatment=${t.id}`} className="inline-flex w-fit border-b border-champagne pb-0.5 text-champagne transition-all duration-300 hover:pr-3">
          Book this treatment<span className="sr-only">: {t.name}</span>
        </Link>
      </div>
    </article>
  );
}
