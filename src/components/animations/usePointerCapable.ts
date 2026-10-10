"use client";
import { useEffect, useState } from "react";

/**
 * True only for devices with a real hover-capable mouse AND no reduced-motion
 * preference. Starts false on the server and first render (so SSR and client
 * markup match -> no hydration errors), then updates after mount.
 */
export function usePointerEffects(): boolean {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);
  return enabled;
}
