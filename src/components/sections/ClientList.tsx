import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { home } from "@/content/home";

/**
 * Client logo rail. Runs continuously and pauses on hover; phones and
 * reduced-motion visitors get a rail they swipe by hand instead, the same
 * split the trust strip uses.
 */
export function ClientList() {
  const clients = home.clients;

  return (
    <Section tone="sand" className="overflow-hidden">
      <Container>
        <SectionHeading
          kicker="Clients"
          title={
            <>
              Trusted by India&apos;s leading{" "}
              <span className="italic text-brown">organisations.</span>
            </>
          }
          body="Manufacturing, power, engineering and consumer businesses that have relied on Aqua for facility, maintenance and support services."
        />
      </Container>

      {/* Mobile: swipeable, no motion */}
      <ul
        aria-label="Clients"
        className="mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:hidden"
      >
        {clients.map((client) => (
          <li key={client.name} className="snap-start">
            <LogoTile name={client.name} logo={client.logo} />
          </li>
        ))}
      </ul>

      {/* sm+: continuous rail */}
      <div className="marquee marquee-manual relative mt-14 hidden sm:block">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-warm-deep to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-warm-deep to-transparent"
        />
        <ul
          aria-label="Clients"
          className="marquee-track flex w-max gap-4 pr-4 [animation-duration:60s]"
        >
          {[...clients, ...clients].map((client, i) => (
            <li
              key={`${client.name}-${i}`}
              aria-hidden={i >= clients.length || undefined}
            >
              <LogoTile name={client.name} logo={client.logo} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function LogoTile({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex h-28 w-48 items-center justify-center rounded-[1.25rem] border border-line bg-white px-7 transition-colors duration-300 hover:border-gold/40 sm:h-32 sm:w-56">
      <div className="relative h-14 w-full">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="160px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
