/**
 * Site photography (supplied by Nirav, 2026-09-28). One record per image so a
 * file is never referenced by a bare path in a page, and alt text is written
 * once. Replace the file in `public/work/` to change a picture everywhere.
 */

export type WorkPhoto = { src: string; alt: string };

export const workPhotos = {
  housekeeping: {
    src: "/work/site-housekeeping.jpg",
    alt: "Aqua housekeeping operative sweeping a site walkway beside a cleaning trolley and wet-floor sign",
  },
  briefing: {
    src: "/work/shift-briefing.jpg",
    alt: "Aqua supervisor running a shift briefing with the site team against the day's work plan",
  },
  supervision: {
    src: "/work/supervision-cleaning-schedule.jpg",
    alt: "Aqua supervisor and operative reviewing the cleaning schedule and safety board on site",
  },
  materialHandling: {
    src: "/work/material-handling.jpg",
    alt: "Aqua team loading and checking material against a stores register at a site gate",
  },
  maintenance: {
    src: "/work/maintenance-pump-room.jpg",
    alt: "Aqua technician working on pump and pipework at a site water-treatment installation",
  },
} as const satisfies Record<string, WorkPhoto>;

/** Which photograph leads each service page. */
export const servicePhoto: Record<string, WorkPhoto> = {
  "integrated-facility-management": workPhotos.housekeeping,
  "hr-workforce-solutions": workPhotos.briefing,
  "production-manpower": workPhotos.materialHandling,
  "industrial-operations-maintenance": workPhotos.maintenance,
  "railway-infrastructure": workPhotos.supervision,
  "technology-enabled-operations": workPhotos.briefing,
};

/** Which photograph heads each case study. */
export const caseStudyPhoto: Record<string, WorkPhoto> = {
  "multi-plant-integrated-facility-management": workPhotos.housekeeping,
  "railway-station-mechanised-cleaning": workPhotos.supervision,
  "production-manpower-line-continuity": workPhotos.materialHandling,
};
