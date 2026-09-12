import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Bits";
import { CtaLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatAwardDate } from "@/lib/utils";
import type { AwardContent } from "@/content/types";

/**
 * Recognition band. Shows the most recent verified award with the citation as
 * it appears on the certificate — title, edition, issuer, endorsement, date and
 * venue — rather than a summarised "award-winning" claim.
 */
export function AwardHighlight({ awards }: { awards: AwardContent[] }) {
  const award = awards[0];
  if (!award) return null;

  const hero = award.images[0];

  return (
    <Section tone="dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-gold/[0.07] blur-[130px]"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <Kicker tone="warm">Recognition</Kicker>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="h2 mt-6 text-warm">
                {award.title}
                <span className="text-gold-soft">.</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-soft">
                {award.edition}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede mt-7 max-w-xl">{award.summary}</p>
            </Reveal>

            <Reveal delay={180}>
              <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-warm/15 pt-7 sm:grid-cols-2">
                {[
                  ["Presented to", award.presentedTo],
                  ["Awarded", formatAwardDate(award.awardedOn)],
                  ["Venue", `${award.venue}, ${award.city}`],
                  ["Endorsed by", award.endorsedBy],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-warm/40">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] font-medium text-warm/85">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10">
                <CtaLink href="/awards" variant="onDark">
                  See the Recognition
                </CtaLink>
              </div>
            </Reveal>
          </div>

          {hero ? (
            <Reveal delay={140}>
              <figure className="overflow-hidden rounded-[1.5rem] border border-warm/15 bg-charcoal-soft">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  width={hero.width}
                  height={hero.height}
                  sizes="(min-width: 1024px) 40rem, 92vw"
                  className="h-auto w-full object-cover"
                />
                <figcaption className="border-t border-warm/12 px-6 py-4 text-[0.8125rem] text-warm/55">
                  {hero.caption} · {award.city}
                </figcaption>
              </figure>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
