"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { categories, treatments, type CategoryFilter } from "@/data/treatments";
import { SmartImage } from "@/components/ui/SmartImage";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { ease } from "@/lib/motion";

/** Filterable, expandable catalogue. Layout is editorial (alternating image/text rows), not a card grid. */
export function TreatmentCatalogue() {
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const list = treatments.filter((t) => filter === "All" || t.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter treatments" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-chocolate/20 pb-4">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => { setFilter(c); setOpenId(null); }}
            className={`pb-1 transition-colors ${filter === c ? "border-b-2 border-chocolate text-espresso" : "text-chocolate/60 hover:text-espresso"}`}>
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-10 space-y-16 md:space-y-24">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((t, i) => {
            const open = openId === t.id;
            return (
              <motion.li key={t.id} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}
                className={`grid items-center gap-8 md:grid-cols-12 md:gap-14 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative aspect-[5/4] overflow-hidden md:col-span-6">
                  <SmartImage src={t.image} alt={t.alt} sizes="(min-width:768px) 50vw, 100vw" />
                </div>
                <div className="md:col-span-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-botanical"><span className="text-chocolate">{t.category}</span>{t.isSample && <SampleBadge />}</div>
                  <h2 className="display-md mt-3">{t.name}</h2>
                  <p className="mt-4 max-w-md text-chocolate">{t.summary}</p>
                  <dl className="mt-6 flex gap-10 text-sm">
                    <div><dt className="text-chocolate/60">Duration</dt><dd>{t.duration}</dd></div>
                    <div><dt className="text-chocolate/60">Price</dt><dd>{t.price}</dd></div>
                  </dl>
                  <button type="button" aria-expanded={open} aria-controls={`d-${t.id}`} onClick={() => setOpenId(open ? null : t.id)}
                    className="mt-6 flex items-center gap-2 text-espresso">
                    <Plus className={`h-4 w-4 transition-transform duration-500 ease-calm ${open ? "rotate-45" : ""}`} aria-hidden />
                    {open ? "Hide details" : "More about this treatment"}
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div id={`d-${t.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }} className="overflow-hidden">
                        <p className="max-w-md pt-4 text-chocolate">{t.details}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Link href={`/booking?treatment=${t.id}`} className="mt-8 inline-block bg-espresso px-7 py-3.5 text-ivory transition-colors duration-300 hover:bg-chocolate">
                    Book this treatment<span className="sr-only">: {t.name}</span>
                  </Link>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
