"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Kicker, IndexBadge } from "@/components/ui/Bits";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Section 6.1 (7) / 8.1 — People, Process, Technology, Performance.
 *
 * Desktop: the visual column is sticky and morphs as each step scrolls through.
 * Mobile: four ordinary stacked sections — no pinning at all, which keeps this
 * well inside the "do not pin more than ~2.5 viewport heights on mobile" rule.
 * The sticky element is also neutralised under prefers-reduced-motion via the
 * `.sticky-narrative` rule in globals.css.
 */
export function PptpStory() {
  const steps = home.pptp;
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index ?? 0
            );
            setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="grain relative bg-warm-deep/60 py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Kicker>Operational philosophy</Kicker>
          <h2 className="h2 mt-6 text-charcoal">
            People. Process. Technology.{" "}
            <span className="italic text-brown">Performance.</span>
          </h2>
          <p className="lede mt-6">
            Four disciplines that decide whether an operation performs on the day
            it matters — not four words on a slide.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
          {/* Sticky visual — desktop only */}
          <div className="sticky-narrative hidden lg:sticky lg:top-[112px] lg:block lg:h-[26rem]">
            <StepVisual index={active} />
          </div>

          {/* Steps */}
          <ol className="flex flex-col gap-12 lg:gap-0">
            {steps.map((step, i) => (
              <li key={step.key}>
                <div
                  ref={(node) => {
                    stepRefs.current[i] = node;
                  }}
                  data-index={i}
                  className="lg:flex lg:min-h-[80vh] lg:flex-col lg:justify-center"
                >
                  <div
                    className={cn(
                      "transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "lg:opacity-40",
                      active === i && "lg:opacity-100"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <IndexBadge value={i + 1} />
                      <span
                        className={cn(
                          "h-px flex-1 transition-colors duration-500",
                          active === i ? "bg-gold/60" : "bg-line"
                        )}
                      />
                      <span className="kicker text-muted">{step.key}</span>
                    </div>

                    {/* Mobile visual, inline per step */}
                    <div className="mt-7 h-52 lg:hidden">
                      <StepVisual index={i} compact />
                    </div>

                    <h3 className="mt-7 font-display text-[clamp(1.6rem,3vw,2.375rem)] leading-tight tracking-[-0.015em] text-charcoal">
                      {step.headline}
                    </h3>
                    <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-muted">
                      {step.body}
                    </p>
                    <ul className="mt-6 flex flex-col gap-2.5">
                      {step.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-[0.9375rem] text-charcoal/80"
                        >
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/**
 * The morph: one shared frame whose contents cross-fade between the four
 * disciplines. Transform + opacity only (8.1 performance rule).
 */
function StepVisual({ index, compact }: { index: number; compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-white via-warm to-sand/50",
        compact && "rounded-2xl"
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(44,39,35,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(44,39,35,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          aria-hidden={index !== i}
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            index === i
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          )}
        >
          {i === 0 ? <PeopleGlyph /> : null}
          {i === 1 ? <ProcessGlyph /> : null}
          {i === 2 ? <TechnologyGlyph /> : null}
          {i === 3 ? <PerformanceGlyph /> : null}
        </div>
      ))}
    </div>
  );
}

const glyph = "h-[78%] w-[78%]";

function PeopleGlyph() {
  return (
    <svg viewBox="0 0 200 160" className={glyph} aria-hidden="true" fill="none">
      {Array.from({ length: 18 }).map((_, i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const x = 24 + col * 30;
        const y = 42 + row * 38;
        const filled = [0, 3, 7, 8, 12, 15, 16].includes(i);
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r="7"
              fill={filled ? "#8B4A33" : "none"}
              stroke={filled ? "#8B4A33" : "rgba(44,39,35,0.25)"}
              strokeWidth="1.4"
            />
            <path
              d={`M${x - 11} ${y + 22} q11 -12 22 0`}
              stroke={filled ? "#C79A23" : "rgba(44,39,35,0.2)"}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

function ProcessGlyph() {
  return (
    <svg viewBox="0 0 200 160" className={glyph} aria-hidden="true" fill="none">
      <path
        d="M20 80 H60 M84 80 H124 M148 80 H182"
        stroke="rgba(44,39,35,0.2)"
        strokeWidth="1.4"
        strokeDasharray="4 5"
      />
      {[
        { x: 20, label: "Plan" },
        { x: 72, label: "Execute" },
        { x: 124, label: "Verify" },
      ].map((node, i) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y={58}
            width={52}
            height={44}
            rx={10}
            fill={i === 1 ? "#8B4A33" : "white"}
            stroke={i === 1 ? "#8B4A33" : "rgba(44,39,35,0.18)"}
            strokeWidth="1.4"
          />
          <text
            x={node.x + 26}
            y={84}
            textAnchor="middle"
            fontSize="10"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            fill={i === 1 ? "#F7F4EE" : "#6B6259"}
          >
            {node.label}
          </text>
        </g>
      ))}
      <path
        d="M176 80 a0 0 0 0 0 0 0 M160 46 h22 v68 h-22"
        stroke="#C79A23"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="182" cy="80" r="4" fill="#C79A23" />
    </svg>
  );
}

function TechnologyGlyph() {
  return (
    <svg viewBox="0 0 200 160" className={glyph} aria-hidden="true" fill="none">
      <rect
        x="18"
        y="24"
        width="164"
        height="112"
        rx="12"
        fill="white"
        stroke="rgba(44,39,35,0.16)"
        strokeWidth="1.4"
      />
      <path d="M18 48 H182" stroke="rgba(44,39,35,0.12)" strokeWidth="1.2" />
      <circle cx="32" cy="36" r="3" fill="#C79A23" />
      <circle cx="42" cy="36" r="3" fill="rgba(44,39,35,0.18)" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={32 + i * 50}
          y={62}
          width={38}
          height={26}
          rx={6}
          fill="rgba(233,216,190,0.55)"
        />
      ))}
      <path
        d="M32 122 L58 104 L84 114 L110 88 L136 96 L168 72"
        stroke="#8B4A33"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="168" cy="72" r="4.5" fill="#C79A23" />
    </svg>
  );
}

function PerformanceGlyph() {
  return (
    <svg viewBox="0 0 200 160" className={glyph} aria-hidden="true" fill="none">
      <path
        d="M24 132 H180"
        stroke="rgba(44,39,35,0.2)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[
        { x: 32, h: 34 },
        { x: 66, h: 52 },
        { x: 100, h: 46 },
        { x: 134, h: 74 },
      ].map((bar, i) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={132 - bar.h}
          width={24}
          height={bar.h}
          rx={6}
          fill={i === 3 ? "#8B4A33" : "rgba(233,216,190,0.85)"}
          stroke={i === 3 ? "none" : "rgba(44,39,35,0.12)"}
          strokeWidth="1.2"
        />
      ))}
      <path
        d="M32 96 L66 78 L100 84 L146 42"
        stroke="#C79A23"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M132 40 H150 V58"
        stroke="#C79A23"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
