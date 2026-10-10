import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "The experience",
  description: "What a visit to Tracy's Effleurage in Ilorin could feel like, from arrival to rest. Demo placeholder content.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero title="The experience" intro="From the moment you arrive to the moment you leave. The steps below are sample wording until Tracy confirms how a visit works." />
      <ExperienceSection showLink={false} />
      <FinalCta />
    </>
  );
}
