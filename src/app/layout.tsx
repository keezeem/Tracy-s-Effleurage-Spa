import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientGlow } from "@/components/animations/AmbientGlow";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { site } from "@/data/site";

/** TYPOGRAPHY — swap the two fonts here (display = headings, body = text). */
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}, Ilorin`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    locale: "en_NG",
    type: "website",
    images: [{ url: "/images/og.svg", width: 1200, height: 630, alt: site.name }],
  },
  // Demo site: keep it out of search engines until it goes live with real content.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#211914", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-espresso">
          Skip to content
        </a>
        <AmbientGlow />
        <CustomCursor />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
