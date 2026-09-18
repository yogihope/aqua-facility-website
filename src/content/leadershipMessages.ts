/**
 * Leadership page copy (6.2a).
 *
 * `chairmanMessage.quote` in `leadership.ts` is the chairman's own words as
 * management supplied them. The messages below are signed by office rather
 * than by an individual, on Nirav's instruction (2026-09-18): no personal name
 * is attached, so nothing is attributed to a person who did not say it. Add a
 * `name` to a message once that person approves the text under their name.
 */

export type RoleMessage = {
  slug: string;
  /** The office the message is signed by, e.g. "Chief Executive Officer". */
  role: string;
  kicker: string;
  title: string;
  body: string[];
  /** Optional: set once a named individual approves the message as theirs. */
  name?: string;
  photoUrl?: string;
};

/** Messages signed by office. Order is the order they appear on the page. */
export const roleMessages: RoleMessage[] = [
  {
    slug: "ceo",
    role: "Chief Executive Officer",
    kicker: "CEO's Message",
    title: "Thirty years of turning up, every shift.",
    body: [
      "Aqua started in 1996 with a simple promise: do the work properly, and do it the same way on the days nobody is watching. That promise is still the whole business. What has changed is the scale it runs at — corporate campuses, manufacturing plants, industrial sites and public infrastructure, across India.",
      "Growth came from clients asking us to take on more, not from a plan drawn on paper. A housekeeping contract became facility management. Facility management led to workforce and production manpower. That led into plant operations and maintenance, and then into railway and infrastructure work. Each step happened because we had earned the last one.",
      "The next few years are about depth rather than noise: fewer vendors for our clients, more evidence behind every claim we make, and technology that shows what happened on site the same day it happens. If your operation depends on people and processes running reliably, that is exactly the problem we exist to solve.",
    ],
  },
  {
    slug: "hr",
    role: "Head of Human Resources",
    kicker: "HR's Message",
    title: "A career here can start on the floor.",
    body: [
      "Most of the people who run our sites today did not join as managers. They joined as housekeeping staff, technicians and operators, learned the work, and moved up because the record supported it. That route is open, and it is the one we look at first when a supervisory role opens.",
      "Nobody reaches a site untrained. Skill mapping, induction and safety orientation happen before deployment, and training continues on site. We hire ITI and non-ITI technicians, production workforce, housekeeping teams, supervisors and corporate staff — and we hire year round, across states.",
      "What we ask for is straightforward: turn up, follow the method, look after your team and take the work seriously. What we give back is steady employment, statutory compliance handled properly, training that adds to your skill, and a clear path upward for anyone willing to take it.",
    ],
  },
  {
    slug: "operations",
    role: "Operations Manager",
    kicker: "Operations Manager's Message",
    title: "The plan only counts if it holds at 3am.",
    body: [
      "A contract can say sixty people. What matters is whether the right sixty were on the right stations, in the shift that mattered, on the day something went wrong. Our job is to make that true every day, not on review day.",
      "So each site gets its own manpower plan, its own frequencies and its own escalation matrix, and supervisors who stay on the floor rather than in an office. Mechanised equipment is matched to the surface, the footfall and the access conditions. Replacements are arranged before an absence becomes a gap in your operation.",
      "Everything is recorded: digital attendance, geo-tagged inspections, photo-verified tasks, tickets with named owners and closure times. When we sit down for a review, we are both looking at the same record — not at two different versions of the month.",
    ],
  },
  {
    slug: "safety-quality",
    role: "Head of Safety & Quality",
    kicker: "Safety & Quality Message",
    title: "Everyone goes home the way they came in.",
    body: [
      "No output number is worth an injury. Every deployment starts with the safety brief, the PPE check and the work method for that specific site — chemical handling, height access, hot work, confined space, whatever the job actually involves.",
      "Quality runs the same way. Area-classified frequencies, written SOPs, inspection rounds and corrective actions with a named owner and a closing date. An audit finding is not a scolding; it is a task with a deadline.",
      "Our teams work inside plants, hospitals, railway stations and corporate campuses where the client's own standards are strict. Meeting them is the baseline, not the achievement.",
    ],
  },
  {
    slug: "technology",
    role: "Head of Technology",
    kicker: "Technology Message",
    title: "If it happened on site, it should be visible today.",
    body: [
      "Facility work has always been hard to verify. A register signed at the end of a shift tells you very little. We build the layer that fixes that: digital attendance, geo-tagged inspections, photo-verified tasks, complaint tickets, preventive-maintenance schedules and site-wise MIS.",
      "The point is not dashboards for their own sake. It is that a plant head can open a screen and see deployment against plan, open issues and closure times without calling anyone.",
      "We keep building it around what sites actually need — the tools are shaped by supervisors using them in the field, not by a product roadmap written far away from the work.",
    ],
  },
  {
    slug: "client-relations",
    role: "Head of Client Relations",
    kicker: "Client Relations Message",
    title: "Reviews should be boring.",
    body: [
      "The best monthly review is one with no surprises: what was promised was deployed, issues were raised when they happened, and closures are already recorded. That is the standard we hold ourselves to.",
      "Every requirement is scoped on site before a number is quoted. Manpower plans, frequencies, equipment and supervision are built for that location rather than lifted from a package, because a station, a paint shop and a corporate lobby are not the same problem.",
      "When something goes wrong — and on live operations it sometimes will — you will hear it from us first, with what we are doing about it.",
    ],
  },
  {
    slug: "training",
    role: "Head of Training & Development",
    kicker: "Training Message",
    title: "Skill is built before the shift, not during it.",
    body: [
      "A worker sent to a site without training is unfair to the worker and to the client. Induction, safety orientation and task training happen first, and skill mapping decides who goes where.",
      "Training continues after deployment: equipment handling, chemical use, new SOPs, supervisory skills for those moving up. ITI and non-ITI technicians get technical refreshers as plant requirements change.",
      "The measure that matters to us is how many people move into technical and supervisory roles inside the group. That is what turns a job at Aqua into a career at Aqua.",
    ],
  },
];

