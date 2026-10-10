import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedTreatments } from "@/components/home/FeaturedTreatments";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedTreatments />
      <ExperienceSection />
      <Gallery />
      <Testimonials />
      <FinalCta />
    </>
  );
}
