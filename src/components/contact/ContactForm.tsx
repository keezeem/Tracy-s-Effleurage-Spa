"use client";
import { useState } from "react";
import { validateContact, type ContactDraft } from "@/lib/validation";
import type { FieldErrors } from "@/types";

/**
 * DEMO ONLY: no backend exists, so submit just validates and shows a notice.
 * To go live, replace the body of onSubmit with a request to your email /
 * WhatsApp / form service (e.g. a Next.js route handler) and show its result.
 */
export function ContactForm() {
  const [d, setD] = useState<ContactDraft>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors<ContactDraft>>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof ContactDraft, v: string) => { setD((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: undefined })); };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateContact(d);
    setErrors(err);
    if (Object.keys(err).length === 0) setDone(true);
  };

  if (done) {
    return (
      <div role="status" className="border border-chocolate/25 p-8">
        <h3 className="display-md">Demo form checked</h3>
        <p className="mt-3 text-chocolate">Your message was <strong className="font-medium">not sent</strong>. This contact form is a demo and is not connected to Tracy yet.</p>
        <button type="button" className="mt-6 border-b border-espresso pb-0.5" onClick={() => { setDone(false); setD({ name: "", email: "", message: "" }); }}>Edit the form</button>
      </div>
    );
  }
  const Err = ({ id }: { id: keyof ContactDraft }) => errors[id] ? <p id={`c-e-${id}`} role="alert" className="mt-2 text-sm text-[#9b2c2c]">{errors[id]}</p> : null;
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8" data-native-cursor>
      <p className="border-l-2 border-champagne bg-beige/60 p-4 text-sm text-chocolate"><strong className="font-medium">Demo form.</strong> Messages are not delivered until it is connected to a real service.</p>
      <div><label htmlFor="c-name">Name</label><input id="c-name" className="field" autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "c-e-name" : undefined} /><Err id="name" /></div>
      <div><label htmlFor="c-email">Email</label><input id="c-email" type="email" className="field" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "c-e-email" : undefined} /><Err id="email" /></div>
      <div><label htmlFor="c-msg">Message</label><textarea id="c-msg" rows={4} className="field resize-none" value={d.message} onChange={(e) => set("message", e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "c-e-message" : undefined} /><Err id="message" /></div>
      <button type="submit" className="w-fit bg-espresso px-8 py-3.5 text-ivory transition-colors hover:bg-chocolate">Send demo message</button>
    </form>
  );
}
