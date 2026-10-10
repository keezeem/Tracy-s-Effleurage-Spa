import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book your experience",
  description: "A demonstration booking flow for Tracy's Effleurage. No booking is sent or confirmed.",
};

export default function BookingPage({ searchParams }: { searchParams: { treatment?: string } }) {
  return (
    <>
      <PageHero title="Book your experience" intro="Choose a treatment, a time and leave your details. This flow is a demonstration." />
      <section className="section-y on-light">
        <div className="container-x max-w-4xl"><BookingFlow initialTreatmentId={searchParams.treatment} /></div>
      </section>
    </>
  );
}
