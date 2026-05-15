import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/data";
import { localBusinessSchema } from "@/lib/schema";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.raincitysanitation.com"),
  title: {
    default: "Rain City Sanitation | Fast Seattle Junk Removal",
    template: "%s | Rain City Sanitation",
  },
  description:
    "Fast, affordable junk removal across Greater Seattle and the Eastside. Text a photo, get a clear quote, and book same-day or next-day haul-away.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} pb-24 sm:pb-0`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileCtaBar />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          id="brand-note"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: company.name,
              slogan: company.tagline,
            }),
          }}
        />
      </body>
    </html>
  );
}
