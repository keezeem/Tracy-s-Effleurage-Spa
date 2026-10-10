"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Image with a graceful fallback. If the file is missing or fails to load, a
 * warm gradient fills the frame so the layout never breaks.
 * SVG placeholders are served unoptimised (Next does not resize SVGs);
 * JPG/WebP/PNG photos you add later are optimised automatically.
 */
export function SmartImage({ src, alt, sizes = "100vw", priority = false, className }: {
  src: string; alt: string; sizes?: string; priority?: boolean; className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={cn("absolute inset-0 bg-gradient-to-br from-chocolate to-espresso", className)} />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
