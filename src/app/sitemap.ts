import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://samzfitnesshub.com";

  return [
    {
      // Trailing slash matches the canonical URL declared in layout.tsx
      // (alternates.canonical: "/"). Without it, Google treats
      // "https://samzfitnesshub.com" and "https://samzfitnesshub.com/" as
      // different URLs and the sitemap entry may not align with the page
      // returned by the homepage.
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
