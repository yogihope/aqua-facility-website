import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 6.1 (12) — full-width premium CTA band.
 * 7.1: one dominant CTA per viewport section, so the secondary action is
 * visually subordinate rather than a second primary button.
 */
export function CtaBand({
  kicker = "Next step",
  title,
  body,
  primary,
  secondary,
}: {
  kicker?: string;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-brown py-16 text-warm sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-[24rem] w-[24rem] rounded-full bg-charcoal/40 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(247,244,238,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,244,238,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Kicker tone="warm">{kicker}</Kicker>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="h2 mt-6 text-warm">{title}</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-warm/75">
                {body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="shrink-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink
                href={primary.href}
                variant="onDark"
                data-analytics="proposal_cta_click"
              >
                {primary.label}
              </CtaLink>
              {secondary ? (
                <CtaLink
                  href={secondary.href}
                  variant="secondary"
                  arrow={false}
                  data-analytics="contact_cta_click"
                  className="border-warm/30 text-warm hover:border-warm/60 hover:bg-warm/[0.08]"
                >
                  {secondary.label}
                </CtaLink>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
