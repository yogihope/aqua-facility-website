"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Client = { name: string; logo: string };

/** Pixels per second of automatic movement. */
const SPEED = 40;
/** How long the rail waits after a swipe, drag or click before moving again. */
const RESUME_AFTER_MS = 2500;

/**
 * Client logos that scroll on their own and can also be swiped, dragged or
 * stepped with the arrow buttons. The list is rendered twice so the position
 * can wrap at the halfway point without a visible jump. Visitors who ask for
 * reduced motion get the manual controls only.
 */
export function ClientRail({ clients }: { clients: Client[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);
  const dragging = useRef<{ x: number; left: number } | null>(null);

  const pause = () => {
    pausedUntil.current = performance.now() + RESUME_AFTER_MS;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pos = el.scrollLeft;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const half = el.scrollWidth / 2;

      // The visitor moved the rail: continue from where they left it.
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;

      const idle =
        !hovering.current && !dragging.current && now > pausedUntil.current;

      if (idle && half > el.clientWidth) {
        if (!reduced) pos += (SPEED * dt) / 1000;
        if (pos >= half) pos -= half;
        if (pos < 0) pos += half;
        el.scrollLeft = pos;
        // scrollLeft rounds on some screens; keep the fractional position.
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const step = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    pause();
    const tile = el.querySelector("li")?.getBoundingClientRect().width ?? 220;
    el.scrollBy({ left: direction * (tile + 16) * 2, behavior: "smooth" });
  };

  return (
    <div className="relative mt-12 sm:mt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-warm-deep to-transparent sm:w-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-warm-deep to-transparent sm:w-24"
      />

      <div
        ref={trackRef}
        className="no-scrollbar cursor-grab overflow-x-auto active:cursor-grabbing"
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => {
          hovering.current = false;
          dragging.current = null;
        }}
        onTouchStart={pause}
        onTouchEnd={pause}
        onWheel={pause}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !trackRef.current) return;
          dragging.current = { x: e.clientX, left: trackRef.current.scrollLeft };
        }}
        onPointerMove={(e) => {
          if (!dragging.current || !trackRef.current) return;
          trackRef.current.scrollLeft =
            dragging.current.left - (e.clientX - dragging.current.x);
        }}
        onPointerUp={() => {
          if (dragging.current) pause();
          dragging.current = null;
        }}
      >
        <ul aria-label="Clients" className="flex w-max gap-3 px-5 sm:gap-4 sm:px-0">
          {[...clients, ...clients].map((client, i) => (
            <li
              key={`${client.name}-${i}`}
              aria-hidden={i >= clients.length || undefined}
            >
              <div className="flex h-28 w-48 select-none items-center justify-center rounded-[1.25rem] border border-line bg-white px-7 transition-colors duration-300 hover:border-gold/40 sm:h-32 sm:w-56">
                <div className="relative h-14 w-full">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="160px"
                    draggable={false}
                    className="pointer-events-none object-contain"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <RailButton label="Previous clients" onClick={() => step(-1)} flip />
        <RailButton label="Next clients" onClick={() => step(1)} />
      </div>
    </div>
  );
}

function RailButton({
  label,
  onClick,
  flip = false,
}: {
  label: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/70 text-charcoal transition-colors hover:border-gold hover:text-brown"
    >
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={flip ? "h-4 w-4 rotate-180" : "h-4 w-4"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" />
      </svg>
    </button>
  );
}
