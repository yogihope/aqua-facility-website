import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { GroupEcosystem } from "@/components/sections/GroupEcosystem";
import { JsonLd, SectionHeading } from "@/components/ui/Bits";
import { getGroupCompanies } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aqua Group | Specialised Companies, One Operating Philosophy",
  description:
    "Aqua Group brings together specialised companies across facility management, workforce and employment services, business support, security and social impact.",
  path: "/group",
});

export const revalidate = 3600;

export default async function GroupPage() {
  const companies = await getGroupCompanies();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Aqua Group", path: "/group" },
        ])}
      />

      <PageHero
        kicker="Aqua Group"
        title="One Group. Specialised Capabilities. One Operating Philosophy."
        intro="Aqua Group brings together specialised companies across facility management, workforce and employment services, business support, security and social impact. Together, they enable clients to access wider operational capabilities through a trusted ecosystem."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Aqua Group" }]}
        meta={[
          { label: "Group companies", value: String(companies.length) },
          { label: "Flagship", value: "Aqua Facility Services" },
          { label: "Since", value: "1996" },
          { label: "Philosophy", value: "People. Process. Technology." },
        ]}
      />

      <GroupEcosystem companies={companies} />

      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker="Governance"
            title={
              <>
                What publishes, and{" "}
                <span className="italic text-brown">what waits.</span>
              </>
            }
            body="Each company holds its own scope, and the group shares one operating philosophy: trained people, standardised process, mechanised execution and technology-backed reporting."
          />
        </Container>
      </Section>

      <CtaBand
        kicker="Explore the group"
        title="Access wider capability through one relationship."
        body="Most clients begin with one company and extend into others as scope grows. Tell us what you need and we will route it to the right team."
        primary={{ label: "Request a Proposal", href: "/request-proposal" }}
        secondary={{ label: "Discuss Your Requirement", href: "/contact" }}
      />
    </>
  );
}
