import "server-only";

import { prisma } from "./prisma";
import { services as staticServices, getService } from "@/content/services";
import { industries as staticIndustries, getIndustry } from "@/content/industries";
import { groupCompanies as staticGroup, getGroupCompany } from "@/content/group";
import { caseStudies as staticCases, getCaseStudy } from "@/content/projects";
import { jobs as staticJobs } from "@/content/careers";
import { insights as staticInsights, getInsight } from "@/content/insights";
import { techCapabilities as staticTech } from "@/content/technology";
import type {
  CaseStudyContent,
  GroupCompanyContent,
  IndustryContent,
  InsightContent,
  JobContent,
  ServiceContent,
  TechCapabilityContent,
} from "@/content/types";

/**
 * Content is authored once in `src/content`, seeded into MySQL through Prisma,
 * and read back here at render time.
 *
 * `withDb` runs the Prisma query and falls back to the authored content if the
 * database is unreachable or has not been seeded yet. That keeps the site
 * renderable during local setup and during a database incident, without
 * silently serving stale data in production — the fallback is the same content
 * the seed writes.
 */
let dbWarned = false;

async function withDb<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) return fallback;
  try {
    const result = await query();
    if (Array.isArray(result) && result.length === 0) return fallback;
    if (result === null || result === undefined) return fallback;
    return result;
  } catch (error) {
    if (!dbWarned) {
      dbWarned = true;
      console.warn(
        "[aqua] Database unavailable — serving authored content fallback.",
        error instanceof Error ? error.message : error
      );
    }
    return fallback;
  }
}

/** Prisma stores list fields as JSON; normalise them back to typed arrays. */
function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export async function getServices(): Promise<ServiceContent[]> {
  return withDb(async () => {
    const rows = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      include: { industries: { include: { industry: true } } },
    });
    return rows.map((r) => ({
      slug: r.slug,
      order: r.order,
      title: r.title,
      navTitle: r.navTitle,
      heroKicker: r.heroKicker,
      heroTitle: r.heroTitle,
      intro: r.intro,
      outcomeLine: r.outcomeLine,
      chips: asArray<string>(r.chips),
      capabilities: asArray<string>(r.capabilities),
      problems: asArray<{ title: string; body: string }>(r.problems),
      delivery: asArray<{ title: string; body: string }>(r.delivery),
      techLayer: r.techLayer,
      safetyNote: r.safetyNote,
      closingLine: r.closingLine,
      ctaLabel: r.ctaLabel,
      seoTitle: r.seoTitle,
      seoDescription: r.seoDescription,
      industries: r.industries.map((i) => i.industry.slug),
    }));
  }, staticServices);
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceContent | undefined> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? getService(slug);
}

/* -------------------------------------------------------------------------- */
/* Industries                                                                  */
/* -------------------------------------------------------------------------- */

export async function getIndustries(): Promise<IndustryContent[]> {
  return withDb(async () => {
    const rows = await prisma.industry.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((r) => ({
      slug: r.slug,
      order: r.order,
      title: r.title,
      heroTitle: r.heroTitle,
      intro: r.intro,
      capabilities: asArray<string>(r.capabilities),
      challenges: asArray<{ title: string; body: string }>(r.challenges),
      ctaLabel: r.ctaLabel,
      seoTitle: r.seoTitle,
      seoDescription: r.seoDescription,
    }));
  }, staticIndustries);
}

export async function getIndustryBySlug(
  slug: string
): Promise<IndustryContent | undefined> {
  const all = await getIndustries();
  return all.find((i) => i.slug === slug) ?? getIndustry(slug);
}

/** Services relevant to an industry, resolved through the join table. */
export async function getServicesForIndustry(
  industrySlug: string
): Promise<ServiceContent[]> {
  const all = await getServices();
  return all.filter((s) => s.industries.includes(industrySlug));
}

/* -------------------------------------------------------------------------- */
/* Aqua Group                                                                  */
/* -------------------------------------------------------------------------- */

