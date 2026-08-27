import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { GroupEcosystem } from "@/components/sections/GroupEcosystem";
import { JsonLd, VerifyNote, SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
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
  const pending = companies.filter((c) => !c.legalNameVerified);

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
            body="Group entity names, licences and service scopes are published only against documentary confirmation. Where confirmation is pending, the page says so rather than filling the space with an assumption."
          />

          {pending.length ? (
            <Reveal delay={100}>
              <VerifyNote className="mt-10 max-w-3xl">
                Pending management verification before go-live:{" "}
                {pending.map((c) => c.displayName).join(", ")}. Final legal entity
                names, brand structure, licence details (including PSARA where
                applicable) and exact service scopes must be confirmed — see
                Section 18 of the development specification.
              </VerifyNote>
            </Reveal>
          ) : null}
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
