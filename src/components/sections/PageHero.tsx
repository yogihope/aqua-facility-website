import { Container } from "@/components/ui/Container";
import { Kicker, Breadcrumbs } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Shared inner-page hero.
 * 11.1 — breadcrumbs on all inner pages, exactly one H1 per page.
 * 15 — content-first on mobile; the aside stacks below the copy.
 */
export function PageHero({
  kicker,
  title,
  intro,
  breadcrumbs,
  aside,
  tone = "light",
  meta,
}: {
  kicker: string;
  title: string;
  intro?: string;
  breadcrumbs: { name: string; href?: string }[];
  aside?: React.ReactNode;
  tone?: "light" | "dark";
  meta?: { label: string; value: string }[];
}) {
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-[100px] lg:pt-[124px]",
        dark ? "dark-section bg-charcoal" : "grain bg-warm"
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-[8%] -top-[10%] h-[32rem] w-[32rem] rounded-full blur-[130px]",
          dark ? "bg-brown/30" : "bg-sand/50"
        )}
      />

      <Container className="relative">
        <div className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <Breadcrumbs items={breadcrumbs} tone={tone} />
          </Reveal>

          <div
            className={cn(
              "mt-10 grid gap-10",
              aside ? "lg:grid-cols-[1.15fr_0.85fr] lg:gap-16" : ""
            )}
          >
            <div>
              <Reveal delay={60}>
                <Kicker tone={dark ? "warm" : "gold"}>{kicker}</Kicker>
              </Reveal>
              <Reveal delay={120}>
                <h1
                  className={cn("h1 mt-6", dark ? "text-warm" : "text-charcoal")}
                >
                  {title}
                </h1>
              </Reveal>
              {intro ? (
                <Reveal delay={180}>
                  <p className="lede mt-7 max-w-2xl">{intro}</p>
                </Reveal>
              ) : null}

              {meta?.length ? (
                <Reveal delay={240}>
                  <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-4">
                    {meta.map((item) => (
                      <div key={item.label}>
                        <dt
                          className={cn(
                            "text-[0.6875rem] font-semibold uppercase tracking-[0.14em]",
                            dark ? "text-warm/40" : "text-muted"
                          )}
                        >
                          {item.label}
                        </dt>
                        <dd
                          className={cn(
                            "mt-1.5 text-[0.9375rem] font-medium",
                            dark ? "text-warm/85" : "text-charcoal"
                          )}
                        >
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ) : null}
            </div>

            {aside ? (
              <Reveal delay={200} className="lg:pt-2">
                {aside}
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>

      <div className="hairline" />
    </section>
  );
}
