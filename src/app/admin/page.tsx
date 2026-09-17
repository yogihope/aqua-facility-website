import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { adminEnabled, isAdmin } from "@/lib/adminAuth";
import { services } from "@/content/services";
import { jobs } from "@/content/careers";
import { cn } from "@/lib/utils";
import { LoginForm } from "./LoginForm";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 200;

type Tab = "leads" | "applications";

const serviceTitle = new Map(services.map((s) => [s.slug, s.navTitle]));
const jobTitle = new Map(jobs.map((j) => [j.slug, j.title]));

function formatWhen(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function asList(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

async function loadData() {
  try {
    const [leads, applications, leadCount, applicationCount] = await Promise.all([
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: PAGE_SIZE }),
      prisma.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
      }),
      prisma.lead.count(),
      prisma.jobApplication.count(),
    ]);
    return { ok: true as const, leads, applications, leadCount, applicationCount };
  } catch (error) {
    console.error("[aqua] Admin could not read submissions", error);
    return { ok: false as const };
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  if (!(await isAdmin())) {
    return (
      <section className="flex min-h-[80vh] items-center px-5 pb-16 pt-32">
        {adminEnabled() ? (
          <LoginForm />
        ) : (
          <p className="mx-auto text-muted">Admin access is not configured.</p>
        )}
      </section>
    );
  }

  const { tab: rawTab } = await searchParams;
  const tab: Tab = rawTab === "applications" ? "applications" : "leads";
  const data = await loadData();

  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-20 pt-32 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="h2 text-charcoal">Form submissions</h1>
        <form action={logout}>
          <button
            type="submit"
            className="h-10 rounded-xl border border-line-strong px-4 text-[0.875rem] font-medium text-charcoal hover:border-gold"
          >
            Log out
          </button>
        </form>
      </div>

      {!data.ok ? (
        <p className="mt-10 rounded-2xl border border-brown/30 bg-brown/5 p-6 text-[0.9375rem] text-brown">
          The database is not reachable, so submissions cannot be shown. Check
          DATABASE_URL on the server.
        </p>
      ) : (
        <>
          <nav className="mt-8 flex gap-2" aria-label="Submission type">
            <TabLink href="/admin/" active={tab === "leads"}>
              Enquiries &amp; proposals ({data.leadCount})
            </TabLink>
            <TabLink href="/admin/?tab=applications" active={tab === "applications"}>
              Job applications ({data.applicationCount})
            </TabLink>
          </nav>

          {tab === "leads" ? (
            <List empty="No enquiries yet.">
              {data.leads.map((lead) => (
                <Entry
                  key={lead.id}
                  title={`${lead.fullName} · ${lead.company}`}
                  badge={lead.type === "contact" ? "Contact form" : "Proposal request"}
                  when={formatWhen(lead.createdAt)}
                  summary={`${lead.email} · ${lead.phone}`}
                  rows={[
                    ["Reference", lead.reference],
                    ["Designation", lead.designation],
                    ["Email", lead.email],
                    ["Phone", lead.phone],
                    ["City / state", lead.cityState],
                    [
                      "Services",
                      asList(lead.servicesNeeded)
                        .map((s) => serviceTitle.get(s) ?? s)
                        .join(", "),
                    ],
                    ["Industry", lead.industry],
                    ["Site location", lead.siteLocation],
                    ["Workforce need", lead.workforceNeed],
                    ["Routed to", lead.routedTo],
                    ["Requirement", lead.summary],
                    ["Source page", lead.sourcePage],
                    [
                      "UTM",
                      [lead.utmSource, lead.utmMedium, lead.utmCampaign]
                        .filter(Boolean)
                        .join(" / "),
                    ],
                  ]}
                />
              ))}
            </List>
          ) : (
            <List empty="No job applications yet.">
              {data.applications.map((app) => (
                <Entry
                  key={app.id}
                  title={app.fullName}
                  badge={
                    app.jobSlug
                      ? (jobTitle.get(app.jobSlug) ?? app.jobSlug)
                      : "General application"
                  }
                  when={formatWhen(app.createdAt)}
                  summary={`${app.email} · ${app.phone}`}
                  rows={[
                    ["Reference", app.reference],
                    ["Email", app.email],
                    ["Phone", app.phone],
                    ["Location", app.location],
                    ["Skill", app.skill],
                    ["Experience", app.experience],
                    ["Message", app.message],
                  ]}
                />
              ))}
            </List>
          )}

          {(tab === "leads" ? data.leadCount : data.applicationCount) > PAGE_SIZE ? (
            <p className="mt-6 text-[0.8125rem] text-muted">
              Showing the latest {PAGE_SIZE}.
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}

function TabLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-xl px-4 py-2.5 text-[0.875rem] font-medium transition-colors",
        active
          ? "bg-charcoal text-warm"
          : "border border-line-strong text-charcoal hover:border-gold"
      )}
    >
      {children}
    </Link>
  );
}

function List({ empty, children }: { empty: string; children: React.ReactNode[] }) {
  if (children.length === 0) {
    return <p className="mt-10 text-[0.9375rem] text-muted">{empty}</p>;
  }
  return <ul className="mt-8 flex flex-col gap-3">{children}</ul>;
}

function Entry({
  title,
  badge,
  when,
  summary,
  rows,
}: {
  title: string;
  badge: string;
  when: string;
  summary: string;
  rows: [string, string | null | undefined][];
}) {
  return (
    <li>
      <details className="group rounded-2xl border border-line bg-white/80 open:border-gold/40">
        <summary className="flex cursor-pointer list-none flex-col gap-1.5 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span className="min-w-0">
            <span className="block truncate text-[1rem] font-semibold text-charcoal">
              {title}
            </span>
            <span className="block truncate text-[0.8125rem] text-muted">
              {summary}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-3 text-[0.75rem]">
            <span className="rounded-full bg-gold/15 px-2.5 py-1 font-semibold text-gold-deep">
              {badge}
            </span>
            <span className="text-muted">{when}</span>
          </span>
        </summary>
        <dl className="grid gap-x-6 gap-y-3 border-t border-line p-5 sm:grid-cols-[10rem_1fr]">
          {rows
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-muted">
                  {label}
                </dt>
                <dd className="whitespace-pre-wrap break-words text-[0.9375rem] text-charcoal">
                  {value}
                </dd>
              </div>
            ))}
        </dl>
      </details>
    </li>
  );
}
