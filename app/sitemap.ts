import { MetadataRoute } from "next";
import * as backend from "@/lib/backend";

const examData: Record<string, { name: string }> = {
  "cat": { name: "CAT" },
  "ielts": { name: "IELTS" },
  "jee-main": { name: "JEE Main" },
  "neet": { name: "NEET" },
  "xat": { name: "XAT" },
  "clat": { name: "CLAT" },
  "mat": { name: "MAT" },
  "gate": { name: "GATE" },
  "duolingo": { name: "Duolingo" },
};

const countryData: Record<string, { name: string }> = {
  "usa": { name: "USA" },
  "uk": { name: "UK" },
  "canada": { name: "Canada" },
  "germany": { name: "Germany" },
  "australia": { name: "Australia" },
  "russia": { name: "Russia" },
  "ireland": { name: "Ireland" },
  "new-zealand": { name: "New Zealand" },
  "sweden": { name: "Sweden" },
  "italy": { name: "Italy" },
  "uzbekistan": { name: "Uzbekistan" },
  "netherlands": { name: "Netherlands" },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://collegeblink.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/colleges`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scholarships`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/community/forums`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = [];

  try {

    const colleges = await backend.getColleges({});
    if (colleges?.colleges) {
      colleges.colleges.forEach((college: any) => {
        dynamicPages.push({
          url: `${baseUrl}/colleges/${college.slug}`,
          lastModified: new Date(college.updatedAt || Date.now()),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        });
      });
    }
  } catch (error) {
    console.error("Failed to fetch colleges for sitemap:", error);
  }

  Object.keys(examData).forEach((slug) => {
    dynamicPages.push({
      url: `${baseUrl}/exams/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  });

  Object.keys(countryData).forEach((slug) => {
    dynamicPages.push({
      url: `${baseUrl}/study-abroad/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  });

  return [...staticPages, ...dynamicPages];
}
