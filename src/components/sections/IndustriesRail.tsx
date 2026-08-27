"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading, IndexBadge } from "@/components/ui/Bits";
import { TextLink, Arrow } from "@/components/ui/Button";
import type { IndustryContent } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Section 6.1 (6) / 8.1 — horizontal rail on desktop with mouse drag and native
 * touch scrolling. No scroll-jacking: the page scroll is never hijacked, the
 * rail owns only its own axis. Mobile gets native swipe with snap points.
 */
export function IndustriesRail({
  industries,
}: {
  industries: IndustryContent[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    // Drag-to-scroll is a fine-pointer nicety; touch already scrolls natively.
    if (e.pointerType !== "mouse" || !railRef.current) return;
    setDragging(true);
    drag.current = {
      startX: e.clientX,
      startScroll: railRef.current.scrollLeft,
      moved: 0,
    };
    railRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !railRef.current) return;
    const delta = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(delta);
    railRef.current.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragging || !railRef.current) return;
    setDragging(false);
    railRef.current.releasePointerCapture(e.pointerId);
  };

  const scrollBy = (direction: 1 | -1) => {
    railRef.current?.scrollBy({
      left: direction * Math.min(railRef.current.clientWidth * 0.8, 640),
      behavior: "smooth",
    });
  };

  return (
    <Section tone="warm" className="overflow-hidden">
      <Container>
        <SectionHeading
          kicker="Industries"
          title={
            <>
              Built for complex{" "}
              <span className="italic text-brown">operating environments.</span>
            </>
          }
          body="Different industries create different operational demands. Aqua combines sector understanding with flexible service models, trained manpower, machinery and site-specific processes."
          action={
            <div className="flex items-center gap-3">
              <TextLink href="/industries">All industries</TextLink>
              <div className="hidden items-center gap-2 lg:flex">
                <RailButton
                  direction="prev"
                  onClick={() => scrollBy(-1)}
                  label="Previous industries"
                />
                <RailButton
                  direction="next"
                  onClick={() => scrollBy(1)}
                  label="Next industries"
                />
              </div>
            </div>
          }
        />
      </Container>

      <div className="relative mt-14">
        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={cn(
            "no-scrollbar drag-rail flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8 lg:px-10",
            dragging && "is-dragging"
          )}
        >
          {industries.map((industry, i) => (
            <IndustryCard
              key={industry.slug}
              industry={industry}
              index={i + 1}
              suppressClick={() => drag.current.moved > 6}
            />
          ))}
          <div aria-hidden="true" className="w-1 shrink-0" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-warm to-transparent lg:block"
        />
      </div>
    </Section>
  );
}

function IndustryCard({
  industry,
  index,
  suppressClick,
}: {
  industry: IndustryContent;
  index: number;
  suppressClick: () => boolean;
}) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      draggable={false}
      onClick={(e) => {
        // A drag that ends over a card should not navigate.
        if (suppressClick()) e.preventDefault();
      }}
      className="group relative flex w-[15.5rem] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[1.5rem] border border-line bg-charcoal p-6 text-warm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(44,39,35,0.85)] sm:w-[17.5rem] lg:h-[24rem]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(199,154,35,0.22),transparent_58%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(247,244,238,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,244,238,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal via-charcoal/85 to-transparent"
      />

      <span className="relative">
        <span className="flex items-center gap-3">
          <IndexBadge value={index} tone="dark" />
          <span className="h-px flex-1 bg-warm/15" />
        </span>

        <span className="mt-24 block font-display text-[1.375rem] leading-tight lg:mt-0">
          {industry.title}
        </span>

        <span className="mt-3 flex flex-wrap gap-1.5">
          {industry.capabilities.slice(0, 3).map((cap) => (
            <span
              key={cap}
              className="rounded-full border border-warm/15 px-2.5 py-1 text-[0.6875rem] text-warm/65"
            >
              {cap}
            </span>
          ))}
        </span>

        <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-gold-soft">
          Explore sector
          <Arrow className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}

function RailButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-charcoal transition-colors hover:border-gold hover:text-brown"
    >
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={cn("h-4 w-4", direction === "prev" && "rotate-180")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" />
      </svg>
    </button>
  );
}
