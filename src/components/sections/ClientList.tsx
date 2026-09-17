import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content/home";

/**
 * Clients carried over from the legacy site. Rendered as names rather than
 * logos, so no third-party brand files ship with the site.
 */
export function ClientList() {
  return (
    <Section tone="sand">
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

        <Reveal delay={80}>
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
            {home.clients.map((client) => (
              <li
                key={client}
                className="flex min-h-20 items-center justify-center bg-white/80 px-4 py-5 text-center text-[0.9375rem] font-semibold tracking-[0.01em] text-charcoal/80"
              >
                {client}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