export const leadershipPage = {
  heroKicker: "Leadership",
  heroTitle: "The Thinking Behind the Work.",
  heroIntro:
    "Three decades of operations have taught Aqua where results actually come from: people who are trained before they are deployed, processes that hold through every shift, and leaders who stay close to the site.",

  /** Section 1 — history. Dates and facts only. */
  history: {
    kicker: "Where it began",
    title: "From one contract to an operating group.",
    body: "Aqua began in 1996 as a facility-services organisation. Mechanised equipment replaced manual methods as sites grew more demanding. Workforce and production manpower followed, because clients needed the people as much as the process. Industrial operations and maintenance extended the scope from buildings into plant assets, and railway and infrastructure work brought Aqua into high-footfall public environments. Today the group runs as one operating structure across all of it.",
    points: [
      {
        year: "1996",
        title: "Founded",
        body: "Operations begin as a facility-services organisation, under ownership that still leads the group today.",
      },
      {
        year: "Mechanisation",
        title: "Equipment over effort",
        body: "Investment in scrubbers, sweepers and high-pressure systems moves execution beyond manual cleaning.",
      },
      {
        year: "Workforce",
        title: "People at scale",
        body: "HR, workforce solutions and ITI / non-ITI production manpower extend Aqua into manufacturing environments.",
      },
      {
        year: "Industrial",
        title: "Into the plant",
        body: "Technical manpower and structured O&M processes take the scope from facilities to plant assets.",
      },
      {
        year: "Infrastructure",
        title: "Public environments",
        body: "Mechanised systems, manpower and supervision applied to railway and infrastructure sites.",
      },
      {
        year: "Today",
        title: "One operating layer",
        body: "Digital attendance, verification, ticketing and MIS run across every site the group operates.",
      },
    ],
  },

  /** Section 2 — what the leadership holds the organisation to. */
  principles: {
    kicker: "What we hold to",
    title: "Five things leadership does not negotiate.",
    items: [
      {
        title: "Nobody reaches a site untrained",
        body: "Skill mapping, induction and safety orientation happen before deployment, not after the first incident.",
      },
      {
        title: "The record is the report",
        body: "Attendance, geo-tagged verification and audit logs replace claimed completion with recorded completion.",
      },
      {
        title: "Supervision stays on the floor",
        body: "Site supervisors and area managers run inspections and corrective actions where the work happens.",
      },
      {
        title: "Compliance is daily, not annual",
        body: "Statutory and client-specific obligations are met through the deployment process rather than assembled at audit time.",
      },
      {
        title: "Own the outcome",
        body: "Scope boundaries matter less than whether the operation performs. Responsibility sits with Aqua.",
      },
    ],
  },

  /** Section 3 — careers. */
  careers: {
    kicker: "Careers",
    title: "A place where the work teaches you something.",
    body: "Aqua hires housekeeping teams, ITI and non-ITI technicians, production workforce, supervisors and corporate staff. Supervisory and site-management roles are filled from within wherever the skill and record support it, so a career here can start on the floor and grow into running a site.",
    points: [
      "Training and induction before deployment",
      "Supervisory roles filled from within where the record supports it",
      "Work across manufacturing, infrastructure, corporate and public environments",
    ],
    cta: { label: "See open roles", href: "/careers" },
  },

  /** Section 4 — the road ahead. Direction, not promised numbers. */
  future: {
    kicker: "The road ahead",
    title: "Where Aqua is heading.",
    body: "The direction is set by what clients keep asking for: fewer vendors, more evidence and technology that shows what happened on site without waiting for a monthly review.",
    items: [
      {
        title: "One partner, wider scope",
        body: "Consolidating facilities, workforce, maintenance and infrastructure support under a single accountable structure.",
      },
      {
        title: "Operations you can see",
        body: "Extending digital attendance, verification, ticketing and MIS across every site the group runs.",
      },
      {
        title: "Deeper technical capability",
        body: "Building the technician and O&M bench that industrial clients need as plants get more demanding.",
      },
      {
        title: "Growing our own people",
        body: "Training pathways that move workers into technical and supervisory roles inside the group.",
      },
    ],
  },

  closing: {
    title: "Talk to the people who run the work.",
    body: "Whether you want to discuss a site, a workforce requirement or a career at Aqua, the conversation starts in the same place.",
  },
};
