export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Date-only values ("2026-08-11") parse as UTC midnight, so formatting them in
 * the server's local zone can shift the day backwards west of Greenwich. An
 * award citation has to render the date printed on the certificate everywhere,
 * so this pins the formatter to UTC.
 */
export function formatAwardDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

/** Lead / application reference IDs — surfaced to the user on success (6.37). */
export function makeReference(prefix: "AQ-RFP" | "AQ-CON" | "AQ-JOB") {
  const stamp = Date.now().toString(36).toUpperCase();
  const salt = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${salt}`;
}
