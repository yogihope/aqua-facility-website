import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Kicker({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "muted" | "warm";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "kicker flex items-center gap-3",
        tone === "gold" && "text-gold-deep",
        tone === "muted" && "text-muted",
        tone === "warm" && "text-gold-soft",
        className
      )}
    >
      <span
        className={cn(
          "h-px w-6 shrink-0",
          tone === "warm" ? "bg-gold-soft/60" : "bg-gold/60"
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  body,
  align = "left",
  tone = "light",
  className,
  action,
}: {
  kicker?: string;
  title: React.ReactNode;
  body?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {kicker ? (
        <Reveal>
          <Kicker tone={tone === "dark" ? "warm" : "gold"}>{kicker}</Kicker>
        </Reveal>
      ) : null}
      <div
        className={cn(
          "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
          align === "center" && "lg:flex-col lg:items-center"
        )}
      >
        <Reveal delay={60} className="max-w-3xl">
          <h2 className={cn("h2", tone === "dark" ? "text-warm" : "text-charcoal")}>
            {title}
          </h2>
        </Reveal>
        {action ? (
          <Reveal delay={120} className="shrink-0">
            {action}
          </Reveal>
        ) : null}
      </div>
      {body ? (
        <Reveal delay={140}>
          <p className={cn("lede max-w-2xl", align === "center" && "mx-auto")}>
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Chip({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[0.75rem] font-medium leading-none",
        tone === "light" && "border-line-strong bg-white/70 text-muted",
        tone === "dark" && "border-warm/15 bg-warm/[0.06] text-warm/75",
        tone === "gold" && "border-gold/35 bg-gold/10 text-gold-deep",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Governance notice — the spec's content-safety rule made visible in the UI
 * rather than left as a comment in a document. Used wherever a claim, legal
 * name, licence or metric is still awaiting management verification.
 */
export function VerifyNote({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[0.8125rem] leading-relaxed",
        tone === "light"
          ? "border-gold/30 bg-gold/[0.07] text-[#7a6220]"
          : "border-gold-soft/25 bg-gold-soft/[0.08] text-gold-soft/90",
        className
      )}
    >
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="mt-px h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6.4v4.4M10 13.4h.01" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

/** Section 11.1 — breadcrumbs on all inner pages. */
export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: { name: string; href?: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] font-medium">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    tone === "dark"
                      ? "text-warm/50 hover:text-gold-soft"
                      : "text-muted hover:text-brown"
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={tone === "dark" ? "text-warm/85" : "text-charcoal"}
                  aria-current={last ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
              {!last ? (
                <span
                  aria-hidden="true"
                  className={tone === "dark" ? "text-warm/25" : "text-line-strong"}
                >
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated server-side from typed content, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function IndexBadge({
  value,
  tone = "light",
}: {
  value: number | string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "font-display text-[0.9375rem] tabular-nums",
        tone === "dark" ? "text-gold-soft/70" : "text-gold-deep/70"
      )}
    >
      {typeof value === "number" ? String(value).padStart(2, "0") : value}
    </span>
  );
}
