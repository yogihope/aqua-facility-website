import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { CaseStudyCard } from "@/components/sections/CaseStudiesSection";
import { SectionHeading, Chip, JsonLd, IndexBadge } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink, Arrow } from "@/components/ui/Button";
import {
  getIndustries,
  getIndustryBySlug,
  getServicesForIndustry,
  getCaseStudies,
} from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/industries/${industry.slug}`,
  });
}

/**
 * Reusable industry structure (6.19–6.31):
 * Hero → industry challenges → relevant Aqua capabilities → operating model →
 * proof / case study → technology, safety and compliance → CTA.
 */
export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const [industry, services, caseStudies, allIndustries] = await Promise.all([
    getIndustryBySlug(slug),
    getServicesForIndustry(slug),
    getCaseStudies(),
    getIndustries(),
  ]);

  if (!industry) notFound();

  const relatedCase = caseStudies.find((c) => c.industrySlug === industry.slug);
  const otherIndustries = allIndustries
    .filter((i) => i.slug !== industry.slug)
    .slice(0, 4);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.title, path: `/industries/${industry.slug}` },
        ])}
      />

      <PageHero
        kicker="Industry"
        title={industry.heroTitle}
        intro={industry.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
          { name: industry.title },
        ]}
        aside={
          <div className="rounded-[1.5rem] border border-line bg-white/70 p-7">
            <p className="kicker text-gold-deep">Relevant capabilities</p>
            <ul className="mt-5 flex flex-col gap-3">
              {industry.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-center gap-3 text-[0.9375rem] text-charcoal/85"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Industry challenges */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="Operating challenges"
            title={
              <>
                What makes this sector{" "}
                <span className="italic text-brown">operationally demanding.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {industry.challenges.map((challenge, i) => (
              <Reveal key={challenge.title} delay={i * 80}>
                <article className="h-full rounded-[1.5rem] border border-line bg-white/70 p-7">
                  <IndexBadge value={i + 1} />
                  <h2 className="h3 mt-5 text-charcoal">{challenge.title}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {challenge.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Relevant Aqua capabilities */}
      {services.length ? (
        <Section tone="sand">
          <Container>
            <SectionHeading
              kicker="Aqua capabilities"
              title={
                <>
                  What Aqua deploys into{" "}
                  <span className="italic text-brown">
                    {industry.title.toLowerCase()}.
                  </span>
                </>
              }
              action={<TextLink href="/services">All services</TextLink>}
            />
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {services.map((service, i) => (
                <Reveal key={service.slug} delay={i * 60}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white/70 p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white"
                  >
                    <span>
                      <span className="h3 block text-[1.0625rem] text-charcoal transition-colors group-hover:text-brown">
                        {service.title}
                      </span>
                      <span className="mt-2.5 block text-[0.875rem] leading-relaxed text-muted">
                        {service.outcomeLine}
                      </span>
                      <span className="mt-5 flex flex-wrap gap-1.5">
                        {service.chips.slice(0, 4).map((chip) => (
                          <Chip key={chip}>{chip}</Chip>
                        ))}
                      </span>
                    </span>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brown">
                      Explore capability
                      <Arrow className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Operating model + technology, safety, compliance */}
      <section className="dark-section relative overflow-hidden bg-charcoal py-16 sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-brown/25 blur-[130px]"
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <p className="kicker text-gold-soft">Operating model</p>
            <h2 className="h2 mt-6 text-warm">
              How the work is{" "}
              <span className="text-gradient-gold italic">structured on site.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Survey and scope",
                body: "Area-wise survey, classification and scope mapping before a manpower plan is proposed.",
              },
              {
                title: "Mobilise",
                body: "Skill matching, induction, safety orientation and equipment selection for the environment.",
              },
              {
                title: "Operate",
                body: "Rostered execution against SOPs and frequencies, with layered supervision across shifts.",
              },
              {
                title: "Verify and review",
                body: "Digital attendance, task verification, audit logs and a review cadence with the client.",
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <article className="h-full rounded-2xl border border-warm/12 bg-warm/[0.05] p-6">
                  <IndexBadge value={i + 1} tone="dark" />
                  <h3 className="mt-4 text-[1rem] font-semibold text-warm">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-warm/60">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <p className="mt-10 max-w-2xl text-[0.9375rem] leading-relaxed text-warm/60">
              Safety planning, statutory compliance and client-specific
              requirements set the method before speed does. Execution is recorded
              through digital attendance, geo-tagged verification and audit logs.{" "}
              <TextLink href="/technology" tone="warm" className="ml-1">
                See the technology layer
              </TextLink>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Proof */}
      {relatedCase ? (
        <Section tone="warm" className="grain">
          <Container>
            <SectionHeading
              kicker="Proof"
              title={
                <>
                  Execution in this{" "}
                  <span className="italic text-brown">environment.</span>
                </>
              }
              action={<TextLink href="/projects">All case studies</TextLink>}
            />
            <div className="mt-12 max-w-2xl">
              <Reveal>
                <CaseStudyCard study={relatedCase} />
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Other sectors */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker="Other sectors"
            title={
              <>
                Aqua also operates{" "}
                <span className="italic text-brown">across these environments.</span>
              </>
            }
            action={<TextLink href="/industries">All industries</TextLink>}
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherIndustries.map((other, i) => (
              <Reveal key={other.slug} delay={i * 50}>
                <Link
                  href={`/industries/${other.slug}`}
                  className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white"
                >
                  <span className="text-[0.9375rem] font-semibold text-charcoal transition-colors group-hover:text-brown">
                    {other.title}
                  </span>
                  <Arrow className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep/60" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="Site requirement"
        title="Tell us what your site has to keep running."
        body={`Share the operating conditions, shift pattern and scope. Aqua will propose the people, process and equipment for your ${industry.title.toLowerCase()} environment.`}
        primary={{ label: industry.ctaLabel, href: "/request-proposal" }}
        secondary={{ label: "Contact the team", href: "/contact" }}
      />
    </>
  );
}
