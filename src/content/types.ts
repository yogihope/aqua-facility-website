/**
 * Content types mirror the CMS models in Section 10 of the spec.
 * The same objects seed MySQL through Prisma and act as the render-time
 * fallback while the database is still being provisioned.
 */

export type Pair = { title: string; body: string };

export type ServiceContent = {
  slug: string;
  order: number;
  title: string;
  navTitle: string;
  heroKicker: string;
  heroTitle: string;
  intro: string;
  outcomeLine: string;
  chips: string[];
  capabilities: string[];
  problems: Pair[];
  delivery: Pair[];
  techLayer: string;
  safetyNote: string;
  closingLine: string;
  ctaLabel: string;
  seoTitle: string;
  seoDescription: string;
  industries: string[];
};

export type IndustryContent = {
  slug: string;
  order: number;
  title: string;
  heroTitle: string;
  intro: string;
  capabilities: string[];
  challenges: Pair[];
  ctaLabel: string;
  seoTitle: string;
  seoDescription: string;
};

export type GroupCompanyContent = {
  slug: string;
  order: number;
  displayName: string;
  legalName: string;
  legalNameVerified: boolean;
  positioning: string;
  scope: string;
  intro: string;
  roleInGroup: string;
  offerings: string[];
  beneficiaries: string[];
  operatingModel: string;
  proofNote: string;
  verificationNote?: string;
  seoTitle: string;
  seoDescription: string;
};

export type OutcomeMetric = { label: string; value: string; verified: boolean };

export type CaseStudyContent = {
  slug: string;
  order: number;
  clientName: string;
  clientApproved: boolean;
  anonymisedAs?: string;
  title: string;
  location: string;
  serviceScope: string;
  duration: string;
  workforceScale?: string;
  workforceVerified: boolean;
  equipment?: string;
  challenge: string;
  solution: string;
  process: string;
  outcome: string;
  outcomeMetrics: OutcomeMetric[];
  clientQuote?: string;
  quoteAttribution?: string;
  quoteApproved: boolean;
  published: boolean;
  serviceSlug?: string;
  industrySlug?: string;
};

export type TechCapabilityContent = {
  slug: string;
  order: number;
  module: string;
  category: string;
  description: string;
  status: "live" | "in-rollout" | "planned";
  metricLabel?: string;
  metricHint?: string;
};

export type JobContent = {
  slug: string;
  title: string;
  category: "Corporate" | "Technical & Supervisory" | "Workforce";
  company: string;
  location: string;
  employmentType: string;
  experience: string;
  skill: string;
  description: string;
  requirements: string[];
};

export type InsightContent = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  serviceSlug?: string;
};

export type RedirectContent = {
  source: string;
  destination: string;
  statusCode: number;
  note?: string;
};
