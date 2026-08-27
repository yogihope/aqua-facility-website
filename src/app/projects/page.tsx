import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { CaseStudyCard } from "@/components/sections/CaseStudiesSection";
import { SectionHeading, JsonLd, VerifyNote, IndexBadge } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { getCaseStudies } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects & Case Studies | Proof Through Execution",
  description:
    "Operational challenges Aqua solves, the systems deployed and the outcomes clients achieve — documented as Challenge, Solution, Scale, Process and Outcome.",
  path: "/projects",
});

export const revalidate = 3600;

const FRAMEWORK = [
  {
    step: "Challenge",
    body: "The operating problem as the site experienced it, not as a marketing premise.",
  },
  {
    step: "Aqua solution",
    body: "The manpower plan, process and equipment proposed against that problem.",
  },
  {
    step: "Scale",
    body: "Scope, workforce and duration — published only when verified.",
  },
  {
    step: "Process",
    body: "How mobilisation, supervision and escalation were actually structured.",
  },
  {
    step: "Outcome",
    body: "A measured result where it can be evidenced, a factual qualitative result where it cannot.",
  },
];

export default async function ProjectsPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <PageHero
        kicker="Projects"
        title="Proof Through Execution."
        intro="Our strongest work is best understood through the operational challenges we solve, the systems we deploy and the outcomes we help clients achieve."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Projects" }]}
        aside={
          <VerifyNote>
            Case-study structure is live. Client names, workforce scale and
            outcome metrics publish only against documentary confirmation and
            written client permission — no invented numbers, no placeholder
            metrics.
          </VerifyNote>
        }
      />

      <Section tone="warm" className="grain">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 80}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* The framework every case study follows */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker="How we document work"
            title={
              <>
                Challenge → Solution → Scale →{" "}
                <span className="italic text-brown">Process → Outcome.</span>
              </>
            }
            body="Every case study follows the same five-part structure, so a procurement team can compare engagements rather than read five different marketing formats."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {FRAMEWORK.map((item, i) => (
              <Reveal key={item.step} delay={i * 70}>
                <article className="h-full rounded-2xl border border-line bg-white/70 p-6">
                  <IndexBadge value={i + 1} />
                  <h3 className="mt-4 text-[0.9375rem] font-semibold text-charcoal">
                    {item.step}
                  </h3>
                  <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="References"
        title="Ask for references relevant to your sector."
        body="Client references, scope details and site visits are arranged during evaluation, with client permission. Tell us the sector and the scope you are assessing."
        primary={{ label: "Request a Proposal", href: "/request-proposal" }}
        secondary={{ label: "Discuss Your Requirement", href: "/contact" }}
      />
    </>
  );
}
