import type { IndustryContent } from "./types";

/**
 * Thirteen sectors — Sections 6.18 to 6.31.
 * Hero titles, intros and capability tags are taken from the specification.
 * Challenge copy is written to the Section 5.2 voice rules and carries no
 * client, scale or performance claims.
 */

const cta = "Discuss Your Site Requirement";

function seo(title: string, intro: string) {
  return {
    seoTitle: `Operational Support for ${title} | Aqua`,
    seoDescription: `${intro} Aqua combines trained manpower, mechanised systems and process discipline for ${title.toLowerCase()} operations.`,
  };
}

export const industries: IndustryContent[] = [
  {
    slug: "automobile",
    order: 1,
    title: "Automobile & Auto Components",
    heroTitle: "Operational Support Built for Automobile & Auto Components.",
    intro:
      "Production manpower, plant housekeeping, material handling, technical support and facility operations.",
    capabilities: [
      "Production workforce",
      "Plant housekeeping",
      "Material handling",
      "Technical support",
      "Facility operations",
    ],
    challenges: [
      {
        title: "Takt-time discipline",
        body: "Line manning has to hold through absenteeism, changeovers and volume swings without disturbing cycle time.",
      },
      {
        title: "Shop-floor housekeeping under production",
        body: "Cleaning windows are short and shared with running operations, so frequencies and equipment must fit around the line.",
      },
      {
        title: "Material movement",
        body: "Feeding stations, packaging and internal logistics need dependable general and skilled manpower across shifts.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Automobile & Auto Components",
      "Production manpower, plant housekeeping, material handling and facility operations for automobile and auto-component plants."
    ),
  },
  {
    slug: "engineering",
    order: 2,
    title: "Engineering",
    heroTitle: "Operational Support Built for Engineering.",
    intro:
      "Technical manpower, industrial cleaning, O&M, production support and stores.",
    capabilities: [
      "Technical manpower",
      "Industrial cleaning",
      "O&M",
      "Production support",
      "Stores",
    ],
    challenges: [
      {
        title: "Mixed-skill requirements",
        body: "Fabrication, machining and assembly areas each need different trade certifications and experience levels.",
      },
      {
        title: "Asset uptime",
        body: "Preventive schedules and breakdown response protect throughput on machines that jobs are planned around.",
      },
      {
        title: "Store and consumable control",
        body: "Structured store management keeps tools, spares and consumables available without excess holding.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Engineering",
      "Technical manpower, industrial cleaning, O&M, production support and store management for engineering operations."
    ),
  },
  {
    slug: "heavy-engineering",
    order: 3,
    title: "Heavy Engineering",
    heroTitle: "Operational Support Built for Heavy Engineering.",
    intro:
      "Industrial manpower, housekeeping, maintenance and safety-oriented operational support.",
    capabilities: [
      "Industrial manpower",
      "Housekeeping",
      "Maintenance",
      "Safety support",
    ],
    challenges: [
      {
        title: "Heavy-material environments",
        body: "Cleaning and support work runs alongside cranes, hot work and heavy movement, so safety planning drives the method.",
      },
      {
        title: "Shutdown windows",
        body: "Planned shutdowns compress large volumes of work into fixed windows and need mobilised manpower on short notice.",
      },
      {
        title: "Industrial soiling",
        body: "Oil, scale and metal debris need mechanised equipment and chemistry matched to the surface.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Heavy Engineering",
      "Industrial manpower, housekeeping, maintenance and safety-oriented operational support for heavy engineering sites."
    ),
  },
  {
    slug: "power",
    order: 4,
    title: "Power",
    heroTitle: "Operational Support Built for Power.",
    intro:
      "Power-plant housekeeping, mechanised cleaning, technical manpower and O&M support.",
    capabilities: [
      "Mechanised cleaning",
      "Technical manpower",
      "O&M",
      "Facility support",
    ],
    challenges: [
      {
        title: "Critical continuity",
        body: "Generation cannot pause for support activity, so work is planned around operating and outage schedules.",
      },
      {
        title: "Ash, dust and coal handling areas",
        body: "High-soiling zones need mechanised equipment, correct PPE and disciplined frequencies.",
      },
      {
        title: "Permit-controlled access",
        body: "Every activity runs under work permits, area clearances and plant safety systems.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Power",
      "Power-plant housekeeping, mechanised cleaning, technical manpower and O&M support."
    ),
  },
  {
    slug: "renewable-energy",
    order: 5,
    title: "Renewable Energy",
    heroTitle: "Operational Support Built for Renewable Energy.",
    intro: "Facility support, technical manpower, maintenance and site operations.",
    capabilities: [
      "Site operations",
      "Technical manpower",
      "Maintenance",
      "Facility support",
    ],
    challenges: [
      {
        title: "Dispersed sites",
        body: "Assets spread across large areas need rostered teams and geo-tagged verification rather than centralised supervision alone.",
      },
      {
        title: "Weather-dependent access",
        body: "Work planning has to absorb seasonal access constraints without losing schedule adherence.",
      },
      {
        title: "Module and equipment care",
        body: "Cleaning and maintenance methods follow OEM guidance to protect asset performance and warranty conditions.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Renewable Energy",
      "Facility support, technical manpower, maintenance and site operations for renewable energy assets."
    ),
  },
  {
    slug: "metal-steel",
    order: 6,
    title: "Metal & Steel",
    heroTitle: "Operational Support Built for Metal & Steel.",
    intro:
      "Production manpower, shop-floor support, industrial cleaning and O&M.",
    capabilities: [
      "Production manpower",
      "Shop-floor support",
      "Industrial cleaning",
      "O&M",
    ],
    challenges: [
      {
        title: "High-temperature zones",
        body: "Work near furnaces and casting areas requires specific PPE, exposure limits and supervision.",
      },
      {
        title: "Continuous operations",
        body: "Round-the-clock production means round-the-clock support rostering with reliable shift handover.",
      },
      {
        title: "Scale and dust load",
        body: "Heavy particulate loads need mechanised collection and disciplined disposal routines.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Metal & Steel",
      "Production manpower, shop-floor support, industrial cleaning and O&M for metal and steel plants."
    ),
  },
  {
    slug: "oil-gas",
    order: 7,
    title: "Oil & Gas",
    heroTitle: "Operational Support Built for Oil & Gas.",
    intro:
      "Technical workforce, industrial housekeeping, maintenance and operational support.",
    capabilities: [
      "Technical workforce",
      "Housekeeping",
      "Maintenance",
      "Operations support",
    ],
    challenges: [
      {
        title: "Hazardous-area discipline",
        body: "Classified areas govern equipment selection, tooling and every step of the work method.",
      },
      {
        title: "Permit and clearance load",
        body: "Support activity depends on permit cycles, gas testing and area authorisation.",
      },
      {
        title: "Contractor safety performance",
        body: "Induction, competency records and safety observation routines are part of daily execution.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Oil & Gas",
      "Technical workforce, industrial housekeeping, maintenance and operational support for oil and gas facilities."
    ),
  },
  {
    slug: "textiles",
    order: 8,
    title: "Textiles",
    heroTitle: "Operational Support Built for Textiles.",
    intro:
      "Production support, facility management, housekeeping and workforce solutions.",
    capabilities: [
      "Production support",
      "Facility management",
      "Housekeeping",
      "Workforce",
    ],
    challenges: [
      {
        title: "Lint and fibre control",
        body: "Continuous fibre generation needs frequent, method-specific cleaning to protect machines and air quality.",
      },
      {
        title: "Volume workforce management",
        body: "Large headcounts need structured attendance, documentation and replacement processes.",
      },
      {
        title: "Multi-shift consistency",
        body: "Output standards must hold across shifts through checklists and supervision, not individual habit.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Textiles",
      "Production support, facility management, housekeeping and workforce solutions for textile operations."
    ),
  },
  {
    slug: "home-appliances",
    order: 9,
    title: "Home Appliances",
    heroTitle: "Operational Support Built for Home Appliances.",
    intro:
      "Assembly-line manpower, production workforce, facility services and warehouse support.",
    capabilities: [
      "Assembly manpower",
      "Production support",
      "Facility services",
      "Warehouse",
    ],
    challenges: [
      {
        title: "Seasonal demand swings",
        body: "Headcount scales up and down with production plans without restarting the sourcing cycle each time.",
      },
      {
        title: "Assembly quality dependency",
        body: "Station-level skill matching and induction reduce rework at the line.",
      },
      {
        title: "Warehouse throughput",
        body: "Inward, storage, picking and dispatch need dependable material-handling teams.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Home Appliances",
      "Assembly-line manpower, production workforce, facility services and warehouse support for appliance manufacturing."
    ),
  },
  {
    slug: "healthcare-pharma",
    order: 10,
    title: "Healthcare & Pharma",
    heroTitle: "Operational Support Built for Healthcare & Pharma.",
    intro:
      "Hygiene-sensitive housekeeping, facility management, staffing and support services.",
    capabilities: [
      "Hygiene-sensitive housekeeping",
      "Facility management",
      "Staffing",
      "Support",
    ],
    challenges: [
      {
        title: "Contamination control",
        body: "Cleaning method, chemistry, colour coding and frequency follow the classification of each area.",
      },
      {
        title: "Documentation expectations",
        body: "Regulated environments expect records, not recollection — logs and audit trails are part of the service.",
      },
      {
        title: "Waste segregation",
        body: "Handling and disposal follow the applicable statutory requirements for the site.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Healthcare & Pharma",
      "Hygiene-sensitive housekeeping, facility management, staffing and support services for healthcare and pharmaceutical environments."
    ),
  },
  {
    slug: "agriculture",
    order: 11,
    title: "Agriculture",
    heroTitle: "Operational Support Built for Agriculture.",
    intro:
      "Manpower, facility and operational support adapted to site requirements.",
    capabilities: ["Manpower", "Facility support", "Operational support"],
    challenges: [
      {
        title: "Seasonal peaks",
        body: "Manpower requirements concentrate into short windows and need planned mobilisation.",
      },
      {
        title: "Remote locations",
        body: "Dispersed sites need local sourcing and supervision structures that work without daily central presence.",
      },
      {
        title: "Storage and handling",
        body: "Warehouse, loading and material-handling teams support movement through the season.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Agriculture",
      "Manpower, facility and operational support adapted to agricultural site requirements."
    ),
  },
  {
    slug: "commercial-corporate",
    order: 12,
    title: "Commercial & Corporate",
    heroTitle: "Operational Support Built for Commercial & Corporate.",
    intro:
      "Housekeeping, front-office, business support and building management.",
    capabilities: [
      "Housekeeping",
      "Front office",
      "Business support",
      "Building management",
    ],
    challenges: [
      {
        title: "Visible service standards",
        body: "Reception, common areas and washrooms shape how occupants judge the whole building every day.",
      },
      {
        title: "Occupant experience",
        body: "Complaint handling and response time matter as much as scheduled work.",
      },
      {
        title: "Building systems upkeep",
        body: "Maintenance, utilities and vendor coordination run under one accountable structure.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Commercial & Corporate",
      "Housekeeping, front-office staffing, business support and building management for corporate campuses and commercial properties."
    ),
  },
  {
    slug: "railways-infrastructure",
    order: 13,
    title: "Railways & Infrastructure",
    heroTitle: "Operational Support Built for Railways & Infrastructure.",
    intro:
      "Cleaning, manpower, maintenance, operational support and project execution.",
    capabilities: [
      "Station/platform cleaning",
      "Manpower",
      "Maintenance",
      "Project support",
    ],
    challenges: [
      {
        title: "Continuous public footfall",
        body: "Passenger areas stay in use around the clock, so cleaning cycles work around operations rather than pausing them.",
      },
      {
        title: "Contractual evidence",
        body: "Authority contracts require time-stamped verification, audit logs and periodic reporting.",
      },
      {
        title: "Multi-location supervision",
        body: "Platforms, buildings and shifts need one supervision structure with geo-tagged verification.",
      },
    ],
    ctaLabel: cta,
    ...seo(
      "Railways & Infrastructure",
      "Station and platform cleaning, manpower, maintenance and project support for railway and infrastructure environments."
    ),
  },
];

export const getIndustry = (slug: string) =>
  industries.find((i) => i.slug === slug);
