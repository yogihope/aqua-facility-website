import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProposalForm } from "@/components/forms/ProposalForm";
import { JsonLd, IndexBadge } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { getServices, getIndustries } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "Request a Proposal | Build a Solution Around Your Requirement",
  description:
    "Tell Aqua what you need to manage, improve, staff, maintain or execute. Your requirement is routed to the relevant capability team.",
  path: "/request-proposal",
});

export default async function RequestProposalPage() {
  const [services, industries] = await Promise.all([
    getServices(),
    getIndustries(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Request a Proposal", path: "/request-proposal" },
        ])}
      />

      <PageHero
        kicker="Request a proposal"
        title="Build a Solution Around Your Requirement."
        intro="Tell us what you need to manage, improve, staff, maintain or execute. The Aqua team will route your requirement to the relevant capability team."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Request a Proposal" }]}
      />

      <Section tone="warm" className="grain">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="rounded-[1.5rem] border border-line bg-white/60 p-6 sm:p-9">
              <ProposalForm
                services={services.map((s) => ({
                  slug: s.slug,
                  title: s.navTitle,
                }))}
                industries={industries.map((i) => ({
                  slug: i.slug,
                  title: i.title,
                }))}
              />
            </div>

            <aside className="flex flex-col gap-4 lg:pt-2">
              <Reveal>
                <div className="rounded-[1.5rem] border border-line bg-white/70 p-7">
                  <p className="kicker text-gold-deep">What happens next</p>
                  <ol className="mt-6 flex flex-col gap-5">
                    {[
                      {
                        title: "Routed to the right team",
                        body: "Your requirement goes to the capability team that owns it — facilities, workforce, manpower, O&M, infrastructure, security or technology.",
                      },
                      {
                        title: "Scoping conversation",
                        body: "We ask about the site, shift pattern, area classification and constraints before proposing anything.",
                      },
                      {
                        title: "Proposal",
                        body: "A manpower plan, process, equipment set and supervision structure built around your operation.",
                      },
                    ].map((step, i) => (
                      <li key={step.title} className="flex gap-4">
                        <IndexBadge value={i + 1} />
                        <div>
                          <p className="text-[0.9375rem] font-semibold text-charcoal">
                            {step.title}
                          </p>
                          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={90}>
                <div className="rounded-[1.5rem] border border-line bg-charcoal p-7 text-warm">
                  <p className="kicker text-gold-soft">Prefer to talk</p>
                  <p className="mt-5 text-[0.875rem] leading-relaxed text-warm/65">
                    For tenders and time-bound RFPs, call the business development
                    desk directly.
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      data-analytics="phone_click"
                      className="text-[0.9375rem] font-semibold text-warm transition-colors hover:text-gold-soft"
                    >
                      {site.phone}
                    </a>
                    <a
                      href={`mailto:${site.email}`}
                      data-analytics="email_click"
                      className="text-[0.9375rem] text-warm/75 transition-colors hover:text-gold-soft"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <p className="px-1 text-[0.75rem] leading-relaxed text-muted/80">
                  Details submitted here are stored against a reference ID and
                  used only to respond to your requirement. See our{" "}
                  <a
                    href="/privacy-policy"
                    className="font-medium text-brown underline underline-offset-2"
                  >
                    privacy policy
                  </a>
                  .
                </p>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
