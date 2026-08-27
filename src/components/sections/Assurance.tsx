import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content/home";

/** Section 6.1 (11) — three-column Safety / Quality / Compliance. */
export function Assurance() {
  return (
    <Section tone="warm" className="grain">
      <Container>
        <SectionHeading
          kicker="Assurance"
          title={
            <>
              How execution stays{" "}
              <span className="italic text-brown">accountable.</span>
            </>
          }
          body="Safety-first execution, structured SOPs, statutory and client-specific compliance, and continuous improvement — applied as daily practice rather than annual declaration."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {home.assurance.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-line bg-white/70 p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.08] text-gold-deep">
                  {i === 0 ? <ShieldIcon /> : null}
                  {i === 1 ? <CheckIcon /> : null}
                  {i === 2 ? <DocIcon /> : null}
                </div>

                <h3 className="h3 mt-6 text-charcoal">{pillar.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {pillar.body}
                </p>

                <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-5">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[0.8125rem] text-charcoal/75"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
  "aria-hidden": true,
};

function ShieldIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 3 4.5 6v6c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3.5 12a8.5 8.5 0 1 0 17 0 8.5 8.5 0 0 0-17 0Z" />
      <path d="m8.5 12 2.4 2.4 4.6-4.8" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  );
}
