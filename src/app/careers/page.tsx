import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { CareersBoard } from "@/components/sections/CareersBoard";
import { SectionHeading, JsonLd } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { getJobs } from "@/lib/data";
import { buildMetadata, breadcrumbSchema, jobPostingSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers at Aqua | Build the Operations That Keep India Moving",
  description:
    "Opportunities across facility management, administration, technical operations, production support, supervision and corporate functions.",
  path: "/careers",
});

export const revalidate = 1800;

export default async function CareersPage() {
  const jobs = await getJobs();
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
        intro="Aqua creates opportunities across facility management, administration, technical operations, production support, supervision and corporate functions."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Careers" }]}
        meta={[
          { label: "Open roles", value: String(jobs.length) },
          { label: "Categories", value: "Corporate · Technical · Workforce" },
          { label: "Group companies", value: "Six" },
          { label: "Locations", value: "Multiple sites" },
        ]}
      />

      <Section tone="warm" className="grain">
        <Container>
          <CareersBoard jobs={jobs} />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker="Working at Aqua"
            title={
              <>
                Operations work,{" "}
                <span className="italic text-brown">done properly.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Induction before deployment",
                body: "Safety orientation and role induction happen before the first shift, not during it.",
              },
              {
                title: "Structured supervision",
                body: "Every site has a supervision layer, an escalation route and a review cadence.",
              },
              {
                title: "Documented employment",
                body: "Onboarding, attendance, payroll and statutory documentation are part of the process.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="h-full rounded-[1.5rem] border border-line bg-white/70 p-7">
                  <h3 className="h3 text-[1.0625rem] text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="Apply"
        title="Send your details and we will match you to a role."
        body="Application handling, CV upload and the HR recipient workflow are configured before launch. Until then, share your requirement and our team will respond."
        primary={{ label: "Apply now", href: "/careers/apply" }}
        secondary={{ label: "Contact HR", href: "/contact" }}
      />
    </>
  );
}
