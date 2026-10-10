"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * PAGE TRANSITION — template.tsx re-mounts on every route change, so this
 * gives each page a soft fade-in. It is enter-only on purpose: exit animations
 * in the App Router can fight with browser history, so we avoid them.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}
