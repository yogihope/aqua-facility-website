import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/home";
import { FOUNDING_YEAR, yearsOfExpertise } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The journey from 1996 to today.
 *
 * A central spine with milestones alternating left and right: the year is the
 * loudest element, each stop carries a numbered chip and the body, and the
 * spine deepens in colour as it runs so the eye reads it as progress. Phones
 * get the same stops against a left-hand spine, because an alternating layout
 * collapses badly at that width.
 *
 * Year labels come from `about.timeline` — put a real year there and it shows
 * as the headline numeral for that stop.
 */
const TONES = [
  "from-gold/80 to-gold",
  "from-gold to-gold-deep",
  "from-gold-deep to-brown/85",
  "from-brown/85 to-brown",
  "from-brown to-brown-deep",
  "from-brown-deep to-charcoal",
] as const;

export function JourneyMap({
  tone = "sand",
  kicker = "The journey",
  title,
  body,
}: {
  tone?: "warm" | "sand";
  kicker?: string;
  title?: React.ReactNode;
  body?: string;
} = {}) {
  const stops = about.timeline;
  const ring = tone === "warm" ? "ring-warm" : "ring-warm-deep";

  return (
    <Section
      tone={tone}
      id="journey"
      className={tone === "warm" ? "grain" : undefined}
    >
      <Container>
        <SectionHeading
          kicker={kicker}
          title={
            title ?? (
              <>
                {yearsOfExpertise()} years, one{" "}
                <span className="italic text-brown">direction.</span>
              </>
            )
          }
          body={
            body ??
            `From a single facility-services contract in ${FOUNDING_YEAR} to an integrated group running facilities, workforce, plant assets and public infrastructure.`
          }
        />

        <div className="relative mt-16">
          {/* The spine: left-hand on phones, centred from lg up */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[1.4375rem] top-2 w-[3px] rounded-full bg-gradient-to-b from-gold via-brown to-charcoal/80 lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="relative flex flex-col gap-10 sm:gap-14">
            {stops.map((stop, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={stop.title} delay={(i % 3) * 80}>
                  <li className="relative lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
                    {/* Card — alternates sides on large screens */}
                    <article
                      className={cn(
                        "ml-14 rounded-[1.5rem] border border-line bg-white/80 p-6 shadow-[0_22px_45px_-38px_rgba(44,39,35,0.75)] sm:p-7 lg:ml-0",
                        right ? "lg:col-start-3" : "lg:col-start-1 lg:text-right"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.08] px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gold-deep",
                          right ? "" : "lg:flex-row-reverse"
                        )}
                      >
                        <span className="tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-gold"
                        />
                        Milestone
                      </span>

                      <h3 className="h3 mt-4 text-[1.0625rem] text-charcoal sm:text-[1.1875rem]">
                        {stop.title}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                        {stop.body}
                      </p>
                    </article>

                    {/* Marker on the spine */}
                    <span className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center lg:static lg:col-start-2 lg:h-14 lg:w-14">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ring-4 lg:h-9 lg:w-9",
                          TONES[i % TONES.length],
                          ring
                        )}
                      >
                        <span className="h-2 w-2 rounded-full bg-warm lg:h-2.5 lg:w-2.5" />
                      </span>
                    </span>

                    {/* The year, opposite the card on large screens */}
                    <p
                      className={cn(
                        "ml-14 mt-3 font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-none tracking-[-0.02em] text-brown lg:ml-0 lg:mt-0 lg:text-[clamp(2rem,3.2vw,3.25rem)]",
                        right
                          ? "lg:col-start-1 lg:row-start-1 lg:text-right"
                          : "lg:col-start-3 lg:row-start-1 lg:text-left"
                      )}
                    >
                      {stop.year}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          {/* Closing marker, so the spine ends on purpose */}
          <span className="absolute bottom-0 left-[1.4375rem] flex h-6 w-6 -translate-x-1/2 items-center justify-center lg:left-1/2">
            <span
              aria-hidden="true"
              className={cn("h-3.5 w-3.5 rounded-full bg-charcoal/80 ring-4", ring)}
            />
          </span>
        </div>
      </Container>
    </Section>
  );
}
