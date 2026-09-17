import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Bits";
import { home } from "@/content/home";
import { ClientRail } from "./ClientRail";

/** Client logos: moves on its own, and can be swiped, dragged or stepped. */
export function ClientList() {
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

      <ClientRail clients={home.clients} />
    </Section>
  );
}
