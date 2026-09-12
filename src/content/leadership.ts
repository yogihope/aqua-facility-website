import type { LeaderContent } from "./types";

/**
 * Section 6.2 — leadership.
 *
 * Names and roles are management-confirmed, so the module publishes. The
 * `summary` lines state only what the role itself establishes; extended
 * biographies are not written here, because Section 18's rule is to remove an
 * unverified claim rather than fill the space. Drop headshots into
 * `public/leadership/` and set `photoUrl` to publish them — until then each
 * card renders a monogram at the same size, so the layout does not move.
 */
export const leaders: LeaderContent[] = [
  {
    slug: "rajesh-shah",
    order: 1,
    name: "Rajesh Shah",
    role: "Founder & Chairman",
    initials: "RS",
    summary:
      "Founded Aqua in 1996 and has led the organisation through its growth from facility services into an integrated operational-services group.",
    approved: true,
  },
  {
    slug: "anal-shah",
    order: 2,
    name: "Anal Shah",
    role: "Director",
    initials: "AS",
    summary:
      "Directs the group's operations across facilities, workforce, industrial services and infrastructure.",
    approved: true,
  },
];

/** Chairman's message — quoted verbatim as supplied by management. */
export const chairmanMessage = {
  heading: "Chairman's Message",
  quote:
    "For three decades, Aqua has been built on trust, people and an uncompromising commitment to service excellence.",
  attributionSlug: "rajesh-shah",
};

export const getLeader = (slug: string) => leaders.find((l) => l.slug === slug);
