import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { employeeDevelopment } from "@/content/careers";
import { workPhotos } from "@/content/workPhotos";

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

        {/* Induction: kit issued before anyone reaches a site */}
        <Reveal delay={80}>
          <div className="mt-12 grid items-center gap-8 overflow-hidden rounded-[1.5rem] border border-line bg-white/70 lg:grid-cols-[0.55fr_0.45fr]">
            <div className="relative aspect-[16/10] w-full lg:aspect-[4/3]">
              <Image
                src={workPhotos.careersInduction.src}
                alt={workPhotos.careersInduction.alt}
                fill
                sizes="(min-width: 1024px) 40rem, 92vw"
                className="object-cover"
              />
            </div>
            <div className="p-7 sm:p-9 lg:pl-2">
              <p className="kicker text-gold-deep">Day one</p>
              <h3 className="h3 mt-5 text-charcoal">
                Nobody reaches a site without their kit.
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                Uniform, gloves, helmet and safety shoes are issued against the
                deployment list before the first shift, along with the induction
                and safety briefing for that site.
              </p>
            </div>
          </div>
        </Reveal>

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
