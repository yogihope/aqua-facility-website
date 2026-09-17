/**
 * Home page copy — Section 6.1, verbatim where the spec supplies text.
 * Section order matches the twelve-section structure in the specification.
 */

export const home = {
  hero: {
    eyebrow: "INTEGRATED OPERATIONAL SERVICES SINCE 1996",
    h1Lead: "30+ Years of",
    h1Emphasis: "Keeping India Working.",
    subhead: "Facilities. People. Operations. Infrastructure. Technology.",
    body: "From corporate campuses and manufacturing plants to industrial operations and critical infrastructure, Aqua combines trained manpower, mechanised systems, process discipline and technology to keep operations performing.",
    primaryCta: { label: "Explore Our Capabilities", href: "/services" },
    secondaryCta: { label: "Partner With Aqua", href: "/request-proposal" },
  },

  /** Section 2 — Trust strip. ISO and statutory claims as on the legacy site (2026-09-17). */
  trustStrip: [
    { label: "30+ Years of Expertise", verified: true },
    { label: "Gujarat State Best Employer Brand 2026", verified: true },
    { label: "PAN-India Capability", verified: true },
    { label: "Multi-Sector Expertise", verified: true },
    { label: "ISO-Certified", verified: true },
    { label: "100% Statutory Compliance", verified: true },
    { label: "Mechanised & Technology-Enabled Operations", verified: true },
  ] as { label: string; verified: boolean; note?: string }[],

  repositioning: {
    h2: "Aqua Does More Than Manage Facilities.",
    body: "We manage the people, processes and operational systems organisations depend on every day. Our teams work behind factories, corporate campuses, industrial plants and infrastructure environments to keep work moving safely, reliably and efficiently.",
  },

  /** Section 5 — Outcomes. */
  outcomes: [
    "Cleaner Facilities",
    "Reliable Workforce",
    "Higher Productivity",
    "Reduced Downtime",
    "Stronger Compliance",
    "Operational Visibility",
    "Infrastructure Reliability",
  ],

  /** Section 7 — People / Process / Technology / Performance sticky narrative. */
  pptp: [
    {
      key: "People",
      headline: "Right skills. Right deployment.",
      body: "Trained housekeeping teams, ITI and non-ITI technicians, production workforce and supervisors, matched to the station and the shift before they reach the site.",
      points: [
        "Skill mapping before deployment",
        "Induction and safety orientation",
        "Replacement management for continuity",
      ],
    },
    {
      key: "Process",
      headline: "Standardised execution. Measurable accountability.",
      body: "Site-specific SOPs, frequency schedules, escalation matrices and structured handovers hold execution to the same standard across every shift.",
      points: [
        "Area-classified frequencies",
        "Defined escalation matrix",
        "Quality audits and corrective actions",
      ],
    },
    {
      key: "Technology",
      headline: "Real-time visibility into everyday operations.",
      body: "Digital attendance, geo-tagged verification, ticketing and MIS turn daily execution into evidence a client can review on the day it happens.",
      points: [
        "Digital attendance and deployment tracking",
        "Photo and geo-tagged verification",
        "Site-wise MIS and dashboards",
      ],
    },
    {
      key: "Performance",
      headline: "Better operations. Consistent outcomes.",
      body: "Reviews run against one record — deployment against plan, open issues, SLA status and closure — instead of shift-dependent reporting.",
      points: [
        "Deployment against plan",
        "Issue closure with named owners",
        "Structured review cadence",
      ],
    },
  ],

  technology: {
    h2: "From Operations to Operational Intelligence.",
    body: "Digital attendance, workforce tracking, geo-tagged verification, audit logs, maintenance schedules, inventory visibility, escalation systems and management MIS create a transparent operating layer across sites.",
    cta: { label: "See How We Monitor Operations", href: "/technology" },
  },

  /**
   * Clients named on the legacy aquafacility.com site (home and service pages),
   * carried over on Nirav's direction 2026-09-17. Names only, no logo files.
   */
  clients: [
    "Adani Power",
    "Adani Wilmar",
    "Tata",
    "Torrent Power",
    "Larsen & Toubro",
    "Hitachi",
    "Maruti Suzuki",
    "Honda",
    "Arvind",
    "Essar Oil",
    "Sandvik",
    "SPX Flow",
    "SGL",
    "AIA Engineering",
    "GFL",
    "Wagh Bakri",
  ],

  /** Section 11 — Assurance. */
  assurance: [
    {
      title: "Safety",
      body: "Safety-first execution with PPE discipline, induction, permit compliance and adherence to client and statutory safety systems.",
      points: ["Safety-first execution", "Induction and PPE discipline", "Permit and work-method compliance"],
    },
    {
      title: "Quality",
      body: "Structured SOPs, area-classified frequencies, inspection rounds and corrective-action closure hold output to a defined standard.",
      points: ["Structured SOPs", "Inspection and audit rounds", "Continuous improvement"],
    },
    {
      title: "Compliance",
      body: "Statutory and client-specific compliance maintained through the deployment process rather than assembled at audit time.",
      points: ["Statutory compliance", "Workforce documentation", "Client-specific requirements"],
    },
  ],

  finalCta: {
    h2: "Complex Operations Need a Reliable Partner.",
    body: "Whether you need integrated facility management, production manpower, plant O&M or infrastructure support, Aqua can build a solution around your operation.",
    primary: { label: "Request a Proposal", href: "/request-proposal" },
    secondary: { label: "Discuss Your Requirement", href: "/contact" },
  },
};

