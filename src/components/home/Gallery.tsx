"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/data/content";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/animations/Reveal";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);
  const close = useCallback(() => { setActive(null); opener.current?.focus(); }, []);

  // Lightbox: Escape / arrows, scroll lock, focus into dialog (and back on close).
  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [active, close, step]);

  const current = active === null ? null : gallery[active];

  return (
    <section className="section-y bg-beige on-light">
      <div className="container-x">
        <Reveal><h2 className="display-lg max-w-2xl">Details that set the tone</h2></Reveal>
        <p className="mt-4 text-chocolate">Placeholder artwork. Real photographs of Tracy&apos;s space will replace these.</p>
        <ul className="mt-12 grid auto-rows-[170px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {gallery.map((g, i) => (
            <li key={g.id} className={g.span}>
              <button type="button" data-cursor="View" onClick={(e) => { opener.current = e.currentTarget; setActive(i); }}
                className="group relative block h-full w-full overflow-hidden" aria-label={`Open image: ${g.alt}`}>
                <SmartImage src={g.src} alt={g.alt} sizes="(min-width:768px) 25vw, 50vw" className="transition-transform duration-[1400ms] ease-calm group-hover:scale-[1.08]" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/70 to-transparent p-3 text-left text-sm text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {g.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" onClick={close}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-espresso/95 p-4 sm:p-10">
            <button ref={closeRef} type="button" onClick={close} aria-label="Close image viewer" className="absolute right-4 top-4 p-3 text-ivory sm:right-8 sm:top-8"><X className="h-7 w-7" /></button>
            <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-ivory sm:left-8"><ChevronLeft className="h-8 w-8" /></button>
            <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-ivory sm:right-8"><ChevronRight className="h-8 w-8" /></button>
            <motion.figure key={current.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl">
              <div className="relative h-[70vh] w-full" data-native-cursor><SmartImage src={current.src} alt={current.alt} sizes="90vw" className="object-contain" /></div>
              <figcaption className="mt-4 text-center text-ivory/80">{current.alt}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
