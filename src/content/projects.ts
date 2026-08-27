import type { CaseStudyContent } from "./types";

/**
 * Section 6.32 publishing rules, applied literally:
 *  - "Use client names only with permission"  -> clientApproved gates the name.
 *  - "No invented numbers"                    -> every metric ships verified:false,
 *                                                so the UI renders the label with a
 *                                                pending marker instead of a figure.
 *  - "If the outcome cannot be quantified, write a qualitative but factual
 *     operational result."                    -> outcome copy is qualitative.
 *
 * These three records are the STRUCTURAL TEMPLATE. Management supplies verified
 * facts (Section 18) and flips clientApproved / workforceVerified / verified
 * before launch. The projects UI shows a governance notice while that is pending.
 */
export const IS_TEMPLATE_CONTENT = true;

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "multi-plant-integrated-facility-management",
    order: 1,
    clientName: "",
    clientApproved: false,
    anonymisedAs: "Automobile manufacturing plant",
    title: "Consolidating multi-vendor facility scope into one operating structure",
    location: "Western India",
    serviceScope:
      "Mechanised housekeeping, industrial cleaning, waste management, facility maintenance support",
    duration: "Multi-year contract",
    workforceScale: "",
    workforceVerified: false,
    equipment:
      "Ride-on scrubbers, walk-behind scrubbers, high-pressure systems, waste-handling equipment",
    challenge:
      "Facility scope was split across several vendors, so accountability for shop-floor cleanliness, common areas and waste handling sat in different places. Standards varied by shift and issues were raised at monthly reviews rather than on the day they occurred.",
    solution:
      "Aqua consolidated the scope under a single manpower plan with site-specific SOPs, defined cleaning frequencies by area classification, and a layered supervision structure covering every shift.",
    process:
      "Mobilisation began with an area-wise survey and scope mapping, followed by equipment selection matched to surface and soiling type, team induction and safety orientation, and a documented escalation matrix agreed with the plant team.",
    outcome:
      "The plant now reviews facility performance against a single accountable structure, with daily digital attendance, photo-verified task completion and a tracked issue list replacing shift-dependent reporting.",
    outcomeMetrics: [
      { label: "Areas under scope", value: "", verified: false },
      { label: "Deployment against plan", value: "", verified: false },
      { label: "Issue closure", value: "", verified: false },
    ],
    quoteApproved: false,
    published: true,
    serviceSlug: "integrated-facility-management",
    industrySlug: "automobile",
  },
  {
    slug: "railway-station-mechanised-cleaning",
    order: 2,
    clientName: "",
    clientApproved: false,
    anonymisedAs: "Railway station operations",
    title: "Round-the-clock platform and passenger-area operations",
    location: "India",
    serviceScope:
      "Station housekeeping, mechanised platform cleaning, washroom hygiene, waste collection",
    duration: "Contract term as awarded",
    workforceScale: "",
    workforceVerified: false,
    equipment:
      "Ride-on sweepers, scrubber driers, high-pressure washing systems, waste collection equipment",
    challenge:
      "Passenger areas stay in continuous use, so cleaning cannot pause operations. Work spread across platforms, concourses and buildings needed one supervision structure and evidence that scheduled activity actually happened.",
    solution:
      "Aqua deployed rostered teams across shifts with cyclical cleaning frequencies by area, mechanised equipment suited to platform surfaces, and geo-tagged inspection points that record where and when checks were completed.",
    process:
      "Scope was broken into area blocks with defined frequencies, supervisors were assigned inspection routes, and deviations were logged with corrective actions and closure evidence for periodic reporting.",
    outcome:
      "Station teams review time-stamped verification records and audit logs instead of relying on shift reports, and open issues carry a named owner with a defined response expectation.",
    outcomeMetrics: [
      { label: "Shift coverage", value: "", verified: false },
      { label: "Inspection rounds logged", value: "", verified: false },
      { label: "Corrective-action closure", value: "", verified: false },
    ],
    quoteApproved: false,
    published: true,
    serviceSlug: "railway-infrastructure",
    industrySlug: "railways-infrastructure",
  },
  {
    slug: "production-manpower-line-continuity",
    order: 3,
    clientName: "",
    clientApproved: false,
    anonymisedAs: "Engineering and assembly operations",
    title: "Holding line manning through volume swings and changeovers",
    location: "India",
    serviceScope:
      "ITI and non-ITI production manpower, assembly-line workforce, material handling, warehouse support",
    duration: "Ongoing deployment",
    workforceScale: "",
    workforceVerified: false,
    equipment: "PPE issue and tracking, station readiness checks",
    challenge:
      "Absenteeism on individual stations was holding output, and each ramp-up restarted the sourcing cycle from the beginning. Skill category was not consistently matched to the station before deployment.",
    solution:
      "Aqua introduced skill mapping ahead of deployment, buffer planning for critical stations, and replacement management so a gap is covered within the shift rather than at the next roster.",
    process:
      "Trade requirements were mapped station by station, induction and safety orientation were standardised, and shift supervisors began coordinating manning against the production plan at every changeover.",
    outcome:
      "Production and HR teams work from a shared view of manning against plan, and headcount scales with the production schedule without restarting sourcing each cycle.",
    outcomeMetrics: [
      { label: "Stations covered", value: "", verified: false },
      { label: "Manning against plan", value: "", verified: false },
      { label: "Replacement turnaround", value: "", verified: false },
    ],
    quoteApproved: false,
    published: true,
    serviceSlug: "production-manpower",
    industrySlug: "engineering",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

/** Displayed client label — never leaks an unapproved client name. */
export function caseStudyClientLabel(c: CaseStudyContent): string {
  return c.clientApproved && c.clientName
    ? c.clientName
    : c.anonymisedAs ?? "Client name pending approval";
}
