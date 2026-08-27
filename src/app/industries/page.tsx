import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, IndexBadge } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { getIndustries } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries | Operational Support for Complex Environments",
  description:
    "Aqua combines sector understanding with flexible service models, trained manpower, machinery and site-specific processes across thirteen operating sectors.",
  path: "/industries",
});

export const revalidate = 3600;

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />

      <PageHero
        kicker="Industries"
        title="Built for Complex Operating Environments."
        intro="Different industries create different operational demands. Aqua combines sector understanding with flexible service models, trained manpower, machinery and site-specific processes."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Industries" }]}
        meta={[
          { label: "Sectors served", value: String(industries.length) },
          { label: "Model", value: "Site-specific processes" },
          { label: "Workforce", value: "Skilled & semi-skilled" },
          { label: "Coverage", value: "PAN-India capability" },
        ]}
      />

      <Section tone="warm" className="grain">
        <Container>
          {/* 6.18 — sector cards with service tags, deep-linked to the sector page */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-line bg-white/70 p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-[0_24px_48px_-32px_rgba(44,39,35,0.5)]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/0 blur-3xl transition-colors duration-500 group-hover:bg-gold/15"
                  />
                  <span className="relative">
                    <span className="flex items-center gap-3">
                      <IndexBadge value={i + 1} />
                      <span className="h-px flex-1 bg-line" />
                    </span>
                    <span className="h3 mt-6 block text-charcoal transition-colors group-hover:text-brown">
                      {industry.title}
                    </span>
                    <span className="mt-3 block text-[0.875rem] leading-relaxed text-muted">
                      {industry.intro}
                    </span>
                  </span>

                  <span className="relative mt-7 block">
                    <span className="flex flex-wrap gap-1.5">
                      {industry.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap}
                          className="rounded-full border border-line-strong bg-warm/60 px-2.5 py-1 text-[0.6875rem] text-muted"
                        >
                          {cap}
                        </span>
                      ))}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brown">
                      Explore sector
                      <Arrow className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="Sector requirement"
        title="Every site has its own operating conditions."
        body="Tell us the sector, the site and what has to keep running. Aqua will propose a manpower plan, process and equipment set built for that environment."
        primary={{ label: "Discuss Your Site Requirement", href: "/request-proposal" }}
        secondary={{ label: "Contact the team", href: "/contact" }}
      />
    </>
  );
}
