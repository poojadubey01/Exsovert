import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Geist_Pixel } from "next/font/google";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const geistPixel = Geist_Pixel({
  variable: "--font-geist-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.hero.lede,
  openGraph: { title: `${site.name} — ${site.tagline}`, description: site.hero.lede, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${geistPixel.variable}`}>
      <body>
        <noscript>
          <style>{`[data-split]{visibility:visible!important}[data-reveal]{opacity:1!important;transform:none!important}#preloader{display:none!important}`}</style>
        </noscript>
        <SmoothScroll>
          <Reveal />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
