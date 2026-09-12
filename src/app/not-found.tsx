import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Bits";
import { LogoMark } from "@/components/ui/Logo";

/** Section 6.38 — 404 with routes to Home, Services and Contact. */
export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[70vh] items-center overflow-hidden bg-warm pt-[100px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-0 h-[32rem] w-[32rem] rounded-full bg-sand/50 blur-[130px]"
      />

      <Container className="relative">
        <div className="max-w-2xl py-16">
          <span className="block h-12 w-auto opacity-70">
            <LogoMark />
          </span>

          <Kicker className="mt-10">Error 404</Kicker>

          <h1 className="h1 mt-6 text-charcoal">
            This page has moved or{" "}
            <span className="italic text-brown">no longer exists.</span>
          </h1>

          <p className="lede mt-6 max-w-lg">
            The link may be out of date. Our service URLs changed during the site
            rebuild — the pages below cover everything Aqua does.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/">Back to home</CtaLink>
            <CtaLink href="/services" variant="secondary">
              Explore our capabilities
            </CtaLink>
          </div>

          <nav aria-label="Helpful links" className="mt-12 border-t border-line pt-8">
            <p className="kicker text-muted">Popular destinations</p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: "Integrated Facility Management", href: "/services/integrated-facility-management" },
                { label: "Production Manpower", href: "/services/production-manpower" },
                { label: "Railway & Infrastructure", href: "/services/railway-infrastructure" },
                { label: "Projects", href: "/projects" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] font-medium text-brown transition-colors hover:text-gold-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
