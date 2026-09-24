import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProposalForm } from "@/components/forms/ProposalForm";
import { JsonLd } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { getServices, getIndustries } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { site, cityLine } from "@/content/site";

export const metadata = buildMetadata({
  title: "Contact Aqua | Let's Talk About Your Operation",
  description:
    "Tell us what you need to manage, improve, staff, maintain or execute. The Aqua team will route your requirement to the relevant capability team.",
  path: "/contact",
});

export default async function ContactPage() {
  const [services, industries] = await Promise.all([
    getServices(),
    getIndustries(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        kicker="Contact"
        title="Let's Talk About Your Operation."
        intro="Tell us what you need to manage, improve, staff, maintain or execute. The Aqua team will route your requirement to the relevant capability team."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        aside={
          <div className="flex flex-col gap-4">
            <div className="rounded-[1.5rem] border border-line bg-white/70 p-7">
              <p className="kicker text-gold-deep">Corporate office</p>
              <address className="mt-5 flex flex-col gap-1 text-[0.9375rem] not-italic leading-relaxed text-charcoal/85">
                <span className="font-semibold">{site.legalName}</span>
                <span>{site.addressLine1}</span>
                {site.addressLine2 ? <span>{site.addressLine2}</span> : null}
                <span>
                  {cityLine()}
                </span>
                <span>{site.country}</span>
              </address>

              <div className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  data-analytics="phone_click"
                  className="text-[0.9375rem] font-semibold text-brown transition-colors hover:text-gold-deep"
                >
                  {site.phone}
                </a>
                {site.altPhone ? (
                  <a
                    href={`tel:${site.altPhone.replace(/\s/g, "")}`}
                    data-analytics="phone_click"
                    className="text-[0.9375rem] font-semibold text-brown transition-colors hover:text-gold-deep"
                  >
                    {site.altPhone}
                  </a>
                ) : null}
                <a
                  href={`mailto:${site.email}`}
                  data-analytics="email_click"
                  className="text-[0.9375rem] text-charcoal/80 transition-colors hover:text-brown"
                >
                  {site.email}
                </a>
                <a
                  href={`mailto:${site.operationsEmail}`}
                  data-analytics="email_click"
                  className="text-[0.9375rem] text-charcoal/80 transition-colors hover:text-brown"
                >
                  {site.operationsEmail} (operations)
                </a>
                {site.careersEmail ? (
                  <a
                    href={`mailto:${site.careersEmail}`}
                    data-analytics="email_click"
                    className="text-[0.9375rem] text-charcoal/80 transition-colors hover:text-brown"
                  >
                    {site.careersEmail} (careers)
                  </a>
                ) : null}
              </div>
            </div>

          </div>
        }
      />

      <Section tone="warm" className="grain">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="rounded-[1.5rem] border border-line bg-white/60 p-6 sm:p-9">
              <h2 className="h3 text-charcoal">Send an enquiry</h2>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                For a formal proposal or tender response, use the{" "}
                <a
                  href="/request-proposal"
                  className="font-medium text-brown underline underline-offset-2"
                >
                  Request a Proposal
                </a>{" "}
                form instead.
              </p>
              <div className="mt-8">
                <ProposalForm
                  variant="contact"
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
            </div>

            <aside className="flex flex-col gap-4 lg:pt-2">
              <Reveal>
                <div className="rounded-[1.5rem] border border-line bg-charcoal p-7 text-warm">
                  <p className="kicker text-gold-soft">Where your enquiry goes</p>
                  <ul className="mt-6 flex flex-col divide-y divide-warm/10">
                    {[
                      ["Integrated Facility Management", "Facility / Operations BD"],
                      ["HR & Workforce", "HR / Workforce BD"],
                      ["Production Manpower", "Industrial manpower team"],
                      ["Industrial O&M", "Technical / O&M team"],
                      ["Railway & Infrastructure", "Infrastructure / Projects"],
                      ["Security", "Aqua Shield Security"],
                      ["Technology", "Technology / ERP team"],
                    ].map(([need, team]) => (
                      <li
                        key={need}
                        className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <span className="text-[0.8125rem] text-warm/75">
                          {need}
                        </span>
                        <span className="shrink-0 text-[0.75rem] text-gold-soft/80">
                          {team}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={90}>
                <div className="rounded-[1.5rem] border border-line bg-white/70 p-7">
                  <p className="kicker text-gold-deep">Operating locations</p>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
                    PAN-India presence, run from the Ahmedabad head office.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
