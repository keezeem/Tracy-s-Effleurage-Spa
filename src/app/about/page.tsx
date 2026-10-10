import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { FinalCta } from "@/components/home/FinalCta";
import { aboutPlaceholders } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Tracy and the care behind Tracy's Effleurage, a massage therapy practice in Ilorin. Demo placeholder content.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Tracy" intro="Her story, in her own words, will live here." />
      <section className="section-y on-light">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Parallax className="aspect-[4/5]" amount={6}>
              <SmartImage src="/images/portrait-placeholder.svg" alt="Placeholder for Tracy's professional portrait" sizes="(min-width:1024px) 40vw, 100vw" />
            </Parallax>
          </div>
          <div className="space-y-14 lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3"><h2 className="display-md">Her story</h2><SampleBadge>Placeholder</SampleBadge></div>
              <p className="prose-body mt-5 text-chocolate">{aboutPlaceholders.story}</p>
            </Reveal>
            <Reveal>
              <h2 className="display-md">Philosophy and approach</h2>
              <p className="prose-body mt-5 text-chocolate">{aboutPlaceholders.philosophy}</p>
              <p className="prose-body mt-4 text-chocolate">Comfort comes first: pressure, pace and room temperature are all conversations, not assumptions. (Sample wording. Tracy to confirm.)</p>
            </Reveal>
            <Reveal>
              <h2 className="display-md">Experience and credentials</h2>
              <ul className="mt-5 divide-y divide-chocolate/15 border-y border-chocolate/15">
                {aboutPlaceholders.credentials.map((c) => <li key={c} className="py-3 text-chocolate">{c}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
