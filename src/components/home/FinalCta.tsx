import { bookingHref } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-champagne py-[clamp(5rem,12vw,10rem)] text-espresso">
      <div aria-hidden className="breathe absolute -bottom-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-ivory/60 blur-3xl" />
      <div className="container-x relative text-center">
        <Reveal><h2 className="display-lg mx-auto max-w-3xl">Make room for rest.</h2></Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-md text-lg text-espresso/80">Choose a treatment and a time. This booking flow is a demo until it is connected to Tracy&apos;s calendar.</p>
          <div className="mt-10"><Button href={bookingHref} magnetic className="!bg-espresso !text-ivory before:!bg-chocolate">Book your experience</Button></div>
        </Reveal>
      </div>
    </section>
  );
}
