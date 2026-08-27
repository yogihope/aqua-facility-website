import type { JobContent } from "./types";

/**
 * Section 6.34 — tabs by category, filters by location / company / skill.
 * Seed roles are representative openings for the careers system; HR replaces
 * them through the CMS. JobPosting schema is emitted from these records.
 */
export const JOB_CATEGORIES = [
  "Corporate",
  "Technical & Supervisory",
  "Workforce",
] as const;

export const jobs: JobContent[] = [
  {
    slug: "site-facility-manager-pune",
    title: "Site Facility Manager",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Pune, Maharashtra",
    employmentType: "Full-time",
    experience: "5–8 years",
    skill: "Facility Management",
    description:
      "Own end-to-end facility operations for a corporate or industrial site — manpower planning, SOP adherence, client review cycles and escalation closure.",
    requirements: [
      "Experience managing integrated facility scope at a single large site",
      "Working knowledge of mechanised housekeeping equipment and frequencies",
      "Comfort with digital attendance, ticketing and MIS reporting",
      "Client-facing communication and review discipline",
    ],
  },
  {
    slug: "operations-executive-business-development",
    title: "Business Development Executive",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Pune, Maharashtra",
    employmentType: "Full-time",
    experience: "2–5 years",
    skill: "Business Development",
    description:
      "Work with the facility, workforce and infrastructure teams to qualify enquiries, build proposals and support tender and RFP submissions.",
    requirements: [
      "B2B services or facility-management sales experience",
      "Proposal and tender documentation exposure",
      "Structured follow-up and CRM discipline",
    ],
  },
  {
    slug: "hr-payroll-compliance-executive",
    title: "HR & Payroll Compliance Executive",
    category: "Corporate",
    company: "Aqua Group",
    location: "Pune, Maharashtra",
    employmentType: "Full-time",
    experience: "3–6 years",
    skill: "Payroll & Compliance",
    description:
      "Maintain workforce documentation, payroll inputs and statutory compliance records across deployed headcount.",
    requirements: [
      "Hands-on payroll processing for contract workforce",
      "Statutory registers, PF/ESIC and documentation discipline",
      "Attention to audit readiness",
    ],
  },
  {
    slug: "maintenance-supervisor",
    title: "Maintenance Supervisor",
    category: "Technical & Supervisory",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Multiple plant locations",
    employmentType: "Full-time",
    experience: "4–7 years",
    skill: "Mechanical / Electrical Maintenance",
    description:
      "Run preventive schedules, breakdown coordination and corrective-action closure for plant and building assets.",
    requirements: [
      "Diploma or ITI in a mechanical or electrical trade",
      "Preventive maintenance planning and permit-to-work discipline",
      "Store and spares coordination",
    ],
  },
  {
    slug: "housekeeping-shift-supervisor",
    title: "Housekeeping Shift Supervisor",
    category: "Technical & Supervisory",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Multiple sites",
    employmentType: "Full-time",
    experience: "2–5 years",
    skill: "Housekeeping Supervision",
    description:
      "Lead a shift team, run inspection rounds, log deviations and hold cleaning frequencies to the agreed standard.",
    requirements: [
      "Experience supervising housekeeping teams on an industrial or commercial site",
      "Familiarity with mechanised equipment operation and safety",
      "Comfort using a supervisor application for checklists and reporting",
    ],
  },
  {
    slug: "iti-electrician",
    title: "ITI Electrician",
    category: "Workforce",
    company: "Aspigo",
    location: "Multiple plant locations",
    employmentType: "Full-time",
    experience: "1–5 years",
    skill: "Electrical",
    description:
      "Support plant electrical maintenance, routine inspections and breakdown attendance under supervisory guidance.",
    requirements: [
      "ITI certification in Electrician trade",
      "Plant or industrial site experience preferred",
      "Safety and PPE compliance",
    ],
  },
  {
    slug: "machine-operator",
    title: "Machine Operator",
    category: "Workforce",
    company: "Aspigo",
    location: "Multiple plant locations",
    employmentType: "Full-time",
    experience: "0–4 years",
    skill: "Production",
    description:
      "Operate production machines to the standard work instruction, maintain output quality and support changeovers.",
    requirements: [
      "ITI or equivalent trade background preferred",
      "Willingness to work in rotating shifts",
      "Safety induction compliance",
    ],
  },
  {
    slug: "housekeeping-associate",
    title: "Housekeeping Associate",
    category: "Workforce",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Multiple sites",
    employmentType: "Full-time",
    experience: "Fresher and experienced",
    skill: "Housekeeping",
    description:
      "Carry out scheduled cleaning activities to the site SOP, including mechanised equipment operation after training.",
    requirements: [
      "Willingness to work in shifts",
      "Training provided for equipment and chemical handling",
      "PPE and safety compliance",
    ],
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
