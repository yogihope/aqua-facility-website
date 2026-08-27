import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Section 7 — Primary CTA is Burnt Brown fill / warm white text.
 * Minimum 44px touch height (14.2). One radius system throughout: 12px corporate
 * rectangular CTAs, applied consistently across the site.
 */

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-xl px-6 min-h-[48px] text-[0.9375rem] font-semibold tracking-[0.01em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brown text-warm shadow-[0_1px_0_0_rgba(199,154,35,0.5)_inset,0_10px_24px_-14px_rgba(139,74,51,0.9)] hover:bg-brown-deep hover:shadow-[0_1px_0_0_rgba(199,154,35,0.7)_inset,0_16px_30px_-14px_rgba(139,74,51,0.95)] hover:-translate-y-px active:translate-y-0",
  secondary:
    "border border-line-strong bg-transparent text-charcoal hover:border-gold hover:bg-sand-soft/60",
  ghost: "px-0 text-brown hover:text-gold-deep",
  onDark:
    "bg-warm text-charcoal hover:bg-white hover:-translate-y-px active:translate-y-0",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  arrow = false,
  ...rest
}: {
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}

/** Secondary CTA pattern (Section 7): arrow animates 6–10px on hover. */
export function TextLink({
  href,
  children,
  className,
  tone = "brown",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "brown" | "gold" | "warm";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[0.9375rem] font-semibold transition-colors duration-200",
        tone === "brown" && "text-brown hover:text-gold-deep",
        tone === "gold" && "text-gold-deep hover:text-brown",
        tone === "warm" && "text-warm/85 hover:text-gold-soft",
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
      </span>
      <Arrow />
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[7px]",
        className
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" />
    </svg>
  );
}
