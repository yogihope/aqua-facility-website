import { Container, Section } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { home } from "@/content/home";

/**
 * Section 6.1 (3) — the repositioning statement.
 * This is the section that carries the "housekeeping vendor → operational
 * services partner" shift, so it gets the largest editorial type on the page
 * after the hero. The mosaic uses composed panels rather than stock imagery;
 * Section 4.4 requires documentary photography, which is supplied at content
 * freeze — the panels below are sized to be swapped for it one-for-one.
 */
export function Repositioning() {
  const { repositioning, outcomes } = home;

  return (
    <Section tone="sand" className="overflow-hidden">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <Kicker>The shift</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h2 mt-7 text-charcoal">
                Aqua Does More Than{" "}
                <span className="italic text-brown">Manage Facilities.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="lede mt-7 max-w-xl">{repositioning.body}</p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-9">
                <TextLink href="/about">Read the Aqua story</TextLink>
              </div>
            </Reveal>

            {/* Section 6.1 (5) — outcomes, as a kinetic modular grid */}
            <Reveal delay={280}>
              <div className="mt-14">
                <p className="kicker text-muted">What clients get</p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {outcomes.map((outcome, i) => (
                    <li
                      key={outcome}
                      className="group rounded-xl border border-line-strong bg-white/60 px-4 py-2.5 text-[0.875rem] font-medium text-charcoal/85 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold/45 hover:bg-white"
                      style={{ transitionDelay: `${i * 12}ms` }}
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Asymmetric editorial mosaic (4.3) */}
          <Reveal delay={140} className="lg:pt-10">
            <div className="grid grid-cols-2 gap-4">
              <MosaicPanel
                className="col-span-2 aspect-[16/9]"
                label="Plant operations"
                caption="Mechanised execution on live industrial floors"
              />
              <MosaicPanel
                className="aspect-[3/4]"
                label="Workforce"
                caption="Trained, supervised, deployed"
                tone="dark"
              />
              <MosaicPanel
                className="aspect-[3/4]"
                label="Infrastructure"
                caption="High-footfall environments"
              />
            </div>
            <p className="mt-5 text-[0.75rem] leading-relaxed text-muted/80">
              Documentary photography of actual operations, facilities and
              machinery replaces these panels at content freeze (Section 4.4).
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function MosaicPanel({
  className,
  label,
  caption,
  tone = "light",
}: {
  className?: string;
  label: string;
  caption: string;
  tone?: "light" | "dark";
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border ${
        tone === "dark"
          ? "border-charcoal/20 bg-charcoal text-warm"
          : "border-line bg-gradient-to-br from-white via-warm to-sand/60"
      } ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${
          tone === "dark"
            ? "bg-[radial-gradient(circle_at_70%_20%,rgba(199,154,35,0.22),transparent_60%)]"
            : "bg-[radial-gradient(circle_at_30%_20%,rgba(199,154,35,0.14),transparent_62%)]"
        }`}
      />
      {/* Faint technical grid — reads as measured, not decorative */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `linear-gradient(to right, ${
            tone === "dark" ? "rgba(247,244,238,0.06)" : "rgba(44,39,35,0.05)"
          } 1px, transparent 1px), linear-gradient(to bottom, ${
            tone === "dark" ? "rgba(247,244,238,0.06)" : "rgba(44,39,35,0.05)"
          } 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <span
          className={`kicker ${tone === "dark" ? "text-gold-soft" : "text-gold-deep"}`}
        >
          {label}
        </span>
        <span
          className={`mt-2 block text-[0.8125rem] leading-snug ${
            tone === "dark" ? "text-warm/70" : "text-muted"
          }`}
        >
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
