import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/home";
import { FOUNDING_YEAR, yearsOfExpertise } from "@/content/site";

/**
 * The journey from 1996 to today.
 *
 * Desktop draws one horizontal track with a milestone per stop; phones get the
 * same stops as a vertical rail, because a sideways-scrolling timeline is easy
 * to miss on a small screen. Stop colour comes from the brand ramp, so the
 * track reads as progress rather than decoration.
 */
const TONES = [
  "from-gold/70 to-gold",
  "from-gold to-gold-deep",
  "from-gold-deep to-brown/80",
  "from-brown/80 to-brown",
  "from-brown to-brown-deep",
  "from-brown-deep to-charcoal",
] as const;

export function JourneyMap() {
  const stops = about.timeline;

  return (
    <Section tone="sand" id="journey">
      <Container>
        <SectionHeading
          kicker="The journey"
          title={
            <>
              {yearsOfExpertise()} years, one{" "}
              <span className="italic text-brown">direction.</span>
            </>
          }
          body={`From a single facility-services contract in ${FOUNDING_YEAR} to an integrated group running facilities, workforce, plant assets and public infrastructure.`}
        />

        {/* Desktop: horizontal track */}
        <div className="relative mt-16 hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[4.25rem] h-[3px] rounded-full bg-gradient-to-r from-gold/50 via-brown/60 to-charcoal/70"
          />
          <ol className="relative grid grid-cols-6 gap-4">
            {stops.map((stop, i) => (
              <Reveal key={stop.title} delay={i * 90} className="h-full">
                <li className="flex h-full flex-col items-center text-center">
                  <span className="font-display text-[1.25rem] tabular-nums text-brown">
                    {stop.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${TONES[i % TONES.length]} ring-4 ring-warm-deep`}
                  >
                    <span className="h-2 w-2 rounded-full bg-warm" />
                  </span>
                  <span className="mt-6 flex w-full flex-1 flex-col rounded-2xl border border-line bg-white/75 p-5">
                    <span className="block text-[0.9375rem] font-semibold text-charcoal">
                      {stop.title}
                    </span>
                    <span className="mt-2 block text-[0.8125rem] leading-relaxed text-muted">
                      {stop.body}
                    </span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Mobile and tablet: vertical rail */}
        <ol className="relative mt-12 flex flex-col gap-6 lg:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[0.6875rem] top-3 w-[3px] rounded-full bg-gradient-to-b from-gold/60 via-brown/60 to-charcoal/60"
          />
          {stops.map((stop, i) => (
            <Reveal key={stop.title} delay={(i % 3) * 70}>
              <li className="relative flex gap-5 pl-0">
                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${TONES[i % TONES.length]} ring-4 ring-warm-deep`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-warm" />
                </span>
                <span className="block flex-1 rounded-2xl border border-line bg-white/75 p-5">
                  <span className="font-display text-[1rem] text-brown">
                    {stop.year}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] font-semibold text-charcoal">
                    {stop.title}
                  </span>
                  <span className="mt-2 block text-[0.875rem] leading-relaxed text-muted">
                    {stop.body}
                  </span>
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
