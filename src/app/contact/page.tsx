import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { bookingHref, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tracy's Effleurage in Ilorin, Kwara State. Contact details on this demo site are placeholders.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" intro="Questions about a treatment? Write to us. Contact details are placeholders until Tracy confirms them." />
      <section className="section-y on-light">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7"><ContactForm /></div>
          <aside className="space-y-8 lg:col-span-5">
            <ul className="space-y-4">
              <li className="flex gap-3"><MapPin className="mt-1.5 h-4 w-4 shrink-0 text-botanical" aria-hidden />{site.location}</li>
              <li className="flex gap-3"><Phone className="mt-1.5 h-4 w-4 shrink-0 text-botanical" aria-hidden />{site.contact.phone} (placeholder)</li>
              <li className="flex gap-3"><Mail className="mt-1.5 h-4 w-4 shrink-0 text-botanical" aria-hidden />{site.contact.email} (placeholder)</li>
              <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-botanical"><Instagram className="mt-1.5 h-4 w-4 shrink-0 text-botanical" aria-hidden />{site.social.instagramHandle} on Instagram<span className="sr-only"> (opens in a new tab)</span></a></li>
            </ul>
            <div role="img" aria-label="Map placeholder. Exact address to be confirmed." className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-beige text-center text-chocolate">
              <div aria-hidden className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgb(var(--c-chocolate)/.15) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--c-chocolate)/.15) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
              <p className="relative px-6">Map placeholder<br /><span className="text-sm">Exact address to be confirmed</span></p>
            </div>
            <Link href={bookingHref} className="inline-block bg-espresso px-8 py-3.5 text-ivory transition-colors hover:bg-chocolate">Book your experience</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
