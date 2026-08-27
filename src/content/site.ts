/**
 * Site settings — Section 10 governance rule: one record, one source of truth.
 * Contact fields marked VERIFY must be replaced with management-confirmed
 * details before go-live (Section 18, Asset & Verification Checklist).
 */

export const FOUNDING_YEAR = 1996;

/** Appendix B: never hand-maintain age statements. Derive them. */
export function yearsOfExpertise(now: Date = new Date()): number {
  return Math.floor((now.getFullYear() - FOUNDING_YEAR) / 5) * 5;
}

export const site = {
  companyName: "Aqua",
  legalName: "Aqua Facility Services Pvt. Ltd.",
  tagline: "Best Services with Assured Satisfaction",
  positioning:
    "Integrated Multi-Facility, Manpower & Infrastructure Solutions Since 1996",
  masterMessage:
    "Aqua Does More Than Manage Facilities. We manage the people, processes and operations behind better businesses.",
  brandPromise: "Built on Trust. Driven by Excellence.",
  philosophy: "People. Process. Technology. Performance.",
  foundingYear: FOUNDING_YEAR,
  domain: "https://aquafacility.com",

  // [VERIFY] — replace with the confirmed corporate office record.
  addressLine1: "Corporate Office",
  addressLine2: "Address to be confirmed by management",
  city: "Pune",
  state: "Maharashtra",
  postalCode: "411001",
  country: "India",
  phone: "+91 00000 00000",
  altPhone: null as string | null,
  email: "info@aquafacility.com",
  careersEmail: "careers@aquafacility.com",

  linkedin: "https://www.linkedin.com/company/aqua-facility-services",
  facebook: "https://www.facebook.com/aquafacilityservices",
  instagram: null as string | null,
  youtube: null as string | null,

  footerCopy:
    "Aqua is an integrated operational-services organisation managing the people, processes, facilities and support systems organisations depend on every day.",
  primaryCtaLabel: "Request a Proposal",
} as const;

/** Section 3 — maximum 9 visible primary navigation items. */
export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: "services" as const },
  { label: "Industries", href: "/industries", mega: "industries" as const },
  { label: "Projects", href: "/projects" },
  { label: "Technology", href: "/technology" },
  { label: "Aqua Group", href: "/group" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/** Section 5.3 — reusable CTA library. Do not invent new CTA wording. */
export const CTA = {
  primaryEnterprise: "Request a Proposal",
  highIntent: "Discuss Your Requirement",
  discovery: "Explore Our Capabilities",
  service: "Build a Solution for Your Site",
  manpower: "Request Workforce Support",
  projects: "View Case Study",
  technology: "See How We Monitor Operations",
  careers: "View Open Opportunities",
  group: "Explore the Aqua Group",
  partner: "Partner With Aqua",
  site: "Discuss Your Site Requirement",
} as const;

/** Section 13.1 — lead routing logic. */
export const LEAD_ROUTING: Record<string, string> = {
  "integrated-facility-management": "Facility / Operations BD team",
  "hr-workforce-solutions": "HR / Workforce BD team",
  "production-manpower": "Industrial manpower team",
  "industrial-operations-maintenance": "Technical / O&M team",
  "railway-infrastructure": "Infrastructure / Projects team",
  security: "Aqua Shield Security team",
  "technology-enabled-operations": "Technology / ERP team",
  general: "Central business development inbox",
};

export function routeLead(services: string[]): string {
  for (const s of services) {
    if (LEAD_ROUTING[s]) return LEAD_ROUTING[s];
  }
  return LEAD_ROUTING.general;
}
