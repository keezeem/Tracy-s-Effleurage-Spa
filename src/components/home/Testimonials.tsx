"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/data/content";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { ease } from "@/lib/motion";

/** All entries are demo content (see data/content.ts). Manual controls only — no auto-advance. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  if (!t) return null;
  return (
    <section className="grain relative overflow-hidden bg-espresso py-[clamp(4.5rem,10vw,9rem)] text-ivory">
      <div aria-hidden className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-botanical/25 blur-3xl" />
      <div className="container-x relative">
        <div className="flex items-center gap-4"><h2 className="display-md">Kind words</h2><SampleBadge tone="dark">Demo content</SampleBadge></div>
        <div className="mt-10 min-h-[15rem] md:min-h-[13rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure key={t.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease }}>
              <blockquote className="max-w-4xl font-display text-3xl leading-snug sm:text-4xl lg:text-5xl">{t.quote}</blockquote>
              <figcaption className="mt-6 text-ivory/60">{t.attribution}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex gap-3" role="group" aria-label="Choose testimonial">
          {testimonials.map((x, idx) => (
            <button key={x.id} type="button" onClick={() => setI(idx)} aria-label={`Show testimonial ${idx + 1}`} aria-current={idx === i}
              className={`h-1.5 transition-all duration-500 ease-calm ${idx === i ? "w-14 bg-champagne" : "w-6 bg-ivory/30 hover:bg-ivory/60"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
