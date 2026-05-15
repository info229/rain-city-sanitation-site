import { company } from "@/lib/data";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  description:
    "Retail junk removal and full-service hauling across Greater Seattle and the Eastside.",
  areaServed: company.serviceAreaLong,
  telephone: company.phoneDisplay,
  email: company.email,
  slogan: company.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  url: "https://www.raincitysanitation.com",
  priceRange: "$$",
};
