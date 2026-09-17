import { cn } from "@/lib/utils";

/** 4.3 — max 1440px, standard content 1240–1320px. */
export function Container({
  children,
  className,
  wide,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        wide ? "max-w-[1440px]" : "max-w-[1320px]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** 4.3 section rhythm: desktop 112–160px, tablet 88–112px, mobile 64–88px. */
export function Section({
  children,
  className,
  id,
  tone = "warm",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "warm" | "sand" | "dark" | "none";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-x-clip py-16 sm:py-24 lg:py-32",
        tone === "warm" && "bg-warm",
        tone === "sand" && "bg-warm-deep",
        tone === "dark" && "dark-section bg-charcoal",
        className
      )}
    >
      {children}
    </section>
  );
}
