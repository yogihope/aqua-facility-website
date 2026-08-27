import type { InsightContent } from "./types";

/** Section 6.35 content categories. */
export const INSIGHT_CATEGORIES = [
  "Facility Management",
  "Workforce",
  "O&M",
  "Railways & Infrastructure",
  "Technology",
  "Safety & Compliance",
  "Aqua Updates",
] as const;

export const insights: InsightContent[] = [
  {
    slug: "what-integrated-facility-management-actually-consolidates",
    title: "What Integrated Facility Management Actually Consolidates",
    category: "Facility Management",
    excerpt:
      "Integration is often sold as a single invoice. The operational value sits somewhere else — in who owns the outcome when two scopes overlap.",
    body: `Most facility scopes are not fragmented because anyone planned them that way. They grow one requirement at a time — a housekeeping contract here, a landscaping vendor there, a separate agency for waste, another for pest control — and each addition looks reasonable on its own.

The cost of that structure is rarely the contract value. It is the space between scopes.

## Where the gaps appear

A spill near a loading bay sits between housekeeping and material handling. A drain that keeps backing up sits between plumbing and waste. A common area that looks poor before an audit sits between everyone. Each vendor is technically within scope, and the site still has a problem.

Integration matters when it moves that ownership question off the site and into a single operating structure.

## What changes in practice

Consolidation is worth doing when it produces four specific things:

**One manpower plan.** Headcount is planned against the whole scope, so cover for absence is drawn from the same pool rather than negotiated between contracts.

**One set of frequencies.** Areas are classified once, and cleaning, maintenance and inspection cycles are built against that classification instead of against separate agreements.

**One escalation matrix.** An issue has a named owner and a defined route, whichever activity it belongs to.

**One record.** Attendance, task completion and inspection evidence come from the same system, so a review discusses one version of what happened.

## What integration does not fix

Integration does not remove the need for supervision, and it does not make an under-resourced scope adequate. If the manpower plan is thin, consolidating it under one provider makes the thinness easier to see — which is useful, but it is not the same as solving it.

The right question during evaluation is not how many services a provider can list. It is what the provider does on the day two of those services disagree about whose job something is.`,
    author: "Aqua Editorial Team",
    readMinutes: 5,
    publishedAt: "2026-07-14",
    seoTitle:
      "What Integrated Facility Management Actually Consolidates | Aqua Insights",
    seoDescription:
      "Integration is often sold as a single invoice. The operational value sits in who owns the outcome when two scopes overlap.",
    serviceSlug: "integrated-facility-management",
  },
  {
    slug: "why-attendance-data-is-an-operations-tool",
    title: "Why Attendance Data Is an Operations Tool, Not a Payroll Tool",
    category: "Technology",
    excerpt:
      "Digital attendance usually enters a site as a payroll control. Its more useful life starts once operations reads it daily.",
    body: `Digital attendance is normally introduced to protect payroll. That is a fair reason to install it, and it is also the smallest thing it does.

Once attendance is captured shift by shift and mapped against the agreed manpower plan, it stops being a record of who was paid and becomes a record of whether the site was actually staffed to run.

## The gap between headcount and manning

A contract may specify sixty people. The relevant operational number is different: how many of those sixty were on the stations that matter, in the shift that matters, on the day something went wrong.

Attendance data answers that question retrospectively — and, if it is reviewed daily rather than monthly, prospectively.

## Three readings worth taking

**Deployment against plan, by area.** Aggregate attendance hides the problem. Station-level or area-level manning shows where cover is repeatedly short.

**Shift pattern.** Gaps concentrate. Night shifts, weekend shifts and the shift after a holiday behave differently, and buffer planning should reflect that rather than averaging it away.

**Replacement turnaround.** The time between an absence and its cover is the number that determines whether an absence became an incident.

## Making it usable

Data only changes behaviour when someone is accountable for reading it. In practice that means a short daily review — deployment against plan, open issues, anything from the previous shift — rather than a monthly report that arrives after the month it describes.

The technology is not the difficult part. The cadence is.`,
    author: "Aqua Editorial Team",
    readMinutes: 4,
    publishedAt: "2026-06-28",
    seoTitle:
      "Why Attendance Data Is an Operations Tool, Not a Payroll Tool | Aqua Insights",
    seoDescription:
      "Digital attendance usually enters a site as a payroll control. Its more useful life starts once operations reads it daily.",
    serviceSlug: "technology-enabled-operations",
  },
  {
    slug: "cleaning-a-station-that-never-closes",
    title: "Cleaning a Station That Never Closes",
    category: "Railways & Infrastructure",
    excerpt:
      "High-footfall public infrastructure cannot be taken offline for housekeeping. The method has to work around continuous operation.",
    body: `A factory can schedule a shutdown. A corporate campus empties at night. A railway station does neither — footfall moves through it continuously, and the cleaning method has to accept that as a fixed condition rather than an obstacle.

## Cyclical, not episodic

Work is organised as cycles rather than events. Each area block carries a frequency: passenger circulation areas at short intervals through the day, washrooms on a tighter cycle, back-of-house on a longer one. The cycle continues regardless of what any individual shift finds, which is what keeps standards from drifting between inspections.

## Equipment chosen for the environment

Platform surfaces, concourse flooring and washroom finishes each respond differently to mechanised equipment. Selection is driven by surface type, available access windows and the noise and safety constraints of working next to passengers — not by machine capacity alone.

## Evidence as part of the scope

Authority contracts expect proof. Geo-tagged inspection points and time-stamped, photo-based verification record where and when a check happened, which turns periodic reporting into an extract rather than a reconstruction.

## Supervision across dispersed areas

Platforms, buildings and shifts do not share a line of sight. One supervision structure with defined inspection routes, logged deviations and tracked corrective actions is what holds a dispersed site to a single standard.

None of this is exotic. It is ordinary operational discipline applied in an environment that never gives you an empty building to work in.`,
    author: "Aqua Editorial Team",
    readMinutes: 4,
    publishedAt: "2026-06-05",
    seoTitle: "Cleaning a Station That Never Closes | Aqua Insights",
    seoDescription:
      "High-footfall public infrastructure cannot be taken offline for housekeeping. The method has to work around continuous operation.",
    serviceSlug: "railway-infrastructure",
  },
  {
    slug: "skill-mapping-before-deployment",
    title: "Skill Mapping Before Deployment Beats Replacement After It",
    category: "Workforce",
    excerpt:
      "Most production manpower problems are visible before the first shift. Matching trade, station and experience is cheaper than correcting a mismatch later.",
    body: `When a production line underperforms after a manpower ramp-up, the explanation is usually described as attrition. Often it is a matching problem that was set on day one.

## The station is the unit, not the headcount

A requirement for thirty production associates is not a single requirement. It is a set of stations, each with its own trade requirement, physical demand, cycle time and quality sensitivity. Filling the number without mapping the stations produces a roster that looks complete and performs unevenly.

## What mapping involves

Mapping is unglamorous work: listing stations, recording the trade certification or prior experience each one needs, noting which are quality-critical, and identifying which ones cannot be left uncovered for a full shift.

That list then drives three things — screening criteria, induction content and buffer planning.

## Buffer planning is a design decision

Not every station needs a buffer. Deciding which ones do, before deployment, is what allows an absence to be covered within the shift instead of escalated at the next roster.

## Induction earns its time back

Safety orientation is mandatory. Station-level induction is optional and repays itself quickly, because a worker who understands the standard work instruction produces less rework in the first week.

The general point: manpower planning that starts from the line rather than the headcount tends to hold through changeovers and volume swings, because it was built against the thing that actually varies.`,
    author: "Aqua Editorial Team",
    readMinutes: 4,
    publishedAt: "2026-05-19",
    seoTitle:
      "Skill Mapping Before Deployment Beats Replacement After It | Aqua Insights",
    seoDescription:
      "Most production manpower problems are visible before the first shift. Matching trade, station and experience is cheaper than correcting a mismatch later.",
    serviceSlug: "production-manpower",
  },
  {
    slug: "moving-maintenance-ahead-of-failure",
    title: "Moving Maintenance Ahead of Failure",
    category: "O&M",
    excerpt:
      "Reactive maintenance is not a discipline problem. It is usually a scheduling and record problem that compounds.",
    body: `Sites that run reactively are rarely careless. They are usually short of two things: a schedule that survives a busy week, and a record that explains why the same asset keeps failing.

## The schedule has to be defensible

A preventive plan that assumes every task will be done on time will be abandoned the first time production needs the window. A plan that identifies which tasks are non-negotiable, which can slip, and by how much, survives contact with a real month.

## Records turn repeat failures into root causes

Breakdown attendance without a record produces the same breakdown again. Asset history — what failed, what was done, what was replaced — is what allows a recurring fault to be recognised as recurring rather than treated as new each time.

## Spares availability sets the real downtime

The interval between fault identification and restoration is often dominated by whether the part was on site. Store management and consumable visibility are maintenance capabilities, not procurement paperwork.

## Closure is part of the job

A corrective action that is raised and never closed is an observation, not a fix. Tracking closure is what converts inspection effort into reliability.

The shift from reactive to planned is gradual and mostly administrative. It is also the part of O&M that shows up most clearly in uptime.`,
    author: "Aqua Editorial Team",
    readMinutes: 4,
    publishedAt: "2026-04-22",
    seoTitle: "Moving Maintenance Ahead of Failure | Aqua Insights",
    seoDescription:
      "Reactive maintenance is usually a scheduling and record problem. Preventive schedules, asset history and closure discipline change the pattern.",
    serviceSlug: "industrial-operations-maintenance",
  },
  {
    slug: "compliance-is-a-daily-process",
    title: "Compliance Is a Daily Process, Not an Audit Activity",
    category: "Safety & Compliance",
    excerpt:
      "Documentation assembled during an audit is a reconstruction. Documentation produced by the deployment process is a record.",
    body: `There are two ways to arrive at an audit. In the first, records are gathered, checked and completed in the weeks before. In the second, the records already exist because producing them is part of how work is done.

The difference is not effort. It is where the effort sits.

## Build documentation into deployment

Workforce documentation, verification, statutory registers and payroll records are all generated at points that already exist in the deployment process — onboarding, attendance, payroll cycles, exit. Capturing them there costs little. Reconstructing them later costs a great deal.

## Safety compliance is observable, not declarative

PPE issue and tracking, induction records, permit discipline and work-method adherence are visible on site every day. An audit that finds them is confirming a practice; an audit that discovers them missing is finding a gap that existed for months.

## Keep claims inside what can be shown

Compliance language should stay within what documentation can support. A specific, verifiable statement is stronger in a procurement review than a broad claim that invites a follow-up question.

## The practical test

If a client asked today for the records covering last quarter, how much of the answer would be retrieval and how much would be assembly? The proportion is a fair measure of how compliant the operation actually is.`,
    author: "Aqua Editorial Team",
    readMinutes: 3,
    publishedAt: "2026-03-30",
    seoTitle: "Compliance Is a Daily Process, Not an Audit Activity | Aqua Insights",
    seoDescription:
      "Documentation assembled during an audit is a reconstruction. Documentation produced by the deployment process is a record.",
    serviceSlug: "hr-workforce-solutions",
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
