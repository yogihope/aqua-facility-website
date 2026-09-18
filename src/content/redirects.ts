import type { RedirectContent } from "./types";

/**
 * Appendix A — seed redirect inventory.
 * Section 11.3 rules applied: one hop maximum, no blanket redirect to home,
 * and undecided legacy URLs are held out of the active map rather than guessed.
 *
 * This is a SEED LIST, not the final inventory. Run a full crawl of indexable
 * URLs before launch and extend this table.
 */
export const redirects: RedirectContent[] = [
  {
    source: "/sevices/mechanized-housekeeping/",
    destination: "/services/integrated-facility-management/",
    statusCode: 301,
    note: "Legacy /sevices/ typo path.",
  },
  {
    source: "/sevices/facility-maintenance/",
    destination: "/services/industrial-operations-maintenance/",
    statusCode: 301,
    note: "Legacy /sevices/ typo path.",
  },
  {
    source: "/sevices/business-support-services/",
    destination: "/services/hr-workforce-solutions/",
    statusCode: 301,
    note: "Retarget to a specific sub-page if one is created later.",
  },
  {
    source: "/sevices/specialized-solutions/",
    destination: "/services/",
    statusCode: 301,
    note: "Map individual legacy content before launch.",
  },
  {
    source: "/sevices/cleaning-services/",
    destination: "/services/integrated-facility-management/",
    statusCode: 301,
    note: "Unless cleaning is retained as a separate page.",
  },
  {
    source: "/sevices/",
    destination: "/services/",
    statusCode: 301,
    note: "Legacy hub path with URL typo.",
  },
  {
    source: "/sevices/laundry-services/",
    destination: "/services/integrated-facility-management/",
    statusCode: 301,
    note: "Laundry is a capability under Integrated Facility Management.",
  },
  {
    source: "/us-home/",
    destination: "/contact/",
    statusCode: 301,
    note: "US office details now sit on the contact page.",
  },
  {
    source: "/group/aspigo/",
    destination: "/group/",
    statusCode: 301,
    note: "Company removed from the group listing.",
  },
  {
    source: "/our-work/",
    destination: "/projects/",
    statusCode: 301,
  },
];

/**
 * Held back deliberately — Appendix A marks these [DECIDE] / [REMOVE].
 * Do not activate until traffic, backlink and business-status review is done.
 */
export const pendingRedirectDecisions: RedirectContent[] = [
  {
    source: "/category/crazy-time/",
    destination: "",
    statusCode: 410,
    note: "[REMOVE] 410 or relevant redirect after backlink and index review.",
  },
];
