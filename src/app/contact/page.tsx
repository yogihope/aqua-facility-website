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

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  WhatsApp
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {site.whatsapp.map((w) => (
                    <a
                      key={w.number}
                      href={`https://wa.me/${w.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-analytics="whatsapp_click"
                      className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-white/70 px-3.5 py-2.5 text-[0.875rem] font-medium text-charcoal transition-colors hover:border-gold hover:text-brown"
                    >
                      <WhatsAppIcon />
                      {w.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white/70">
              <iframe
                title={`${site.legalName} on Google Maps`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
              <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
                <p className="text-[0.8125rem] text-muted">
                  {site.addressLine1}, {cityLine()}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics="directions_click"
                  className="shrink-0 text-[0.8125rem] font-semibold text-brown transition-colors hover:text-gold-deep"
                >
                  Get directions
                </a>
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

/** WhatsApp glyph, drawn inline so no icon package is needed. */
function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-[#25D366]"
      fill="currentColor"
    >
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.05h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.23 8.24Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.17 1.72 2.62 4.16 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3Z" />
    </svg>
  );
}
