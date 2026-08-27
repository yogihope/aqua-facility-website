import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { CaseStudyCard } from "@/components/sections/CaseStudiesSection";
import { SectionHeading, JsonLd, VerifyNote, Chip } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { getCaseStudies, getCaseStudyBySlug, getServices } from "@/lib/data";
import { caseStudyClientLabel } from "@/content/projects";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.title} | Aqua Case Study`,
    description: study.challenge.slice(0, 155),
    path: `/projects/${study.slug}`,
  });
}

/** Case study template — Section 6.32. */
export default async function CaseStudyPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const [study, allStudies, services] = await Promise.all([
    getCaseStudyBySlug(slug),
    getCaseStudies(),
    getServices(),
  ]);

  if (!study) notFound();

  const related = allStudies.filter((s) => s.slug !== study.slug).slice(0, 2);
  const relatedService = services.find((s) => s.slug === study.serviceSlug);

  const narrative = [
    { heading: "The challenge", body: study.challenge },
    { heading: "Aqua solution", body: study.solution },
    { heading: "Mobilisation & process", body: study.process },
    { heading: "Measured outcome", body: study.outcome },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: study.title, path: `/projects/${study.slug}` },
        ])}
      />

      <PageHero
        kicker={caseStudyClientLabel(study)}
        title={study.title}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: study.title },
        ]}
        tone="dark"
        meta={[
          { label: "Location", value: study.location },
          { label: "Duration", value: study.duration },
          {
            label: "Workforce scale",
            value:
              study.workforceVerified && study.workforceScale
                ? study.workforceScale
                : "Pending verification",
          },
          {
            label: "Service scope",
            value: study.serviceScope.split(",")[0].trim(),
          },
        ]}
      />

      {/* Executive snapshot */}
      <Section tone="warm" className="grain">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              {narrative.map((block, i) => (
                <Reveal key={block.heading} delay={i * 60}>
                  <div className="mb-12 last:mb-0">
                    <p className="kicker text-gold-deep">{block.heading}</p>
                    <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">
                      {block.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="flex flex-col gap-4 lg:pt-2">
              <Reveal>
                <div className="rounded-[1.5rem] border border-line bg-white/70 p-7">
                  <p className="kicker text-gold-deep">Scope</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {study.serviceScope.split(",").map((scope) => (
                      <Chip key={scope}>{scope.trim()}</Chip>
                    ))}
                  </ul>

                  {study.equipment ? (
                    <div className="mt-6 border-t border-line pt-5">
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        Equipment deployed
                      </p>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-charcoal/80">
                        {study.equipment}
                      </p>
                    </div>
                  ) : null}
                </div>
              </Reveal>

              {/* Outcome metrics — unverified values never render as numbers */}
              <Reveal delay={80}>
                <div className="rounded-[1.5rem] border border-line bg-white/70 p-7">
                  <p className="kicker text-gold-deep">Outcome metrics</p>
                  <dl className="mt-5 flex flex-col divide-y divide-line">
                    {study.outcomeMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                      >
                        <dt className="text-[0.875rem] text-muted">
                          {metric.label}
                        </dt>
                        <dd
                          className={
                            metric.verified
                              ? "font-display text-[1.25rem] text-brown"
                              : "text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-gold-deep/70"
                          }
                        >
                          {metric.verified && metric.value
                            ? metric.value
                            : "Pending verification"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <VerifyNote>
                  Figures publish only once Aqua management supplies documentary
                  confirmation. Until then this page shows the operational
                  narrative without numbers.
                </VerifyNote>
              </Reveal>

              {study.clientQuote && study.quoteApproved ? (
                <Reveal delay={180}>
                  <blockquote className="rounded-[1.5rem] border border-gold/30 bg-gold/[0.06] p-7">
                    <p className="font-display text-[1.125rem] italic leading-snug text-charcoal">
                      “{study.clientQuote}”
                    </p>
                    {study.quoteAttribution ? (
                      <footer className="mt-4 text-[0.8125rem] text-muted">
                        {study.quoteAttribution}
                      </footer>
                    ) : null}
                  </blockquote>
                </Reveal>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* Related capability */}
      {relatedService ? (
        <Section tone="sand">
          <Container>
            <div className="flex flex-col gap-6 rounded-[1.5rem] border border-line bg-white/70 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <p className="kicker text-gold-deep">Related capability</p>
                <p className="mt-4 font-display text-[1.375rem] text-charcoal">
                  {relatedService.title}
                </p>
                <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                  {relatedService.outcomeLine}
                </p>
              </div>
              <TextLink href={`/services/${relatedService.slug}`}>
                Explore capability
              </TextLink>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Related case studies */}
      {related.length ? (
        <Section tone="warm" className="grain">
          <Container>
            <SectionHeading
              kicker="More work"
              title={
                <>
                  Other operational{" "}
                  <span className="italic text-brown">engagements.</span>
                </>
              }
              action={<TextLink href="/projects">All case studies</TextLink>}
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {related.map((other, i) => (
                <Reveal key={other.slug} delay={i * 80}>
                  <CaseStudyCard study={other} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        kicker="Similar requirement"
        title="Have a comparable operation to solve?"
        body="Share the site, the scope and the constraint you are working against. Aqua will propose the operating structure around it."
        primary={{ label: "Request a Proposal", href: "/request-proposal" }}
        secondary={{ label: "Discuss Your Requirement", href: "/contact" }}
      />

      <div className="sr-only">
        <Link href="/projects">Back to all projects</Link>
      </div>
    </>
  );
}
