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
 * Rebuilt on 2026-10-02: the chairman's portrait and quote run as one wide
 * band, then the rest of the team sits in an even grid under it. The earlier
 * two-column split left the right-hand side empty once the team grew, because
 * the quote card could not fill a column six portraits tall.
 *
 * A leader without a headshot renders a monogram at the same 4:5 ratio, so
 * adding `photoUrl` later swaps the image in without moving the layout.
 */
export function Leadership({ leaders }: { leaders: LeaderContent[] }) {
  if (leaders.length === 0) return null;

  const chairman =
    leaders.find((l) => l.slug === chairmanMessage.attributionSlug) ??
    leaders[0];
  const team = leaders.filter((l) => l.slug !== chairman.slug);

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

        {/* Chairman — portrait and message across the full width */}
        <Reveal>
          <figure className="mt-14 overflow-hidden rounded-[2rem] border border-line bg-charcoal text-warm lg:grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">
              <Portrait leader={chairman} fill />
            </div>

            <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-[90px]"
              />
              <p className="kicker relative text-gold-soft">
                {chairmanMessage.heading}
              </p>
              <blockquote className="relative mt-7 font-display text-[clamp(1.375rem,2.6vw,2.125rem)] italic leading-[1.22] tracking-[-0.015em]">
                &ldquo;{chairmanMessage.quote}&rdquo;
              </blockquote>
              <figcaption className="relative mt-9 border-t border-warm/15 pt-6">
                <p className="text-[1rem] font-semibold text-warm">
                  {chairman.name}
                </p>
                <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-warm/45">
                  {chairman.role}
                </p>
              </figcaption>

              <dl className="relative mt-9 grid grid-cols-3 gap-5 border-t border-warm/15 pt-6">
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
          </figure>
        </Reveal>

        {/* The rest of the team */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((leader, i) => (
            <Reveal key={leader.slug} delay={(i % 5) * 70} as="li">
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
