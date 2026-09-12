import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { VerifyNote } from "@/components/ui/Bits";
import { buildMetadata } from "@/lib/seo";
import { site, cityLine } from "@/content/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Aqua Facility Services collects, uses, stores and protects the information submitted through this website.",
  path: "/privacy-policy",
});

/**
 * Section 6.38 — data collected, forms, analytics, cookies, retention, contact.
 * This is a factual description of what this website actually does. It is not
 * legal advice; Aqua's legal counsel must review and approve it before launch.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        intro="How Aqua Facility Services collects, uses, stores and protects information submitted through this website."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
      />

      <Section tone="warm" className="grain">
        <Container>
          <div className="mx-auto max-w-[46rem]">
            <VerifyNote className="mb-10">
              This policy describes the website&rsquo;s actual behaviour. Aqua&rsquo;s legal
              counsel must review and approve the final wording, retention
              periods and grievance contact before go-live.
            </VerifyNote>

            <div className="prose-aqua">
              <h2>Information we collect</h2>
              <p>
                We collect information you provide directly through the forms on
                this website. Depending on the form, this may include your name,
                company or organisation, designation, work email address, phone
                number, city or state, site or project location, the services you
                are interested in, your industry, an approximate workforce
                requirement, and the requirement summary you write.
              </p>
              <p>
                Career applications additionally collect your current location,
                skill or trade, experience and any message you include.
              </p>
              <p>
                We store the page you submitted from, campaign parameters present
                in the URL (UTM values), and the date and time of submission, so
                enquiries can be traced and routed correctly.
              </p>

              <h2>How we use it</h2>
              <p>
                Information submitted through the proposal and contact forms is
                used to respond to your enquiry and to route it to the relevant
                Aqua capability team. Career applications are used to assess
                suitability for current and future openings.
              </p>
              <p>
                Each submission is assigned a reference identifier that is shown
                to you on submission and used internally to track the enquiry.
              </p>

              <h2>Cookies and analytics</h2>
              <p>
                This website uses analytics to understand how visitors find and
                use the site. Analytics are configured to be consent-aware where
                required by the regulations applicable to your location, and
                internal and staging traffic is excluded from reporting.
              </p>
              <p>
                Where a cookie preference interface is presented, your choice
                determines which non-essential tracking runs.
              </p>

              <h2>Sharing</h2>
              <p>
                Enquiry details are shared internally within Aqua Group with the
                team responsible for the capability you asked about. We do not
                sell your information. Where a service provider processes data on
                our behalf, they are bound to use it only for that purpose.
              </p>

              <h2>Retention</h2>
              <p>
                Enquiries and applications are retained for as long as needed to
                respond to them and to maintain a record of the business
                relationship, subject to applicable legal and statutory
                requirements. Specific retention periods are confirmed by Aqua
                before launch.
              </p>

              <h2>Security</h2>
              <p>
                This website is served over HTTPS. Access to submitted enquiries
                is restricted to authorised Aqua personnel. Recipient email
                addresses are not exposed in the website&rsquo;s front-end code, and
                form submissions are validated and rate-limited on the server.
              </p>

              <h2>Your choices</h2>
              <p>
                You can ask us what information we hold about you, ask for it to
                be corrected, or ask us to delete it, subject to our legal and
                record-keeping obligations. Use the contact details below.
              </p>

              <h2>Contact</h2>
              <p>
                {site.legalName}
                <br />
                {site.addressLine1}
                {site.addressLine2 ? (
                  <>
                    <br />
                    {site.addressLine2}
                  </>
                ) : null}
                <br />
                {cityLine()}
                <br />
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <br />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
