import type { Treatment } from "@/types";

/**
 * TREATMENT MENU — all entries are SAMPLE content.
 * To replace: edit name/summary/details/duration/price, set isSample to false,
 * and point `image` at a real photo (e.g. "/images/swedish.jpg").
 */
export const treatments: Treatment[] = [
  {
    id: "signature-relaxation",
    name: "Signature relaxation massage",
    category: "Relaxation",
    summary: "Long, flowing strokes to ease the body and quieten the mind.",
    details:
      "A gentle full-body treatment built around effleurage: slow, gliding strokes. Sample description. Replace with Tracy's own wording and what is included.",
    duration: "60 min (sample)",
    price: "₦ to be confirmed",
    image: "/images/linen.svg",
    alt: "Soft folds of warm linen in natural light",
    isSample: true,
  },
  {
    id: "back-neck-shoulders",
    name: "Back, neck & shoulders",
    category: "Relaxation",
    summary: "A focused session for the places that hold the day.",
    details:
      "Targeted attention to the upper body. Sample description. Confirm the technique, pressure options and any suitability notes with Tracy.",
    duration: "45 min (sample)",
    price: "₦ to be confirmed",
    image: "/images/room.svg",
    alt: "A softly lit treatment room with linen and a candle",
    isSample: true,
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy massage",
    category: "Rituals",
    summary: "Warm oils, chosen with you, for a slower pace.",
    details:
      "A sensory treatment using scented oils. Sample description. List the real oils, and any allergy or sensitivity process Tracy follows.",
    duration: "75 min (sample)",
    price: "₦ to be confirmed",
    image: "/images/oils.svg",
    alt: "Amber glass oil bottles in warm light",
    isSample: true,
  },
  {
    id: "deep-tissue",
    name: "Deep tissue massage",
    category: "Therapeutic",
    summary: "Firmer pressure for tension that needs more than a light touch.",
    details:
      "Sample description only. Tracy should confirm what she offers, her approach to pressure, and when she recommends seeing a doctor first.",
    duration: "60 min (sample)",
    price: "₦ to be confirmed",
    image: "/images/stones.svg",
    alt: "Stacked smooth stones with green leaves",
    isSample: true,
  },
  {
    id: "stone-ritual",
    name: "Warm stone ritual",
    category: "Rituals",
    summary: "Heated stones and unhurried hands.",
    details:
      "Sample description only. Remove this entry if Tracy does not offer stone treatments.",
    duration: "90 min (sample)",
    price: "₦ to be confirmed",
    image: "/images/candles.svg",
    alt: "Candles glowing on a dark surface",
    isSample: true,
  },
];

export const categories = ["All", "Relaxation", "Therapeutic", "Rituals"] as const;
export type CategoryFilter = (typeof categories)[number];
export const featuredTreatmentIds = ["signature-relaxation", "aromatherapy", "back-neck-shoulders"];
export const getTreatment = (id: string) => treatments.find((t) => t.id === id);
