"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * IMAGE PARALLAX — as the block scrolls through the viewport, the inner layer
 * moves a few percent slower than the page. The inner layer is taller than the
 * frame (inset -12%) so no edges show. Reduced motion = static image.
 */
export function Parallax({ children, amount = 10, className }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[12%] inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}
