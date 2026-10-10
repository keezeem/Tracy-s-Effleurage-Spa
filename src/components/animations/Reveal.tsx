"use client";
import { motion, useReducedMotion } from "framer-motion";
import { duration, ease } from "@/lib/motion";

/**
 * Scroll reveal. Use sparingly — the brief wants rhythm, not everything moving.
 * `delay` staggers siblings; `y` sets the travel distance.
 */
export function Reveal({ children, delay = 0, y = 28, className }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: duration.calm, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
