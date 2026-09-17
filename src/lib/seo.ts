import type { Metadata } from "next";
import { site } from "@/content/site";
import { publishedAwards } from "@/content/awards";

/** Section 11.1 — canonical URLs, OG/Twitter metadata, unique titles. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? site.domain;

/**
 * Canonical URL builder.
 *
 * `trailingSlash: true` in next.config makes the trailing-slash form canonical,
 * matching the Section 3.1 sitemap. Canonicals, OpenGraph URLs, breadcrumb
 * schema and the XML sitemap all route through here so they cannot drift from
 * the form the server actually serves. File routes (sitemap.xml, robots.txt)
 * keep their extension and take no slash.
 */
export function absoluteUrl(path = "/") {
  let normalised = path.startsWith("/") ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(normalised);
  if (!isFile && !normalised.endsWith("/")) normalised = `${normalised}/`;
  return `${SITE_URL}${normalised}`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  noIndex,
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    // Only set when needed: an explicit `robots: undefined` here overrides the
    // staging noindex the root layout declares.
    ...(noIndex || process.env.NEXT_PUBLIC_ENV === "staging"
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: site.legalName,
      locale: "en_IN",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Structured data — Section 11.1                                              */
/* -------------------------------------------------------------------------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.companyName,
    url: SITE_URL,
    description: site.positioning,
    foundingDate: String(site.foundingYear),
    slogan: site.brandPromise,
    address: {
      "@type": "PostalAddress",
      streetAddress: [site.addressLine1, site.addressLine2]
        .filter(Boolean)
        .join(", "),
      addressLocality: site.city,
      addressRegion: site.state,
      ...(site.postalCode ? { postalCode: site.postalCode } : {}),
      addressCountry: "IN",
    },
    // Only verified recognitions are published as structured data, and the
    // field is dropped entirely rather than emitted as an empty array.
    ...(publishedAwards().length
      ? {
          award: publishedAwards().map(
            (a) => `${a.title} (${a.edition}) — ${a.presentedBy}`
          ),
        }
      : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        email: site.email,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi", "mr"],
      },
    ],
    sameAs: [site.linkedin, site.facebook, site.instagram, site.youtube].filter(
      Boolean
    ),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.name,
    areaServed: { "@type": "Country", name: "India" },
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: SITE_URL,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    author: { "@type": "Organization", name: input.author },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: SITE_URL,
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function jobPostingSchema(input: {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  company: string;
  postedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.postedAt,
    employmentType: input.employmentType.toUpperCase().replace(/[\s-]/g, "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: input.company,
      sameAs: SITE_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: input.location,
        addressCountry: "IN",
      },
    },
  };
}
