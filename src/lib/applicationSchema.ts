import { z } from "zod";

/** Section 6.34 — candidate application. Validated on both sides (13.2). */
export const applicationSchema = z.object({
  jobSlug: z.string().trim().max(120).optional().or(z.literal("")),
  fullName: z
    .string({ error: "Full name is required" })
    .trim()
    .min(1, "Full name is required")
    .max(120),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(160),
  phone: z
    .string({ error: "Phone is required" })
    .trim()
    .min(1, "Phone is required")
    .max(24)
    .regex(/^[+0-9][0-9\s\-()]{6,23}$/, "Enter a valid phone number"),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  skill: z.string().trim().max(120).optional().or(z.literal("")),
  experience: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Consent is required to submit this form",
  }),
  website: z.string().max(0).optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
