import { MaskedLines } from "@/components/animations/MaskedLines";

/** Dark editorial header for inner pages (also keeps the transparent navbar legible). */
export function PageHero({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-espresso pb-16 pt-40 text-ivory sm:pb-24 sm:pt-52">
      <div aria-hidden className="breathe absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-champagne/25 blur-3xl" />
      <div className="container-x relative">
        <MaskedLines lines={[title]} className="display-lg max-w-4xl" startDelay={0.1} />
        {intro && <p className="mt-8 max-w-xl text-lg text-ivory/75">{intro}</p>}
      </div>
    </section>
  );
}
