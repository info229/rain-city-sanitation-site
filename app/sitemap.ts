import type { MetadataRoute } from "next";
import { blogPosts, industryPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.raincitysanitation.com";
  const routes = [
    "",
    "/instant-quote",
    "/what-we-take",
    "/areas-we-serve",
    "/blog",
    "/business-services",
    "/privacy-policy",
    "/terms-of-service",
    "/accessibility",
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    ...industryPages.map((industry) => `/business-services/${industry.slug}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
