import type { TechCapabilityContent } from "./types";

/**
 * Section 6.17 UI note: do not show impossible or unimplemented software
 * features as if they are currently live. Every module carries a status and the
 * UI labels anything that is not `live` as a digital capability, not a shipped
 * product. Statuses below are placeholders until management confirms rollout.
 */
export const techCapabilities: TechCapabilityContent[] = [
  {
    slug: "attendance-deployment",
    order: 1,
    module: "Attendance & Deployment",
    category: "Workforce",
    description:
      "Digital attendance capture with shift-wise deployment status against the agreed manpower plan.",
    status: "live",
    metricLabel: "Deployment against plan",
    metricHint: "Shift-wise headcount view",
  },
  {
    slug: "task-sla-completion",
    order: 2,
    module: "Task & SLA Completion",
    category: "Operations",
    description:
      "Scheduled tasks tracked to completion with time stamps, so daily execution can be reviewed against scope.",
    status: "live",
    metricLabel: "Task completion",
    metricHint: "Daily and cyclical activities",
  },
  {
    slug: "geo-tagged-inspections",
    order: 3,
    module: "QR & Geo-Tagged Inspections",
    category: "Verification",
    description:
      "QR inspection points and geo-tagged, photo-based verification record where and when work was checked.",
    status: "live",
    metricLabel: "Inspection rounds",
    metricHint: "Location-verified checks",
  },
  {
    slug: "issue-escalation",
    order: 4,
    module: "Issue & Escalation Tracker",
    category: "Response",
    description:
      "Complaints and issues raised as tickets, routed to a named owner with defined escalation rules.",
    status: "live",
    metricLabel: "Open issues",
    metricHint: "By age and owner",
  },
  {
    slug: "asset-preventive-maintenance",
    order: 5,
    module: "Asset & Preventive Maintenance",
    category: "Maintenance",
    description:
      "Asset registers with preventive-maintenance schedules, due dates and corrective-action closure.",
    status: "in-rollout",
    metricLabel: "PM schedule adherence",
    metricHint: "Planned versus completed",
  },
  {
    slug: "consumables-inventory",
    order: 6,
    module: "Consumables & Inventory",
    category: "Materials",
    description:
      "Consumable issue, stock position and reorder visibility for site stores.",
    status: "in-rollout",
    metricLabel: "Stock position",
    metricHint: "Site-wise consumables",
  },
  {
    slug: "audit-logs",
    order: 7,
    module: "Audit Logs & Corrective Actions",
    category: "Quality",
    description:
      "Quality audit records with observations, corrective actions and closure evidence.",
    status: "in-rollout",
    metricLabel: "Corrective actions",
    metricHint: "Raised and closed",
  },
  {
    slug: "management-mis",
    order: 8,
    module: "Site-Wise MIS & Management Dashboard",
    category: "Reporting",
    description:
      "Consolidated site and contract reporting for management review cycles.",
    status: "planned",
    metricLabel: "Site-wise MIS",
    metricHint: "Contract-level reporting",
  },
];

export const TECH_STATUS_LABEL: Record<string, string> = {
  live: "In use",
  "in-rollout": "In rollout",
  planned: "Planned capability",
};
