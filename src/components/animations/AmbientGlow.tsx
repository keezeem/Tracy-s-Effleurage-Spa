"use client";
import { useEffect, useRef } from "react";
import { usePointerEffects } from "./usePointerCapable";

/**
 * CURSOR-FOLLOWING AMBIENT LIGHT
 * How it works: two fixed, blurred radial gradients. One pointermove listener
 * only stores the latest mouse position (cheap). A single requestAnimationFrame
 * loop eases each layer toward that position (lerp), the second layer with a
 * slower factor so it trails like soft secondary light. We move layers with
 * transform (GPU-friendly, no layout). pointer-events:none keeps clicks and
 * text selection untouched. The loop stops when the tab is hidden / unmounted.
 */
export function AmbientGlow() {
  const enabled = usePointerEffects();
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const p1 = { ...target };
    const p2 = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => { target.x = e.clientX; target.y = e.clientY; };
    const tick = () => {
      p1.x += (target.x - p1.x) * 0.12; p1.y += (target.y - p1.y) * 0.12;
      p2.x += (target.x - p2.x) * 0.045; p2.y += (target.y - p2.y) * 0.045;
      if (a.current) a.current.style.transform = `translate3d(${p1.x - 300}px, ${p1.y - 300}px, 0)`;
      if (b.current) b.current.style.transform = `translate3d(${p2.x - 450}px, ${p2.y - 450}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div aria-hidden className="glow-layer pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <div ref={b} className="absolute left-0 top-0 h-[900px] w-[900px] rounded-full will-change-transform"
        style={{ background: "radial-gradient(circle, rgb(var(--c-botanical) / 0.14) 0%, transparent 62%)" }} />
      <div ref={a} className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full mix-blend-soft-light will-change-transform"
        style={{ background: "radial-gradient(circle, rgb(var(--c-champagne) / 0.55) 0%, transparent 65%)" }} />
    </div>
  );
}
