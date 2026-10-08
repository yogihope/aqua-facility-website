/**
 * Site photography (supplied by Nirav, 2026-10-08).
 *
 * One record per picture, and one picture per place it appears: the earlier
 * set reused five images across eighteen slots, which left the technology page
 * showing a shift briefing and the production-manpower page showing warehouse
 * loading. Alt text is written once here. Replace the file in `public/work/`
 * to change a picture everywhere it is used.
 */

export type WorkPhoto = { src: string; alt: string };

export const workPhotos = {
  /* Home */
  heroMain: {
    src: "/work/hero-main.jpg",
    alt: "Aqua operative driving a ride-on scrubber down a warehouse aisle while a supervisor checks the plan",
  },
  heroSecondary: {
    src: "/work/hero-secondary.jpg",
    alt: "Aqua technician servicing pumps and valves in a plant utility room",
  },
  mosaicFacility: {
    src: "/work/mosaic-facility.jpg",
    alt: "Aqua housekeeping team cleaning the glass and floor of a corporate lobby",
  },
  mosaicWorkforce: {
    src: "/work/mosaic-workforce.jpg",
    alt: "Aqua workforce lined up at a plant gate for the shift briefing and attendance",
  },
  mosaicMaintenance: {
    src: "/work/mosaic-maintenance.jpg",
    alt: "Aqua electrician testing an electrical control panel with a multimeter",
  },

  /* Services */
  serviceFacilityManagement: {
    src: "/work/service-facility-management.jpg",
    alt: "Mechanised scrubber cleaning a plant floor while the housekeeping team works alongside",
  },
  serviceHrWorkforce: {
    src: "/work/service-hr-workforce.jpg",
    alt: "New Aqua workers collecting ID cards at the site office check-in desk",
  },
  serviceProductionManpower: {
    src: "/work/service-production-manpower.jpg",
    alt: "Aqua production technicians working at machines on a manufacturing line",
  },
  serviceIndustrialOm: {
    src: "/work/service-industrial-om.jpg",
    alt: "Aqua maintenance team servicing motors and pumps inside a plant",
  },
  serviceRailway: {
    src: "/work/service-railway.jpg",
    alt: "Aqua team cleaning a railway platform with a ride-on scrubber beside a standing train",
  },
  serviceTechnology: {
    src: "/work/service-technology.jpg",
    alt: "Aqua supervisor scanning a QR checklist on a phone at a washroom door",
  },

  /* Case studies */
  caseAutomobile: {
    src: "/work/case-automobile-plant.jpg",
    alt: "Aqua housekeeping team cleaning the floor of an automobile assembly shop",
  },
  caseRailwayStation: {
    src: "/work/case-railway-station.jpg",
    alt: "Aqua night-shift team cleaning a busy railway station concourse",
  },
  caseProductionLine: {
    src: "/work/case-production-line.jpg",
    alt: "Aqua production support workers on an engineering assembly line",
  },

  /* Careers and contact */
  careersTraining: {
    src: "/work/careers-training.jpg",
    alt: "Aqua trainer demonstrating a floor scrubber to workers in a training room",
  },
  careersInduction: {
    src: "/work/careers-induction.jpg",
    alt: "Aqua stores team issuing uniforms, gloves and safety shoes to newly joined workers",
  },
  contactReception: {
    src: "/work/contact-reception.jpg",
    alt: "Aqua front-office executive greeting a visitor at a corporate reception desk",
  },
} as const satisfies Record<string, WorkPhoto>;

/** Which photograph leads each service page. */
export const servicePhoto: Record<string, WorkPhoto> = {
  "integrated-facility-management": workPhotos.serviceFacilityManagement,
  "hr-workforce-solutions": workPhotos.serviceHrWorkforce,
  "production-manpower": workPhotos.serviceProductionManpower,
  "industrial-operations-maintenance": workPhotos.serviceIndustrialOm,
  "railway-infrastructure": workPhotos.serviceRailway,
  "technology-enabled-operations": workPhotos.serviceTechnology,
};

/** Which photograph heads each case study. */
export const caseStudyPhoto: Record<string, WorkPhoto> = {
  "multi-plant-integrated-facility-management": workPhotos.caseAutomobile,
  "railway-station-mechanised-cleaning": workPhotos.caseRailwayStation,
  "production-manpower-line-continuity": workPhotos.caseProductionLine,
};

/**
 * Sector photography. Only the sectors that have a real picture appear here —
 * an industry page without one simply stays text-led rather than borrowing a
 * picture of different work.
 */
export const industryPhoto: Record<string, WorkPhoto> = {
  automobile: {
    src: "/work/industry-automobile.jpg",
    alt: "Aqua team cleaning the shop floor of an automobile plant beside robot welding cells",
  },
  engineering: {
    src: "/work/industry-engineering.jpg",
    alt: "Aqua team cleaning the floor of an engineering workshop hall",
  },
  power: {
    src: "/work/industry-power.jpg",
    alt: "Aqua cleaning crew working in a power plant turbine hall",
  },
  "metal-steel": {
    src: "/work/industry-metal-steel.jpg",
    alt: "Aqua crew clearing and cleaning beside a steel mill rolling line",
  },
  "healthcare-pharma": {
    src: "/work/industry-healthcare-pharma.jpg",
    alt: "Aqua housekeeping team cleaning a pharmaceutical corridor in gowns and masks",
  },
  textiles: {
    src: "/work/industry-textiles.jpg",
    alt: "Aqua team clearing lint around spinning machines in a textile mill",
  },
};
