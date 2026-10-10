import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";

export function Intro() {
  return (
    <section className="section-y on-light">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-5">
          <Parallax className="aspect-[4/5]" amount={8}>
            <SmartImage src="/images/stones.svg" alt="Smooth stones stacked beside green leaves" sizes="(min-width:1024px) 40vw, 100vw" />
          </Parallax>
          <div aria-hidden className="absolute -bottom-6 -right-6 hidden h-40 w-40 border border-champagne md:block" />
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <Reveal><h2 className="display-lg">A place to put the day down.</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="prose-body mt-8 text-lg text-chocolate">
              Effleurage is the long, gliding stroke at the heart of massage. It is also a fair description of how we want your visit to feel: unhurried, warm and entirely about you.
            </p>
            <p className="prose-body mt-5 text-chocolate">
              This is placeholder copy. Tracy&apos;s own words about her philosophy and approach will replace it once confirmed.
            </p>
            <div className="mt-10"><Button href="/about" variant="text">Read about Tracy</Button></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
