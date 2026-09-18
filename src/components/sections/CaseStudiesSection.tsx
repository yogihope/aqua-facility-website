import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading, Chip } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink, Arrow } from "@/components/ui/Button";
import { caseStudyClientLabel } from "@/content/projects";
import type { CaseStudyContent } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Section 6.1 (10) / 6.32 — Challenge → Solution → Scale → Process → Outcome.
 * Placeholder metrics are forbidden, so an unverified metric renders as a
 * omitted rather than shown as a number, and unapproved client names never
 * reach the DOM.
 */
export function CaseStudiesSection({
  caseStudies,
}: {
  caseStudies: CaseStudyContent[];
}) {
  return (
    <Section tone="sand">
      <Container>
        <SectionHeading
          kicker="Proof"
          title={
            <>
              Proof through <span className="italic text-brown">execution.</span>
            </>
          }
          body="Our strongest work is best understood through the operational challenges we solve, the systems we deploy and the outcomes we help clients achieve."
          action={<TextLink href="/projects">All case studies</TextLink>}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((study, i) => (
            <Reveal key={study.slug} delay={i * 80}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function CaseStudyCard({
  study,
  className,
}: {
  study: CaseStudyContent;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${study.slug}`}
      data-analytics="case_study_view"
      data-case-study={study.slug}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white/75 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-[0_26px_50px_-34px_rgba(44,39,35,0.55)]",
        className
      )}
    >
      {/* Visual band — replaced by wide-angle site photography at content freeze */}
      <span className="relative block aspect-[16/10] overflow-hidden bg-charcoal">
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(199,154,35,0.25),transparent_60%)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(247,244,238,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,244,238,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span className="absolute inset-x-5 bottom-5">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-soft">
            {caseStudyClientLabel(study)}
          </span>
          <span className="mt-1 block text-[0.75rem] text-warm/55">
            {study.location} · {study.duration}
          </span>
        </span>
      </span>

      <span className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="h3 block text-[1.0625rem] leading-snug text-charcoal transition-colors group-hover:text-brown">
          {study.title}
        </span>

        <span className="mt-4 block border-l-2 border-gold/40 pl-4 text-[0.875rem] leading-relaxed text-muted">
          {study.challenge.length > 150
            ? `${study.challenge.slice(0, 148).trimEnd()}…`
            : study.challenge}
        </span>

        <span className="mt-5 flex flex-wrap gap-1.5">
          {study.serviceScope
            .split(",")
            .slice(0, 2)
            .map((scope) => (
              <Chip key={scope}>{scope.trim()}</Chip>
            ))}
        </span>

        <span className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brown">
            View case study
            <Arrow className="h-3.5 w-3.5" />
          </span>
        </span>
      </span>
    </Link>
  );
}
