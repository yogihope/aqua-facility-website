import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

import { Header, type NavData } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { JsonLd } from "@/components/ui/Bits";
import { getServices, getIndustries, getGroupCompanies } from "@/lib/data";
import { organizationSchema, SITE_URL } from "@/lib/seo";
import { site } from "@/content/site";

/**
 * 14.1 — self-hosted via next/font (no render-blocking third-party request),
 * only the weights the design system uses are loaded.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Aqua Facility Services | Integrated Facility, Manpower & Infrastructure Solutions",
    template: "%s | Aqua",
  },
  description:
    "Aqua delivers integrated facility management, workforce solutions, industrial O&M, railway and infrastructure support with 30+ years of operational expertise since 1996.",
  applicationName: site.legalName,
  authors: [{ name: site.legalName }],
  keywords: [
    "integrated facility management",
    "mechanised housekeeping",
    "production manpower",
    "industrial operations and maintenance",
    "railway cleaning services",
    "workforce solutions India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.legalName,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  // 16.3 — staging must stay out of the index. Flip via env, not code edits.
  robots:
    process.env.NEXT_PUBLIC_ENV === "staging"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [services, industries, group] = await Promise.all([
    getServices(),
    getIndustries(),
    getGroupCompanies(),
  ]);

  const nav: NavData = {
    services: services.map((s) => ({
      slug: s.slug,
      title: s.navTitle,
      chips: s.chips,
    })),
    industries: industries.map((i) => ({ slug: i.slug, title: i.title })),
    group: group.map((g) => ({ slug: g.slug, title: g.displayName })),
  };

  return (
    <html lang="en-IN" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <JsonLd data={organizationSchema()} />
        <Header nav={nav} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
