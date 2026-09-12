import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { AwardGallery } from "@/components/sections/AwardGallery";
import { SectionHeading, JsonLd, Chip } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { getAwards } from "@/lib/data";
import { buildMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { formatAwardDate } from "@/lib/utils";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "Awards & Recognition | Aqua Facility Services",
  description:
    "Aqua Facility Services Pvt. Ltd. received The Gujarat State Best Employer Brand Awards 2026, presented on 11 August 2026 at Fairfield by Marriott, Ahmedabad, and endorsed by CHRO Asia.",
  path: "/awards",
});

export const revalidate = 3600;

export default async function AwardsPage() {
  const awards = await getAwards();

  // Nothing verified means nothing to publish — the page 404s rather than
  // rendering an empty "recognition" shell (Section 18 content-safety rule).
  if (awards.length === 0) notFound();

  const [lead] = awards;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Awards", path: "/awards" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Awards & Recognition",
            url: absoluteUrl("/awards"),
            about: {
              "@type": "Organization",
              name: site.legalName,
              award: awards.map((a) => `${a.title} (${a.edition})`),
            },
          },
        ]}
      />

      <PageHero
        kicker="Recognition"
        title="Recognised as an Employer, Not Only as a Contractor."
        intro="Aqua's people practices were assessed externally and recognised at the Gujarat State Best Employer Brand Awards 2026 — the same standards our clients rely on when our teams are deployed on their sites."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Awards" }]}
        meta={[
          { label: "Award", value: "Best Employer Brand 2026" },
          { label: "Edition", value: lead.edition },
          { label: "Presented", value: formatAwardDate(lead.awardedOn) },
          { label: "Location", value: lead.city },
        ]}
      />

      {awards.map((award, index) => (
        <div key={award.slug}>
          {/* Citation — transcribed from the certificate, not summarised. */}
          <Section tone={index % 2 === 0 ? "warm" : "sand"} className="grain">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
                <div>
                  <Reveal>
                    <Chip tone="gold">{award.edition}</Chip>
                  </Reveal>
                  <Reveal delay={60}>
                    <h2 className="h2 mt-6 text-charcoal">{award.title}</h2>
                  </Reveal>
                  <Reveal delay={120}>
                    <p className="lede mt-7">{award.summary}</p>
                  </Reveal>

                  <Reveal delay={180}>
                    <dl className="mt-10 divide-y divide-line border-y border-line">
                      {[
                        ["Presented to", award.presentedTo],
                        ["Date", formatAwardDate(award.awardedOn)],
                        ["Venue", `${award.venue}, ${award.city}`],
                        ["Presented by", award.presentedBy],
                        ["Endorsed by", award.endorsedBy],
                        ["Certified by", award.certifiedBy],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6"
                        >
                          <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted/75">
                            {label}
                          </dt>
                          <dd className="text-[0.9375rem] leading-relaxed text-charcoal">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                </div>

                <Reveal delay={140}>
                  <div className="rounded-[1.5rem] border border-line bg-white/70 p-7 sm:p-9">
                    <p className="kicker text-gold-deep">Assessed against</p>
                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                      The awarding body published the following parameters for
                      selection.
                    </p>
                    <ul className="mt-7 flex flex-col gap-3">
                      {award.criteria.map((criterion) => (
                        <li
                          key={criterion}
                          className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-charcoal/85"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold"
                          />
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>

          {/* Gallery */}
          <Section tone={index % 2 === 0 ? "sand" : "warm"}>
            <Container>
              <SectionHeading
                kicker="The ceremony"
                title={
                  <>
                    {award.venue},{" "}
                    <span className="italic text-brown">
                      {formatAwardDate(award.awardedOn)}.
                    </span>
                  </>
                }
                body="Select any image to view it full size."
              />
              <div className="mt-12">
                <AwardGallery images={award.images} />
              </div>
            </Container>
          </Section>
        </div>
      ))}

      <CtaBand
        kicker="Work with Aqua"
        title="The standard that won the award is the standard on your site."
        body="Trained before deployment, supervised on shift, documented on record. Tell us what your operation needs and we will build the deployment around it."
        primary={{ label: "Request a Proposal", href: "/request-proposal" }}
        secondary={{ label: "View Open Opportunities", href: "/careers" }}
      />
    </>
  );
}
