import type { ExperienceStep, GalleryImage, Testimonial } from "@/types";

/** GALLERY — swap `src` for real photos. `span` controls the asymmetric grid. */
export const gallery: GalleryImage[] = [
  { id: "g1", src: "/images/room.svg", alt: "Softly lit treatment room", span: "col-span-2 row-span-2", label: "The room" },
  { id: "g2", src: "/images/oils.svg", alt: "Amber oil bottles", span: "col-span-1 row-span-1", label: "The oils" },
  { id: "g3", src: "/images/linen.svg", alt: "Folded linen", span: "col-span-1 row-span-1", label: "The linen" },
  { id: "g4", src: "/images/stones.svg", alt: "Stacked stones and leaves", span: "col-span-1 row-span-2", label: "The stones" },
  { id: "g5", src: "/images/candles.svg", alt: "Candlelight", span: "col-span-2 row-span-1", label: "The light" },
  { id: "g6", src: "/images/botanical.svg", alt: "Green botanical leaves", span: "col-span-1 row-span-1", label: "The greens" },
];

/** EXPERIENCE — deliberately generic wording. Tracy should confirm each step. */
export const experienceSteps: ExperienceStep[] = [
  { title: "Arrive and settle", body: "A few quiet minutes to leave the day at the door. (Sample: confirm arrival details with Tracy.)", image: "/images/candles.svg", alt: "Candlelight on a dark surface" },
  { title: "Talk it through", body: "A short conversation about how you feel and what you would like from the session. (Sample.)", image: "/images/botanical.svg", alt: "Green leaves" },
  { title: "The treatment", body: "Unhurried hands, warm linen and a room set for rest. (Sample: replace with the real treatment flow.)", image: "/images/linen.svg", alt: "Soft linen" },
  { title: "Rest afterwards", body: "Time to come back slowly before you go. (Sample.)", image: "/images/stones.svg", alt: "Stacked stones" },
];

/** TESTIMONIALS — DEMO ONLY. Never present these as real reviews. */
export const testimonials: Testimonial[] = [
  { id: "t1", quote: "Demo testimonial: a short line from a future client about feeling rested will appear here.", attribution: "Demo content, not a real client" },
  { id: "t2", quote: "Demo testimonial: replace with a genuine review that Tracy and the client have approved.", attribution: "Demo content, not a real client" },
  { id: "t3", quote: "Demo testimonial: add the client's first name only if they agree to it.", attribution: "Demo content, not a real client" },
];

export const aboutPlaceholders = {
  story:
    "Tracy's story goes here. This is placeholder text: replace it with her own words about why she began, and what a session with her feels like.",
  philosophy:
    "Care that begins with listening. Placeholder wording: confirm Tracy's philosophy and approach before launch.",
  credentials: [
    "Qualifications and training: to be supplied by Tracy",
    "Professional memberships: to be supplied by Tracy",
    "Years of experience: to be supplied by Tracy",
  ],
};
