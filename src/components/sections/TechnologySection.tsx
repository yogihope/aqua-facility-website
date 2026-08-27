"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Kicker, Chip } from "@/components/ui/Bits";
import { CtaLink } from "@/components/ui/Button";
import { home } from "@/content/home";
import { TECH_STATUS_LABEL } from "@/content/technology";
import type { TechCapabilityContent } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Section 6.1 (8) / 6.17 — deep charcoal band with floating product UI cards.
 *
 * Two spec rules shape this section:
 *  - Parallax is capped at the 2–6px band (8.1) and only runs on fine pointers.
 *  - Nothing is presented as live unless its status says so (6.17). Modules in
 *    rollout or planned are labelled, and no fabricated metric values are shown.
 */
export function TechnologySection({
  capabilities,
}: {
  capabilities: TechCapabilityContent[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        // 6px maximum travel — Section 8.1
        setOffset({ x: x * 6, y: y * 6 });
      });
    };

    node.addEventListener("pointermove", onMove);
    return () => {
      node.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const featured = capabilities.slice(0, 4);

  return (
    <section
      ref={ref}
      className="dark-section relative overflow-hidden bg-charcoal py-16 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brown/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(247,244,238,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,244,238,0.045) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="lg:pt-6">
            <Kicker tone="warm">Technology</Kicker>
            <h2 className="h2 mt-6 text-warm">
              From Operations to{" "}
              <span className="text-gradient-gold italic">
                Operational Intelligence.
              </span>
            </h2>
            <p className="lede mt-7 max-w-lg">{home.technology.body}</p>

            <div className="mt-9 flex flex-wrap gap-2">
              {[
                "Digital attendance",
                "Geo-tagged verification",
                "Ticketing",
                "Audit logs",
                "Management MIS",
              ].map((chip) => (
                <Chip key={chip} tone="dark">
                  {chip}
                </Chip>
              ))}
            </div>

            <div className="mt-10">
              <CtaLink
                href={home.technology.cta.href}
                variant="onDark"
                data-analytics="technology_interaction"
              >
                {home.technology.cta.label}
              </CtaLink>
            </div>
          </div>

          {/* Floating dashboard cards */}
          <div
            className="relative"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
              transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="grid gap-3.5 sm:grid-cols-2">
              {featured.map((capability, i) => (
                <DashboardCard
                  key={capability.slug}
                  capability={capability}
                  className={cn(i % 2 === 1 && "sm:mt-8")}
                  depth={i}
                  offset={offset}
                />
              ))}
            </div>

            <p className="mt-6 text-[0.75rem] leading-relaxed text-warm/45">
              Module availability varies by contract and site readiness.
              Capabilities are confirmed during mobilisation — nothing here is
              shown as live before it is.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DashboardCard({
  capability,
  className,
  depth,
  offset,
}: {
  capability: TechCapabilityContent;
  className?: string;
  depth: number;
  offset: { x: number; y: number };
}) {
  const live = capability.status === "live";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-warm/12 bg-warm/[0.055] p-5 backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-soft/30 hover:bg-warm/[0.08]",
        className
      )}
      style={{
        transform: `translate3d(${offset.x * (depth % 2 ? -0.35 : 0.35)}px, ${
          offset.y * (depth % 2 ? -0.35 : 0.35)
        }px, 0)`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-warm/45">
          {capability.category}
        </p>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.625rem] font-semibold",
            live
              ? "border-gold-soft/30 bg-gold-soft/10 text-gold-soft"
              : "border-warm/15 bg-warm/[0.04] text-warm/50"
          )}
        >
          {live ? (
            <span className="h-1.5 w-1.5 rounded-full bg-gold-soft" />
          ) : null}
          {TECH_STATUS_LABEL[capability.status]}
        </span>
      </div>

      <h3 className="mt-4 text-[1rem] font-semibold leading-snug text-warm">
        {capability.module}
      </h3>
      <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-warm/60">
        {capability.description}
      </p>

      {capability.metricLabel ? (
        <div className="mt-5 border-t border-warm/10 pt-4">
          <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-warm/40">
            {capability.metricLabel}
          </p>
          {/* No invented figures — the shape of the readout, not a fake number. */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-warm/10">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brown to-gold" />
            </div>
            <span className="text-[0.6875rem] text-warm/40">
              {capability.metricHint}
            </span>
          </div>
        </div>
      ) : null}
    </article>
  );
}
