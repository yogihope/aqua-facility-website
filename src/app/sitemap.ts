import type { MetadataRoute } from "next";
import {
  getServices,
  getIndustries,
  getGroupCompanies,
  getCaseStudies,
  getInsights,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

/** Section 11.1 — XML sitemap generated from indexable content. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, group, caseStudies, insights] = await Promise.all([
    getServices(),
    getIndustries(),
    getGroupCompanies(),
    getCaseStudies(),
    getInsights(),
  ]);

  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
    { path: "/technology", priority: 0.8, changeFrequency: "monthly" },
    { path: "/group", priority: 0.7, changeFrequency: "monthly" },
    { path: "/impact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/awards", priority: 0.6, changeFrequency: "yearly" },
    { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
    { path: "/careers/apply", priority: 0.5, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/request-proposal", priority: 0.9, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...industries.map((industry) => ({
      url: absoluteUrl(`/industries/${industry.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...group.map((company) => ({
      url: absoluteUrl(`/group/${company.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/projects/${study.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...insights.map((insight) => ({
      url: absoluteUrl(`/insights/${insight.slug}`),
      lastModified: new Date(insight.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
