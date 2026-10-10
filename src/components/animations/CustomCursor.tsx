"use client";
import { useEffect, useRef, useState } from "react";
import { usePointerEffects } from "./usePointerCapable";

/**
 * CUSTOM CURSOR (desktop mouse only)
 * - A small dot tracks the pointer exactly; a ring trails it (lerp in rAF).
 * - Event delegation: one mouseover listener reads data attributes from the
 *   element under the pointer, so any element can opt in:
 *     data-cursor="View"   -> ring grows and shows that label
 *     (links/buttons)      -> ring grows slightly automatically
 *     data-native-cursor   -> native cursor returns (see globals.css)
 * - Adds html.has-custom-cursor only while active; removed on cleanup.
 */
export function CustomCursor() {
  const enabled = usePointerEffects();
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [grow, setGrow] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    const t = { x: -100, y: -100 };
    const r = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      t.x = e.clientX; t.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${t.x - 3}px, ${t.y - 3}px, 0)`;
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      const interactive = el?.closest("a, button, [role='button'], summary");
      setLabel(labelled?.dataset.cursor ?? "");
      setGrow(Boolean(labelled || interactive));
    };
    const tick = () => {
      r.x += (t.x - r.x) * 0.18; r.y += (t.y - r.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div aria-hidden className="cursor-layer pointer-events-none fixed inset-0 z-[200]">
      <div ref={dot} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-champagne will-change-transform" />
      <div ref={ring} className="absolute left-0 top-0 will-change-transform">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-champagne/80 text-[0.7rem] tracking-wide text-espresso transition-all duration-300 ease-calm ${
            label ? "h-20 w-20 bg-champagne" : grow ? "h-14 w-14 bg-champagne/10" : "h-9 w-9"
          }`}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
