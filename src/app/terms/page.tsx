import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { VerifyNote } from "@/components/ui/Bits";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms governing the use of the Aqua Facility Services website, including intellectual property, accuracy of information, external links and liability.",
  path: "/terms",
});

/** Section 6.38 — website usage, IP, accuracy, external links, liability. */
export default function TermsPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Terms of Use"
        intro="Terms governing the use of this website, its content and the enquiries submitted through it."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Terms" }]}
      />

      <Section tone="warm" className="grain">
        <Container>
          <div className="mx-auto max-w-[46rem]">
            <VerifyNote className="mb-10">
              Aqua&rsquo;s legal counsel must review and approve these terms, including
              the governing-law and jurisdiction clause, before go-live.
            </VerifyNote>

            <div className="prose-aqua">
              <h2>Use of this website</h2>
              <p>
                This website is provided for information about {site.legalName}{" "}
                and Aqua Group. By using it you agree to use it lawfully and not
                to interfere with its operation, security or availability.
              </p>

              <h2>Intellectual property</h2>
              <p>
                The content of this website, including text, design, graphics,
                logos and marks, belongs to {site.legalName} or its licensors and
                may not be reproduced, distributed or used commercially without
                written permission.
              </p>

              <h2>Accuracy of information</h2>
              <p>
                We take care to keep the information on this website accurate and
                current. Service descriptions, capabilities and credentials are
                indicative and do not constitute an offer or a contractual
                commitment. Specific scope, terms and deliverables are agreed in
                writing in the applicable service agreement.
              </p>
              <p>
                Where information on this page is marked as pending verification,
                it has not yet been confirmed and should not be relied upon.
              </p>

              <h2>Enquiries submitted through this site</h2>
              <p>
                Submitting an enquiry does not create a contractual relationship.
                Acknowledgement of an enquiry is confirmation of receipt only.
              </p>

              <h2>External links</h2>
              <p>
                This website may link to third-party sites. Those sites are not
                under our control and we are not responsible for their content,
                accuracy or practices.
              </p>

              <h2>Liability</h2>
              <p>
                To the extent permitted by applicable law, {site.legalName} is not
                liable for any loss or damage arising from the use of, or reliance
                on, this website or its content.
              </p>

              <h2>Changes</h2>
              <p>
                We may update these terms from time to time. The version published
                on this page applies to your use of the website.
              </p>

              <h2>Contact</h2>
              <p>
                {site.legalName}
                <br />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
