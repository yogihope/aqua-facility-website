"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field, ErrorSummary, CheckboxCard } from "./Field";
import { proposalSchema, flattenErrors, type FieldErrors } from "@/lib/leadSchema";
import { site } from "@/content/site";

type Option = { slug: string; title: string };

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; reference: string }
  | { state: "error"; message: string };

/**
 * Section 6.37 — Request a Proposal.
 * Fires proposal_form_start on first interaction and proposal_form_submit on
 * success (Section 12). The success state returns the lead reference ID.
 */
export function ProposalForm({
  services,
  industries,
  variant = "proposal",
}: {
  services: Option[];
  industries: Option[];
  variant?: "proposal" | "contact";
}) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const startedRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isContact = variant === "contact";

  // Section 12 — proposal_form_start on first field interaction.
  const onFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("proposal_form_start", { source_page: pathname });
  };

  useEffect(() => {
    if (Object.keys(errors).length && summaryRef.current) {
      summaryRef.current.focus();
    }
  }, [errors]);

  const toggleService = (slug: string) => {
    onFirstInteraction();
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug]
    );
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const form = new FormData(event.currentTarget);
    const utm = new URLSearchParams(window.location.search);

    const payload = {
      type: variant,
      fullName: String(form.get("fullName") ?? ""),
      company: String(form.get("company") ?? ""),
      designation: String(form.get("designation") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      cityState: String(form.get("cityState") ?? ""),
      servicesNeeded: isContact && selected.length === 0 ? ["general"] : selected,
      industry: String(form.get("industry") ?? ""),
      siteLocation: String(form.get("siteLocation") ?? ""),
      workforceNeed: String(form.get("workforceNeed") ?? ""),
      summary: String(form.get("summary") ?? ""),
      consent,
      sourcePage: pathname,
      utmSource: utm.get("utm_source") ?? undefined,
      utmMedium: utm.get("utm_medium") ?? undefined,
      utmCampaign: utm.get("utm_campaign") ?? undefined,
      website: String(form.get("website") ?? ""),
    };

    // Client-side pass first, so obvious mistakes never cost a round trip.
    const local = proposalSchema.safeParse(payload);
    if (!local.success) {
      setErrors(flattenErrors(local.error));
      setStatus({ state: "idle" });
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus({
          state: "error",
          message: result.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      track(isContact ? "contact_form_submit" : "proposal_form_submit", {
        service: selected[0],
        industry: payload.industry,
        location: payload.siteLocation,
        source_page: pathname,
      });

      setStatus({ state: "success", reference: result.reference });
      formRef.current?.reset();
      setSelected([]);
      setConsent(false);
    } catch {
      setStatus({
        state: "error",
        message:
          "We could not reach the server. Please check your connection and try again.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        role="status"
        className="rounded-[1.5rem] border border-gold/40 bg-gold/[0.07] p-8 sm:p-10"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brown text-warm">
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 10.5 3.5 3.5L15 7" />
          </svg>
        </div>
        <h2 className="h3 mt-6 text-charcoal">Thank you.</h2>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
          Your requirement has been received and will be routed to the relevant
          Aqua team.
        </p>
        <dl className="mt-6 border-t border-gold/25 pt-5">
          <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
            Your reference
          </dt>
          <dd className="mt-1.5 font-display text-[1.25rem] text-brown">
            {status.reference}
          </dd>
        </dl>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={onFirstInteraction}
      noValidate
      className="flex flex-col gap-6"
    >
      <div ref={summaryRef} tabIndex={-1}>
        <ErrorSummary
          message={status.state === "error" ? status.message : undefined}
          errors={errors}
        />
      </div>

      {/* Honeypot — visually hidden, never announced, never focusable */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website-field">Website</label>
        <input
          id="website-field"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* 15 — two-column groups where logical on desktop, one column on mobile */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" required error={errors.fullName}>
          {(props) => <input type="text" autoComplete="name" {...props} />}
        </Field>

        <Field
          label={isContact ? "Company / organisation" : "Company / organisation"}
          name="company"
          required={!isContact}
          error={errors.company}
        >
          {(props) => <input type="text" autoComplete="organization" {...props} />}
        </Field>

        <Field label="Designation" name="designation" error={errors.designation}>
          {(props) => (
            <input type="text" autoComplete="organization-title" {...props} />
          )}
        </Field>

        <Field label="Work email" name="email" required error={errors.email}>
          {(props) => (
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              {...props}
            />
          )}
        </Field>

        <Field label="Phone" name="phone" required error={errors.phone}>
          {(props) => (
            <input type="tel" inputMode="tel" autoComplete="tel" {...props} />
          )}
        </Field>

        <Field label="City / state" name="cityState" error={errors.cityState}>
          {(props) => <input type="text" autoComplete="address-level2" {...props} />}
        </Field>
      </div>

      {/* Service requirement — multi-select drives routing (13.1) */}
      <fieldset className="flex flex-col gap-3">
        <legend className="text-[0.8125rem] font-semibold text-charcoal/85">
          Service required
          {!isContact ? (
            <span className="ml-1 text-brown" aria-hidden="true">
              *
            </span>
          ) : (
            <span className="ml-1.5 font-normal text-muted/70">(optional)</span>
          )}
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {services.map((service) => (
            <CheckboxCard
              key={service.slug}
              name="servicesNeeded"
              label={service.title}
              checked={selected.includes(service.slug)}
              onChange={() => toggleService(service.slug)}
            />
          ))}
          <CheckboxCard
            name="servicesNeeded"
            label="Security services"
            checked={selected.includes("security")}
            onChange={() => toggleService("security")}
          />
        </div>
        {errors.servicesNeeded ? (
          <p className="text-[0.75rem] font-medium text-brown">
            {errors.servicesNeeded}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Industry"
          name="industry"
          required={!isContact}
          error={errors.industry}
        >
          {(props) => (
            <select defaultValue="" {...props}>
              <option value="" disabled>
                Select an industry
              </option>
              {industries.map((industry) => (
                <option key={industry.slug} value={industry.title}>
                  {industry.title}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          )}
        </Field>

        <Field
          label="Site / project location"
          name="siteLocation"
          error={errors.siteLocation}
        >
          {(props) => <input type="text" {...props} />}
        </Field>
      </div>

      {!isContact ? (
        <Field
          label="Approximate workforce requirement"
          name="workforceNeed"
          error={errors.workforceNeed}
          hint="A rough headcount range is enough at this stage."
        >
          {(props) => <input type="text" {...props} />}
        </Field>
      ) : null}

      <Field
        label="Requirement summary"
        name="summary"
        required
        error={errors.summary}
        hint="What has to be managed, improved, staffed, maintained or executed?"
      >
        {(props) => <textarea rows={6} {...props} className={`${props.className} min-h-[9rem] py-3`} />}
      </Field>

      {/* Tender / RFP upload — 6.37. Backend handling is a launch item. */}
      <div className="rounded-xl border border-dashed border-line-strong bg-white/50 px-5 py-4">
        <p className="text-[0.8125rem] font-semibold text-charcoal/85">
          Tender / RFP document
          <span className="ml-1.5 font-normal text-muted/70">(optional)</span>
        </p>
        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">
          Secure upload is enabled at launch, once the file whitelist, size limit
          and malware scanning are configured. For now, email your document to{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-brown underline underline-offset-2"
          >
            {site.email}
          </a>{" "}
          quoting the reference you receive here.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            onFirstInteraction();
            setConsent(e.target.checked);
          }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#8B4A33]"
          aria-invalid={Boolean(errors.consent)}
        />
        <span>
          I consent to Aqua contacting me about this requirement and storing the
          details submitted in this form.
          {errors.consent ? (
            <span className="mt-1 block font-medium text-brown">
              {errors.consent}
            </span>
          ) : null}
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status.state === "submitting"}
          arrow={status.state !== "submitting"}
        >
          {status.state === "submitting"
            ? "Submitting…"
            : isContact
              ? "Send enquiry"
              : "Submit requirement"}
        </Button>
        <p className="text-[0.75rem] text-muted">
          We respond to enquiries on working days.
        </p>
      </div>
    </form>
  );
}

/** Section 12 — pushes to the GA4/GTM dataLayer when one is present. */
function track(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}
