import { z } from "zod";

/**
 * Section 13.2 — the same schema runs in the browser and on the server.
 * Client-side validation is a convenience; the server validates independently
 * and never trusts the submitted payload.
 */

/**
 * A missing key and an empty string are the same mistake to the person filling
 * the form, so both produce the same message. Without the `error` option zod
 * reports "expected string, received undefined" for a missing key, which is not
 * an accessible error message (14.2).
 */
const requiredString = (field: string, max = 200) =>
  z
    .string({ error: `${field} is required` })
    .trim()
    .min(1, `${field} is required`)
    .max(max);

export const proposalSchema = z.object({
  type: z.enum(["proposal", "contact"]).default("proposal"),
  fullName: requiredString("Full name", 120),
  company: requiredString("Company or organisation", 160),
  designation: z.string().trim().max(120).optional().or(z.literal("")),
  email: z
    .string({ error: "Work email is required" })
    .trim()
    .min(1, "Work email is required")
    .email("Enter a valid work email address")
    .max(160),
  phone: z
    .string({ error: "Phone is required" })
    .trim()
    .min(1, "Phone is required")
    .max(24)
    .regex(/^[+0-9][0-9\s\-()]{6,23}$/, "Enter a valid phone number"),
  cityState: z.string().trim().max(120).optional().or(z.literal("")),
  servicesNeeded: z
    .array(z.string().max(80), { error: "Select at least one service requirement" })
    .min(1, "Select at least one service requirement")
    .max(10),
  industry: z.string().trim().max(120).optional().or(z.literal("")),
  siteLocation: z.string().trim().max(160).optional().or(z.literal("")),
  workforceNeed: z.string().trim().max(80).optional().or(z.literal("")),
  summary: z
    .string({ error: "A requirement summary is required" })
    .trim()
    .min(20, "Give us at least a sentence or two about the requirement")
    .max(4000),
  consent: z.literal(true, {
    message: "Consent is required to submit this form",
  }),
  sourcePage: z.string().max(200).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  // Honeypot: a real user never fills this. Bots usually do.
  website: z.string().max(0).optional(),
});

export type ProposalInput = z.infer<typeof proposalSchema>;

export const contactSchema = proposalSchema.extend({
  type: z.literal("contact"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  servicesNeeded: z.array(z.string().max(80)).max(10).default([]),
});

/** Field-level errors keyed by field name, for inline display (7 / 14.2). */
export type FieldErrors = Partial<Record<string, string>>;

export function flattenErrors(error: z.ZodError): FieldErrors {
  const result: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
