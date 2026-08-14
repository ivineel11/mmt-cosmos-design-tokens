import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted so builds work offline and the specimens always render in Lato.
const lato = localFont({
  src: [
    { path: "../public/fonts/lato-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/lato-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/lato-800.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/lato-900.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Cosmos Design Tokens",
  description:
    "The complete MakeMyTrip Cosmos design token reference — color, typography, spacing, radius, and sizing across web, iOS, and Android.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lato.variable}>
      <body>{children}</body>
    </html>
  );
}
