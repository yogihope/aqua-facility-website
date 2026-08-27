"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field, ErrorSummary } from "./Field";
import { applicationSchema } from "@/lib/applicationSchema";
import { flattenErrors, type FieldErrors } from "@/lib/leadSchema";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; reference: string }
  | { state: "error"; message: string };

export function ApplicationForm({
  jobs,
}: {
  jobs: { slug: string; title: string; location: string }[];
}) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("job") ?? "";

  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const form = new FormData(event.currentTarget);
    const payload = {
      jobSlug: String(form.get("jobSlug") ?? ""),
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      location: String(form.get("location") ?? ""),
      skill: String(form.get("skill") ?? ""),
      experience: String(form.get("experience") ?? ""),
      message: String(form.get("message") ?? ""),
      consent,
      website: String(form.get("website") ?? ""),
    };

    const local = applicationSchema.safeParse(payload);
    if (!local.success) {
      setErrors(flattenErrors(local.error));
      summaryRef.current?.focus();
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/applications", {
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

      setStatus({ state: "success", reference: result.reference });
      formRef.current?.reset();
      setConsent(false);
    } catch {
      setStatus({
        state: "error",
        message: "We could not reach the server. Please try again.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        role="status"
        className="rounded-[1.5rem] border border-gold/40 bg-gold/[0.07] p-8 sm:p-10"
      >
        <h2 className="h3 text-charcoal">Application received.</h2>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
          Our HR team will review your details and contact you if there is a
          suitable match. Quote your reference when sending your CV.
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
      noValidate
      className="flex flex-col gap-6"
    >
      <div ref={summaryRef} tabIndex={-1}>
        <ErrorSummary
          message={status.state === "error" ? status.message : undefined}
          errors={errors}
        />
      </div>

      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Role you are applying for" name="jobSlug" error={errors.jobSlug}>
        {(props) => (
          <select defaultValue={preselected} {...props}>
            <option value="">General application</option>
            {jobs.map((job) => (
              <option key={job.slug} value={job.slug}>
                {job.title} — {job.location}
              </option>
            ))}
          </select>
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" required error={errors.fullName}>
          {(props) => <input type="text" autoComplete="name" {...props} />}
        </Field>
        <Field label="Email" name="email" required error={errors.email}>
          {(props) => (
            <input type="email" inputMode="email" autoComplete="email" {...props} />
          )}
        </Field>
        <Field label="Phone" name="phone" required error={errors.phone}>
          {(props) => (
            <input type="tel" inputMode="tel" autoComplete="tel" {...props} />
          )}
        </Field>
        <Field label="Current location" name="location" error={errors.location}>
          {(props) => (
            <input type="text" autoComplete="address-level2" {...props} />
          )}
        </Field>
        <Field label="Skill / trade" name="skill" error={errors.skill}>
          {(props) => (
            <input type="text" placeholder="Electrician, housekeeping, payroll…" {...props} />
          )}
        </Field>
        <Field label="Experience" name="experience" error={errors.experience}>
          {(props) => <input type="text" placeholder="e.g. 3 years" {...props} />}
        </Field>
      </div>

      <Field label="Anything else we should know" name="message" error={errors.message}>
        {(props) => (
          <textarea rows={5} {...props} className={`${props.className} min-h-[8rem] py-3`} />
        )}
      </Field>

      <div className="rounded-xl border border-dashed border-line-strong bg-white/50 px-5 py-4">
        <p className="text-[0.8125rem] font-semibold text-charcoal/85">
          CV upload
          <span className="ml-1.5 font-normal text-muted/70">(coming at launch)</span>
        </p>
        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">
          Secure upload is enabled once the file whitelist, size limit and malware
          scanning are configured. Email your CV to{" "}
          <a
            href="mailto:careers@aquafacility.com"
            className="font-medium text-brown underline underline-offset-2"
          >
            careers@aquafacility.com
          </a>{" "}
          quoting the reference shown after you submit.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#8B4A33]"
          aria-invalid={Boolean(errors.consent)}
        />
        <span>
          I consent to Aqua storing these details and contacting me about
          opportunities.
          {errors.consent ? (
            <span className="mt-1 block font-medium text-brown">
              {errors.consent}
            </span>
          ) : null}
        </span>
      </label>

      <div>
        <Button
          type="submit"
          disabled={status.state === "submitting"}
          arrow={status.state !== "submitting"}
        >
          {status.state === "submitting" ? "Submitting…" : "Submit application"}
        </Button>
      </div>
    </form>
  );
}
