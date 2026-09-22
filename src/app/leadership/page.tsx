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
import type { RoleMessage } from "@/content/leadershipMessages";
import type { LeaderContent } from "@/content/types";
import { site, yearsOfExpertise } from "@/content/site";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { formatAwardDate, cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Leadership Messages | The Thinking Behind the Work",
  description:
    "Aqua's leadership on how the organisation was built since 1996, the standards it holds to on site, careers inside the group and the direction ahead.",
  path: "/leadership",
});

export const revalidate = 3600;

/**
 * Section 6.2a — leadership.
 *
 * Photo-first layout (Nirav, 2026-09-22): the team portraits lead, then each
 * message runs as a wide editorial row with the portrait alongside it,
 * alternating sides. A message without a photograph keeps the same row shape
 * and uses a numbered plate, so the rhythm holds either way.
 *
 * The chairman's line is his own words, supplied by management. The other
 * messages are signed by office; a name appears only where that person has
 * approved the message as theirs.
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

      {/* The team */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="The team"
            title={
              <>
                The people accountable{" "}
                <span className="italic text-brown">for the work.</span>
              </>
            }
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, i) => (
              <Reveal key={leader.slug} delay={(i % 3) * 70}>
                <li className="group h-full overflow-hidden rounded-[1.5rem] border border-line bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                  <Portrait leader={leader} />
                  <div className="p-6">
                    <p className="h3 text-[1.0625rem] text-charcoal">
                      {leader.name}
                    </p>
                    <p className="mt-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                      {leader.role}
                    </p>
                    <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
                      {leader.summary}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Chairman's message — the one quotation on this page */}
      <Section tone="sand">
        <Container>
          <Reveal>
            <figure className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-white/75 px-7 py-12 text-center sm:px-14 sm:py-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-[90px]"
              />
              <p className="kicker justify-center text-gold-deep">
                {chairmanMessage.heading}
              </p>
              <blockquote className="relative mx-auto mt-8 max-w-4xl font-display text-[clamp(1.5rem,3.4vw,2.75rem)] italic leading-[1.18] tracking-[-0.015em] text-charcoal">
                &ldquo;{chairmanMessage.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-10 flex items-center justify-center gap-4">
                <PortraitCircle leader={chairman} />
                <span className="text-left">
                  <span className="block text-[0.9375rem] font-semibold text-charcoal">
                    {chairman?.name}
                  </span>
                  <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    {chairman?.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Messages — alternating editorial rows */}
      <Section tone="warm" className="grain">
        <Container>
          <SectionHeading
            kicker="Messages"
            title={
              <>
                Each part of the operation,{" "}
                <span className="italic text-brown">in its own words.</span>
              </>
            }
            body="Finance, operations, HR and IR, safety, technology, client relations and training — what each of them is accountable for."
          />

          <div className="mt-16 flex flex-col gap-16 sm:gap-24">
            {roleMessages.map((message, i) => (
              <MessageRow
                key={message.slug}
                message={message}
                index={i}
                flip={i % 2 === 1}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* History */}
      <Section tone="sand">
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

      {/* Principles */}
      <Section tone="warm" className="grain">
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

      {/* Careers + recognition */}
      <Section tone="sand">
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

/**
 * One message: portrait on one side, text on the other, sides alternating down
 * the page. Without a photograph the same column carries a numbered plate, so
 * rows keep their shape.
 */
function MessageRow({
  message,
  index,
  flip,
}: {
  message: RoleMessage;
  index: number;
  flip: boolean;
}) {
  return (
    <Reveal>
      <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={cn("order-1", flip ? "lg:order-2" : "lg:order-1")}>
          {message.photoUrl ? (
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-[1.75rem] border border-line bg-warm-deep lg:mx-0 lg:max-w-none">
              <Image
                src={message.photoUrl}
                alt={message.name ?? message.role}
                fill
                sizes="(min-width: 1024px) 34rem, 92vw"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[22rem] items-center justify-center overflow-hidden rounded-[1.75rem] border border-gold/20 bg-gradient-to-br from-warm-deep to-sand-soft lg:mx-0 lg:max-w-none">
              <span
                aria-hidden="true"
                className="font-display text-[clamp(4rem,12vw,7rem)] leading-none text-brown/15"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="absolute bottom-8 left-0 w-full px-8 text-center text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-brown/60">
                {message.role}
              </span>
            </div>
          )}
        </div>

        <div className={cn("order-2", flip ? "lg:order-1" : "lg:order-2")}>
          <p className="kicker text-gold-deep">{message.kicker}</p>
          <h3 className="h2 mt-6 text-[clamp(1.5rem,2.6vw,2.125rem)] text-charcoal">
            {message.title}
          </h3>
          <div className="mt-7">
            {message.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[1.0625rem] leading-relaxed text-muted [&+p]:mt-5"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 border-t border-line pt-6">
            {message.name ? (
              <p className="font-display text-[1.25rem] text-brown">
                {message.name}
              </p>
            ) : null}
            <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted">
              {message.role}
            </p>
            <p className="mt-1 text-[0.75rem] text-muted/75">{site.legalName}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** 4:5 plate for the team grid: photograph when supplied, monogram otherwise. */
function Portrait({ leader }: { leader: LeaderContent }) {
  if (leader.photoUrl) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-warm-deep">
        <Image
          src={leader.photoUrl}
          alt={`${leader.name}, ${leader.role} of Aqua`}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-warm-deep to-sand-soft">
      <span className="font-display text-[clamp(2.5rem,7vw,3.5rem)] text-brown/35">
        {leader.initials}
      </span>
    </div>
  );
}

/** Small circular portrait for the chairman's signature line. */
function PortraitCircle({ leader }: { leader?: LeaderContent }) {
  if (!leader) return null;
  if (leader.photoUrl) {
    return (
      <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full bg-warm-deep">
        <Image
          src={leader.photoUrl}
          alt={`${leader.name}, ${leader.role} of Aqua`}
          fill
          sizes="56px"
          className="object-cover object-top"
        />
      </span>
    );
  }
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.08] font-display text-[1rem] text-brown/70">
      {leader.initials}
    </span>
  );
}
