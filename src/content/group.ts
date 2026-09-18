import type { GroupCompanyContent } from "./types";

/**
 * Aqua Group — Sections 6.3 to 6.9.
 * Several entities carry [VERIFY] flags in the specification. Those are held in
 * `legalNameVerified` so the UI can show a governance
 * notice instead of publishing an unconfirmed legal or licence claim.
 */
export const groupCompanies: GroupCompanyContent[] = [
  {
    slug: "aqua-facility-services",
    order: 1,
    displayName: "Aqua Facility Services",
    legalName: "Aqua Facility Services Pvt. Ltd.",
    legalNameVerified: true,
    positioning: "The Operational Backbone of Better Facilities.",
    scope:
      "Integrated facility management, housekeeping, O&M, industrial cleaning, warehouse/store, landscaping, infrastructure support.",
    intro:
      "Aqua Facility Services Pvt. Ltd. is the flagship facility and operational-services company within Aqua Group. It delivers integrated facility management, mechanised housekeeping, industrial cleaning, building and plant support, warehouse/store management, landscaping, business support and infrastructure-related operational services.",
    roleInGroup:
      "The flagship operating company and the entry point for most integrated facility and infrastructure engagements. Other group capabilities extend a client relationship that usually begins here.",
    offerings: [
      "Integrated facility management",
      "Mechanised housekeeping",
      "Industrial cleaning",
      "Building and plant support",
      "Warehouse and store management",
      "Landscaping",
      "Business support",
      "Infrastructure operational services",
    ],
    beneficiaries: [
      "Corporate campuses",
      "Manufacturing plants",
      "Industrial facilities",
      "Healthcare and pharma sites",
      "Railway and infrastructure environments",
    ],
    operatingModel:
      "Site-specific manpower plans, standardised SOPs, mechanised equipment and layered supervision, supported by a digital operating layer for attendance, verification and reporting.",
    proofNote:
      "Client references, certifications and project details are shared on request and published only after client approval.",
    seoTitle: "Aqua Facility Services Pvt. Ltd. | Aqua Group",
    seoDescription:
      "The flagship facility and operational-services company within Aqua Group — integrated facility management, mechanised housekeeping, O&M and infrastructure support.",
  },
  {
    slug: "aqua-corporation",
    order: 2,
    displayName: "Aqua Corporation",
    legalName: "Aqua Corporation",
    legalNameVerified: true,
    positioning: "Connecting Capability with Opportunity.",
    scope: "Workforce and employment solutions.",
    intro:
      "Aqua Corporation supports workforce and employment requirements through sourcing, mobilisation, staffing and deployment-oriented services.",
    roleInGroup:
      "Extends the Group's sourcing and employment reach, connecting candidate supply with client deployment requirements.",
    offerings: [
      "Workforce sourcing",
      "Candidate mobilisation",
      "Staffing services",
      "Deployment support",
    ],
    beneficiaries: [
      "Employers with volume hiring requirements",
      "Multi-site operations",
      "Candidates seeking structured employment",
    ],
    operatingModel:
      "Sourcing channels, screening and documentation, mobilisation to site and handover into the client or Group deployment structure.",
    proofNote:
      "Service scope, geographies and capacity are confirmed during engagement discussions.",
    seoTitle: "Aqua Corporation — Workforce & Employment Solutions | Aqua Group",
    seoDescription:
      "Workforce and employment solutions within Aqua Group — sourcing, mobilisation, staffing and deployment-oriented services.",
  },
  {
    slug: "nairuti-corporation",
    order: 3,
    displayName: "Nairuti Corporation",
    legalName: "Nairuti Corporation",
    legalNameVerified: true,
    positioning: "Supporting Business Behind the Scenes.",
    scope: "Administrative, office and project-support services.",
    intro:
      "Nairuti Corporation is positioned around business, administrative and project-support services.",
    roleInGroup:
      "Handles the back-office and project-support layer that keeps client administration, documentation and coordination moving.",
    offerings: [
      "Administrative support",
      "Office support services",
      "Project coordination support",
      "Documentation and back-office processes",
    ],
    beneficiaries: [
      "Corporate offices",
      "Project sites",
      "Multi-location businesses",
    ],
    operatingModel:
      "Defined support scopes, trained administrative personnel and coordination routines aligned to the client's internal processes.",
    proofNote:
      "Engagement scope is defined per client and confirmed in the service agreement.",
    seoTitle:
      "Nairuti Corporation — Business & Project Support Services | Aqua Group",
    seoDescription:
      "Business, administrative and project-support services within Aqua Group.",
  },
  {
    slug: "aqua-shield-security",
    order: 4,
    displayName: "Aqua Shield Security",
    legalName: "Aqua Shield Security",
    legalNameVerified: true,
    positioning: "Protection You Can Depend On.",
    scope: "Security and site protection services.",
    intro:
      "Aqua Shield Security represents the Group's professional security and site-protection capability.",
    roleInGroup:
      "Adds site protection to integrated engagements where a client wants security managed under the same operational structure as facilities and manpower.",
    offerings: [
      "Site security personnel",
      "Access and gate control",
      "Patrolling and surveillance support",
      "Security supervision",
    ],
    beneficiaries: [
      "Industrial plants",
      "Corporate campuses",
      "Warehouses and project sites",
    ],
    operatingModel:
      "Deployment against a site security plan with post-wise instructions, shift supervision, incident recording and escalation.",
    proofNote:
      "Licence details, geographic coverage and credentials are provided during evaluation.",
    seoTitle: "Aqua Shield Security — Site Protection Services | Aqua Group",
    seoDescription:
      "Professional security and site-protection capability within Aqua Group.",
  },
  {
    slug: "aqua-devika-foundation",
    order: 5,
    displayName: "Aqua Devika Foundation",
    legalName: "Aqua Devika Foundation",
    legalNameVerified: true,
    positioning: "Progress with Purpose.",
    scope:
      "Social impact, education, skill development, healthcare, community and environment programmes.",
    intro:
      "Aqua Devika Foundation is the social-impact arm of the Group. This page focuses on verified programmes, beneficiaries, partnerships and measurable outcomes rather than generic CSR promises.",
    roleInGroup:
      "The Group's social-impact arm, working on education, skilling, employability and community initiatives connected to the regions Aqua operates in.",
    offerings: [
      "Education initiatives",
      "Skill development",
      "Employability programmes",
      "Healthcare initiatives",
      "Community welfare",
      "Environmental responsibility",
    ],
    beneficiaries: [
      "Communities in Aqua operating locations",
      "Candidates entering the workforce",
      "Programme partners",
    ],
    operatingModel:
      "Programmes are documented with location, partner, beneficiary and outcome records before they are published.",
    proofNote:
      "Programme modules stay unpublished until actual programmes, beneficiary counts, locations, partners and photographs are supplied.",
    seoTitle: "Aqua Devika Foundation — Social Impact | Aqua Group",
    seoDescription:
      "The social-impact arm of Aqua Group, working on education, skill development, employability, healthcare and community initiatives.",
  },
];

export const getGroupCompany = (slug: string) =>
  groupCompanies.find((g) => g.slug === slug);