/**
 * "About Aqua" summary block — runs on the home page and again above the About
 * page narrative.
 *
 * Appendix B: age statements are never hand-maintained. The heading and the
 * experience pillar take their number from `yearsOfExpertise()` at render time,
 * which is why the "30" does not appear as a literal anywhere below.
 */
export const aboutAqua = {
  kicker: "About Aqua",
  headingLead: "Years of Building",
  headingEmphasis: "Better Workplaces.",
  body: "Aqua has grown from a single facility-services operation into an integrated group that manages the people, processes and support systems organisations depend on every day — across corporate campuses, manufacturing plants, industrial sites and public infrastructure.",
  pillars: [
    {
      label: "Founded in 1996",
      body: "Three decades of continuous operation, under the same ownership.",
    },
    {
      label: "years of experience",
      body: "Operating knowledge built on site, across changing standards and technologies.",
      /** Rendered as "{years} years of experience" — see Appendix B. */
      prefixYears: true,
    },
    {
      label: "Pan-India operations",
      body: "Deployment capability that follows clients beyond a single city or state.",
    },
    {
      label: "Experienced workforce",
      body: "Trained housekeeping teams, ITI and non-ITI technicians, production staff and supervisors.",
    },
    {
      label: "Multiple industries",
      body: "Manufacturing, corporate, healthcare, education, infrastructure and public environments.",
    },
    {
      label: "Integrated facility solutions",
      body: "One organisation accountable across facilities, workforce, plant assets and infrastructure.",
    },
    {
      label: "Strong compliance systems",
      body: "Statutory and client-specific compliance maintained through the deployment process.",
    },
    {
      label: "Technology-enabled operations",
      body: "Digital attendance, geo-tagged verification, ticketing and MIS across multi-site work.",
    },
  ],
};

/** Section 6.2 — About page content. */
export const about = {
  heroKicker: "About Aqua",
  heroTitle: "30+ Years of Building Trust Through Execution.",
  intro:
    "Founded in 1996, Aqua has evolved from a facility-services organisation into an integrated operational-services ecosystem supporting facilities, workforces, industries and infrastructure across India.",
  whoWeAre:
    "Aqua is an integrated operational-services organisation that manages the people, processes, facilities and support systems organisations depend on every day. Our capabilities span integrated facility management, HR and workforce solutions, production manpower, industrial operations and maintenance, railway and infrastructure support, business support, security and technology-enabled operational management.",
  vision:
    "To build India's most trusted integrated operational-services ecosystem — combining people, process and technology to make facilities, industries and infrastructure work better.",
  mission:
    "To deliver reliable, scalable and accountable operational solutions through skilled manpower, standardised processes, mechanised execution, strong supervision, safety, compliance, technology-enabled visibility and continuous improvement.",
  closing:
    "Our philosophy is straightforward: understand the operation, deploy the right people, build the right process, use the right technology and take responsibility for the outcome.",

  /** Timeline entries describe the evolution narrative, not unverified milestones. */
  timeline: [
    {
      year: "1996",
      title: "Founded",
      body: "Aqua begins operations as a facility-services organisation.",
    },
    {
      year: "Growth",
      title: "Mechanised execution",
      body: "Investment in mechanised housekeeping and industrial cleaning equipment moves execution beyond manual methods.",
    },
    {
      year: "Expansion",
      title: "Workforce and production manpower",
      body: "Capability extends into HR, workforce solutions and ITI / non-ITI production manpower for manufacturing environments.",
    },
    {
      year: "Industrial",
      title: "Operations and maintenance",
      body: "Technical manpower and structured O&M processes extend the scope from facilities into plant assets.",
    },
    {
      year: "Infrastructure",
      title: "Railways and infrastructure",
      body: "Mechanised systems, manpower and supervision applied to high-footfall public infrastructure environments.",
    },
    {
      year: "Today",
      title: "Technology-enabled operations",
      body: "A digital operating layer for attendance, verification, ticketing and MIS across multi-site operations.",
    },
  ],

  values: [
    {
      title: "Take responsibility for the outcome",
      body: "Scope boundaries matter less than whether the operation performs. Ownership sits with Aqua.",
    },
    {
      title: "Customisation over template",
      body: "Manpower plans, frequencies and equipment are built around the site rather than applied from a standard package.",
    },
    {
      title: "Evidence over assertion",
      body: "Attendance, verification and audit records replace claimed completion with recorded completion.",
    },
    {
      title: "Safety and compliance first",
      body: "Execution methods start from safety planning and statutory obligation, not from speed.",
    },
  ],
};
