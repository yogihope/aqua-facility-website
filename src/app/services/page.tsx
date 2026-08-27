import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceBento";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/Bits";
import { getServices } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services | Integrated Operational Capabilities",
  description:
    "Aqua combines facilities, workforce, engineering support, infrastructure execution and technology into solutions built around each client's site, industry and operating requirements.",
  path: "/services",
});

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHero
        kicker="Capabilities"
        title="One Operational Partner. Multiple Capabilities."
        intro="Aqua combines facilities, workforce, engineering support, infrastructure execution and technology into solutions built around each client's site, industry and operating requirements."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Services" }]}
        meta={[
          { label: "Capability pillars", value: "Six" },
          { label: "Operating since", value: "1996" },
          { label: "Coverage", value: "PAN-India capability" },
          { label: "Model", value: "Site-specific solutions" },
        ]}
      />

      <Section tone="warm" className="grain">
        <Container>
          {/* 6.10 — six immersive cards, each deep-linking to its service page */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal
                key={service.slug}
                delay={i * 70}
                className={i === 0 || i === services.length - 1 ? "lg:col-span-2" : ""}
              >
                <ServiceCard
                  service={service}
                  index={i + 1}
                  wide={i === 0 || i === services.length - 1}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="Build a solution"
        title="Tell us what the site needs to run."
        body="Most engagements start with one capability and grow. Share the scope, the site and the constraints, and Aqua will propose the operating structure around it."
        primary={{ label: "Request a Proposal", href: "/request-proposal" }}
        secondary={{ label: "Discuss Your Requirement", href: "/contact" }}
      />
    </>
  );
}
