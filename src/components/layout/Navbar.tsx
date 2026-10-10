"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { bookingHref, navLinks, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Transparent over the hero, solid once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock body scroll, close on Escape, move focus in/out.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ease-calm ${scrolled || open ? "border-b border-champagne/15 bg-espresso py-3" : "border-b border-transparent py-6"}`}>
      <div className="container-x flex items-center justify-between text-ivory">
        <Link href="/" className="font-display text-2xl tracking-tight sm:text-[1.7rem]" aria-label={`${site.name} home`}>
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}
                className={`relative py-1 text-[0.95rem] transition-colors hover:text-champagne ${active ? "text-champagne" : ""}`}>
                {l.label}
              </Link>
            );
          })}
          <Button href={bookingHref} magnetic className="!px-6 !py-3">Book now</Button>
        </nav>

        <button ref={toggleRef} type="button" className="-mr-2 p-2 lg:hidden" aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-x-0 top-[57px] h-[calc(100dvh-57px)] overflow-y-auto bg-espresso lg:hidden">
            <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between py-10">
              <ul>
                {navLinks.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease }}>
                    <Link ref={i === 0 ? firstLinkRef : undefined} href={l.href} className="block border-b border-ivory/10 py-4 font-display text-4xl text-ivory">
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="pb-6"><Button href={bookingHref} className="w-full">Book your experience</Button></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
