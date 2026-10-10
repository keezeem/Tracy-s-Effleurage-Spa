import { featuredTreatmentIds, getTreatment } from "@/data/treatments";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import type { Treatment } from "@/types";

export function FeaturedTreatments() {
  const items = featuredTreatmentIds.map(getTreatment).filter((t): t is Treatment => Boolean(t));
  return (
    <section className="grain relative bg-chocolate py-[clamp(4.5rem,10vw,9rem)] text-ivory">
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><h2 className="display-lg max-w-2xl">Treatments, sample menu</h2></Reveal>
          <Button href="/treatments" variant="text">See the full menu</Button>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3 md:items-start">
          {items.map((t, i) => (
            // The middle card sits lower for an offset, editorial rhythm on desktop.
            <Reveal key={t.id} delay={i * 0.12} className={i === 1 ? "md:mt-16" : ""}>
              <TreatmentCard t={t} tall={i === 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
