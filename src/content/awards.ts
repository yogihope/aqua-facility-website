import type { AwardContent } from "./types";

/**
 * Recognition records.
 *
 * Every field below is transcribed from the award certificate and the citation
 * letter rather than paraphrased, because Section 18's content-safety rule
 * applies to credentials most of all: the title, edition, date, venue, issuer
 * and endorsements are the claim. Photograph captions describe the occasion and
 * deliberately do not name the individuals in frame — attribution publishes
 * when management confirms it, not before.
 */
export const awards: AwardContent[] = [
  {
    slug: "gujarat-state-best-employer-brand-awards-2026",
    order: 1,
    title: "The Gujarat State Best Employer Brand Awards 2026",
    edition: "10th Edition",
    presentedTo: "Aqua Facility Services Pvt. Ltd.",
    awardedOn: "2026-08-11",
    venue: "Fairfield by Marriott",
    city: "Ahmedabad, Gujarat",
    presentedBy:
      "Employer Branding Institute — India, at the World Leadership Congress & Awards",
    endorsedBy: "CHRO Asia",
    certifiedBy: "World Federation of HR Professionals",
    summary:
      "Aqua was recognised among the organisations in Gujarat judged exemplary in human resources and in the use of marketing and communications for human-resource development.",
    /** Assessment parameters as published by the awarding body. */
    criteria: [
      "Translating and combining vision with action through HR strategy",
      "Meshing HR strategy with business transformation",
      "Cultivating competencies that make the organisation future-ready",
      "Talent management",
      "Talent development",
      "Recruitment strategies",
      "Employee engagement, benefits and recognition",
      "Diversity and inclusion",
      "Women empowerment",
      "Promoting and managing health at the workplace",
      "CSR initiatives",
    ],
    images: [
      {
        src: "/awards/award-presentation-1.jpg",
        alt: "Aqua's representatives receiving The Gujarat State Best Employer Brand Award 2026 certificate and trophy on stage.",
        caption: "Receiving the citation and trophy on stage",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-certificate.jpg",
        alt: "The Gujarat State Best Employer Brand Awards 2026 certificate presented to Aqua Facility Services Pvt. Ltd. on 11 August 2026.",
        caption: "The certificate, 11 August 2026",
        width: 2798,
        height: 4259,
      },
      {
        src: "/awards/award-trophy.jpg",
        alt: "The Gujarat State Best Employer Brand Awards 2026 trophy engraved for Aqua Facility Services Pvt. Ltd.",
        caption: "The trophy",
        width: 1249,
        height: 2714,
      },
      {
        src: "/awards/award-presentation-2.jpg",
        alt: "The award citation being handed over at the Gujarat State Best Employer Brand Awards 2026.",
        caption: "The citation handed over",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-presentation-3.jpg",
        alt: "Aqua's team holding the Gujarat State Best Employer Brand Awards 2026 certificate and trophy.",
        caption: "Certificate and trophy",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-presentation-4.jpg",
        alt: "Presentation of the Gujarat State Best Employer Brand Award 2026 on the congress stage.",
        caption: "On the congress stage",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-address-1.jpg",
        alt: "An address to the room after the Gujarat State Best Employer Brand Award 2026 presentation.",
        caption: "Addressing the room after the presentation",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-address-2.jpg",
        alt: "Speaking at the World Leadership Congress and Awards following the award presentation.",
        caption: "Speaking at the congress",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-audience.jpg",
        alt: "A delegate speaking from the floor during the Gujarat State Leadership Awards 2026 session.",
        caption: "From the floor during the session",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-venue-1.jpg",
        alt: "The Gujarat State Leadership Awards 2026 stage set at Fairfield by Marriott, Ahmedabad.",
        caption: "The stage at Fairfield by Marriott, Ahmedabad",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-venue-2.jpg",
        alt: "Stage backdrop for the Gujarat State Leadership Awards 2026 before the ceremony.",
        caption: "Before the ceremony",
        width: 1021,
        height: 681,
      },
      {
        src: "/awards/award-venue-3.jpg",
        alt: "The Gujarat State Leadership Awards 2026 hall laid out ahead of the presentation.",
        caption: "The hall ahead of the presentation",
        width: 1021,
        height: 681,
      },
    ],
    verified: true,
  },
];

export const getAward = (slug: string) => awards.find((a) => a.slug === slug);

/** Only verified records reach the UI. */
export const publishedAwards = () => awards.filter((a) => a.verified);
