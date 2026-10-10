import type { NavLink } from "@/types";

/**
 * SINGLE SOURCE OF TRUTH for business details.
 * Everything marked DEMO is a placeholder — replace once Tracy confirms real details.
 */
export const site = {
  name: "Tracy's Effleurage",
  tagline: "Massage therapy & wellness",
  location: "Ilorin, Kwara State, Nigeria",
  url: "https://example.com", // DEMO: set to the real domain before launch
  description:
    "A calm, unhurried massage therapy and wellness practice in Ilorin, Kwara State. Demo website concept.",
  contact: {
    phone: "+234 000 000 0000", // DEMO placeholder
    email: "hello@example.com", // DEMO placeholder
    address: "Exact address to be confirmed", // DEMO placeholder
    hours: "Opening hours to be confirmed", // DEMO placeholder
  },
  social: {
    instagram: "https://www.instagram.com/tracy_effleurage_/", // supplied public profile
    instagramHandle: "@tracy_effleurage_",
  },
  hero: {
    headline: ["Your moment", "of stillness."],
    copy: "Slow down. Let the day soften. A quiet space for rest, relaxation and personal care in Ilorin.",
    primaryCta: "Book your experience",
    secondaryCta: "Explore treatments",
  },
  demoNotice:
    "Demo website. Treatments, prices, availability and testimonials are sample content and not confirmed by Tracy.",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const bookingHref = "/booking";
