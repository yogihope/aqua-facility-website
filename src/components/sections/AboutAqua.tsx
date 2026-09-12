import { Container, Section } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Bits";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { aboutAqua } from "@/content/home";
import { yearsOfExpertise } from "@/content/site";

/**
 * "About Aqua" summary block — the eight facts that establish the organisation,
 * shown before any capability detail.
 *
 * Appendix B: the year count is derived at render time, never typed as a
 * literal, so the heading and the experience pillar cannot go stale.
 */
export function AboutAqua({
  tone = "warm",
  showLink = true,
}: {
  tone?: "warm" | "sand";
  showLink?: boolean;
}) {
  const years = yearsOfExpertise();

  return (
    <Section tone={tone} className={tone === "warm" ? "grain" : undefined}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Kicker>{aboutAqua.kicker}</Kicker>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="h2 mt-6 text-charcoal">
                <span className="tabular-nums">{years}</span>{" "}
                {aboutAqua.headingLead}{" "}
                <span className="italic text-brown">
                  {aboutAqua.headingEmphasis}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede mt-7 max-w-xl">{aboutAqua.body}</p>
            </Reveal>
            {showLink ? (
              <Reveal delay={180}>
                <div className="mt-9">
                  <TextLink href="/about">Read the Aqua story</TextLink>
                </div>
              </Reveal>
            ) : null}
          </div>

          <ul className="grid gap-x-8 gap-y-px sm:grid-cols-2">
            {aboutAqua.pillars.map((pillar, i) => (
              <Reveal key={pillar.label} delay={i * 55} as="li">
                <div className="flex h-full flex-col border-t border-line py-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      aria-hidden="true"
                      className="font-display text-[0.8125rem] tabular-nums text-gold-deep/70"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.9375rem] font-semibold leading-snug text-charcoal">
                      {"prefixYears" in pillar && pillar.prefixYears ? (
                        <>
                          <span className="tabular-nums">{years}</span>{" "}
                          {pillar.label}
                        </>
                      ) : (
                        pillar.label
                      )}
                    </p>
                  </div>
                  <p className="mt-2 pl-[calc(0.8125rem+0.75rem)] text-[0.875rem] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
