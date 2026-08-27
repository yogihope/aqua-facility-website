import { Suspense } from "react";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { JsonLd } from "@/components/ui/Bits";
import { getJobs } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Apply | Careers at Aqua",
  description:
    "Apply for a role at Aqua across facility management, technical operations, production support, supervision and corporate functions.",
  path: "/careers/apply",
});

export default async function ApplyPage() {
  const jobs = await getJobs();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: "Apply", path: "/careers/apply" },
        ])}
      />

      <PageHero
        kicker="Careers"
        title="Apply to Join Aqua."
        intro="Tell us who you are and what you do. If a role matches, our HR team will be in touch."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
          { name: "Apply" },
        ]}
      />

      <Section tone="warm" className="grain">
        <Container>
          <div className="max-w-3xl rounded-[1.5rem] border border-line bg-white/60 p-6 sm:p-9">
            {/* useSearchParams needs a Suspense boundary during prerender */}
            <Suspense
              fallback={
                <div className="h-96 animate-pulse rounded-xl bg-warm-deep/60" />
              }
            >
              <ApplicationForm
                jobs={jobs.map((j) => ({
                  slug: j.slug,
                  title: j.title,
                  location: j.location,
                }))}
              />
            </Suspense>
          </div>
        </Container>
      </Section>
    </>
  );
}
