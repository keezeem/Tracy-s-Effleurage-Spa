import type { BookingDraft, FieldErrors } from "@/types";

/** Accepts local (0803…) and international (+234…) formats. */
const phonePattern = /^\+?[0-9\s-]{7,16}$/;

export function validateBooking(d: BookingDraft): FieldErrors<BookingDraft> {
  const e: FieldErrors<BookingDraft> = {};
  if (!d.treatmentId) e.treatmentId = "Choose a treatment.";
  if (!d.date) e.date = "Choose a date.";
  if (!d.time) e.time = "Choose a time.";
  if (d.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!phonePattern.test(d.phone.trim())) e.phone = "Enter a valid phone number, e.g. 0803 000 0000 or +234 803 000 0000.";
  if (d.note.length > 300) e.note = "Keep the note under 300 characters.";
  return e;
}

export interface ContactDraft { name: string; email: string; message: string }

export function validateContact(d: ContactDraft): FieldErrors<ContactDraft> {
  const e: FieldErrors<ContactDraft> = {};
  if (d.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Enter a valid email address.";
  if (d.message.trim().length < 10) e.message = "Write a message of at least 10 characters.";
  return e;
}
