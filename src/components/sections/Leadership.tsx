import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { chairmanMessage } from "@/content/leadership";
import type { LeaderContent } from "@/content/types";

/**
 * Section 6.2 — leadership.
 *
 * The module publishes on verified names and roles rather than waiting on the
 * full asset set. A leader without a headshot renders a monogram plate at the
 * same 4:5 ratio, so adding `photoUrl` later swaps the image in without moving
 * any surrounding layout.
 */
export function Leadership({ leaders }: { leaders: LeaderContent[] }) {
  if (leaders.length === 0) return null;

  const chairman =
    leaders.find((l) => l.slug === chairmanMessage.attributionSlug) ??
    leaders[0];

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

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Leaders */}
          <ul className="grid gap-4 sm:grid-cols-2">
            {leaders.map((leader, i) => (
              <Reveal key={leader.slug} delay={i * 90} as="li">
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white/70">
                  <Portrait leader={leader} />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="h3 text-[1.0625rem] text-charcoal">
                      {leader.name}
                    </h3>
                    <p className="mt-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                      {leader.role}
                    </p>
                    <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
                      {leader.summary}
                    </p>
                    {leader.linkedin ? (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-5 text-[0.8125rem] font-semibold text-brown transition-colors hover:text-gold-deep"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          {/* Chairman's message */}
          <Reveal delay={140}>
            <figure className="flex h-full flex-col justify-center rounded-[1.5rem] border border-line bg-charcoal p-8 text-warm sm:p-12">
              <p className="kicker text-gold-soft">{chairmanMessage.heading}</p>
              <svg
                viewBox="0 0 32 24"
                aria-hidden="true"
                className="mt-8 h-6 w-8 text-gold/50"
                fill="currentColor"
              >
                <path d="M13 24V13.2C13 5.9 17.3.7 24.7 0l.9 3.6C21.2 4.6 19 7.4 19 11.3h4.6V24H13Zm-13 0V13.2C0 5.9 4.3.7 11.7 0l.9 3.6C8.2 4.6 6 7.4 6 11.3h4.6V24H0Z" />
              </svg>
              <blockquote className="mt-6 font-display text-[clamp(1.375rem,2.6vw,2rem)] italic leading-[1.22] tracking-[-0.015em]">
                {chairmanMessage.quote}
              </blockquote>
              <figcaption className="mt-9 border-t border-warm/15 pt-6">
                <p className="text-[0.9375rem] font-semibold text-warm">
                  {chairman.name}
                </p>
                <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-warm/45">
                  {chairman.role}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

      </Container>
    </Section>
  );
}

/**
 * 4:5 plate. Photograph when supplied, monogram otherwise — same box either
 * way, so the grid does not reflow when photography arrives.
 */
function Portrait({ leader }: { leader: LeaderContent }) {
  if (leader.photoUrl) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-warm-deep">
        <Image
          src={leader.photoUrl}
          alt={`${leader.name}, ${leader.role} of Aqua`}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-sand-soft via-warm-deep to-sand"
    >
      <span className="font-display text-[clamp(3rem,7vw,4.5rem)] leading-none text-brown/30">
        {leader.initials}
      </span>
      <span className="absolute inset-x-0 bottom-0 h-px bg-gold/30" />
    </div>
  );
}
