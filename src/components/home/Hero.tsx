"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { bookingHref, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { MaskedLines } from "@/components/animations/MaskedLines";
import { duration, ease } from "@/lib/motion";

/**
 * THE ONE ORCHESTRATED MOMENT: the image settles from a slight zoom, the
 * headline rises line by line out of a mask, then copy and buttons follow.
 * While scrolling, the background drifts down slower than the page (parallax)
 * and fades the content out. A slow "breathing" glow acts as candlelight.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-espresso text-ivory">
      <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-0 -bottom-[10%]">
        <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease }}>
          <SmartImage src="/images/hero.svg" alt="Warm candlelight over folded linen and smooth stones in a quiet treatment room" priority sizes="100vw" />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 to-espresso/10" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-transparent to-transparent" />
      <div aria-hidden className="breathe drift absolute right-[8%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-champagne/30 blur-[90px]" />

      <motion.div style={reduce ? undefined : { opacity: fade }} className="container-x relative pb-28 pt-40 sm:pb-32">
        <MaskedLines lines={site.hero.headline} className="display-xl max-w-5xl" startDelay={0.5} />
        <motion.p className="mt-8 max-w-md text-lg text-ivory/80 sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: duration.calm, ease }}>
          {site.hero.copy}
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: duration.calm, ease }}>
          <Button href={bookingHref} magnetic>{site.hero.primaryCta}</Button>
          <Button href="/treatments" variant="text">{site.hero.secondaryCta}</Button>
        </motion.div>
      </motion.div>

      <div aria-hidden className="absolute bottom-8 right-6 hidden items-center gap-3 text-sm text-ivory/60 sm:flex lg:right-12">
        <span>Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/20"><span className="scroll-cue absolute inset-0 bg-champagne" /></span>
      </div>
    </section>
  );
}
