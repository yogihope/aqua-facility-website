import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { PptpStory } from "@/components/sections/PptpStory";
import { AboutAqua } from "@/components/sections/AboutAqua";
import { Leadership } from "@/components/sections/Leadership";
import { AwardHighlight } from "@/components/sections/AwardHighlight";
import { SectionHeading, JsonLd, VerifyNote, IndexBadge } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/home";
import { site, yearsOfExpertise } from "@/content/site";
import { getLeaders, getAwards } from "@/lib/data";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Aqua | 30+ Years of Building Trust Through Execution",
  description:
    "Founded in 1996, Aqua has evolved from a facility-services organisation into an integrated operational-services ecosystem supporting facilities, workforces, industries and infrastructure across India.",
  path: "/about",
});

export const revalidate = 3600;

export default async function AboutPage() {
  const [leaders, awards] = await Promise.all([getLeaders(), getAwards()]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        kicker={about.heroKicker}
        title={about.heroTitle}
        intro={about.intro}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        meta={[
          { label: "Founded", value: String(site.foundingYear) },
          { label: "Experience", value: `${yearsOfExpertise()}+ years` },
          { label: "Group companies", value: "Six" },
          { label: "Coverage", value: "PAN-India capability" },
        ]}
      />

      {/* Who we are */}
      <Section tone="warm" className="grain">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <p className="kicker text-gold-deep">Who we are</p>
              <h2 className="h2 mt-6 text-charcoal">
                An operational-services{" "}
                <span className="italic text-brown">organisation.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[1.0625rem] leading-relaxed text-muted">
                {about.whoWeAre}
              </p>
              <p className="mt-8 border-l-2 border-gold/50 pl-6 font-display text-[1.25rem] italic leading-snug text-brown">
                {site.masterMessage}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The organisation in eight facts */}
      <AboutAqua tone="sand" showLink={false} />

      {/* Timeline — horizontal on desktop, vertical on mobile (Section 7) */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="How Aqua evolved"
            title={
              <>
                From facility services to{" "}
                <span className="italic text-brown">
                  integrated operations.
                </span>
              </>
            }
            body="Each stage added capability without replacing the last. The result is one organisation that can take responsibility across facilities, workforce, plant assets and infrastructure."
          />

          <div className="mt-14">
            {/* Desktop: horizontal progressive reveal */}
            <ol className="hidden lg:grid lg:grid-cols-6 lg:gap-4">
              {about.timeline.map((entry, i) => (
                <Reveal key={entry.title} delay={i * 90} as="li">
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-gold bg-warm" />
                      <span className="h-px flex-1 bg-line" />
                    </div>
                    <p className="mt-5 font-display text-[1.125rem] text-brown">
                      {entry.year}
                    </p>
                    <p className="mt-2 text-[0.9375rem] font-semibold text-charcoal">
                      {entry.title}
                    </p>
                    <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">
                      {entry.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            {/* Mobile: vertical */}
            <ol className="flex flex-col lg:hidden">
              {about.timeline.map((entry, i) => (
                <Reveal key={entry.title} delay={i * 70} as="li">
                  <div className="relative flex gap-5 pb-9">
                    <div className="flex flex-col items-center">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-gold bg-warm" />
                      {i < about.timeline.length - 1 ? (
                        <span className="mt-1 w-px flex-1 bg-line" />
                      ) : null}
                    </div>
                    <div className="-mt-1 pb-1">
                      <p className="font-display text-[1.125rem] text-brown">
                        {entry.year}
                      </p>
                      <p className="mt-1 text-[0.9375rem] font-semibold text-charcoal">
                        {entry.title}
                      </p>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                        {entry.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Vision, mission, values */}
      <Section tone="sand">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-[1.5rem] border border-line bg-white/70 p-8 sm:p-10">
                <p className="kicker text-gold-deep">Vision</p>
                <p className="mt-6 font-display text-[clamp(1.25rem,2.1vw,1.625rem)] leading-snug text-charcoal">
                  {about.vision}
                </p>
              </article>
            </Reveal>
            <Reveal delay={90}>
              <article className="h-full rounded-[1.5rem] border border-line bg-charcoal p-8 text-warm sm:p-10">
                <p className="kicker text-gold-soft">Mission</p>
                <p className="mt-6 font-display text-[clamp(1.25rem,2.1vw,1.625rem)] leading-snug">
                  {about.mission}
                </p>
              </article>
            </Reveal>
          </div>

          <div className="mt-14">
            <SectionHeading
              kicker="Values"
              title={
                <>
                  What we hold to{" "}
                  <span className="italic text-brown">on site.</span>
                </>
              }
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {about.values.map((value, i) => (
                <Reveal key={value.title} delay={i * 70}>
                  <article className="h-full rounded-2xl border border-line bg-white/65 p-7">
                    <IndexBadge value={i + 1} />
                    <h3 className="h3 mt-5 text-[1.0625rem] text-charcoal">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {value.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* People. Process. Technology. Performance. */}
      <PptpStory />

      {/* Leadership — publishes on confirmed names and roles */}
      <Leadership leaders={leaders} />

      {/* Recognition */}
      <AwardHighlight awards={awards} />

      {/* Remaining credential modules — still gated on verification */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker="Credentials"
            title={
              <>
                Certifications{" "}
                <span className="italic text-brown">and coverage.</span>
              </>
            }
            body="These modules are built and ready. They publish when compliance supplies the certificate documents and operations confirms the operating-location list."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <PendingModule
                title="Certifications & compliance"
                body="Standard, certificate number, issuer and validity, with downloadable documents. Expired certifications hide automatically."
                owner="Compliance"
              />
            </Reveal>
            <Reveal delay={80}>
              <PendingModule
                title="PAN-India capability map"
                body="Actual operating states and locations only — no aspirational coverage."
                owner="Operations"
              />
            </Reveal>
          </div>

          <Reveal delay={200}>
            <VerifyNote className="mt-8 max-w-3xl">
              Content-safety rule from the specification: if a fact is not
              verified, the claim is removed rather than filled with an estimate.
              These sections stay hidden until Section 18 assets arrive.
            </VerifyNote>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        kicker="Work with Aqua"
        title="Understand the operation. Take responsibility for the outcome."
        body={about.closing}
        primary={{ label: "Request a Proposal", href: "/request-proposal" }}
        secondary={{ label: "Discuss Your Requirement", href: "/contact" }}
      />
    </>
  );
}

function PendingModule({
  title,
  body,
  owner,
}: {
  title: string;
  body: string;
  owner: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-dashed border-line-strong bg-white/45 p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="h3 text-[1.0625rem] text-charcoal">{title}</h3>
        <span className="shrink-0 rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-gold-deep">
          Awaiting assets
        </span>
      </div>
      <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">{body}</p>
      <p className="mt-auto pt-6 text-[0.75rem] text-muted/70">Owner: {owner}</p>
    </article>
  );
}
