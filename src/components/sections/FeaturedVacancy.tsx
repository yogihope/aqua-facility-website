import { Chip } from "@/components/ui/Bits";
import { CtaLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import type { JobContent } from "@/content/types";

/**
 * Headline vacancy, pinned above the board.
 *
 * A directly recruited role carries its own inbox (`applyEmail`); everything
 * else falls back to the site-wide careers address, so the two never have to be
 * kept in sync by hand.
 */
export function FeaturedVacancy({ job }: { job: JobContent }) {
  const inbox = job.applyEmail ?? site.careersEmail;

  return (
    <Reveal>
      <article className="relative overflow-hidden rounded-[1.75rem] border border-gold/35 bg-gradient-to-br from-sand-soft via-white/80 to-warm p-7 sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-[80px]"
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-brown px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-warm">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-gold-soft"
                />
                We&rsquo;re hiring
              </span>
              <Chip tone="gold">{job.category}</Chip>
            </div>

            <h3 className="h2 mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] text-charcoal">
              {job.title}
            </h3>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
              {job.description}
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-9 gap-y-3">
              {[
                ["Location", job.location],
                ["Experience", job.experience],
                ["Type", job.employmentType],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted/70">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-[0.875rem] font-medium text-charcoal">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-7 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
              {job.requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-charcoal/80"
                >
                  <CheckIcon />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-col gap-4 lg:w-64 lg:pt-2">
            <CtaLink
              href={`/careers/apply?job=${job.slug}`}
              data-analytics="career_apply_click"
              data-job-id={job.slug}
            >
              Apply now
            </CtaLink>
            <div className="rounded-xl border border-line bg-white/60 p-4">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted/70">
                Or send your CV to
              </p>
              <a
                href={`mailto:${inbox}?subject=${encodeURIComponent(
                  `Application — ${job.title} (${job.location})`
                )}`}
                data-analytics="email_click"
                className="mt-1.5 block break-all text-[0.875rem] font-semibold text-brown transition-colors hover:text-gold-deep"
              >
                {inbox}
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="mt-[3px] h-4 w-4 shrink-0 text-gold-deep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}
