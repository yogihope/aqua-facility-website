"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { CtaLink, Arrow } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Bits";
import { primaryNav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export type NavItem = { slug: string; title: string; chips?: string[] };
export type NavData = {
  services: NavItem[];
  industries: NavItem[];
  group: NavItem[];
};

/**
 * Section 3.2 — transparent over hero, warm-white sticky with reduced height
 * after the first viewport. Desktop mega menu, mobile accordion drawer, no
 * hover dependency on touch, full keyboard operability (7.1, 14.2).
 */
export function Header({ nav }: { nav: NavData }) {
  const pathname = usePathname();
  const overHero = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route change closes every overlay. Adjusted during render rather than in an
  // effect (React's "resetting state when a prop changes" pattern) so the menu
  // never paints open for a frame on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenMega(null);
    setDrawerOpen(false);
  }

  // Escape closes; body scroll locks while the mobile drawer is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMega(null);
        setDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMega(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const solid = scrolled || !overHero || openMega !== null;

  return (
    <header
      ref={headerRef}
      onMouseLeave={scheduleClose}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid
          ? "bg-warm/92 shadow-[0_1px_0_0_rgba(44,39,35,0.08)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brown focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-warm"
      >
        Skip to content
      </a>

      <div
        className={cn(
          "mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 lg:px-10",
          scrolled ? "h-[68px]" : "h-[84px] lg:h-[92px]"
        )}
      >
        <Link href="/" aria-label={`${site.legalName} — home`} className="shrink-0">
          <Logo tone={solid ? "brand" : "brand"} />
        </Link>

        {/* Desktop navigation — max 9 primary items (Section 3) */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => {
              const isMega = "mega" in item && item.mega;
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li
                  key={item.href}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMega(isMega ? (item.mega as string) : null);
                  }}
                >
                  {isMega ? (
                    <button
                      type="button"
                      aria-expanded={openMega === item.mega}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenMega(
                          openMega === item.mega ? null : (item.mega as string)
                        )
                      }
                      onFocus={() => setOpenMega(item.mega as string)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-[0.875rem] font-medium transition-colors duration-200",
                        active || openMega === item.mega
                          ? "text-brown"
                          : "text-charcoal/80 hover:text-brown"
                      )}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                        className={cn(
                          "h-2.5 w-2.5 transition-transform duration-300",
                          openMega === item.mega && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 4.5 6 8l3.5-3.5" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3.5 py-2.5 text-[0.875rem] font-medium transition-colors duration-200",
                        active ? "text-brown" : "text-charcoal/80 hover:text-brown"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Hidden on a wrapper: CtaLink's own inline-flex outranks `hidden`
              in the stylesheet, which left this button pushing the header
              wider than the screen on phones. */}
          <div className="hidden lg:block">
            <CtaLink
              href="/request-proposal"
              className="h-11 min-h-0 px-5 text-[0.8125rem]"
              arrow={false}
            >
              {site.primaryCtaLabel}
            </CtaLink>
          </div>

          <button
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong text-charcoal transition-colors hover:border-gold hover:text-brown xl:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  drawerOpen ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-[1.5px] w-full bg-current transition-opacity duration-200",
                  drawerOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  drawerOpen ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mega menus */}
      <div onMouseEnter={cancelClose}>
        <MegaPanel
          open={openMega === "services"}
          eyebrow="Six capability pillars"
          title="One Operational Partner. Multiple Capabilities."
          items={nav.services}
          basePath="/services"
          hubLabel="View all services"
          featured={{
            kicker: "Featured capability",
            title: "Technology for Seamless Operations",
            body: "Digital attendance, geo-tagged verification, ticketing and MIS across multi-site operations.",
            href: "/technology",
            cta: "See how we monitor operations",
          }}
        />
        <MegaPanel
          open={openMega === "industries"}
          eyebrow="Sector-led discovery"
          title="Built for Complex Operating Environments."
          items={nav.industries}
          basePath="/industries"
          hubLabel="View all industries"
          columns={3}
          featured={{
            kicker: "Featured sector",
            title: "Railways & Infrastructure",
            body: "Mechanised cleaning, manpower, maintenance and project support for high-footfall environments.",
            href: "/industries/railways-infrastructure",
            cta: "Explore the sector",
          }}
        />
      </div>

      {/* Mobile drawer — accordion, no hover dependency (3.2, 15) */}
      <MobileDrawer open={drawerOpen} nav={nav} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

function MegaPanel({
  open,
  eyebrow,
  title,
  items,
  basePath,
  hubLabel,
  featured,
  columns = 2,
}: {
  open: boolean;
  eyebrow: string;
  title: string;
  items: NavItem[];
  basePath: string;
  hubLabel: string;
  columns?: 2 | 3;
  featured: {
    kicker: string;
    title: string;
    body: string;
    href: string;
    cta: string;
  };
}) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full hidden origin-top overflow-hidden border-t border-line bg-warm/97 backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block",
        open
          ? "pointer-events-auto max-h-[34rem] opacity-100"
          : "pointer-events-none max-h-0 opacity-0"
      )}
      aria-hidden={!open}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_20rem] gap-12 px-10 py-10">
        <div>
          <p className="kicker text-gold-deep">{eyebrow}</p>
          <p className="mt-3 font-display text-[1.6rem] leading-tight text-charcoal">
            {title}
          </p>
          <ul
            className={cn(
              "mt-7 grid gap-x-8 gap-y-1",
              columns === 3 ? "grid-cols-3" : "grid-cols-2"
            )}
          >
            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`${basePath}/${item.slug}`}
                  tabIndex={open ? 0 : -1}
                  className="group -mx-3 flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-sand-soft/70"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/40 transition-colors group-hover:bg-gold" />
                  <span>
                    <span className="block text-[0.875rem] font-semibold text-charcoal transition-colors group-hover:text-brown">
                      {item.title}
                    </span>
                    {item.chips?.length ? (
                      <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted">
                        {item.chips.slice(0, 3).join(" · ")}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={basePath}
            tabIndex={open ? 0 : -1}
            className="group mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brown hover:text-gold-deep"
          >
            {hubLabel}
            <Arrow className="h-3.5 w-3.5" />
          </Link>
        </div>

        <Link
          href={featured.href}
          tabIndex={open ? 0 : -1}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-charcoal p-7 text-warm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
        >
          <span
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/15 blur-3xl transition-opacity duration-500 group-hover:opacity-160"
          />
          <span className="relative">
            <span className="kicker text-gold-soft">{featured.kicker}</span>
            <span className="mt-4 block font-display text-[1.4rem] leading-snug">
              {featured.title}
            </span>
            <span className="mt-3 block text-[0.8125rem] leading-relaxed text-warm/65">
              {featured.body}
            </span>
          </span>
          <span className="relative mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-gold-soft">
            {featured.cta}
            <Arrow className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function MobileDrawer({
  open,
  nav,
  onClose,
}: {
  open: boolean;
  nav: NavData;
  onClose: () => void;
}) {
  const [section, setSection] = useState<string | null>(null);

  const groups: { label: string; href: string; items?: NavItem[]; base?: string }[] =
    [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services", items: nav.services, base: "/services" },
      {
        label: "Industries",
        href: "/industries",
        items: nav.industries,
        base: "/industries",
      },
      { label: "Projects", href: "/projects" },
      { label: "Technology", href: "/technology" },
      { label: "Aqua Group", href: "/group", items: nav.group, base: "/group" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ];

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[68px] bottom-0 overflow-y-auto border-t border-line bg-warm transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      )}
      aria-hidden={!open}
    >
      <nav aria-label="Mobile" className="px-5 py-6 sm:px-8">
        <ul className="divide-y divide-line">
          {groups.map((group) => {
            const expanded = section === group.label;
            return (
              <li key={group.label} className="py-1">
                <div className="flex items-center justify-between">
                  <Link
                    href={group.href}
                    onClick={onClose}
                    tabIndex={open ? 0 : -1}
                    className="flex-1 py-3.5 font-display text-[1.375rem] text-charcoal"
                  >
                    {group.label}
                  </Link>
                  {group.items?.length ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${group.label}`}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setSection(expanded ? null : group.label)}
                      className="flex h-11 w-11 items-center justify-center rounded-lg text-muted"
                    >
                      <svg
                        viewBox="0 0 14 14"
                        aria-hidden="true"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          expanded && "rotate-45"
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      >
                        <path d="M7 1.5v11M1.5 7h11" />
                      </svg>
                    </button>
                  ) : null}
                </div>
                {group.items?.length ? (
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <ul className="overflow-hidden">
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`${group.base}/${item.slug}`}
                            onClick={onClose}
                            tabIndex={open && expanded ? 0 : -1}
                            className="block border-l border-gold/30 py-2.5 pl-4 text-[0.9375rem] text-muted"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                      <li className="pb-3 pl-4 pt-2">
                        <Chip tone="gold">All {group.label.toLowerCase()}</Chip>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        {/* No Request a Proposal button on mobile, per Nirav 2026-09-17. */}
        <div className="mt-8 flex flex-col gap-3 pb-10">
          <CtaLink
            href="/contact"
            variant="secondary"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="w-full"
          >
            Discuss Your Requirement
          </CtaLink>
        </div>
      </nav>
    </div>
  );
}
