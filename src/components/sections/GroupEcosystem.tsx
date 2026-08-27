"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { TextLink, Arrow } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import type { GroupCompanyContent } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Section 6.1 (9) — interactive ecosystem, six nodes around Aqua Group.
 * 7.1 rule: nothing lives behind hover alone. The orbital diagram is a
 * desktop enhancement; every company is also a full card in the list below,
 * which is what mobile and keyboard users read.
 */
export function GroupEcosystem({
  companies,
}: {
  companies: GroupCompanyContent[];
}) {
  const [active, setActive] = useState(0);
  const activeCompany = companies[active];

  return (
    <Section tone="warm" className="grain overflow-hidden">
      <Container>
        <SectionHeading
          kicker="Aqua Group"
          title={
            <>
              One group.{" "}
              <span className="italic text-brown">Specialised capabilities.</span>
            </>
          }
          body="Aqua Group brings together specialised companies across facility management, workforce and employment services, business support, security and social impact."
          action={<TextLink href="/group">Explore the Aqua Group</TextLink>}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Orbital diagram — decorative enhancement, hidden from AT */}
          <div
            aria-hidden="true"
            className="relative mx-auto hidden aspect-square w-full max-w-[26rem] lg:block"
          >
            <div className="absolute inset-[12%] rounded-full border border-line" />
            <div className="absolute inset-[26%] rounded-full border border-dashed border-gold/25" />

            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/30 bg-white shadow-[0_18px_40px_-24px_rgba(44,39,35,0.5)]">
              <span className="h-7 w-7">
                <LogoMark />
              </span>
              <span className="mt-1.5 text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Aqua Group
              </span>
            </div>

            {companies.map((company, i) => {
              const angle = (i / companies.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 42;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              const isActive = i === active;

              return (
                <div
                  key={company.slug}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full border text-center text-[0.5625rem] font-semibold leading-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "scale-110 border-brown bg-brown text-warm shadow-[0_16px_32px_-18px_rgba(139,74,51,0.9)]"
                        : "border-line-strong bg-white text-muted hover:border-gold"
                    )}
                  >
                    <span className="px-1.5">
                      {company.displayName.replace("Aqua ", "")}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Spokes */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              {companies.map((company, i) => {
                const angle = (i / companies.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <line
                    key={company.slug}
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(angle) * 34}
                    y2={50 + Math.sin(angle) * 34}
                    stroke={i === active ? "#C79A23" : "rgba(44,39,35,0.12)"}
                    strokeWidth="0.4"
                    className="transition-[stroke] duration-300"
                  />
                );
              })}
            </svg>
          </div>

          {/* Companies — the accessible, mobile-first version of the same data */}
          <ul className="flex flex-col gap-2.5">
            {companies.map((company, i) => (
              <li key={company.slug}>
                <Link
                  href={`/group/${company.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "group flex items-start gap-5 rounded-2xl border p-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-6",
                    activeCompany?.slug === company.slug
                      ? "border-gold/40 bg-white shadow-[0_16px_40px_-32px_rgba(44,39,35,0.6)]"
                      : "border-line bg-white/55 hover:border-gold/30 hover:bg-white"
                  )}
                >
                  <span className="mt-1 font-display text-[0.875rem] tabular-nums text-gold-deep/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2.5">
                      <span className="h3 text-[1.0625rem] text-charcoal transition-colors group-hover:text-brown">
                        {company.displayName}
                      </span>
                      {!company.legalNameVerified ? (
                        <span
                          className="rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 text-[0.5625rem] font-semibold text-gold-deep"
                          title="Legal name and scope pending management verification"
                        >
                          Pending verification
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1.5 block font-display text-[0.9375rem] italic text-brown/85">
                      {company.positioning}
                    </span>
                    <span className="mt-2 block text-[0.8125rem] leading-relaxed text-muted">
                      {company.scope}
                    </span>
                  </span>
                  <Arrow className="mt-1.5 h-4 w-4 shrink-0 text-gold-deep/60" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
