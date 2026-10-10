"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { treatments, getTreatment } from "@/data/treatments";
import { demoClosedWeekdays, demoDaysAhead, demoTimeSlots } from "@/data/booking";
import { validateBooking } from "@/lib/validation";
import { cn, hashString, toISODate } from "@/lib/utils";
import { ease } from "@/lib/motion";
import type { BookingDraft, FieldErrors } from "@/types";

const steps = ["Treatment", "Date & time", "Your details", "Review"] as const;
const stepFields: Array<Array<keyof BookingDraft>> = [["treatmentId"], ["date", "time"], ["name", "phone", "note"], []];
const empty: BookingDraft = { treatmentId: "", date: "", time: "", name: "", phone: "", note: "" };

/**
 * DEMO ONLY. This is the single seam to replace with a real backend:
 * POST the draft to your API / WhatsApp / calendar service here and return
 * its result. Right now it just waits briefly and returns a local reference.
 * Nothing leaves the browser and no appointment exists.
 */
async function submitBooking(draft: BookingDraft): Promise<{ reference: string }> {
  await new Promise((r) => setTimeout(r, 900));
  return { reference: `DEMO-${hashString(draft.date + draft.time + draft.treatmentId).toString(36).toUpperCase().slice(0, 6)}` };
}

const dateFmt = new Intl.DateTimeFormat("en-NG", { weekday: "short", day: "numeric", month: "short" });
const longFmt = new Intl.DateTimeFormat("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export function BookingFlow({ initialTreatmentId }: { initialTreatmentId?: string }) {
  const [draft, setDraft] = useState<BookingDraft>({ ...empty, treatmentId: getTreatment(initialTreatmentId ?? "") ? initialTreatmentId! : "" });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors<BookingDraft>>({});
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [days, setDays] = useState<Date[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  // Dates are built after mount so server and client HTML always match (no hydration warning).
  useEffect(() => {
    const out: Date[] = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    for (let i = 1; i <= demoDaysAhead; i++) { const n = new Date(d); n.setDate(d.getDate() + i); out.push(n); }
    setDays(out);
  }, []);

  // Move focus to the new step heading for keyboard/screen-reader users (but not on first load).
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    heading.current?.focus();
  }, [step, reference]);

  const set = <K extends keyof BookingDraft>(k: K, v: BookingDraft[K]) => {
    setDraft((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // Deterministic "already taken" slots so the demo feels real but never changes between renders.
  const taken = (date: string, time: string) => hashString(`${date}|${time}`) % 5 === 0;
  const treatment = useMemo(() => getTreatment(draft.treatmentId), [draft.treatmentId]);

  const next = () => {
    const all = validateBooking(draft);
    const mine: FieldErrors<BookingDraft> = {};
    for (const f of stepFields[step] ?? []) if (all[f]) mine[f] = all[f];
    setErrors(mine);
    if (Object.keys(mine).length === 0) setStep((s) => s + 1);
  };

  const submit = async () => {
    const all = validateBooking(draft);
    if (Object.keys(all).length) {
      setErrors(all);
      const bad = stepFields.findIndex((fs) => fs.some((f) => all[f]));
      if (bad >= 0) setStep(bad);
      return;
    }
    setBusy(true);
    try { setReference((await submitBooking(draft)).reference); } finally { setBusy(false); }
  };

  if (reference) {
    return (
      <div role="status" className="border border-chocolate/25 bg-ivory p-8 sm:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-botanical text-ivory"><Check className="h-6 w-6" aria-hidden /></div>
        <h2 ref={heading} tabIndex={-1} className="display-md mt-6 outline-none">Demo booking complete</h2>
        <p className="mt-4 max-w-lg text-chocolate">
          This was a demonstration. Nothing was sent to Tracy, no appointment was made and no one will contact you. Reference {reference} exists only on this screen.
        </p>
        <dl className="mt-8 grid max-w-lg gap-4 border-t border-chocolate/20 pt-6 sm:grid-cols-2">
          <div><dt className="text-sm text-chocolate/60">Treatment</dt><dd>{treatment?.name}</dd></div>
          <div><dt className="text-sm text-chocolate/60">When</dt><dd>{draft.date && longFmt.format(new Date(`${draft.date}T00:00:00`))}, {draft.time}</dd></div>
          <div><dt className="text-sm text-chocolate/60">Name</dt><dd>{draft.name}</dd></div>
          <div><dt className="text-sm text-chocolate/60">Phone</dt><dd>{draft.phone}</dd></div>
        </dl>
        <div className="mt-10 flex flex-wrap gap-6">
          <button type="button" onClick={() => { setDraft(empty); setStep(0); setReference(null); }} className="bg-espresso px-7 py-3.5 text-ivory hover:bg-chocolate">Start another demo booking</button>
          <Link href="/" className="self-center border-b border-espresso pb-0.5">Back to home</Link>
        </div>
      </div>
    );
  }

  const Err = ({ id }: { id: keyof BookingDraft }) => errors[id] ? <p id={`e-${id}`} role="alert" className="mt-2 text-sm text-[#9b2c2c]">{errors[id]}</p> : null;

  return (
    <div>
      <p className="mb-8 border-l-2 border-champagne bg-beige/60 p-4 text-sm text-chocolate">
        <strong className="font-medium">Demo booking.</strong> Availability is sample data. Nothing is sent to Tracy and no payment is taken.
      </p>

      <ol className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Booking steps">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className={cn("flex items-center gap-2", i === step ? "text-espresso" : "text-chocolate/50")}>
            <span className={cn("flex h-6 w-6 items-center justify-center rounded-full border text-xs", i <= step ? "border-espresso bg-espresso text-ivory" : "border-chocolate/40")}>{i + 1}</span>{s}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease }}>
          <h2 ref={heading} tabIndex={-1} className="display-md outline-none">
            {["Choose a treatment", "Pick a date and time", "Your details", "Review your booking"][step]}
          </h2>

          {step === 0 && (
            <fieldset className="mt-8">
              <legend className="sr-only">Treatment</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {treatments.map((t) => (
                  <label key={t.id} className={cn("block cursor-pointer border p-5 transition-colors duration-300", draft.treatmentId === t.id ? "border-espresso bg-espresso text-ivory" : "border-chocolate/25 hover:border-chocolate")}>
                    <input type="radio" name="treatment" value={t.id} checked={draft.treatmentId === t.id} onChange={() => set("treatmentId", t.id)} className="sr-only" aria-describedby={errors.treatmentId ? "e-treatmentId" : undefined} />
                    <span className="block font-display text-2xl">{t.name}</span>
                    <span className={cn("mt-1 block text-sm", draft.treatmentId === t.id ? "text-ivory/70" : "text-chocolate/70")}>{t.duration} · {t.price}</span>
                  </label>
                ))}
              </div>
              <Err id="treatmentId" />
            </fieldset>
          )}

          {step === 1 && (
            <div className="mt-8 space-y-8">
              <fieldset>
                <legend className="mb-3 text-chocolate">Date (sample availability)</legend>
                <div className="flex flex-wrap gap-2">
                  {days.length === 0 && <p className="text-chocolate/60">Loading dates…</p>}
                  {days.map((d) => {
                    const iso = toISODate(d); const closed = demoClosedWeekdays.includes(d.getDay());
                    return (
                      <label key={iso} className={cn("border px-4 py-3 text-sm transition-colors", closed ? "cursor-not-allowed border-chocolate/10 text-chocolate/30 line-through" : "cursor-pointer", draft.date === iso ? "border-espresso bg-espresso text-ivory" : !closed && "border-chocolate/25 hover:border-chocolate")}>
                        <input type="radio" name="date" value={iso} disabled={closed} checked={draft.date === iso} onChange={() => { set("date", iso); set("time", ""); }} className="sr-only" />
                        {dateFmt.format(d)}{closed && <span className="sr-only"> (closed in demo)</span>}
                      </label>
                    );
                  })}
                </div>
                <Err id="date" />
              </fieldset>
              <fieldset>
                <legend className="mb-3 text-chocolate">Time</legend>
                {!draft.date ? <p className="text-chocolate/60">Choose a date first.</p> : (
                  <div className="flex flex-wrap gap-2">
                    {demoTimeSlots.map((t) => {
                      const off = taken(draft.date, t);
                      return (
                        <label key={t} className={cn("border px-5 py-3 text-sm transition-colors", off ? "cursor-not-allowed border-chocolate/10 text-chocolate/30 line-through" : "cursor-pointer", draft.time === t ? "border-espresso bg-espresso text-ivory" : !off && "border-chocolate/25 hover:border-chocolate")}>
                          <input type="radio" name="time" value={t} disabled={off} checked={draft.time === t} onChange={() => set("time", t)} className="sr-only" />
                          {t}{off && <span className="sr-only"> (unavailable in demo)</span>}
                        </label>
                      );
                    })}
                  </div>
                )}
                <Err id="time" />
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 grid gap-8 sm:max-w-xl" data-native-cursor>
              <div>
                <label htmlFor="b-name" className="text-chocolate">Name</label>
                <input id="b-name" className="field" autoComplete="name" value={draft.name} onChange={(e) => set("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "e-name" : undefined} />
                <Err id="name" />
              </div>
              <div>
                <label htmlFor="b-phone" className="text-chocolate">Phone number</label>
                <input id="b-phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="0803 000 0000" value={draft.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "e-phone" : undefined} />
                <Err id="phone" />
              </div>
              <div>
                <label htmlFor="b-note" className="text-chocolate">Note <span className="text-chocolate/60">(optional)</span></label>
                <textarea id="b-note" rows={3} maxLength={300} className="field resize-none" value={draft.note} onChange={(e) => set("note", e.target.value)} aria-invalid={Boolean(errors.note)} aria-describedby={errors.note ? "e-note" : undefined} />
                <p className="text-right text-xs text-chocolate/60">{draft.note.length}/300</p>
                <Err id="note" />
              </div>
            </div>
          )}

          {step === 3 && (
            <dl className="mt-8 max-w-xl divide-y divide-chocolate/15 border-y border-chocolate/15">
              {[["Treatment", treatment?.name], ["Date", draft.date && longFmt.format(new Date(`${draft.date}T00:00:00`))], ["Time", draft.time], ["Name", draft.name], ["Phone", draft.phone], ["Note", draft.note || "None"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3"><dt className="text-chocolate/70">{k}</dt><dd className="text-right">{v}</dd></div>
              ))}
            </dl>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center gap-4">
        {step > 0 && <button type="button" onClick={() => setStep((s) => s - 1)} className="border border-chocolate/40 px-6 py-3.5 transition-colors hover:border-espresso">Back</button>}
        {step < 3 ? (
          <button type="button" onClick={next} className="bg-espresso px-8 py-3.5 text-ivory transition-colors hover:bg-chocolate">Continue</button>
        ) : (
          <button type="button" onClick={submit} disabled={busy} className="bg-espresso px-8 py-3.5 text-ivory transition-colors hover:bg-chocolate disabled:opacity-60">
            {busy ? "Submitting demo…" : "Submit demo booking"}
          </button>
        )}
      </div>
    </div>
  );
}
