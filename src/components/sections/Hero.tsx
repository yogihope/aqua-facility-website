import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content/home";
import { workPhotos } from "@/content/workPhotos";
import { site, yearsOfExpertise } from "@/content/site";

/**
 * Section 6.1 hero — editorial copy left, site photography right.
 *
 * The visual is two real photographs rather than an abstract canvas: the work
 * itself carries more weight than a diagram, and it costs no JavaScript. The
 * headline and CTA stay server-rendered, so nothing blocks first paint.
 */

export function Hero() {
  const { hero } = home;

  return (
    <section className="grain relative overflow-hidden bg-warm pt-[84px] lg:pt-[92px]">
      {/* Ambient warmth — never a large saturated surface (4.1 ratio rule) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-[8%] h-[38rem] w-[38rem] rounded-full bg-sand/45 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[14%] bottom-[-8%] h-[30rem] w-[30rem] rounded-full bg-gold/[0.07] blur-[120px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24 xl:py-28">
          {/* Copy — content first on mobile (Section 15) */}
          <div className="max-w-2xl">
            <Reveal>
              <Kicker>{hero.eyebrow}</Kicker>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="h-display mt-7 text-charcoal">
                {hero.h1Lead}{" "}
                <span className="text-gradient-gold italic">
                  {hero.h1Emphasis}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-display text-[1.0625rem] text-brown sm:text-[1.1875rem]">
                {hero.subhead.split(". ").filter(Boolean).map((word, i) => (
                  <span key={word} className="flex items-center gap-3">
                    {i > 0 ? (
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-gold/60"
                      />
                    ) : null}
                    {word.replace(/\.$/, "")}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className="lede mt-6 max-w-xl">{hero.body}</p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaLink href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </CtaLink>
                <CtaLink
                  href={hero.secondaryCta.href}
                  variant="secondary"
                  data-analytics="proposal_cta_click"
                >
                  {hero.secondaryCta.label}
                </CtaLink>
              </div>
            </Reveal>
          </div>

          {/* Site photography — the work, not a diagram */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-line">
              <Image
                src={workPhotos.housekeeping.src}
                alt={workPhotos.housekeeping.alt}
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1024px) 40rem, 92vw"
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent"
              />

              <CornerMark className="left-5 top-5" />
              <CornerMark className="right-5 top-5 rotate-90" />

              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-warm/15 bg-charcoal/75 px-4 py-3 backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-soft">
                  On site, every shift
                </p>
                <p className="text-[0.6875rem] text-warm/70">
                  Mechanised execution · Trained teams
                </p>
              </div>
            </div>

            {/* Second frame and the stats sit under the main photo */}
            <div className="mt-4 grid grid-cols-[1.1fr_0.9fr] items-stretch gap-4">
              <div className="overflow-hidden rounded-[1.25rem] border border-line shadow-[0_24px_50px_-34px_rgba(44,39,35,0.6)]">
                <Image
                  src={workPhotos.maintenance.src}
                  alt={workPhotos.maintenance.alt}
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 22rem, 45vw"
                  className="h-full w-full object-cover"
                />
              </div>

              <dl className="flex flex-col justify-center gap-4 rounded-[1.25rem] border border-line bg-white/85 p-5 backdrop-blur-md">
                <div>
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Since
                  </dt>
                  <dd className="font-display text-[1.375rem] leading-none text-brown">
                    {site.foundingYear}
                  </dd>
                </div>
                <span aria-hidden="true" className="h-px w-full bg-line" />
                <div>
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Experience
                  </dt>
                  <dd className="font-display text-[1.375rem] leading-none text-brown">
                    {yearsOfExpertise()}+ yrs
                  </dd>
                </div>
                <span aria-hidden="true" className="h-px w-full bg-line" />
                <div>
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Coverage
                  </dt>
                  <dd className="font-display text-[1.375rem] leading-none text-brown">
                    PAN-India
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CornerMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`pointer-events-none absolute h-4 w-4 text-gold/45 ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M0.5 6V0.5H6" />
    </svg>
  );
}
