import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, Chip } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { getInsights } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Insights | Operational Insights from the Field",
  description:
    "Articles on facility management, workforce, O&M, railways and infrastructure, technology, safety and compliance from the Aqua team.",
  path: "/insights",
});

export const revalidate = 1800;

export default async function InsightsPage() {
  const insights = await getInsights();
  const [featured, ...rest] = insights;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />

      <PageHero
        kicker="Insights"
        title="Operational Insights from the Field."
        intro="Practical writing on how facility, workforce, maintenance and infrastructure operations actually run — from the people who run them."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Insights" }]}
      />

      <Section tone="warm" className="grain">
        <Container>
          {featured ? (
            <Reveal>
              <Link
                href={`/insights/${featured.slug}`}
                className="group grid gap-8 overflow-hidden rounded-[1.75rem] border border-line bg-white/70 p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold/40 hover:bg-white hover:shadow-[0_28px_54px_-36px_rgba(44,39,35,0.5)] sm:p-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Chip tone="gold">Latest</Chip>
                    <span className="text-[0.75rem] text-muted">
                      {featured.category} · {formatDate(featured.publishedAt)} ·{" "}
                      {featured.readMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.018em] text-charcoal transition-colors group-hover:text-brown">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted">
                    {featured.excerpt}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-brown">
                    Read the article
                    <Arrow className="h-4 w-4" />
                  </span>
                </div>

                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal lg:block">
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
                      backgroundSize: "26px 26px",
                    }}
                  />
                </div>
              </Link>
            </Reveal>
          ) : null}

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((insight, i) => (
              <Reveal key={insight.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-line bg-white/70 p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white"
                >
                  <span className="flex items-center gap-2.5">
                    <Chip>{insight.category}</Chip>
                  </span>
                  <span className="h3 mt-5 block text-[1.0625rem] leading-snug text-charcoal transition-colors group-hover:text-brown">
                    {insight.title}
                  </span>
                  <span className="mt-3 block text-[0.875rem] leading-relaxed text-muted">
                    {insight.excerpt}
                  </span>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-[0.75rem] text-muted">
                    {formatDate(insight.publishedAt)}
                    <span className="inline-flex items-center gap-1.5 font-semibold text-brown">
                      {insight.readMinutes} min
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
        kicker="Talk to us"
        title="Have a question these articles do not answer?"
        body="Our capability teams are happy to walk through how an approach would apply to your site."
        primary={{ label: "Discuss Your Requirement", href: "/contact" }}
        secondary={{ label: "Request a Proposal", href: "/request-proposal" }}
      />
    </>
  );
}
