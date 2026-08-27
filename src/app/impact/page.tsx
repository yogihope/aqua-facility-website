import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading, JsonLd, VerifyNote } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Impact | Aqua Devika Foundation",
  description:
    "The verified social-impact work of Aqua Devika Foundation — education, skill development, employability, healthcare, community welfare and environmental responsibility.",
  path: "/impact",
});

/**
 * Section 6.33 — Impact / Foundation.
 * The spec is explicit: do not publish generic claims, and keep modules hidden
 * until actual programmes, beneficiary counts, locations, partners and
 * photographs are supplied. This page therefore ships the structure and states
 * plainly that the content is pending, rather than filling it with CSR
 * boilerplate.
 */
const FUTURE_MODULES = [
  {
    title: "Education",
    body: "School support, learning materials and educational infrastructure programmes.",
  },
  {
    title: "Skill development",
    body: "Trade and vocational training linked to real employment pathways.",
  },
  {
    title: "Employability",
    body: "Placement support connecting trained candidates to opportunities.",
  },
  {
    title: "Healthcare initiatives",
    body: "Health camps, screening and access programmes in operating locations.",
  },
  {
    title: "Community welfare",
    body: "Local welfare initiatives in the communities Aqua operates within.",
  },
  {
    title: "Environmental responsibility",
    body: "Waste, water and environmental initiatives connected to operations.",
  },
  {
    title: "Women empowerment",
    body: "Programmes supporting women entering and progressing in the workforce.",
  },
  {
    title: "Employee volunteering",
    body: "Structured volunteering by Aqua teams across operating locations.",
  },
];

export default function ImpactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Impact", path: "/impact" },
        ])}
      />

      <PageHero
        kicker="Aqua Devika Foundation"
        title="Progress with Purpose."
        intro="Aqua believes operational growth should contribute to stronger communities and better opportunities. This page documents the verified social-impact work of Aqua Devika Foundation."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Impact" }]}
        aside={
          <VerifyNote>
            Programme content is intentionally unpublished. Modules go live once
            the Foundation supplies actual programmes, beneficiary counts,
            locations, partners and photographs — the specification does not
            permit generic CSR claims in their place.
          </VerifyNote>
        }
      />

      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="Programme areas"
            title={
              <>
                Eight areas, documented{" "}
                <span className="italic text-brown">before they are claimed.</span>
              </>
            }
            body="Each area below has a content model ready in the CMS: programme, location, partner, beneficiary detail, outcome and photographs. Nothing renders publicly until those fields are filled and approved."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FUTURE_MODULES.map((module, i) => (
              <Reveal key={module.title} delay={(i % 4) * 60}>
                <article className="flex h-full flex-col rounded-2xl border border-dashed border-line-strong bg-white/45 p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-[0.9375rem] font-semibold text-charcoal">
                      {module.title}
                    </h2>
                    <span className="shrink-0 rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-gold-deep">
                      Pending
                    </span>
                  </div>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                    {module.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="kicker text-gold-deep">The Foundation</p>
              <h2 className="h2 mt-6 text-charcoal">
                Impact reported the same way{" "}
                <span className="italic text-brown">operations are.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[1.0625rem] leading-relaxed text-muted">
                Aqua Devika Foundation is the social-impact arm of Aqua Group. The
                approach to reporting is the one Aqua applies to client work:
                document what was done, where, with whom, and what changed. Where
                an outcome cannot be evidenced, it is described qualitatively
                rather than quantified with an estimate.
              </p>
              <div className="mt-8">
                <TextLink href="/group/aqua-devika-foundation">
                  About the Foundation
                </TextLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="Partnerships"
        title="Working on something we should support?"
        body="If your organisation runs education, skilling or community programmes in the regions Aqua operates in, we would like to hear about it."
        primary={{ label: "Contact the Foundation", href: "/contact" }}
      />
    </>
  );
}
