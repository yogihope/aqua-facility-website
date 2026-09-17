import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Aqua brand mark.
 *
 * The assets in `public/brand/` are derived from the 2048px master supplied by
 * the brand team (`aqua-logo.png`), un-matted off its white background so the
 * edges stay clean on the warm-white and charcoal surfaces alike:
 *
 *   aqua-symbol.png          the A alone — what LogoMark renders
 *   aqua-symbol-reverse.png  maroon swapped for warm white, for dark sections
 *   aqua-lockup.png          the A with the "Aqua" wordmark and trademark
 *   aqua-lockup-reverse.png  the same lockup for dark sections
 *
 * `Logo` renders the lockup, the brand's own logo with the wordmark inside
 * the A, in the header and footer (Nirav's call, 2026-09-17). `LogoMark` is
 * the bare symbol for decorative spots.
 */
export function LogoMark({
  className,
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "reverse";
}) {
  return (
    <Image
      src={tone === "reverse" ? "/brand/aqua-symbol-reverse.png" : "/brand/aqua-symbol.png"}
      alt=""
      width={512}
      height={433}
      loading="eager"
      className={cn("h-full w-auto object-contain", className)}
    />
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
    <span className={cn("flex items-center gap-4", className)}>
      <Image
        src={tone === "reverse" ? "/brand/aqua-lockup-reverse.png" : "/brand/aqua-lockup.png"}
        alt="Aqua"
        width={512}
        height={461}
        loading="eager"
        className={cn(
          "w-auto shrink-0 object-contain",
          showTagline ? "h-20" : "h-14 sm:h-[3.75rem]"
        )}
      />
      {showTagline ? (
        <span
          className={cn(
            "text-[0.625rem] font-semibold uppercase leading-relaxed tracking-[0.2em]",
            tone === "reverse" ? "text-warm/55" : "text-muted"
          )}
        >
          Facility Services
          <br />
          Pvt. Ltd.
        </span>
      ) : null}
    </span>
  );
}
