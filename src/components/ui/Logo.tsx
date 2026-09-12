import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Aqua brand mark.
 *
 * The assets in `public/brand/` are derived from the 2048px master supplied by
 * the brand team (`aqua-logo.png`), un-matted off its white background so the
 * edges stay clean on the warm-white and charcoal surfaces alike:
 *
 *   aqua-symbol.png          the A alone — what this component renders
 *   aqua-symbol-reverse.png  maroon swapped for warm white, for dark sections
 *   aqua-lockup.png          the A with the "Aqua" wordmark and trademark
 *   aqua-lockup-reverse.png  the same lockup for dark sections
 *
 * The lockup files are the brand's own compact logo, kept here for share
 * images and print. On screen the header and footer pair the symbol with live
 * "Aqua" type instead: at 40–44px the wordmark baked into the lockup renders
 * around 9px tall and turns to mush, while live type stays crisp, selectable
 * and recolourable per tone.
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
    <span className={cn("flex items-center gap-3", className)}>
      <span className="h-10 w-auto shrink-0 sm:h-11">
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
