import { PrismaClient } from "@prisma/client";
import { site } from "../src/content/site";
import { services } from "../src/content/services";
import { industries } from "../src/content/industries";
import { groupCompanies } from "../src/content/group";
import { caseStudies } from "../src/content/projects";
import { techCapabilities } from "../src/content/technology";
import { jobs } from "../src/content/careers";
import { insights } from "../src/content/insights";
import { redirects } from "../src/content/redirects";

/**
 * Seeds MySQL from the authored content in `src/content`.
 * Idempotent: every write is an upsert keyed on the natural unique field, so
 * running it repeatedly converges rather than duplicating.
 */
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Aqua content...");

  /* -- Site settings: one record, one source of truth (Section 10) --------- */
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      companyName: site.companyName,
      legalName: site.legalName,
      tagline: site.tagline,
      positioning: site.positioning,
      brandPromise: site.brandPromise,
      philosophy: site.philosophy,
      foundingYear: site.foundingYear,
      addressLine1: site.addressLine1,
      addressLine2: site.addressLine2,
      city: site.city,
      state: site.state,
      postalCode: site.postalCode,
      country: site.country,
      phone: site.phone,
      altPhone: site.altPhone,
      email: site.email,
      careersEmail: site.careersEmail,
      linkedin: site.linkedin,
      facebook: site.facebook,
      instagram: site.instagram,
      youtube: site.youtube,
      footerCopy: site.footerCopy,
      primaryCtaLabel: site.primaryCtaLabel,
    },
    update: {
      companyName: site.companyName,
      legalName: site.legalName,
      tagline: site.tagline,
      positioning: site.positioning,
      brandPromise: site.brandPromise,
      philosophy: site.philosophy,
      footerCopy: site.footerCopy,
    },
  });
  console.log("  site settings");

  /* -- Industries (seeded first so services can link to them) ------------- */
  for (const industry of industries) {
    const data = {
      order: industry.order,
      title: industry.title,
      heroTitle: industry.heroTitle,
      intro: industry.intro,
      capabilities: industry.capabilities,
      challenges: industry.challenges,
      ctaLabel: industry.ctaLabel,
      seoTitle: industry.seoTitle,
      seoDescription: industry.seoDescription,
      published: true,
    };
    await prisma.industry.upsert({
      where: { slug: industry.slug },
      create: { slug: industry.slug, ...data },
      update: data,
    });
  }
  console.log(`  ${industries.length} industries`);

  /* -- Services + the service↔industry join -------------------------------- */
  for (const service of services) {
    const data = {
      order: service.order,
      title: service.title,
      navTitle: service.navTitle,
      heroTitle: service.heroTitle,
      heroKicker: service.heroKicker,
      intro: service.intro,
      outcomeLine: service.outcomeLine,
      chips: service.chips,
      capabilities: service.capabilities,
      problems: service.problems,
      delivery: service.delivery,
      techLayer: service.techLayer,
      safetyNote: service.safetyNote,
      closingLine: service.closingLine,
      ctaLabel: service.ctaLabel,
      seoTitle: service.seoTitle,
      seoDescription: service.seoDescription,
      published: true,
    };

    const record = await prisma.service.upsert({
      where: { slug: service.slug },
      create: { slug: service.slug, ...data },
      update: data,
    });

    // Rebuild the join rather than diffing it — the set is tiny and authored.
    await prisma.industryOnService.deleteMany({ where: { serviceId: record.id } });

    const linked = await prisma.industry.findMany({
      where: { slug: { in: service.industries } },
      select: { id: true },
    });

    if (linked.length) {
      await prisma.industryOnService.createMany({
        data: linked.map((industry) => ({
          serviceId: record.id,
          industryId: industry.id,
        })),
      });
    }
  }
  console.log(`  ${services.length} services`);

  /* -- Aqua Group ---------------------------------------------------------- */
  for (const company of groupCompanies) {
    const data = {
      order: company.order,
      displayName: company.displayName,
      legalName: company.legalName,
      legalNameVerified: company.legalNameVerified,
      positioning: company.positioning,
      scope: company.scope,
      intro: company.intro,
      roleInGroup: company.roleInGroup,
      offerings: company.offerings,
      beneficiaries: company.beneficiaries,
      operatingModel: company.operatingModel,
      proofNote: company.proofNote,
      verificationNote: company.verificationNote ?? null,
      seoTitle: company.seoTitle,
      seoDescription: company.seoDescription,
      published: true,
    };
    await prisma.groupCompany.upsert({
      where: { slug: company.slug },
      create: { slug: company.slug, ...data },
      update: data,
    });
  }
  console.log(`  ${groupCompanies.length} group companies`);

  /* -- Case studies -------------------------------------------------------- */
  for (const study of caseStudies) {
    const service = study.serviceSlug
      ? await prisma.service.findUnique({
          where: { slug: study.serviceSlug },
          select: { id: true },
        })
      : null;
    const industry = study.industrySlug
      ? await prisma.industry.findUnique({
          where: { slug: study.industrySlug },
          select: { id: true },
        })
      : null;

    const data = {
      order: study.order,
      clientName: study.clientName,
      clientApproved: study.clientApproved,
      anonymisedAs: study.anonymisedAs ?? null,
      title: study.title,
      location: study.location,
      serviceScope: study.serviceScope,
      duration: study.duration,
      workforceScale: study.workforceScale || null,
      workforceVerified: study.workforceVerified,
      equipment: study.equipment ?? null,
      challenge: study.challenge,
      solution: study.solution,
      process: study.process,
      outcome: study.outcome,
      outcomeMetrics: study.outcomeMetrics,
      clientQuote: study.clientQuote ?? null,
      quoteAttribution: study.quoteAttribution ?? null,
      quoteApproved: study.quoteApproved,
      published: study.published,
      serviceId: service?.id ?? null,
      industryId: industry?.id ?? null,
    };

    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      create: { slug: study.slug, ...data },
      update: data,
    });
  }
  console.log(`  ${caseStudies.length} case studies`);

  /* -- Technology capabilities --------------------------------------------- */
  for (const capability of techCapabilities) {
    const data = {
      order: capability.order,
      module: capability.module,
      category: capability.category,
      description: capability.description,
      status: capability.status,
      metricLabel: capability.metricLabel ?? null,
      metricHint: capability.metricHint ?? null,
      published: true,
    };
    await prisma.techCapability.upsert({
      where: { slug: capability.slug },
      create: { slug: capability.slug, ...data },
      update: data,
    });
  }
  console.log(`  ${techCapabilities.length} technology capabilities`);

  /* -- Jobs ---------------------------------------------------------------- */
  for (const job of jobs) {
    const data = {
      title: job.title,
      category: job.category,
      company: job.company,
      location: job.location,
      employmentType: job.employmentType,
      experience: job.experience,
      skill: job.skill,
      description: job.description,
      requirements: job.requirements,
      published: true,
    };
    await prisma.job.upsert({
      where: { slug: job.slug },
      create: { slug: job.slug, ...data },
      update: data,
    });
  }
  console.log(`  ${jobs.length} jobs`);

  /* -- Insights ------------------------------------------------------------ */
  for (const insight of insights) {
    const service = insight.serviceSlug
      ? await prisma.service.findUnique({
          where: { slug: insight.serviceSlug },
          select: { id: true },
        })
      : null;

    const data = {
      title: insight.title,
      category: insight.category,
      excerpt: insight.excerpt,
      body: insight.body,
      author: insight.author,
      readMinutes: insight.readMinutes,
      publishedAt: new Date(insight.publishedAt),
      seoTitle: insight.seoTitle,
      seoDescription: insight.seoDescription,
      published: true,
      serviceId: service?.id ?? null,
    };

    await prisma.insight.upsert({
      where: { slug: insight.slug },
      create: { slug: insight.slug, ...data },
      update: data,
    });
  }
  console.log(`  ${insights.length} insights`);

  /* -- Redirect inventory (Appendix A seed list) --------------------------- */
  for (const redirect of redirects) {
    const data = {
      destination: redirect.destination,
      statusCode: redirect.statusCode,
      note: redirect.note ?? null,
      active: true,
    };
    await prisma.redirect.upsert({
      where: { source: redirect.source },
      create: { source: redirect.source, ...data },
      update: data,
    });
  }
  console.log(`  ${redirects.length} redirects`);

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
