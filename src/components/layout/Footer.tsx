import Link from "next/link";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-espresso text-ivory/80">
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr] md:py-24">
        <div>
          <p className="font-display text-3xl text-ivory">{site.name}</p>
          <p className="mt-4 max-w-sm">A quiet space for rest and personal care in Ilorin. Details below are placeholders until confirmed.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block transition-all duration-300 ease-calm hover:translate-x-1 hover:text-champagne">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="space-y-3 not-italic">
          <p className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-champagne" aria-hidden />{site.location}</p>
          <p className="flex items-start gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-champagne" aria-hidden />{site.contact.phone} <span className="text-ivory/50">(placeholder)</span></p>
          <p className="flex items-start gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-champagne" aria-hidden />{site.contact.email} <span className="text-ivory/50">(placeholder)</span></p>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-champagne">
            <Instagram className="mt-1 h-4 w-4 shrink-0 text-champagne" aria-hidden />{site.social.instagramHandle}
          </a>
        </address>
      </div>
      <div className="container-x relative border-t border-ivory/10 py-6 text-sm text-ivory/55">
        <p>{site.demoNotice}</p>
        <p className="mt-1">© {new Date().getFullYear()} {site.name}. Demo concept.</p>
      </div>
    </footer>
  );
}
