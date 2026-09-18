import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Section 6.1 (2) — single-line stat rail.
 * Spec forbids auto-scrolling on mobile, so the marquee runs only from `sm` up;
 * small screens get a static wrapped list. The unverified ISO claim renders
 * so the rail reads as one line of claims.
 */
export function TrustStrip() {
  const items = home.trustStrip;

  return (
    <section
      aria-label="Aqua at a glance"
      className="border-y border-line bg-warm-deep/70"
    >
      {/* Mobile: static, no motion */}
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 px-5 py-6 sm:hidden">
        {items.map((item) => (
          <li key={item.label} className="max-w-full">
            <Item label={item.label} wrap />
          </li>
        ))}
      </ul>

      {/* sm+: continuous rail, paused on hover and under reduced motion */}
      <div className="marquee relative hidden overflow-hidden py-6 sm:block">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-warm-deep to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-warm-deep to-transparent"
        />
        <ul className="marquee-track flex w-max items-center gap-10 pr-10">
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <li key={`${item.label}-${i}`} className="flex items-center gap-10">
              <Item label={item.label} aria-hidden={i >= items.length} />
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rounded-full bg-gold/50"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Item({
  label,
  wrap = false,
  ...rest
}: {
  label: string;
  /** Let a long label break onto two lines (static mobile list). */
  wrap?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-charcoal/75",
        wrap ? "flex-wrap text-center" : "whitespace-nowrap"
      )}
      {...rest}
    >
      {label}
    </span>
  );
}
