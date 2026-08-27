import { cn } from "@/lib/utils";

/**
 * Aqua mark, rebuilt as inline SVG so it stays crisp, themeable and free of a
 * network request in the header.
 *
 * Section 18 requires the brand team to supply primary / reverse / single-colour
 * SVG masters before go-live. When those arrive, swap the paths here — the
 * component API stays the same.
 */
export function LogoMark({
  className,
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "reverse" | "mono";
}) {
  const gold =
    tone === "reverse" ? "#E0BD5C" : tone === "mono" ? "currentColor" : "#C79A23";
  const brown =
    tone === "reverse" ? "#F7F4EE" : tone === "mono" ? "currentColor" : "#8B4A33";

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-full w-auto", className)}
      role="img"
      aria-label="Aqua"
    >
      {/* Apex strokes forming the A */}
      <path
        d="M17 90 L50 12 L83 90"
        fill="none"
        stroke={gold}
        strokeWidth="13.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
      {/* Inner chevron */}
      <path d="M50 24 L61.5 51 L50 41.5 L38.5 51 Z" fill={brown} />
      {/* Sweeping crossbar */}
      <path
        d="M20 57 Q50 88 80 57"
        fill="none"
        stroke={gold}
        strokeWidth="11.5"
        strokeLinecap="round"
      />
      {/* Terminal dots */}
      <circle cx="14.5" cy="50.5" r="6.2" fill={brown} />
      <circle cx="85.5" cy="50.5" r="6.2" fill={brown} />
    </svg>
  );
}

export function Logo({
  className,
  tone = "brand",
  showTagline = false,
}: {
  className?: string;
  tone?: "brand" | "reverse";
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="h-10 w-10 shrink-0 sm:h-11 sm:w-11">
        <LogoMark tone={tone} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.6rem] leading-none tracking-[-0.01em] sm:text-[1.75rem]",
            tone === "reverse" ? "text-warm" : "text-brown"
          )}
        >
          Aqua
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.2em] sm:text-[0.5625rem]",
            tone === "reverse" ? "text-warm/55" : "text-muted"
          )}
        >
          {showTagline ? "Facility Services Pvt. Ltd." : "Since 1996"}
        </span>
      </span>
    </span>
  );
}
