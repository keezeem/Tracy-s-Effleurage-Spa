import { experienceSteps } from "@/data/content";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";

/** The sequence is a real order of events (arrive -> talk -> treatment -> rest), so steps are numbered. */
export function ExperienceSection({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="section-y on-light">
      <div className="container-x">
        <Reveal><h2 className="display-lg max-w-3xl">What to expect from a visit</h2></Reveal>
        <ol className="mt-16 space-y-20 md:space-y-28">
          {experienceSteps.map((s, i) => (
            <li key={s.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-16">
              <div className={`md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
                <Parallax className="aspect-[4/3]" amount={7}>
                  <SmartImage src={s.image} alt={s.alt} sizes="(min-width:768px) 50vw, 100vw" />
                </Parallax>
              </div>
              <Reveal className="md:col-span-6">
                <p className="font-display text-5xl text-champagne">{i + 1}</p>
                <h3 className="display-md mt-2">{s.title}</h3>
                <p className="prose-body mt-4 text-chocolate">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        {showLink && <div className="mt-20"><Button href="/experience" variant="text">More about the experience</Button></div>}
      </div>
    </section>
  );
}
