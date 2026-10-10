import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TreatmentCatalogue } from "@/components/treatments/TreatmentCatalogue";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Treatments",
  description: "A sample treatment menu for Tracy's Effleurage in Ilorin. Treatments, durations and prices are placeholders until confirmed.",
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero title="Treatments" intro="A sample menu to show how the page will work. Every treatment, duration and price here is a placeholder until Tracy confirms her real services." />
      <section className="section-y on-light">
        <div className="container-x"><TreatmentCatalogue /></div>
      </section>
      <FinalCta />
    </>
  );
}
