import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Watermark } from "@/components/Watermark";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omkarpromos.com"),
  title: {
    default: "Omkar Promos · Embroidery Digitizing & Vector Art",
    template: "%s · Omkar Promos",
  },
  description:
    "Embroidery digitizing at $1.50 per 1,000 stitches, back in 24–48 hours with no rush surcharge. Clean vector art next day. 29 machine formats. San Jose, CA.",
  openGraph: {
    title: "Omkar Promos · Embroidery Digitizing & Vector Art",
    description: "Your artwork, made stitch-ready. $1.50 per 1,000 stitches, 24–48 hour turnaround.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f2ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-linen text-espresso">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-linen"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Watermark />
      </body>
    </html>
  );
}
