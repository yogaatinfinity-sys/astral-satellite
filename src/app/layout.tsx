import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://astral-satellite.vercel.app'),
  title: {
    default: "Yoga@Infinity | Premium Yoga Studio",
    template: "%s | Yoga@Infinity"
  },
  description: "Elevate your practice with Sharmila at Yoga @ Infinity. Join our 9:00 AM - 11:00 AM sessions in Oragadam, specializing in Hatha, Strength Yoga, and Women Wellness for peak performance.",

  openGraph: {
    title: "Yoga @ Infinity | Premium Yoga Oragadam",
    description: "Elevate your practice with Sharmila at Yoga @ Infinity. Join our 9:00 AM - 11:00 AM sessions in Oragadam, specializing in Hatha, Strength Yoga, and Women Wellness for peak performance.",
    images: ["/logo.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-soft-bone text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Yoga@Infinity",
              "url": "https://yogaatinfinity.com/"
            })
          }}
        />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
