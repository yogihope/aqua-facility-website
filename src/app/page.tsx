import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ClientList } from "@/components/sections/ClientList";
import { AboutAqua } from "@/components/sections/AboutAqua";
import { Repositioning } from "@/components/sections/Repositioning";
import { ServiceBento } from "@/components/sections/ServiceBento";
import { IndustriesRail } from "@/components/sections/IndustriesRail";
import { PptpStory } from "@/components/sections/PptpStory";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { GroupEcosystem } from "@/components/sections/GroupEcosystem";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { Assurance } from "@/components/sections/Assurance";
import { AwardHighlight } from "@/components/sections/AwardHighlight";
import { CtaBand } from "@/components/sections/CtaBand";

import {
  getServices,
  getIndustries,
  getGroupCompanies,
  getCaseStudies,
  getTechCapabilities,
  getAwards,
} from "@/lib/data";
import { home } from "@/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Aqua Facility Services | Integrated Facility, Manpower & Infrastructure Solutions",
  description:
    "Aqua delivers integrated facility management, workforce solutions, industrial O&M, railway and infrastructure support with 30+ years of operational expertise since 1996.",
  path: "/",
});

/** 9.2 — evergreen marketing content is statically generated and revalidated. */
export const revalidate = 3600;

export default async function HomePage() {
  const [services, industries, group, caseStudies, tech, awards] =
    await Promise.all([
      getServices(),
      getIndustries(),
      getGroupCompanies(),
      getCaseStudies(),
      getTechCapabilities(),
      getAwards(),
    ]);

  return (
    <>
      {/* 1 */} <Hero />
      {/* 2 */} <TrustStrip />
      {/* 2a */} <ClientList />
      {/* 2b */} <AboutAqua />
      {/* 3 + 5 */} <Repositioning />
      {/* 4 */} <ServiceBento services={services} />
      {/* 6 */} <IndustriesRail industries={industries} />
      {/* 7 */} <PptpStory />
      {/* 8 */} <TechnologySection capabilities={tech} />
      {/* 9 */} <GroupEcosystem companies={group} />
      {/* 10 */} <CaseStudiesSection caseStudies={caseStudies} />
      {/* 10b */} <AwardHighlight awards={awards} />
      {/* 11 */} <Assurance />
      {/* 12 */}
      <CtaBand
        kicker="Partner with Aqua"
        title={home.finalCta.h2}
        body={home.finalCta.body}
        primary={home.finalCta.primary}
        secondary={home.finalCta.secondary}
      />
    </>
  );
}
