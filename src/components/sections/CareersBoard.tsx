"use client";

import { useMemo, useState } from "react";
import { Chip } from "@/components/ui/Bits";
import { CtaLink } from "@/components/ui/Button";
import type { JobContent } from "@/content/types";
import { cn } from "@/lib/utils";

const TABS = ["All", "Corporate", "Technical & Supervisory", "Workforce"] as const;
type Tab = (typeof TABS)[number];

/**
 * Section 6.34 — tabs by category plus location, company and skill filters.
 * Filter state is intentionally local: these are ephemeral browsing controls,
 * and the spec asks for URL-state only "where appropriate". Each job card links
 * to a shareable anchor so a specific role can still be sent to someone.
 */
export function CareersBoard({ jobs }: { jobs: JobContent[] }) {
  const [tab, setTab] = useState<Tab>("All");
  const [location, setLocation] = useState("All");
  const [company, setCompany] = useState("All");
  const [skill, setSkill] = useState("All");

  const locations = useMemo(
    () => ["All", ...new Set(jobs.map((j) => j.location))],
    [jobs]
  );
  const companies = useMemo(
    () => ["All", ...new Set(jobs.map((j) => j.company))],
    [jobs]
  );
  const skills = useMemo(
    () => ["All", ...new Set(jobs.map((j) => j.skill))],
    [jobs]
  );

  const filtered = jobs.filter(
    (job) =>
      (tab === "All" || job.category === tab) &&
      (location === "All" || job.location === location) &&
      (company === "All" || job.company === company) &&
      (skill === "All" || job.skill === skill)
  );

  const counts = Object.fromEntries(
    TABS.map((t) => [
      t,
      t === "All" ? jobs.length : jobs.filter((j) => j.category === t).length,
    ])
  );

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Job categories"
        className="flex flex-wrap gap-2 border-b border-line pb-4"
      >
        {TABS.map((item) => (
          <button
            key={item}
            role="tab"
            type="button"
            aria-selected={tab === item}
            onClick={() => setTab(item)}
            className={cn(
              "flex min-h-[44px] items-center gap-2 rounded-xl px-4 text-[0.875rem] font-semibold transition-colors duration-200",
              tab === item
                ? "bg-brown text-warm"
                : "border border-line-strong bg-white/60 text-muted hover:border-gold/45 hover:text-brown"
            )}
          >
            {item}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[0.6875rem] tabular-nums",
                tab === item ? "bg-warm/20 text-warm" : "bg-warm-deep text-muted"
              )}
            >
              {counts[item]}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Select
          label="Location"
          value={location}
          onChange={setLocation}
          options={locations}
        />
        <Select
          label="Company"
          value={company}
          onChange={setCompany}
          options={companies}
        />
        <Select label="Skill" value={skill} onChange={setSkill} options={skills} />
      </div>

      {/* Results */}
      <p className="mt-8 text-[0.8125rem] text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "opening" : "openings"}
      </p>

      <ul className="mt-4 flex flex-col gap-3">
        {filtered.map((job) => (
          <li key={job.slug} id={job.slug}>
            <article className="group rounded-[1.5rem] border border-line bg-white/70 p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold/40 hover:bg-white sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="h3 text-[1.0625rem] text-charcoal">
                      {job.title}
                    </h3>
                    <Chip tone="gold">{job.category}</Chip>
                  </div>

                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                    {job.description}
                  </p>

                  <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-2.5">
                    {[
                      ["Company", job.company],
                      ["Location", job.location],
                      ["Type", job.employmentType],
                      ["Experience", job.experience],
                      ["Skill", job.skill],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted/70">
                          {label}
                        </dt>
                        <dd className="mt-0.5 text-[0.8125rem] text-charcoal/85">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
                    {job.requirements.map((requirement) => (
                      <li
                        key={requirement}
                        className="flex items-start gap-2.5 text-[0.8125rem] text-charcoal/75"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0">
                  <CtaLink
                    href={`/careers/apply?job=${job.slug}`}
                    data-analytics="career_apply_click"
                    data-job-id={job.slug}
                    className="w-full sm:w-auto"
                  >
                    Apply
                  </CtaLink>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-[1.5rem] border border-dashed border-line-strong bg-white/50 p-10 text-center">
          <p className="font-display text-[1.25rem] text-charcoal">
            No openings match those filters.
          </p>
          <p className="mt-2 text-[0.875rem] text-muted">
            Clear a filter, or send your CV and we will keep it on file.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.75rem] font-semibold text-charcoal/80">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[48px] rounded-xl border border-line-strong bg-white/80 px-4 text-[0.875rem] text-charcoal transition-colors focus:border-gold focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
