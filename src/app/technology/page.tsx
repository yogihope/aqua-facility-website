import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { SectionHeading, JsonLd, Chip } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { getTechCapabilities, getServiceBySlug } from "@/lib/data";
import { TECH_STATUS_LABEL } from "@/content/technology";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Technology-Enabled Facility & Workforce Operations | Aqua",
  description:
    "Digital attendance, geo-tagged verification, dashboards, audit logs, maintenance tracking and management MIS for accountable operations.",
  path: "/technology",
});

export const revalidate = 3600;

export default async function TechnologyPage() {
  const [capabilities, service] = await Promise.all([
    getTechCapabilities(),
    getServiceBySlug("technology-enabled-operations"),
  ]);

  const grouped = {
    live: capabilities.filter((c) => c.status === "live"),
    rollout: capabilities.filter((c) => c.status === "in-rollout"),
    planned: capabilities.filter((c) => c.status === "planned"),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ])}
      />

      <PageHero
        kicker="Technology"
        title="From Operations to Operational Intelligence."
        intro="Technology turns daily execution into evidence, visibility and faster action. Aqua's digital systems help clients and supervisors see workforce deployment, task completion, issues, maintenance, assets and operational performance with greater clarity."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Technology" }]}
        tone="dark"
        meta={[
          { label: "In use", value: `${grouped.live.length} modules` },
          { label: "In rollout", value: `${grouped.rollout.length} modules` },
          { label: "Planned", value: `${grouped.planned.length} modules` },
          { label: "Deployment", value: "Configured per site" },
        ]}
      />

      {/* Dashboard modules — 6.17 */}
      <TechnologySection capabilities={capabilities} />

      {/* Full module register, honest about status */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="Module register"
            title={
              <>
                What exists today, and{" "}
                <span className="italic text-brown">what is coming.</span>
              </>
            }
            body="Module availability varies by contract and site readiness. Capabilities are configured during mobilisation and confirmed in the scope document — nothing here is presented as live before it is."
          />

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-strong">
                  <th className="pb-3 pr-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Module
                  </th>
                  <th className="pb-3 pr-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Category
                  </th>
                  <th className="pb-3 pr-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    What it does
                  </th>
                  <th className="pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {capabilities.map((capability) => (
                  <tr key={capability.slug} className="border-b border-line">
                    <td className="py-4 pr-4 align-top text-[0.9375rem] font-semibold text-charcoal">
                      {capability.module}
                    </td>
                    <td className="py-4 pr-4 align-top text-[0.875rem] text-muted">
                      {capability.category}
                    </td>
                    <td className="max-w-md py-4 pr-4 align-top text-[0.875rem] leading-relaxed text-muted">
                      {capability.description}
                    </td>
                    <td className="py-4 align-top">
                      <span
                        className={cn(
                          "inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.6875rem] font-semibold",
                          capability.status === "live"
                            ? "border-gold/40 bg-gold/10 text-gold-deep"
                            : "border-line-strong bg-warm-deep text-muted"
                        )}
                      >
                        {TECH_STATUS_LABEL[capability.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </Container>
      </Section>

      {/* What this changes operationally */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker="What it changes"
            title={
              <>
                Evidence instead of{" "}
                <span className="italic text-brown">recollection.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Visibility on the day",
                body: "Clients see deployment, task status and open issues as they happen, rather than at the next monthly review.",
              },
              {
                title: "Verified completion",
                body: "Photo-based, time-stamped and geo-tagged records replace claimed completion with recorded completion.",
              },
              {
                title: "Faster escalation",
                body: "Tickets route to a named owner with a defined response expectation, and closure is tracked to evidence.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="h-full rounded-[1.5rem] border border-line bg-white/70 p-7">
                  <h3 className="h3 text-[1.0625rem] text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {service ? (
            <Reveal delay={140}>
              <div className="mt-12 flex flex-wrap items-center gap-3">
                {service.capabilities.slice(0, 10).map((capability) => (
                  <Chip key={capability}>{capability}</Chip>
                ))}
                <TextLink href="/services/technology-enabled-operations">
                  Full capability list
                </TextLink>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      <CtaBand
        kicker="See it working"
        title="Better Visibility. Faster Action. Stronger Accountability."
        body="Ask for a walkthrough of the modules that would apply to your site, and what evidence they would produce in your review cycle."
        primary={{ label: "See How We Monitor Operations", href: "/request-proposal" }}
        secondary={{ label: "Discuss Your Requirement", href: "/contact" }}
      />
    </>
  );
}
