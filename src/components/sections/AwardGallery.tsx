"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AwardImage } from "@/content/types";

/**
 * Ceremony gallery with a lightbox.
 *
 * 14.2 — the dialog traps focus, closes on Escape and on backdrop click, and
 * returns focus to the thumbnail that opened it. Arrow keys move between
 * images. Portrait assets (the certificate and the trophy) are given a taller
 * cell so they are not cropped to nothing in a landscape grid.
 */
export function AwardGallery({ images }: { images: AwardImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openedFrom = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    const index = openedFrom.current;
    if (index !== null) triggers.current[index]?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null
          ? current
          : (current + delta + images.length) % images.length
      ),
    [images.length]
  );

  // Escape closes, arrows navigate, Tab is held inside the dialog.
  useEffect(() => {
    if (open === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      } else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])"
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close, step]);

  const active = open === null ? null : images[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {images.map((image, i) => {
          const portrait = image.height > image.width;
          return (
            <li
              key={image.src}
              className={cn(portrait && "row-span-2 lg:row-span-2")}
            >
              <button
                type="button"
                ref={(node) => {
                  triggers.current[i] = node;
                }}
                onClick={() => {
                  openedFrom.current = i;
                  setOpen(i);
                }}
                className="group relative block h-full w-full overflow-hidden rounded-[1.25rem] border border-line bg-warm-deep transition-colors duration-300 hover:border-gold/45"
              >
                <span
                  className={cn(
                    "relative block w-full",
                    portrait ? "aspect-[3/4] lg:aspect-[2/3]" : "aspect-[3/2]"
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className={cn(
                      "transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]",
                      // The portrait assets are objects, not scenes — the
                      // certificate and the trophy lose their subject entirely
                      // if cropped to fill, so they are contained instead.
                      portrait
                        ? "bg-white object-contain p-2"
                        : "object-cover"
                    )}
                  />
                </span>
                <span className="flex items-center justify-between gap-3 border-t border-line bg-white/70 px-4 py-3 text-left">
                  <span className="text-[0.8125rem] leading-snug text-charcoal/80">
                    {image.caption}
                  </span>
                  <ExpandIcon />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {active ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-[100] flex flex-col bg-charcoal/95 backdrop-blur-sm"
        >
          {/* Backdrop click closes. The image and controls sit above it. */}
          <button
            type="button"
            aria-label="Close image viewer"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p className="text-[0.8125rem] tabular-nums text-warm/50">
              {(open ?? 0) + 1} / {images.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="flex min-h-[44px] items-center gap-2 rounded-xl border border-warm/20 px-4 text-[0.875rem] font-semibold text-warm transition-colors hover:border-gold-soft hover:text-gold-soft"
            >
              Close
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center gap-2 px-3 sm:gap-4 sm:px-6">
            <NavButton direction="previous" onClick={() => step(-1)} />
            <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="90vw"
                className="max-h-[72vh] w-auto max-w-full rounded-lg object-contain sm:max-h-[78vh]"
              />
              <figcaption className="max-w-2xl text-center text-[0.875rem] text-warm/65">
                {active.caption}
              </figcaption>
            </figure>
            <NavButton direction="next" onClick={() => step(1)} />
          </div>

          <div className="h-6" />
        </div>
      ) : null}
    </>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === "next" ? "Next" : "Previous"} image`}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-warm/20 text-warm transition-colors hover:border-gold-soft hover:text-gold-soft"
    >
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={cn("h-4 w-4", direction === "previous" && "rotate-180")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 4l6 6-6 6" />
      </svg>
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 text-gold-deep/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3h5v5M8 17H3v-5M17 3l-6 6M3 17l6-6" />
    </svg>
  );
}
