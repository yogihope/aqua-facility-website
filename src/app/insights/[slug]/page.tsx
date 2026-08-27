import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs, JsonLd, Chip, SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink, Arrow } from "@/components/ui/Button";
import { getInsights, getInsightBySlug, getServiceBySlug } from "@/lib/data";
import { buildMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

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
  });
}

/** Article template — Section 6.35, 700–900px measure. */
export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const [insight, all] = await Promise.all([getInsightBySlug(slug), getInsights()]);

  if (!insight) notFound();

  const service = insight.serviceSlug
    ? await getServiceBySlug(insight.serviceSlug)
    : undefined;
  const related = all.filter((i) => i.slug !== insight.slug).slice(0, 3);

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
            <div className="mx-auto max-w-[46rem] py-12 sm:py-16">
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

              <h1 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
                {insight.title}
              </h1>

              <p className="lede mt-6">{insight.excerpt}</p>

              <p className="mt-8 border-t border-line pt-5 text-[0.8125rem] text-muted">
                {insight.author}
              </p>
            </div>
          </Container>
        </header>

        <Section tone="warm" className="!pt-0">
          <Container>
            <div className="prose-aqua mx-auto">
              {renderBody(insight.body)}
            </div>

            {service ? (
              <div className="mx-auto mt-16 max-w-[46rem]">
                <div className="flex flex-col gap-5 rounded-[1.5rem] border border-line bg-white/70 p-7 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="kicker text-gold-deep">Related capability</p>
                    <p className="mt-3 font-display text-[1.25rem] text-charcoal">
                      {service.title}
                    </p>
                  </div>
                  <TextLink href={`/services/${service.slug}`}>
                    Explore capability
                  </TextLink>
                </div>
              </div>
            ) : null}
          </Container>
        </Section>
      </article>

      {related.length ? (
        <Section tone="sand">
          <Container>
            <SectionHeading
              kicker="Related insights"
              title={
                <>
                  More from{" "}
                  <span className="italic text-brown">the field.</span>
                </>
              }
              action={<TextLink href="/insights">All insights</TextLink>}
            />
            <div className="mt-12 grid gap-3 md:grid-cols-3">
              {related.map((other, i) => (
                <Reveal key={other.slug} delay={i * 70}>
                  <Link
                    href={`/insights/${other.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white"
                  >
                    <Chip>{other.category}</Chip>
                    <span className="h3 mt-4 block text-[1rem] leading-snug text-charcoal transition-colors group-hover:text-brown">
                      {other.title}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.8125rem] font-semibold text-brown">
                      Read
                      <Arrow className="h-3.5 w-3.5" />
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
      return <h2 key={i}>{trimmed.slice(3)}</h2>;
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
