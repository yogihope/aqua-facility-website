import { Container, Section } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import Image from "next/image";
import { home } from "@/content/home";
import { workPhotos, type WorkPhoto } from "@/content/workPhotos";

/**
 * Section 6.1 (3) — the repositioning statement.
 * This is the section that carries the "housekeeping vendor → operational
 * services partner" shift, so it gets the largest editorial type on the page
 * after the hero. The mosaic carries site photography (Section 4.4).
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
              <MosaicPhoto
                className="col-span-2 aspect-[16/9]"
                photo={workPhotos.housekeeping}
                label="Facility operations"
                caption="Mechanised execution on live sites"
              />
              <MosaicPhoto
                className="aspect-[3/4]"
                photo={workPhotos.briefing}
                label="Workforce"
                caption="Trained, supervised, deployed"
              />
              <MosaicPhoto
                className="aspect-[3/4]"
                photo={workPhotos.maintenance}
                label="Maintenance"
                caption="Technical teams on plant assets"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function MosaicPhoto({
  className,
  photo,
  label,
  caption,
}: {
  className?: string;
  photo: WorkPhoto;
  label: string;
  caption: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border border-line ${
        className ?? ""
      }`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 26rem, 92vw"
        className="object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-5 pt-12">
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-soft">
          {label}
        </span>
        <span className="mt-1 block text-[0.8125rem] leading-snug text-warm/90">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
