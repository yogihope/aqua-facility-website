import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { employeeDevelopment } from "@/content/careers";

/**
 * Employee development — the stages a person passes through at Aqua, presented
 * as the operating process rather than as benefits copy, so nothing here
 * asserts an outcome that is not part of the documented deployment sequence.
 */
export function EmployeeDevelopment() {
  return (
    <Section tone="sand">
      <Container>
        <SectionHeading
          kicker="Employee development"
          title={
            <>
              Trained, supervised{" "}
              <span className="italic text-brown">and progressed.</span>
            </>
          }
          body="Development at Aqua is part of the deployment process, not a separate programme. Every stage below applies to workforce, supervisory and corporate roles alike."
        />

        <ol className="mt-14 grid gap-x-8 gap-y-px md:grid-cols-2 lg:grid-cols-3">
          {employeeDevelopment.map((stage, i) => (
            <Reveal key={stage.stage} delay={i * 70} as="li">
              <div className="flex h-full flex-col border-t-2 border-gold/25 py-7">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[0.875rem] tabular-nums text-gold-deep/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted/70">
                    {stage.stage}
                  </span>
                </div>
                <h3 className="h3 mt-4 text-[1.0625rem] text-charcoal">
                  {stage.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {stage.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
