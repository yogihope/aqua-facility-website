import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading, JsonLd, IndexBadge } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink, Arrow } from "@/components/ui/Button";
import { getGroupCompanies, getGroupCompanyBySlug } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const companies = await getGroupCompanies();
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata(props: PageProps<"/group/[slug]">) {
  const { slug } = await props.params;
  const company = await getGroupCompanyBySlug(slug);
  if (!company) return {};
  return buildMetadata({
    title: company.seoTitle,
    description: company.seoDescription,
    path: `/group/${company.slug}`,
  });
}

/**
 * Section 6.4–6.9 required structure:
 * Hero → role within Aqua Group → services/programmes → industries/beneficiaries
 * → operating model → proof/credentials → related Aqua Group capabilities → CTA.
 */
export default async function GroupCompanyPage(props: PageProps<"/group/[slug]">) {
  const { slug } = await props.params;
  const [company, allCompanies] = await Promise.all([
    getGroupCompanyBySlug(slug),
    getGroupCompanies(),
  ]);

  if (!company) notFound();

  const related = allCompanies.filter((c) => c.slug !== company.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Aqua Group", path: "/group" },
          { name: company.displayName, path: `/group/${company.slug}` },
        ])}
      />

      <PageHero
        kicker={`Aqua Group · ${company.displayName}`}
        title={company.positioning}
        intro={company.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Aqua Group", href: "/group" },
          { name: company.displayName },
        ]}
        aside={
          <div className="flex flex-col gap-4">
            <div className="rounded-[1.5rem] border border-line bg-white/70 p-7">
              <p className="kicker text-gold-deep">Primary scope</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {company.scope}
              </p>
              <dl className="mt-6 border-t border-line pt-5">
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Entity
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] font-medium text-charcoal">
                  {company.legalName}
                </dd>
              </dl>
            </div>
          </div>
        }
      />

      {/* Role within Aqua Group */}
      <Section tone="warm" className="grain">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="kicker text-gold-deep">Role within Aqua Group</p>
              <h2 className="h2 mt-6 text-charcoal">
                Where this company{" "}
                <span className="italic text-brown">sits in the ecosystem.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[1.0625rem] leading-relaxed text-muted">
                {company.roleInGroup}
              </p>
              <div className="mt-8">
                <TextLink href="/group">See the full group</TextLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Services / programmes + beneficiaries */}
      <Section tone="sand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="kicker text-gold-deep">Services &amp; programmes</p>
                <h2 className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight text-charcoal">
                  What this company delivers.
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <ul className="mt-8">
                  {company.offerings.map((offering) => (
                    <li
                      key={offering}
                      className="flex items-center gap-3.5 border-b border-line py-3.5 text-[0.9375rem] text-charcoal/85"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {offering}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <Reveal delay={60}>
                <p className="kicker text-gold-deep">
                  Industries &amp; beneficiaries
                </p>
                <h2 className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight text-charcoal">
                  Who it works with.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {company.beneficiaries.map((beneficiary) => (
                    <li
                      key={beneficiary}
                      className="rounded-xl border border-line-strong bg-white/70 px-4 py-2.5 text-[0.875rem] text-charcoal/85"
                    >
                      {beneficiary}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Operating model + proof */}
      <section className="dark-section relative overflow-hidden bg-charcoal py-16 sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[130px]"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="kicker text-gold-soft">Operating model</p>
              <h2 className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight text-warm">
                How delivery is structured.
              </h2>
              <p className="lede mt-5">{company.operatingModel}</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="kicker text-gold-soft">Proof &amp; credentials</p>
              <h2 className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.25rem)] leading-tight text-warm">
                What we can evidence.
              </h2>
              <p className="lede mt-5">{company.proofNote}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Related group capabilities */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="Related capabilities"
            title={
              <>
                The rest of{" "}
                <span className="italic text-brown">the Aqua Group.</span>
              </>
            }
            action={<TextLink href="/group">Explore the Aqua Group</TextLink>}
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((other, i) => (
              <Reveal key={other.slug} delay={i * 50}>
                <Link
                  href={`/group/${other.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white/70 p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white"
                >
                  <span>
                    <IndexBadge value={other.order} />
                    <span className="h3 mt-4 block text-[1rem] text-charcoal transition-colors group-hover:text-brown">
                      {other.displayName}
                    </span>
                    <span className="mt-2 block font-display text-[0.9375rem] italic text-brown/80">
                      {other.positioning}
                    </span>
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brown">
                    View company
                    <Arrow className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="Work with us"
        title={`Bring your requirement to ${company.displayName}.`}
        body="Share the scope and the site. Your enquiry is routed to the team that owns this capability."
        primary={{ label: "Request a Proposal", href: "/request-proposal" }}
        secondary={{ label: "Discuss Your Requirement", href: "/contact" }}
      />
    </>
  );
}
