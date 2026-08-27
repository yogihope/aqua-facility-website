import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading, Chip, IndexBadge } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink, Arrow } from "@/components/ui/Button";
import type { ServiceContent } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Section 6.1 (4) — six-card bento grid.
 * 7.1 rule: nothing essential is hover-only. Hover adds emphasis; the title,
 * outcome line, chips and link are all present without interaction, and the
 * whole card is a single link target for touch and keyboard.
 */
export function ServiceBento({ services }: { services: ServiceContent[] }) {
  return (
    <Section id="capabilities" tone="warm" className="grain">
      <Container>
        <SectionHeading
          kicker="Capabilities"
          title={
            <>
              Six capability pillars,{" "}
              <span className="text-brown">one operating philosophy.</span>
            </>
          }
          body="Aqua combines facilities, workforce, engineering support, infrastructure execution and technology into solutions built around each client's site, industry and operating requirements."
          action={<TextLink href="/services">View all services</TextLink>}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={i * 70}
              className={cn(
                // Bento rhythm: first and last cards span wider on desktop
                i === 0 && "lg:col-span-2",
                i === services.length - 1 && "lg:col-span-2"
              )}
            >
              <ServiceCard service={service} index={i + 1} wide={i === 0 || i === services.length - 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ServiceCard({
  service,
  index,
  wide,
}: {
  service: ServiceContent;
  index: number;
  wide?: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      data-analytics="service_view"
      data-service={service.slug}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-line bg-white/70 p-7 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:shadow-[0_24px_48px_-30px_rgba(44,39,35,0.4)] sm:p-8",
        wide && "lg:flex-row lg:items-end lg:gap-10"
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gold/0 blur-3xl transition-colors duration-500 group-hover:bg-gold/15"
      />

      <span className="relative flex-1">
        <span className="flex items-center gap-3">
          <IndexBadge value={index} />
          <span className="h-px flex-1 bg-line" />
        </span>

        <span className="mt-6 block h3 text-charcoal transition-colors duration-200 group-hover:text-brown">
          {service.title}
        </span>

        {/* 7.1 — max two lines of body copy in a card on desktop */}
        <span className="mt-3 block max-w-md text-[0.9375rem] leading-relaxed text-muted">
          {service.outcomeLine}
        </span>
      </span>

      <span className={cn("relative mt-7 block", wide && "lg:mt-0 lg:max-w-xs")}>
        <span className="flex flex-wrap gap-2">
          {service.chips.slice(0, wide ? 5 : 3).map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </span>
        <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brown">
          Explore capability
          <Arrow className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}
