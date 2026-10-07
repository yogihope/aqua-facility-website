import type { JobContent } from "./types";

/**
 * Section 6.34 — tabs by category, filters by location / company / skill.
 *
 * These are the live office vacancies from the recruitment plan HR supplied on
 * 2026-10-01. Only the roles marked "recruitment required" are published:
 * positions already held or in process stay off the site, and the plan's
 * candidate names and internal hiring status are never published.
 */
export const JOB_CATEGORIES = [
  "Corporate",
  "Technical & Supervisory",
  "Workforce",
] as const;

export const jobs: JobContent[] = [
  {
    slug: "head-hr-ahmedabad",
    title: "Head HR",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    employmentType: "Full-time",
    experience: "5+ years",
    skill: "Human Resources",
    salary: "₹50,000 per month",
    description:
      "Lead the whole HR function for the group — recruitment, payroll, compliance and industrial relations — across office and site teams.",
    requirements: [
      "5+ years of HR experience",
      "Service industry background only",
      "Able to lead the complete HR team",
    ],
    applyEmail: "admin@aquafacility.com",
    featured: true,
  },
  {
    slug: "senior-hr-executive-ahmedabad",
    title: "Sr. HR Executive",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    employmentType: "Full-time",
    experience: "3+ years",
    skill: "Payroll & Compliance",
    salary: "₹40,000 per month",
    description:
      "Run payroll, statutory compliance and recruitment for a multi-site workforce, working with site supervisors on documentation and records.",
    requirements: [
      "3+ years of HR experience",
      "Good knowledge of payroll processing",
      "Compliance and statutory work",
      "Recruitment experience",
    ],
    applyEmail: "admin@aquafacility.com",
  },
  {
    slug: "accounts-head-ahmedabad",
    title: "Accounts Head",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    employmentType: "Full-time",
    experience: "5+ years",
    skill: "Accounts & Finance",
    salary: "₹50,000 per month",
    description:
      "Lead the accounts team and own the books, closings, statutory payments and reporting for the group.",
    requirements: [
      "Minimum 5 years of experience",
      "Able to lead the accounts team",
    ],
    applyEmail: "admin@aquafacility.com",
  },
  {
    slug: "in-house-auditor-ahmedabad",
    title: "In-house Auditor",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    employmentType: "Full-time",
    experience: "3+ years",
    skill: "Audit",
    salary: "No bar for the right candidate",
    description:
      "Audit the group's accounts, controls and site billing in-house, and report findings to management.",
    requirements: [
      "Minimum 3 years of experience",
      "Inter CA, CS or CA may apply",
    ],
    applyEmail: "admin@aquafacility.com",
  },
  {
    slug: "purchase-executive-ahmedabad",
    title: "Purchase Executive",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    employmentType: "Full-time",
    experience: "2–3 years",
    skill: "Purchase & Supply Chain",
    salary: "₹30,000 per month",
    description:
      "Handle purchasing for site operations — uniforms, shoes, PPE and machines — from vendor selection to delivery at site.",
    requirements: [
      "2–3 years of purchase experience",
      "Able to handle uniform, shoes, PPE and machine purchase",
    ],
    applyEmail: "admin@aquafacility.com",
  },
  {
    slug: "pa-to-md-in-office-ahmedabad",
    title: "Personal Assistant to MD (in-office)",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    employmentType: "Full-time",
    experience: "As per candidate",
    skill: "Executive Support",
    salary: "₹35,000 per month",
    description:
      "Work closely with the Managing Director on day-to-day coordination, follow-ups and office management.",
    requirements: [
      "Excellent communication",
      "Street-smart, practical approach",
      "Comfortable working closely with the MD",
    ],
    applyEmail: "admin@aquafacility.com",
  },
  {
    slug: "pa-to-md-out-office-ahmedabad",
    title: "Personal Assistant to MD (out-office)",
    category: "Corporate",
    company: "Aqua Facility Services Pvt. Ltd.",
    location: "Ahmedabad, Gujarat",
    employmentType: "Full-time",
    experience: "As per candidate",
    skill: "Client Coordination",
    salary: "₹50,000 per month",
    description:
      "Travel with the Managing Director and handle client communication and coordination outside the office.",
    requirements: [
      "Presentable and well-spoken",
      "Comfortable with regular travel",
      "Client communication experience",
    ],
    applyEmail: "admin@aquafacility.com",
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

/** The headline vacancy pinned above the board, if any role is flagged. */
export const getFeaturedJob = (list: JobContent[] = jobs) =>
  list.find((j) => j.featured);

/**
 * Employee development — the stages a person actually passes through at Aqua,
 * described as process rather than as benefits copy. Nothing here asserts an
 * outcome that is not part of the documented deployment process.
 */
export const employeeDevelopment = [
  {
    stage: "Induction",
    title: "Trained before the first shift",
    body: "Safety orientation, site induction and role briefing happen before deployment, so nobody learns the standard on the job.",
  },
  {
    stage: "Skilling",
    title: "Equipment and method training",
    body: "Mechanised equipment, chemical handling and standard work methods are taught and re-certified rather than assumed from prior experience.",
  },
  {
    stage: "Supervision",
    title: "A named supervisor and a review cadence",
    body: "Every site carries a supervision layer with an escalation route, so performance is discussed regularly instead of only at incident time.",
  },
  {
    stage: "Progression",
    title: "Associate to supervisor to site lead",
    body: "Supervisory and site-management roles are filled from within wherever the skill and record support it, across every group company.",
  },
  {
    stage: "Documentation",
    title: "Employment on record",
    body: "Onboarding, attendance, payroll and statutory documentation are maintained through the process, not assembled at audit time.",
  },
  {
    stage: "Recognition",
    title: "An employer brand that is assessed",
    body: "Aqua's people practices were assessed externally for The Gujarat State Best Employer Brand Awards 2026.",
  },
];
