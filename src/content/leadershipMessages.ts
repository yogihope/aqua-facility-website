/**
 * Leadership page copy (6.2a).
 *
 * Only `chairmanMessage.quote` in `leadership.ts` is a person's own words, as
 * management supplied them. Everything here is written in the organisation's
 * voice and attributed to Aqua rather than to an individual, so no quotation is
 * put into anyone's mouth. When the CEO, HR and operations messages arrive,
 * add them to `signedMessages` with the name, role and their own text.
 */

export type SignedMessage = {
  slug: string;
  kicker: string;
  title: string;
  /** The person's own words, supplied by them. */
  body: string[];
  name: string;
  role: string;
  initials: string;
  photoUrl?: string;
};

/** Messages that carry a person's name. Added only once that person supplies the text. */
export const signedMessages: SignedMessage[] = [];

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
