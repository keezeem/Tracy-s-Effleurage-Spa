"use client";
import { motion, useReducedMotion } from "framer-motion";
import { duration, ease } from "@/lib/motion";

/**
 * MASKED LINE REVEAL — each line sits in an overflow-hidden "window"; the text
 * rises up from below the window edge, like a title revealed by a curtain.
 * `startDelay` lets the hero wait for the image to settle first.
 * Screen readers get the full sentence once (aria-label), not split lines.
 */
export function MaskedLines({ lines, className, startDelay = 0.2, stagger = 0.14, as: Tag = "h1" }: {
  lines: readonly string[]; className?: string; startDelay?: number; stagger?: number; as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={line} aria-hidden className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: duration.slow, ease, delay: startDelay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
