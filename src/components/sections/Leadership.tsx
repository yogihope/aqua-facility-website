import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { chairmanMessage } from "@/content/leadership";
import { site, yearsOfExpertise } from "@/content/site";
import type { LeaderContent } from "@/content/types";

/**
 * Section 6.2 — leadership on the About page.
 *
 * Rebuilt on 2026-10-02: the chairman sits on the left of a wide band, the
 * director on the right and the message between them, then the rest of the
 * team runs four-up underneath. The earlier two-column split left the
 * right-hand side empty once the team grew.
 *
 * A leader without a headshot renders a monogram at the same 4:5 ratio, so
 * adding `photoUrl` later swaps the image in without moving the layout.
 */
export function Leadership({ leaders }: { leaders: LeaderContent[] }) {
  if (leaders.length === 0) return null;

  const chairman =
    leaders.find((l) => l.slug === chairmanMessage.attributionSlug) ??
    leaders[0];
  // The director shares the top band with the chairman; everyone else sits below.
  const director = leaders.find((l) => l.slug !== chairman.slug);
  const team = leaders.filter(
    (l) => l.slug !== chairman.slug && l.slug !== director?.slug
  );

  return (
    <Section tone="warm" className="grain">
      <Container>
        <SectionHeading
          kicker="Leadership"
          title={
            <>
              The people accountable{" "}
              <span className="italic text-brown">for the standard.</span>
            </>
          }
          body="Aqua has been led by the same family since 1996. Continuity of ownership is why the operating standard has survived three decades of growth."
        />

        {/* Chairman left, director right, the message between them */}
        <Reveal>
          <figure className="mt-14 overflow-hidden rounded-[2rem] border border-line bg-charcoal text-warm lg:grid lg:grid-cols-[0.26fr_0.48fr_0.26fr]">
            <PortraitPanel leader={chairman} />

            <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-[90px]"
              />
              <p className="kicker relative text-gold-soft">
                {chairmanMessage.heading}
              </p>
              <blockquote className="relative mt-7 font-display text-[clamp(1.25rem,2.2vw,1.875rem)] italic leading-[1.24] tracking-[-0.015em]">
                &ldquo;{chairmanMessage.quote}&rdquo;
              </blockquote>
              <figcaption className="relative mt-8 border-t border-warm/15 pt-6">
                <p className="text-[1rem] font-semibold text-warm">
                  {chairman.name}
                </p>
                <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-warm/45">
                  {chairman.role}
                </p>
              </figcaption>

              <dl className="relative mt-8 grid grid-cols-3 gap-5 border-t border-warm/15 pt-6">
                {[
                  ["Since", String(site.foundingYear)],
                  ["Experience", `${yearsOfExpertise()}+ yrs`],
                  ["Leadership", `${leaders.length} people`],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-warm/40">
                      {label}
                    </dt>
                    <dd className="mt-1 font-display text-[1.125rem] text-gold-soft">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {director ? <PortraitPanel leader={director} /> : null}
          </figure>
        </Reveal>

        {/* The rest of the team */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((leader, i) => (
            <Reveal key={leader.slug} delay={(i % 4) * 70} as="li">
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-warm-deep">
                  <Portrait leader={leader} fill />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="h3 text-[0.9375rem] text-charcoal">
                    {leader.name}
                  </h3>
                  <p className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                    {leader.role}
                  </p>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                    {leader.summary}
                  </p>
                  {leader.linkedin ? (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-4 text-[0.8125rem] font-semibold text-brown transition-colors hover:text-gold-deep"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12">
          <TextLink href="/leadership">Read the leadership messages</TextLink>
        </div>
      </Container>
    </Section>
  );
}

/** One side of the top band: portrait with the name across the bottom. */
function PortraitPanel({ leader }: { leader: LeaderContent }) {
  return (
    <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-auto lg:min-h-[28rem]">
      <Portrait leader={leader} fill />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-charcoal/85 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.9375rem] font-semibold text-warm">{leader.name}</p>
        <p className="mt-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-gold-soft">
          {leader.role}
        </p>
      </div>
    </div>
  );
}

/**
 * 4:5 plate. Photograph when supplied, monogram otherwise — same box either
 * way, so the grid does not reflow when photography arrives.
 */
function Portrait({
  leader,
  fill = false,
}: {
  leader: LeaderContent;
  fill?: boolean;
}) {
  if (leader.photoUrl) {
    return (
      <Image
        src={leader.photoUrl}
        alt={`${leader.name}, ${leader.role} of Aqua`}
        {...(fill
          ? { fill: true }
          : { width: 1400, height: 1750, className: "h-full w-full" })}
        sizes="(min-width: 1320px) 420px, (min-width: 1024px) 32vw, (min-width: 640px) 45vw, 92vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-warm-deep to-sand-soft">
      <span className="font-display text-[clamp(2rem,6vw,3rem)] text-brown/35">
        {leader.initials}
      </span>
    </div>
  );
}
