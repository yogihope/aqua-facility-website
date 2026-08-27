import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CtaLink } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Bits";
import { site, yearsOfExpertise } from "@/content/site";
import { getServices, getIndustries, getGroupCompanies } from "@/lib/data";

/**
 * Section 7 — group summary, service links, group companies, contact, legal,
 * socials and a closing CTA. Company description here replaces the legacy
 * "certified housekeeping and hospitality management firm" line flagged in 2.1.
 */
export async function Footer() {
  const [services, industries, group] = await Promise.all([
    getServices(),
    getIndustries(),
    getGroupCompanies(),
  ]);

  const year = new Date().getFullYear();

  return (
    <footer className="dark-section relative overflow-hidden bg-charcoal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brown/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[120px]"
      />

      {/* Closing CTA band */}
      <div className="relative border-b border-warm/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <Kicker tone="warm">Start a conversation</Kicker>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.06] tracking-[-0.018em] text-warm">
              Tell us what your operation needs to run.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/request-proposal" variant="onDark">
              {site.primaryCtaLabel}
            </CtaLink>
            <CtaLink
              href="/contact"
              variant="secondary"
              className="border-warm/25 text-warm hover:border-gold-soft hover:bg-warm/[0.06]"
            >
              Discuss Your Requirement
            </CtaLink>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="reverse" showTagline />
            <p className="mt-6 max-w-sm text-[0.875rem] leading-relaxed text-warm/60">
              {site.footerCopy}
            </p>
            <p className="mt-6 font-display text-[1.0625rem] text-gold-soft">
              {site.brandPromise}
            </p>
            <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-warm/40">
              {site.philosophy}
            </p>
          </div>

          <FooterColumn
            title="Capabilities"
            links={services.map((s) => ({
              label: s.navTitle,
              href: `/services/${s.slug}`,
            }))}
          />

          <FooterColumn
            title="Aqua Group"
            links={group.map((g) => ({
              label: g.displayName,
              href: `/group/${g.slug}`,
            }))}
          />

          <div className="flex flex-col gap-8">
            <FooterColumn
              title="Company"
              links={[
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Technology", href: "/technology" },
                { label: "Impact", href: "/impact" },
                { label: "Careers", href: "/careers" },
                { label: "Insights", href: "/insights" },
              ]}
            />
            <div>
              <p className="kicker text-warm/40">Contact</p>
              <address className="mt-4 flex flex-col gap-1.5 text-[0.875rem] not-italic leading-relaxed text-warm/60">
                <span>{site.addressLine1}</span>
                {site.addressLine2 ? <span>{site.addressLine2}</span> : null}
                <span>
                  {site.city}, {site.state} {site.postalCode}
                </span>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  data-analytics="phone_click"
                  className="mt-2 text-warm/80 transition-colors hover:text-gold-soft"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  data-analytics="email_click"
                  className="text-warm/80 transition-colors hover:text-gold-soft"
                >
                  {site.email}
                </a>
              </address>
            </div>
          </div>
        </div>

        {/* Industry links — kept discoverable without crowding the primary nav */}
        <div className="mt-14 border-t border-warm/10 pt-10">
          <p className="kicker text-warm/40">Industries served</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="text-[0.8125rem] text-warm/50 transition-colors hover:text-gold-soft"
                >
                  {industry.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-warm/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.75rem] text-warm/40">
            © {year} {site.legalName}. {yearsOfExpertise()}+ years of operational
            services since {site.foundingYear}.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/privacy-policy"
              className="text-[0.75rem] text-warm/45 transition-colors hover:text-gold-soft"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[0.75rem] text-warm/45 transition-colors hover:text-gold-soft"
            >
              Terms
            </Link>
            {site.linkedin ? (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.75rem] text-warm/45 transition-colors hover:text-gold-soft"
              >
                LinkedIn
              </a>
            ) : null}
            {site.facebook ? (
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.75rem] text-warm/45 transition-colors hover:text-gold-soft"
              >
                Facebook
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="kicker text-warm/40">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[0.875rem] text-warm/60 transition-colors hover:text-gold-soft"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
