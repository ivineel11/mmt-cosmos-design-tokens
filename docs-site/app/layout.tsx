import type { Metadata } from "next";
import { BrandProvider } from "@/components/site/BrandProvider";
import { SiteShell } from "@/components/site/SiteShell";
import { brandBootScript } from "@/lib/brand";
import { BRAND_LIST } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Cosmos", template: "%s · Cosmos" },
  description:
    "Guidelines, foundations, components and design tokens for Cosmos, the design system behind MakeMyTrip, myBiz and Goibibo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The boot script may set a stored brand before React hydrates.
    <html lang="en" data-brand={BRAND_LIST[0].id} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: brandBootScript }} />
        {/* Rubik is the Goibibo typeface. It loads from Google Fonts at runtime, so an
            offline build still works and only the Goibibo specimens fall back. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- the root layout wraps every page, so the font loads site-wide */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap" />
      </head>
      <body>
        <BrandProvider brands={BRAND_LIST}>
          <SiteShell>{children}</SiteShell>
        </BrandProvider>
      </body>
    </html>
  );
}
