export interface NavLink { label: string; href: string }

export interface Treatment {
  id: string;
  name: string;
  category: "Relaxation" | "Therapeutic" | "Rituals";
  summary: string;
  details: string;
  /** Edit freely — shown as "Sample" until Tracy confirms. */
  duration: string;
  price: string;
  image: string;
  alt: string;
  /** true = invented demo entry. Set to false only once Tracy has verified it. */
  isSample: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  /** Tailwind classes controlling grid placement (asymmetric layout). */
  span: string;
  label: string;
}

export interface Testimonial { id: string; quote: string; attribution: string }

export interface ExperienceStep { title: string; body: string; image: string; alt: string }

export interface BookingDraft {
  treatmentId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  note: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
