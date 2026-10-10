# Tracy's Effleurage — demo website

A premium, animated demo site for a massage therapy business in Ilorin, Kwara State, Nigeria.
Built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion and Lucide.

> **Everything business-specific is placeholder content.** Prices, treatments, contact details,
> testimonials and availability are samples. The booking and contact forms are front-end demos:
> nothing is sent anywhere and the UI says so.

## Run it

Requires Node.js 18.18+ (20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript
npm run lint       # ESLint (next/core-web-vitals)
npm run build      # production build
npm start          # serve the production build
```

Fonts (Instrument Serif, Hanken Grotesk) are fetched from Google Fonts by `next/font` at build time and
self-hosted afterwards, so the first `npm run dev`/`build` needs internet.

## Where to change things

| What | File |
| --- | --- |
| Business name, location, phone, email, Instagram, hero text, nav links | `src/data/site.ts` |
| Brand colours (RGB triplets) | `src/app/globals.css` (`:root`) |
| Fonts | `src/app/layout.tsx` |
| Treatments, durations, prices, images | `src/data/treatments.ts` |
| Gallery, experience steps, testimonials, About placeholders | `src/data/content.ts` |
| Booking demo slots / closed days / date range | `src/data/booking.ts` |
| Validation rules | `src/lib/validation.ts` |
| Animation timings and easing | `src/lib/motion.ts` |
| Page titles / descriptions (SEO) | `metadata` in each `src/app/**/page.tsx`, defaults in `layout.tsx` |

### Images
The shipped images are generated **illustrative SVG placeholders** in `public/images` (not photographs).
To use real photos: add JPG/WebP files to `public/images/` and change the `src`/`image` paths in
`src/data/*.ts`. Next optimises them automatically. Missing or broken images fall back to a warm
gradient (`SmartImage`). To regenerate the placeholders: `npm run art` (needs Python 3).

### Going live checklist
1. Replace every "sample"/"placeholder"/"to be confirmed" string with verified details from Tracy; set `isSample: false` on real treatments.
2. Set the real domain in `site.url` and remove `robots: { index: false }` in `layout.tsx`.
3. Connect booking: replace `submitBooking()` in `src/components/booking/BookingFlow.tsx`. Connect contact: replace `onSubmit` in `ContactForm.tsx`. Remove the demo notices when real.
4. Add a real map/address on the Contact page, and an OG image (`public/images/og.svg` is a placeholder; many platforms prefer PNG/JPG).

## How the motion system works
- **Timings:** `src/lib/motion.ts` (one easing curve; quick / calm / slow).
- **Ambient glow, custom cursor, magnetic buttons:** `src/components/animations/`. They run only on
  hover-capable mouse devices without reduced-motion (`usePointerEffects`), use one `requestAnimationFrame`
  loop each, and clean up listeners on unmount. Touch devices never render them.
- **Hero:** masked line reveal (`MaskedLines`), image settle, scroll parallax (`Hero.tsx`).
- **Page transitions:** `src/app/template.tsx` (enter-only fade, safe with browser history).
- **Reduced motion:** Framer Motion's `useReducedMotion` plus a CSS media query in `globals.css`.
- **Custom cursor labels:** add `data-cursor="View"` to any element. Add `data-native-cursor` to restore the normal cursor.

## Troubleshooting
- *Fonts fail to load during build:* you are offline or Google Fonts is blocked; connect, or swap to local fonts via `next/font/local`.
- *Port busy:* `npm run dev -- -p 3001`.
- *Stale styles:* delete `.next` and restart.
- *Remote images blocked:* add the host to `images.remotePatterns` in `next.config.mjs`.

## Deploying
Push to GitHub and import into Vercel (zero config), or run `npm run build && npm start` on any Node host.
