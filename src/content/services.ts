import type { ServiceContent } from "./types";

/**
 * Six capability pillars — Sections 6.10 to 6.16.
 * Hero titles, intros, capability lists and closing CTAs are taken verbatim
 * from the specification. "What We Solve" and "How Aqua Delivers" copy follows
 * the Section 5.2 voice rules: operational verbs, no unsubstantiated superlatives.
 */
export const services: ServiceContent[] = [
  {
    slug: "integrated-facility-management",
    order: 1,
    title: "Integrated Facility Management",
    navTitle: "Integrated Facility Management",
    heroKicker: "Capability 01",
    heroTitle: "Better Facilities. Better Operations.",
    intro:
      "Aqua provides end-to-end facility-management solutions designed around the operational requirements of each client, site and environment.",
    outcomeLine:
      "Mechanised housekeeping, building operations and maintenance run as one accountable service.",
    chips: [
      "Mechanised housekeeping",
      "Industrial cleaning",
      "Facility maintenance",
      "Waste management",
      "Landscaping",
    ],
    capabilities: [
      "Mechanised housekeeping",
      "Commercial housekeeping",
      "Industrial housekeeping",
      "Project cleaning",
      "Deep cleaning",
      "Floor care",
      "Road cleaning",
      "Façade cleaning",
      "Washroom hygiene",
      "Waste management",
      "Building operations",
      "Facility maintenance",
      "Guest-house management",
      "Landscaping",
      "Plumbing and carpentry",
      "Warehouse / store management",
    ],
    problems: [
      {
        title: "Fragmented vendors",
        body: "Separate contracts for cleaning, maintenance, landscaping and waste create gaps in accountability. Aqua consolidates scope under one operating structure.",
      },
      {
        title: "Inconsistent execution",
        body: "Output varies by shift, supervisor and site. Standardised SOPs, checklists and supervision hold execution to the same standard every day.",
      },
      {
        title: "Manual, unverifiable reporting",
        body: "Paper registers make it hard to prove what was done. Digital attendance and task verification turn daily work into an auditable record.",
      },
    ],
    delivery: [
      {
        title: "People",
        body: "Trained housekeeping teams, technicians and supervisors deployed to a defined manpower plan, with replacement management to protect continuity.",
      },
      {
        title: "Process",
        body: "Site-specific SOPs, frequency schedules, escalation matrices and structured shift handovers govern every activity.",
      },
      {
        title: "Equipment",
        body: "Mechanised scrubbers, sweepers, high-pressure and façade systems matched to surface type, footfall and access conditions.",
      },
      {
        title: "Supervision",
        body: "On-site supervisors and area managers run inspections, corrective actions and periodic reviews against the agreed scope.",
      },
    ],
    techLayer:
      "Digital attendance, geo-tagged inspections, photo-based task verification, complaint tickets and site-wise MIS give facility teams visibility into what was completed, when, and by whom.",
    safetyNote:
      "Safety-first execution with PPE discipline, chemical handling protocols, structured SOPs and statutory as well as client-specific compliance.",
    closingLine: "Cleaner Facilities. Safer Workplaces. Better Performance.",
    ctaLabel: "Discuss Your Requirement",
    seoTitle:
      "Integrated Facility Management Services | Aqua Facility Services",
    seoDescription:
      "Mechanised housekeeping, industrial cleaning, facility maintenance, waste management, landscaping and operational support tailored to complex sites.",
    industries: [
      "commercial-corporate",
      "healthcare-pharma",
      "automobile",
      "power",
      "metal-steel",
      "engineering",
    ],
  },
  {
    slug: "hr-workforce-solutions",
    order: 2,
    title: "HR & Workforce Solutions",
    navTitle: "HR & Workforce Solutions",
    heroKicker: "Capability 02",
    heroTitle: "From Recruitment to Reliable Deployment.",
    intro:
      "Aqua Group helps organisations source, mobilise, deploy and manage dependable workforces while maintaining process and compliance discipline.",
    outcomeLine:
      "Sourcing, onboarding, payroll and compliance handled as one continuous workforce process.",
    chips: [
      "Workforce sourcing",
      "Contract staffing",
      "Payroll compliance",
      "Attendance management",
      "Office support",
    ],
    capabilities: [
      "Workforce sourcing",
      "Recruitment and screening",
      "Contract staffing",
      "Onboarding support",
      "Attendance management",
      "Payroll services",
      "Payroll compliance",
      "Workforce documentation",
      "Employee deployment",
      "Replacement management",
      "Front-office staffing",
      "Office-support manpower",
      "Administrative manpower",
    ],
    problems: [
      {
        title: "Slow mobilisation",
        body: "Openings stay unfilled while operations wait. Aqua maintains sourcing channels and screening processes built for volume deployment.",
      },
      {
        title: "Compliance exposure",
        body: "Statutory documentation, payroll records and registers are maintained as part of the deployment process rather than reconstructed during audits.",
      },
      {
        title: "Attrition and absenteeism",
        body: "Replacement management, attendance visibility and supervision reduce the operational impact of workforce gaps.",
      },
    ],
    delivery: [
      {
        title: "People",
        body: "Recruitment, screening and verification teams supported by field mobilisation capability across operating locations.",
      },
      {
        title: "Process",
        body: "Documented onboarding, deployment, attendance, payroll and exit workflows with defined turnaround expectations.",
      },
      {
        title: "Equipment",
        body: "Digital attendance devices and applications where required by the site, with fallback processes for low-connectivity environments.",
      },
      {
        title: "Supervision",
        body: "Account and site coordinators own headcount, roster discipline, grievance handling and client review cycles.",
      },
    ],
    techLayer:
      "Digital attendance, deployment tracking, workforce documentation and payroll compliance records create a verifiable workforce trail for client and audit review.",
    safetyNote:
      "Statutory compliance discipline across documentation, payroll, registers and site-specific client requirements.",
    closingLine: "Build the workforce your operation can depend on.",
    ctaLabel: "Discuss Your Requirement",
    seoTitle: "HR & Workforce Solutions | Aqua",
    seoDescription:
      "Workforce sourcing, contract staffing, onboarding, attendance, payroll and compliance support for organisations that depend on reliable deployment.",
    industries: [
      "commercial-corporate",
      "automobile",
      "textiles",
      "home-appliances",
      "engineering",
    ],
  },
  {
    slug: "production-manpower",
    order: 3,
    title: "ITI & Non-ITI Production Manpower",
    navTitle: "Production Manpower",
    heroKicker: "Capability 03",
    heroTitle: "The Right Workforce for Every Production Line.",
    intro:
      "Aqua Group deploys technical, semi-skilled and production manpower for manufacturing and industrial environments, helping clients maintain continuity across production, assembly, material movement and support functions.",
    outcomeLine:
      "Skilled, semi-skilled and general plant manpower deployed to the shift plan your line runs on.",
    chips: [
      "ITI technicians",
      "Machine operators",
      "Assembly line",
      "Material handling",
      "Warehouse teams",
    ],
    capabilities: [
      "Electricians",
      "Fitters",
      "Welders",
      "Mechanical technicians",
      "Maintenance technicians",
      "Machine operators",
      "Utility operators",
      "Production technicians",
      "Assembly-line workforce",
      "Production helpers",
      "Machine assistants",
      "Packaging personnel",
      "Material handlers",
      "Warehouse personnel",
      "Loading / unloading teams",
      "General plant manpower",
    ],
    problems: [
      {
        title: "Line stoppages from manpower gaps",
        body: "Absenteeism on a single station can hold a line. Buffer planning and replacement management protect shift continuity.",
      },
      {
        title: "Skill mismatch",
        body: "Trade certification, prior line experience and skill category are matched to the station before deployment.",
      },
      {
        title: "Ramp-up and seasonality",
        body: "Headcount scales with production plans, model changeovers and seasonal demand without restarting the sourcing cycle.",
      },
    ],
    delivery: [
      {
        title: "People",
        body: "ITI and non-ITI workforce across trades — electricians, fitters, welders, operators, technicians and plant support.",
      },
      {
        title: "Process",
        body: "Skill mapping, induction, safety orientation, shift rostering and structured handover at every changeover.",
      },
      {
        title: "Equipment",
        body: "PPE issue and tracking, tool accountability and station-level readiness checks aligned to client norms.",
      },
      {
        title: "Supervision",
        body: "Shift supervisors coordinate with production planning on manning, escalation and daily output review.",
      },
    ],
    techLayer:
      "Shift-wise digital attendance, deployment dashboards and manpower MIS give production and HR teams a shared view of manning against plan.",
    safetyNote:
      "Safety induction, PPE compliance, work-permit discipline and adherence to plant EHS requirements.",
    closingLine: "People Who Keep Production Moving.",
    ctaLabel: "Request Workforce Support",
    seoTitle: "ITI & Non-ITI Production Manpower Solutions | Aqua",
    seoDescription:
      "Skilled, semi-skilled and production workforce solutions for manufacturing, assembly, material handling and industrial operations.",
    industries: [
      "automobile",
      "engineering",
      "heavy-engineering",
      "metal-steel",
      "home-appliances",
      "textiles",
    ],
  },
  {
    slug: "industrial-operations-maintenance",
    order: 4,
    title: "Industrial Operations & Maintenance",
    navTitle: "Industrial O&M",
    heroKicker: "Capability 04",
    heroTitle: "Keeping Critical Operations Running.",
    intro:
      "Aqua supports industrial and facility assets with trained technical manpower, preventive systems and structured O&M processes designed to improve reliability and minimise downtime.",
    outcomeLine:
      "Preventive schedules, technical manpower and corrective-action discipline applied to critical assets.",
    chips: [
      "Plant O&M",
      "Preventive maintenance",
      "Utility management",
      "Shutdown support",
      "Store management",
    ],
    capabilities: [
      "Plant O&M support",
      "Building O&M",
      "Preventive maintenance",
      "Mechanical maintenance",
      "Electrical maintenance",
      "Breakdown coordination",
      "Equipment monitoring",
      "Utility management",
      "Routine inspections",
      "Technical manpower",
      "Shutdown support",
      "Store management",
      "Maintenance reporting",
      "Safety systems",
      "Corrective-action management",
    ],
    problems: [
      {
        title: "Reactive maintenance",
        body: "Work driven by breakdowns rather than schedules. Preventive plans, inspection rounds and asset histories shift effort ahead of failure.",
      },
      {
        title: "Downtime with no root cause",
        body: "Breakdown coordination, corrective-action tracking and maintenance reporting build the record needed to stop repeat failures.",
      },
      {
        title: "Spares and store gaps",
        body: "Store management and consumable visibility reduce the wait between fault identification and restoration.",
      },
    ],
    delivery: [
      {
        title: "People",
        body: "Mechanical, electrical and utility technicians with supervisory engineering support for planned and breakdown work.",
      },
      {
        title: "Process",
        body: "Preventive schedules, inspection checklists, permit compliance, breakdown escalation and corrective-action closure.",
      },
      {
        title: "Equipment",
        body: "Tools, measuring instruments and maintenance consumables managed through structured store control.",
      },
      {
        title: "Supervision",
        body: "Maintenance in-charge reviews schedule adherence, open jobs, spares status and reliability trends with client teams.",
      },
    ],
    techLayer:
      "Preventive-maintenance schedules, asset tracking, inspection logs, escalation systems and maintenance MIS keep asset status visible rather than anecdotal.",
    safetyNote:
      "Work permits, lockout discipline, height and hot-work protocols, and adherence to plant safety systems.",
    closingLine: "Maintain assets. Reduce downtime. Improve continuity.",
    ctaLabel: "Discuss Your Requirement",
    seoTitle: "Industrial Operations & Maintenance Services | Aqua",
    seoDescription:
      "Plant and building O&M, preventive maintenance, technical manpower, utility management, shutdown support and maintenance reporting.",
    industries: [
      "power",
      "renewable-energy",
      "oil-gas",
      "metal-steel",
      "heavy-engineering",
      "engineering",
    ],
  },
  {
    slug: "railway-infrastructure",
    order: 5,
    title: "Railway & Infrastructure Services",
    navTitle: "Railway & Infrastructure",
    heroKicker: "Capability 05",
    heroTitle: "Supporting Infrastructure That Moves India.",
    intro:
      "Aqua deploys trained manpower, mechanised systems, supervision and process control to support high-footfall and mission-critical railway and infrastructure environments.",
    outcomeLine:
      "High-footfall environments cleaned, staffed and supervised to a defined and monitored standard.",
    chips: [
      "Station housekeeping",
      "Mechanised platform cleaning",
      "Infrastructure manpower",
      "Project coordination",
      "Quality supervision",
    ],
    capabilities: [
      "Railway-station cleaning",
      "Platform cleaning",
      "Mechanised platform cleaning",
      "Station housekeeping",
      "Passenger-area cleaning",
      "Washroom hygiene",
      "Waste collection",
      "Railway manpower",
      "Technical workforce",
      "Infrastructure manpower",
      "Site operations",
      "Quality supervision",
      "Material management",
      "Project coordination",
      "Maintenance support",
      "Infrastructure-site cleaning",
    ],
    problems: [
      {
        title: "Continuous public footfall",
        body: "Passenger areas cannot be closed for cleaning. Round-the-clock rostering and cyclical frequencies keep standards up during operations.",
      },
      {
        title: "Dispersed sites and shifts",
        body: "Multiple platforms, buildings and shifts need one supervision structure with geo-tagged verification rather than trust alone.",
      },
      {
        title: "Contractual reporting",
        body: "Authority contracts require evidence. Time-stamped verification, audit logs and MIS support periodic reporting obligations.",
      },
    ],
    delivery: [
      {
        title: "People",
        body: "Housekeeping teams, technical workforce and infrastructure manpower rostered across shifts and locations.",
      },
      {
        title: "Process",
        body: "Cyclical cleaning frequencies, checklists, quality audits, material planning and project coordination against contract scope.",
      },
      {
        title: "Equipment",
        body: "Ride-on and walk-behind scrubbers, sweepers, high-pressure systems and waste-handling equipment suited to platform environments.",
      },
      {
        title: "Supervision",
        body: "Shift supervisors and quality inspectors run rounds, log deviations and drive corrective actions.",
      },
    ],
    techLayer:
      "Geo-tagged reporting, QR-based inspection points, railway project monitoring and management MIS support contract-level accountability.",
    safetyNote:
      "Track-safety awareness, public-area safety, statutory compliance and client and authority-specific safety requirements.",
    closingLine: "Cleaner Stations. Reliable Operations. Stronger Infrastructure.",
    ctaLabel: "Discuss Your Requirement",
    seoTitle: "Railway & Infrastructure Services | Aqua Facility Services",
    seoDescription:
      "Mechanised cleaning, manpower, maintenance and operational support for railway stations, platforms and infrastructure environments.",
    industries: ["railways-infrastructure", "commercial-corporate", "agriculture"],
  },
  {
    slug: "technology-enabled-operations",
    order: 6,
    title: "Technology for Seamless Operations",
    navTitle: "Technology-Enabled Operations",
    heroKicker: "Capability 06",
    heroTitle: "Smart Technology. Seamless Operations.",
    intro:
      "Aqua's digital operating layer improves visibility, verification, responsiveness and accountability across workforce-intensive and multi-site operations.",
    outcomeLine:
      "Daily execution turned into evidence, dashboards and faster corrective action.",
    chips: [
      "Digital attendance",
      "Geo-tagged reporting",
      "Facility dashboards",
      "Ticketing",
      "Management MIS",
    ],
    capabilities: [
      "Digital attendance",
      "Workforce deployment tracking",
      "Supervisor applications",
      "Digital SOPs",
      "Geo-tagged reporting",
      "Time-stamped work verification",
      "Photo-based task verification",
      "Facility dashboards",
      "Complaint management",
      "Ticketing",
      "Preventive-maintenance schedules",
      "Asset tracking",
      "Inventory monitoring",
      "Consumable tracking",
      "Automated alerts",
      "Escalation systems",
      "Quality audit logs",
      "Management MIS",
      "Railway project monitoring",
      "Custom ERP / workflows",
    ],
    problems: [
      {
        title: "No visibility between reviews",
        body: "Clients learn about issues at the monthly meeting. Dashboards and alerts move information to the day it happens.",
      },
      {
        title: "Unverifiable completion",
        body: "Photo-based, time-stamped and geo-tagged verification replaces claimed completion with recorded completion.",
      },
      {
        title: "Slow escalation",
        body: "Ticketing and escalation rules route issues to a named owner with a defined response expectation.",
      },
    ],
    delivery: [
      {
        title: "People",
        body: "Supervisors and site teams trained on the applications that record attendance, tasks, inspections and issues.",
      },
      {
        title: "Process",
        body: "Digital SOPs, inspection routes, escalation matrices and audit cycles configured per site.",
      },
      {
        title: "Equipment",
        body: "Attendance devices, QR inspection points and supervisor handsets where the site environment supports them.",
      },
      {
        title: "Supervision",
        body: "MIS review cadence with the client, including open issues, SLA status and corrective actions.",
      },
    ],
    techLayer:
      "Module availability varies by contract and site readiness. Capabilities are configured during mobilisation and confirmed in the scope document.",
    safetyNote:
      "Access control, role-based permissions and data-handling practices aligned to client IT and security requirements.",
    closingLine: "Better Visibility. Faster Action. Stronger Accountability.",
    ctaLabel: "See How We Monitor Operations",
    seoTitle: "Technology-Enabled Facility & Workforce Operations | Aqua",
    seoDescription:
      "Digital attendance, geo-tagged verification, dashboards, audit logs, maintenance tracking and management MIS for accountable operations.",
    industries: [
      "commercial-corporate",
      "railways-infrastructure",
      "healthcare-pharma",
      "power",
    ],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
