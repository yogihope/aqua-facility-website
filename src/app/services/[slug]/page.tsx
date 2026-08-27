import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { CaseStudyCard } from "@/components/sections/CaseStudiesSection";
import { SectionHeading, Chip, JsonLd, IndexBadge } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink, Arrow } from "@/components/ui/Button";
import { getServices, getServiceBySlug, getIndustries, getCaseStudies } from "@/lib/data";
import { buildMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

/**
 * Section 6.11–6.16 required page flow:
 * Hero → What We Solve → Core Capabilities → Relevant Industries →
 * How Aqua Delivers → Technology layer → Safety & Compliance → Case Study →
 * Related Services → CTA.
 */
export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const [service, allServices, allIndustries, caseStudies] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getIndustries(),
    getCaseStudies(),
  ]);

  if (!service) notFound();

  const relatedIndustries = allIndustries.filter((industry) =>
    service.industries.includes(industry.slug)
  );
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relatedCase = caseStudies.find((c) => c.serviceSlug === service.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.title,
            description: service.seoDescription,
            path: `/services/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        kicker={service.heroKicker}
        title={service.heroTitle}
        intro={service.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title },
        ]}
        aside={
          <div className="rounded-[1.5rem] border border-line bg-white/70 p-7">
            <p className="kicker text-gold-deep">Capability</p>
            <p className="mt-4 font-display text-[1.375rem] leading-snug text-charcoal">
              {service.title}
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {service.outcomeLine}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
              {service.chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>
          </div>
        }
      />

      {/* What We Solve */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="What we solve"
            title={
              <>
                The problems this capability{" "}
                <span className="italic text-brown">is built around.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {service.problems.map((problem, i) => (
              <Reveal key={problem.title} delay={i * 80}>
                <article className="h-full rounded-[1.5rem] border border-line bg-white/70 p-7">
                  <IndexBadge value={i + 1} />
                  <h3 className="h3 mt-5 text-charcoal">{problem.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {problem.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Core capabilities */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker="Core capabilities"
            title={
              <>
                Everything in scope,{" "}
                <span className="italic text-brown">named explicitly.</span>
              </>
            }
            body="Scope is agreed line by line during mobilisation. Nothing sits in the gap between two activities."
          />
          <Reveal delay={100}>
            <ul className="mt-12 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
              {service.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-center gap-3.5 border-b border-line py-4 text-[0.9375rem] text-charcoal/85"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {capability}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* How Aqua delivers */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="How Aqua delivers"
            title={
              <>
                People, process, equipment{" "}
                <span className="italic text-brown">and supervision.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {service.delivery.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <article className="h-full rounded-[1.5rem] border border-line bg-white/70 p-7 transition-colors duration-300 hover:border-gold/40 hover:bg-white sm:p-8">
                  <div className="flex items-center gap-3">
                    <IndexBadge value={i + 1} />
                    <span className="h-px flex-1 bg-line" />
                    <span className="kicker text-muted">{item.title}</span>
                  </div>
                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Technology layer + safety and compliance */}
      <section className="dark-section relative overflow-hidden bg-charcoal py-16 sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[130px]"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="kicker text-gold-soft">Technology layer</p>
              <h2 className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight text-warm">
                Execution you can verify.
              </h2>
              <p className="lede mt-5">{service.techLayer}</p>
              <div className="mt-7">
                <TextLink href="/technology" tone="warm">
                  See how we monitor operations
                </TextLink>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="kicker text-gold-soft">Safety &amp; compliance</p>
              <h2 className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight text-warm">
                Method starts with safety.
              </h2>
              <p className="lede mt-5">{service.safetyNote}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Relevant industries */}
      {relatedIndustries.length ? (
        <Section tone="warm" className="grain">
          <Container>
            <SectionHeading
              kicker="Relevant industries"
              title={
                <>
                  Where this capability{" "}
                  <span className="italic text-brown">is deployed.</span>
                </>
              }
              action={<TextLink href="/industries">All industries</TextLink>}
            />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedIndustries.map((industry, i) => (
                <Reveal key={industry.slug} delay={i * 50}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-white/65 p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white"
                  >
                    <span>
                      <span className="h3 block text-[1rem] text-charcoal transition-colors group-hover:text-brown">
                        {industry.title}
                      </span>
                      <span className="mt-2 block text-[0.8125rem] leading-relaxed text-muted">
                        {industry.capabilities.slice(0, 3).join(" · ")}
                      </span>
                    </span>
                    <Arrow className="mt-1 h-4 w-4 shrink-0 text-gold-deep/60" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Case study */}
      {relatedCase ? (
        <Section tone="sand">
          <Container>
            <SectionHeading
              kicker="Proof"
              title={
                <>
                  This capability{" "}
                  <span className="italic text-brown">in execution.</span>
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

      {/* Related services */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="Related capabilities"
            title={
              <>
                Capabilities that{" "}
                <span className="italic text-brown">travel together.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {relatedServices.map((related, i) => (
              <Reveal key={related.slug} delay={i * 60}>
                <Link
                  href={`/services/${related.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white/65 p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white"
                >
                  <span>
                    <span className="h3 block text-[1.0625rem] text-charcoal transition-colors group-hover:text-brown">
                      {related.title}
                    </span>
                    <span className="mt-2.5 block text-[0.875rem] leading-relaxed text-muted">
                      {related.outcomeLine}
                    </span>
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brown">
                    Explore
                    <Arrow className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="Next step"
        title={service.closingLine}
        body={`Share your site, scope and constraints. Aqua will propose the manpower plan, process and equipment around ${service.title.toLowerCase()}.`}
        primary={{ label: service.ctaLabel, href: "/request-proposal" }}
        secondary={{ label: "Talk to the team", href: "/contact" }}
      />
    </>
  );
}
