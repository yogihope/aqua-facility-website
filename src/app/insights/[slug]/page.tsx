import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs, JsonLd, Chip, SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { CtaLink, TextLink, Arrow } from "@/components/ui/Button";
import { getInsights, getInsightBySlug, getServiceBySlug } from "@/lib/data";
import { buildMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import type { InsightContent } from "@/content/types";

export const revalidate = 1800;

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return {};
  return buildMetadata({
    title: insight.seoTitle,
    description: insight.seoDescription,
    path: `/insights/${insight.slug}`,
    type: "article",
    publishedTime: insight.publishedAt,
    ...(insight.heroImage
      ? { image: { path: insight.heroImage, alt: insight.title } }
      : {}),
  });
}

/**
 * Article template — Section 6.35. Two columns on desktop: the article at a
 * readable measure, and a sticky sidebar with the outline, suggested reading
 * and a contact prompt. On mobile the sidebar stacks under the article.
 */
export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const [insight, all] = await Promise.all([getInsightBySlug(slug), getInsights()]);

  if (!insight) notFound();

  const service = insight.serviceSlug
    ? await getServiceBySlug(insight.serviceSlug)
    : undefined;

  // Same-category posts first, then the latest of the rest.
  const others = all.filter((i) => i.slug !== insight.slug);
  const ordered = [
    ...others.filter((i) => i.category === insight.category),
    ...others.filter((i) => i.category !== insight.category),
  ];
  const suggested = ordered.slice(0, 4);
  const more = ordered.slice(4, 7).length === 3 ? ordered.slice(4, 7) : others.slice(0, 3);

  const outline = insight.body
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.startsWith("## "))
    .map((b) => ({ id: anchorId(b.slice(3)), title: b.slice(3) }));

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: insight.title,
            description: insight.seoDescription,
            path: `/insights/${insight.slug}`,
            publishedAt: insight.publishedAt,
            author: insight.author,
            image: insight.heroImage,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: insight.title, path: `/insights/${insight.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="grain relative overflow-hidden bg-warm pt-[100px] lg:pt-[124px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[8%] -top-[10%] h-[30rem] w-[30rem] rounded-full bg-sand/50 blur-[130px]"
          />
          <Container className="relative">
            <div className="py-10 sm:py-14">
              <Breadcrumbs
                items={[
                  { name: "Home", href: "/" },
                  { name: "Insights", href: "/insights" },
                  { name: insight.title },
                ]}
              />

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Chip tone="gold">{insight.category}</Chip>
                <span className="text-[0.75rem] text-muted">
                  {formatDate(insight.publishedAt)} · {insight.readMinutes} min read
                </span>
              </div>

              <h1 className="mt-6 max-w-[58rem] font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
                {insight.title}
              </h1>

              <p className="lede mt-6 max-w-[46rem]">{insight.excerpt}</p>

              <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full bg-brown font-display text-[0.9375rem] text-warm"
                >
                  A
                </span>
                <span className="text-[0.8125rem] leading-tight">
                  <span className="block font-semibold text-charcoal">{insight.author}</span>
                  <span className="text-muted">Aqua Facility Services</span>
                </span>
              </div>
            </div>
          </Container>
        </header>

        <Section tone="warm" className="!pt-0">
          <Container>
            {insight.heroImage ? (
              <figure className="relative mb-14 aspect-[1735/906] overflow-hidden rounded-[1.5rem] border border-line bg-charcoal shadow-[0_34px_60px_-42px_rgba(44,39,35,0.55)]">
                <Image
                  src={insight.heroImage}
                  alt={insight.title}
                  fill
                  priority
                  sizes="(min-width: 1280px) 76rem, 94vw"
                  className="object-cover"
                />
              </figure>
            ) : null}

            <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
              <div className="min-w-0">
                <div className="prose-aqua">{renderBody(insight.body)}</div>

                {service ? (
                  <div className="mt-14 max-w-[46rem] rounded-[1.5rem] border border-line bg-white/70 p-7">
                    <p className="kicker text-gold-deep">Related capability</p>
                    <p className="mt-3 font-display text-[1.375rem] text-charcoal">
                      {service.title}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                      {service.outcomeLine}
                    </p>
                    <TextLink href={`/services/${service.slug}`} className="mt-5">
                      Explore capability
                    </TextLink>
                  </div>
                ) : null}

                <div className="mt-10 flex max-w-[46rem] flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                  <Link
                    href="/insights"
                    className="text-[0.875rem] font-semibold text-brown transition-colors hover:text-gold-deep"
                  >
                    ← All insights
                  </Link>
                  <span className="text-[0.75rem] text-muted">
                    Published {formatDate(insight.publishedAt)}
                  </span>
                </div>
              </div>

              <aside className="flex flex-col gap-5">
                  {suggested.length ? (
                    <div className="rounded-[1.25rem] border border-line bg-white/70 p-6">
                      <p className="kicker text-gold-deep">Suggested reading</p>
                      <ul className="mt-4 divide-y divide-line">
                        {suggested.map((s) => (
                          <li key={s.slug}>
                            <SidebarCard insight={s} />
                          </li>
                        ))}
                      </ul>
                      <TextLink href="/insights" className="mt-4 text-[0.875rem]">
                        View all insights
                      </TextLink>
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-5 lg:sticky lg:top-28">
                  {outline.length > 1 ? (
                    <nav
                      aria-label="In this article"
                      className="hidden rounded-[1.25rem] border border-line bg-white/70 p-6 lg:block"
                    >
                      <p className="kicker text-gold-deep">In this article</p>
                      <ol className="mt-4 space-y-2.5">
                        {outline.map((h, i) => (
                          <li key={h.id} className="flex gap-3 text-[0.875rem] leading-snug">
                            <span className="w-5 shrink-0 font-semibold tabular-nums text-gold-deep">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <a
                              href={`#${h.id}`}
                              className="text-charcoal/80 transition-colors hover:text-brown"
                            >
                              {h.title}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  ) : null}

                  <div className="relative overflow-hidden rounded-[1.25rem] bg-charcoal p-6 text-warm">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(199,154,35,0.28),transparent_60%)]"
                    />
                    <div className="relative">
                      <p className="kicker text-gold-soft">Need this on your site?</p>
                      <p className="mt-3 font-display text-[1.25rem] leading-snug">
                        Talk to the team that runs it every day.
                      </p>
                      <CtaLink href="/contact" variant="onDark" className="mt-5">
                        Discuss Your Requirement
                      </CtaLink>
                    </div>
                  </div>
                  </div>
              </aside>
            </div>
          </Container>
        </Section>
      </article>

      {more.length ? (
        <Section tone="sand">
          <Container>
            <SectionHeading
              kicker="Keep reading"
              title={
                <>
                  More from <span className="italic text-brown">the field.</span>
                </>
              }
              action={<TextLink href="/insights">All insights</TextLink>}
            />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {more.map((other, i) => (
                <Reveal key={other.slug} delay={i * 70}>
                  <Link
                    href={`/insights/${other.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white"
                  >
                    <Thumb insight={other} className="aspect-[1735/906]" sizes="(min-width: 768px) 24rem, 92vw" />
                    <span className="flex flex-1 flex-col p-6">
                      <span className="flex items-center gap-3">
                        <Chip>{other.category}</Chip>
                        <span className="text-[0.75rem] text-muted">
                          {other.readMinutes} min read
                        </span>
                      </span>
                      <span className="h3 mt-4 block text-[1rem] leading-snug text-charcoal transition-colors group-hover:text-brown">
                        {other.title}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.8125rem] font-semibold text-brown">
                        Read
                        <Arrow className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        kicker="Next step"
        title="Apply this to your own operation."
        body="Share the site and the constraint you are working against, and we will tell you what we would actually do."
        primary={{ label: "Discuss Your Requirement", href: "/contact" }}
        secondary={{ label: "Request a Proposal", href: "/request-proposal" }}
      />
    </>
  );
}

function SidebarCard({ insight }: { insight: InsightContent }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex gap-4 py-4 first:pt-0"
    >
      <Thumb
        insight={insight}
        className="aspect-[4/3] w-24 shrink-0 rounded-lg"
        sizes="96px"
      />
      <span className="min-w-0">
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-gold-deep">
          {insight.category}
        </span>
        <span className="mt-1 line-clamp-3 block text-[0.875rem] font-semibold leading-snug text-charcoal transition-colors group-hover:text-brown">
          {insight.title}
        </span>
        <span className="mt-1.5 block text-[0.75rem] text-muted">
          {formatDate(insight.publishedAt)}
        </span>
      </span>
    </Link>
  );
}

/** Featured image, or a branded placeholder for posts without one. */
function Thumb({
  insight,
  className,
  sizes,
}: {
  insight: InsightContent;
  className?: string;
  sizes: string;
}) {
  return (
    <span className={`relative block overflow-hidden bg-charcoal ${className ?? ""}`}>
      {insight.heroImage ? (
        <Image
          src={insight.heroImage}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(199,154,35,0.35),transparent_62%)]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center font-display text-[1.5rem] text-gold-soft/80"
          >
            A
          </span>
        </>
      )}
    </span>
  );
}

function anchorId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Minimal Markdown rendering for the article body.
 *
 * Deliberately not a Markdown-to-HTML pipeline: Section 14.3 requires rich text
 * to be rendered safely, and building React elements from a small, known set of
 * block types keeps `dangerouslySetInnerHTML` out of the article path entirely.
 * If editors need richer formatting later, swap this for a sanitised renderer.
 */
function renderBody(body: string) {
  const blocks = body.split(/\n{2,}/);

  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      const title = trimmed.slice(3);
      return (
        <h2 key={i} id={anchorId(title)} className="scroll-mt-28">
          {title}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return <h3 key={i}>{trimmed.slice(4)}</h3>;
    }

    return <p key={i}>{renderInline(trimmed)}</p>;
  });
}

/** Supports **bold** only — everything else renders as plain text. */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}
