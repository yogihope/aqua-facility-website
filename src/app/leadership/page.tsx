import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading, JsonLd, IndexBadge } from "@/components/ui/Bits";
import { CtaLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getLeaders, getAwards } from "@/lib/data";
import { chairmanMessage } from "@/content/leadership";
import { leadershipPage, roleMessages } from "@/content/leadershipMessages";
import { site, yearsOfExpertise } from "@/content/site";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { formatAwardDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Leadership Messages | The Thinking Behind the Work",
  description:
    "Aqua's leadership on how the organisation was built since 1996, the standards it holds to on site, careers inside the group and the direction ahead.",
  path: "/leadership",
});

export const revalidate = 3600;

/**
 * Section 6.2a — leadership messages.
 *
 * The chairman's line is his own words, supplied by management. The other
 * messages are signed by office rather than by an individual (Nirav, 2026-09-18),
 * so nothing is attributed to a named person who did not say it. Set `name` on
 * a message in `leadershipMessages.ts` once someone approves it as theirs.
 */
export default async function LeadershipPage() {
  const [leaders, awards] = await Promise.all([getLeaders(), getAwards()]);
  const chairman =
    leaders.find((l) => l.slug === chairmanMessage.attributionSlug) ?? leaders[0];
  const award = awards[0];
  const { history, principles, careers, future, closing } = leadershipPage;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leadership", path: "/leadership" },
        ])}
      />

      <PageHero
        kicker={leadershipPage.heroKicker}
        title={leadershipPage.heroTitle}
        intro={leadershipPage.heroIntro}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Leadership" }]}
        meta={[
          { label: "Since", value: String(site.foundingYear) },
          { label: "Experience", value: `${yearsOfExpertise()}+ years` },
          { label: "Group companies", value: "Five" },
          { label: "Coverage", value: "PAN-India capability" },
        ]}
      />

      {/* Chairman's message — the one quotation on this page */}
      <Section tone="dark">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <Reveal>
              <div className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-[1.5rem] border border-warm/15">
                <Portrait leader={chairman} />
              </div>
            </Reveal>

            <Reveal delay={90}>
              <figure>
                <p className="kicker text-gold-soft">{chairmanMessage.heading}</p>
                <svg
                  viewBox="0 0 32 24"
                  aria-hidden="true"
                  className="mt-8 h-6 w-8 text-gold/50"
                  fill="currentColor"
                >
                  <path d="M13 24V13.2C13 5.9 17.3.7 24.7 0l.9 3.6C21.2 4.6 19 7.4 19 11.3h4.6V24H13Zm-13 0V13.2C0 5.9 4.3.7 11.7 0l.9 3.6C8.2 4.6 6 7.4 6 11.3h4.6V24H0Z" />
                </svg>
                <blockquote className="mt-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] italic leading-[1.2] tracking-[-0.015em] text-warm">
                  {chairmanMessage.quote}
                </blockquote>
                <figcaption className="mt-9 border-t border-warm/15 pt-6">
                  <p className="text-[1rem] font-semibold text-warm">
                    {chairman?.name}
                  </p>
                  <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-warm/45">
                    {chairman?.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* History */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker={history.kicker}
            title={
              <>
                From one contract to{" "}
                <span className="italic text-brown">an operating group.</span>
              </>
            }
            body={history.body}
          />

          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {history.points.map((point, i) => (
              <Reveal key={point.title} delay={(i % 3) * 70}>
                <li className="h-full rounded-2xl border border-line bg-white/70 p-7">
                  <p className="font-display text-[0.9375rem] tabular-nums text-gold-deep/80">
                    {point.year}
                  </p>
                  <h3 className="h3 mt-4 text-[1.0625rem] text-charcoal">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {point.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Messages, signed by office */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker="Messages"
            title={
              <>
                From the people who{" "}
                <span className="italic text-brown">run each part of it.</span>
              </>
            }
            body="One operating philosophy, and the people accountable for each part of it — finance, operations, HR and IR, safety, technology, client relations and training."
          />

          <div className="mt-14 flex flex-col gap-4">
            {roleMessages.map((message, i) => (
              <Reveal key={message.slug} delay={(i % 2) * 70}>
                <article className="grid gap-7 rounded-[1.5rem] border border-line bg-white/75 p-7 sm:p-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
                  <div className="lg:border-r lg:border-line lg:pr-10">
                    <p className="kicker text-gold-deep">{message.kicker}</p>
                    <h3 className="h3 mt-5 text-charcoal">{message.title}</h3>
                    <div className="mt-6 flex items-center gap-4 border-t border-line pt-5">
                      {message.photoUrl ? (
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-warm-deep">
                          <Image
                            src={message.photoUrl}
                            alt={message.name ?? message.role}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.08] font-display text-[1.125rem] text-brown/70"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                      <span>
                        {message.name ? (
                          <span className="block text-[0.9375rem] font-semibold text-charcoal">
                            {message.name}
                          </span>
                        ) : null}
                        <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
                          {message.role}
                        </span>
                        <span className="mt-1 block text-[0.75rem] text-muted/80">
                          {site.legalName}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div>
                    {message.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-[1.0625rem] leading-relaxed text-muted [&+p]:mt-5"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section tone="sand">
        <Container>
          <SectionHeading
            kicker={principles.kicker}
            title={
              <>
                Five things leadership{" "}
                <span className="italic text-brown">does not negotiate.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 70}>
                <article className="h-full rounded-2xl border border-line bg-white/70 p-7">
                  <IndexBadge value={i + 1} />
                  <h3 className="h3 mt-5 text-[1.0625rem] text-charcoal">
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

      {/* Recognition + careers */}
      <Section tone="warm" className="grain">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading
                kicker={careers.kicker}
                title={
                  <>
                    A place where the work{" "}
                    <span className="italic text-brown">teaches you something.</span>
                  </>
                }
                body={careers.body}
              />
              <ul className="mt-9 flex flex-col gap-2.5">
                {careers.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[0.9375rem] text-charcoal/80"
                  >
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <CtaLink href={careers.cta.href}>{careers.cta.label}</CtaLink>
              </div>
            </div>

            {award ? (
              <Reveal delay={100}>
                <figure className="h-full overflow-hidden rounded-[1.5rem] border border-line bg-white/70">
                  {award.images[0] ? (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={award.images[0].src}
                        alt={award.images[0].alt}
                        fill
                        sizes="(min-width: 1024px) 34rem, 92vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <figcaption className="p-7">
                    <p className="kicker text-gold-deep">Recognition</p>
                    <p className="mt-4 font-display text-[1.125rem] leading-snug text-charcoal">
                      {award.title}
                    </p>
                    <p className="mt-2 text-[0.8125rem] text-muted">
                      {award.edition} · {formatAwardDate(award.awardedOn)} ·{" "}
                      {award.venue}, {award.city}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* The road ahead */}
      <Section tone="dark">
        <Container>
          <SectionHeading
            tone="dark"
            kicker={future.kicker}
            title={
              <>
                Where Aqua{" "}
                <span className="italic text-gold-soft">is heading.</span>
              </>
            }
            body={future.body}
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {future.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 80}>
                <article className="h-full rounded-2xl border border-warm/12 bg-warm/[0.04] p-7">
                  <h3 className="h3 text-[1.0625rem] text-warm">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-warm/65">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        kicker="Talk to us"
        title={closing.title}
        body={closing.body}
        primary={{ label: site.primaryCtaLabel, href: "/request-proposal" }}
        secondary={{ label: "Discuss Your Requirement", href: "/contact" }}
      />
    </>
  );
}

/** Portrait plate: photograph when supplied, monogram otherwise. */
function Portrait({ leader }: { leader?: { name: string; role: string; initials: string; photoUrl?: string } }) {
  if (!leader) return null;
  if (leader.photoUrl) {
    return (
      <div className="relative aspect-[4/5] w-full bg-warm-deep">
        <Image
          src={leader.photoUrl}
          alt={`${leader.name}, ${leader.role} of Aqua`}
          fill
          sizes="20rem"
          className="object-cover"
        />
      </div>
    );
  }
  return <Monogram initials={leader.initials} tone="dark" />;
}

function Monogram({ initials, tone }: { initials: string; tone: "light" | "dark" }) {
  return (
    <div
      className={
        tone === "dark"
          ? "flex aspect-[4/5] w-full items-center justify-center bg-warm/[0.06]"
          : "flex aspect-[4/5] w-full items-center justify-center bg-warm-deep"
      }
    >
      <span
        className={
          tone === "dark"
            ? "font-display text-[clamp(2.5rem,7vw,4rem)] text-gold-soft/70"
            : "font-display text-[clamp(2rem,6vw,3rem)] text-brown/60"
        }
      >
        {initials}
      </span>
    </div>
  );
}
