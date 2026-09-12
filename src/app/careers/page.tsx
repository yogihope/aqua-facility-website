import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { CareersBoard } from "@/components/sections/CareersBoard";
import { FeaturedVacancy } from "@/components/sections/FeaturedVacancy";
import { EmployeeDevelopment } from "@/components/sections/EmployeeDevelopment";
import { AwardHighlight } from "@/components/sections/AwardHighlight";
import { SectionHeading, JsonLd } from "@/components/ui/Bits";
import { getJobs, getAwards } from "@/lib/data";
import { getFeaturedJob } from "@/content/careers";
import { site } from "@/content/site";
import { buildMetadata, breadcrumbSchema, jobPostingSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers at Aqua | Build the Operations That Keep India Moving",
  description:
    "Current vacancies across facility management, accounts, administration, technical operations, production support and supervision — at a Gujarat State Best Employer Brand Award 2026 organisation.",
  path: "/careers",
});

export const revalidate = 1800;

export default async function CareersPage() {
  const [jobs, awards] = await Promise.all([getJobs(), getAwards()]);
  const featured = getFeaturedJob(jobs);
  const postedAt = new Date().toISOString().slice(0, 10);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
          ]),
          // 6.34 — JobPosting structured data for every published role.
          ...jobs.map((job) =>
            jobPostingSchema({
              title: job.title,
              description: job.description,
              location: job.location,
              employmentType: job.employmentType,
              company: job.company,
              postedAt,
            })
          ),
        ]}
      />

      <PageHero
        kicker="Careers"
        title="Build the Operations That Keep India Moving."
        intro="Aqua creates opportunities across facility management, accounts and administration, technical operations, production support, supervision and corporate functions."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Careers" }]}
        meta={[
          { label: "Open roles", value: String(jobs.length) },
          { label: "Categories", value: "Corporate · Technical · Workforce" },
          { label: "Group companies", value: "Six" },
          { label: "Recognition", value: "Best Employer Brand 2026" },
        ]}
      />

      <Section tone="warm" className="grain">
        <Container>
          {featured ? (
            <div className="mb-14">
              <FeaturedVacancy job={featured} />
            </div>
          ) : null}

          <SectionHeading
            kicker="Current vacancies"
            title={
              <>
                Every role we are{" "}
                <span className="italic text-brown">hiring for now.</span>
              </>
            }
            body={`Filter by category, location, group company or skill. Applications reach HR at ${site.careersEmail}; roles recruited directly list their own inbox.`}
          />

          <div className="mt-12">
            <CareersBoard jobs={jobs} />
          </div>
        </Container>
      </Section>

      <EmployeeDevelopment />

      <AwardHighlight awards={awards} />

      <CtaBand
        kicker="Apply"
        title="Send your details and we will match you to a role."
        body={`Apply against a specific vacancy, or send an open application and we will keep it on file. You can also email your CV to ${site.careersEmail}.`}
        primary={{ label: "Apply now", href: "/careers/apply" }}
        secondary={{ label: "Contact HR", href: "/contact" }}
      />
    </>
  );
}