export async function getGroupCompanies(): Promise<GroupCompanyContent[]> {
  return withDb(async () => {
    const rows = await prisma.groupCompany.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((r) => ({
      slug: r.slug,
      order: r.order,
      displayName: r.displayName,
      legalName: r.legalName,
      legalNameVerified: r.legalNameVerified,
      positioning: r.positioning,
      scope: r.scope,
      intro: r.intro,
      roleInGroup: r.roleInGroup,
      offerings: asArray<string>(r.offerings),
      beneficiaries: asArray<string>(r.beneficiaries),
      operatingModel: r.operatingModel,
      proofNote: r.proofNote,
      verificationNote: r.verificationNote ?? undefined,
      seoTitle: r.seoTitle,
      seoDescription: r.seoDescription,
    }));
  }, staticGroup);
}

export async function getGroupCompanyBySlug(
  slug: string
): Promise<GroupCompanyContent | undefined> {
  const all = await getGroupCompanies();
  return all.find((g) => g.slug === slug) ?? getGroupCompany(slug);
}

/* -------------------------------------------------------------------------- */
/* Case studies                                                                */
/* -------------------------------------------------------------------------- */

export async function getCaseStudies(): Promise<CaseStudyContent[]> {
  return withDb(async () => {
    const rows = await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      include: { service: true, industry: true },
    });
    return rows.map((r) => ({
      slug: r.slug,
      order: r.order,
      clientName: r.clientName,
      clientApproved: r.clientApproved,
      anonymisedAs: r.anonymisedAs ?? undefined,
      title: r.title,
      location: r.location,
      serviceScope: r.serviceScope,
      duration: r.duration,
      workforceScale: r.workforceScale ?? undefined,
      workforceVerified: r.workforceVerified,
      equipment: r.equipment ?? undefined,
      challenge: r.challenge,
      solution: r.solution,
      process: r.process,
      outcome: r.outcome,
      outcomeMetrics: asArray<{
        label: string;
        value: string;
        verified: boolean;
      }>(r.outcomeMetrics),
      clientQuote: r.clientQuote ?? undefined,
      quoteAttribution: r.quoteAttribution ?? undefined,
      quoteApproved: r.quoteApproved,
      published: r.published,
      serviceSlug: r.service?.slug,
      industrySlug: r.industry?.slug,
    }));
  }, staticCases);
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudyContent | undefined> {
  const all = await getCaseStudies();
  return all.find((c) => c.slug === slug) ?? getCaseStudy(slug);
}

/* -------------------------------------------------------------------------- */
/* Technology                                                                  */
/* -------------------------------------------------------------------------- */

export async function getTechCapabilities(): Promise<TechCapabilityContent[]> {
  return withDb(async () => {
    const rows = await prisma.techCapability.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((r) => ({
      slug: r.slug,
      order: r.order,
      module: r.module,
      category: r.category,
      description: r.description,
      status: r.status as TechCapabilityContent["status"],
      metricLabel: r.metricLabel ?? undefined,
      metricHint: r.metricHint ?? undefined,
    }));
  }, staticTech);
}

/* -------------------------------------------------------------------------- */
/* Careers                                                                     */
/* -------------------------------------------------------------------------- */

export async function getJobs(): Promise<JobContent[]> {
  return withDb(async () => {
    const rows = await prisma.job.findMany({
      where: {
        published: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: { postedAt: "desc" },
    });
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category as JobContent["category"],
      company: r.company,
      location: r.location,
      employmentType: r.employmentType,
      experience: r.experience,
      skill: r.skill,
      description: r.description,
      requirements: asArray<string>(r.requirements),
    }));
  }, staticJobs);
}

/* -------------------------------------------------------------------------- */
/* Insights                                                                    */
/* -------------------------------------------------------------------------- */

export async function getInsights(): Promise<InsightContent[]> {
  return withDb(async () => {
    const rows = await prisma.insight.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      include: { service: true },
    });
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category,
      excerpt: r.excerpt,
      body: r.body,
      author: r.author,
      readMinutes: r.readMinutes,
      publishedAt: r.publishedAt.toISOString().slice(0, 10),
      seoTitle: r.seoTitle,
      seoDescription: r.seoDescription,
      serviceSlug: r.service?.slug,
    }));
  }, staticInsights);
}

export async function getInsightBySlug(
  slug: string
): Promise<InsightContent | undefined> {
  const all = await getInsights();
  return all.find((i) => i.slug === slug) ?? getInsight(slug);
}
