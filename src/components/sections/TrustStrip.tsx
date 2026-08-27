import { home } from "@/content/home";

/**
 * Section 6.1 (2) — single-line stat rail.
 * Spec forbids auto-scrolling on mobile, so the marquee runs only from `sm` up;
 * small screens get a static wrapped list. The unverified ISO claim renders
 * with a pending marker instead of an unqualified certification statement.
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
          <li key={item.label}>
            <Item label={item.label} verified={item.verified} note={item.note} />
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
              <Item
                label={item.label}
                verified={item.verified}
                note={item.note}
                aria-hidden={i >= items.length}
              />
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
  verified,
  note,
  ...rest
}: {
  label: string;
  verified: boolean;
  note?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-charcoal/75"
      {...rest}
    >
      {label}
      {!verified ? (
        <span
          className="rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 text-[0.5625rem] font-semibold normal-case tracking-normal text-gold-deep"
          title={note ?? "Pending documentary verification"}
        >
          {note ?? "Pending verification"}
        </span>
      ) : null}
    </span>
  );
}
