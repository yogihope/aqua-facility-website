import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content/home";

/**
 * Section 6.1 hero — editorial copy left, operational ecosystem right.
 * 9.2: the visual is dynamically imported so it never blocks the headline and
 * CTA, which are server-rendered as static HTML.
 */
const EcosystemCanvas = dynamic(
  () => import("@/components/visual/EcosystemCanvas").then((m) => m.EcosystemCanvas),
  {
    loading: () => (
      <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-sand-soft/70 to-warm" />
    ),
  }
);

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
        <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24 xl:py-28">
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

          {/* Ecosystem visual */}
          <div className="relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-white/70 via-warm to-sand-soft/50 sm:aspect-[4/3] lg:aspect-square">
              <EcosystemCanvas className="absolute inset-0 h-full w-full" />

              {/* Corner registration marks — industrial, not decorative */}
              <CornerMark className="left-5 top-5" />
              <CornerMark className="right-5 top-5 rotate-90" />
              <CornerMark className="bottom-5 right-5 rotate-180" />
              <CornerMark className="bottom-5 left-5 -rotate-90" />

              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white/75 px-4 py-3 backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Operational ecosystem
                </p>
                <p className="text-[0.6875rem] text-muted/80">
                  Six capabilities · One operating philosophy
                </p>
              </div>
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
