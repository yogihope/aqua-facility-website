"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Form primitives — Section 7 / 14.2.
 * Labels are always visible (never placeholder-only), errors render inline and
 * are wired to the control with aria-describedby, and every control clears the
 * 44px touch target.
 */

const controlBase =
  "w-full rounded-xl border bg-white/80 px-4 py-3 text-[0.9375rem] text-charcoal placeholder:text-muted/50 transition-colors duration-200 focus:border-gold focus:outline-none focus-visible:outline-none min-h-[48px]";

export function Field({
  label,
  name,
  error,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    className: string;
  }) => React.ReactNode;
  className?: string;
}) {
  const id = useId();
  const describedBy =
    [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-[0.8125rem] font-semibold text-charcoal/85"
      >
        {label}
        {required ? (
          <span className="ml-1 text-brown" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-muted/70">(optional)</span>
        )}
      </label>

      {children({
        id,
        name,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
        className: cn(controlBase, error ? "border-brown" : "border-line-strong"),
      })}

      {hint ? (
        <p id={`${id}-hint`} className="text-[0.75rem] text-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-center gap-1.5 text-[0.75rem] font-medium text-brown"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M8 5v3.5M8 10.6h.01" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Form-level error summary — 14.2 requires one in addition to inline errors. */
export function ErrorSummary({
  message,
  errors,
}: {
  message?: string;
  errors?: Record<string, string | undefined>;
}) {
  const entries = Object.entries(errors ?? {}).filter(([, v]) => v);
  if (!message && entries.length === 0) return null;

  return (
    <div
      role="alert"
      tabIndex={-1}
      className="rounded-xl border border-brown/35 bg-brown/[0.06] px-5 py-4"
    >
      <p className="text-[0.875rem] font-semibold text-brown-deep">
        {message ?? "Please correct the following before submitting."}
      </p>
      {entries.length ? (
        <ul className="mt-2.5 flex flex-col gap-1">
          {entries.map(([field, error]) => (
            <li key={field} className="text-[0.8125rem] text-brown-deep/85">
              {error}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function CheckboxCard({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[0.875rem] transition-colors duration-200",
        checked
          ? "border-gold bg-gold/[0.09] text-charcoal"
          : "border-line-strong bg-white/70 text-muted hover:border-gold/45"
      )}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 shrink-0 accent-[#8B4A33]"
      />
      {label}
    </label>
  );
}
