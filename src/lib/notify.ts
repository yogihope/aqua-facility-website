import "server-only";

import nodemailer from "nodemailer";
import { site } from "@/content/site";

/**
 * Enquiry notifications.
 *
 * Every submission is written to the database first — that is the record the
 * admin screen reads. This sends a copy to the operations inbox on top of it,
 * and only when SMTP is configured. With no SMTP settings the function does
 * nothing and says so in the log, so a missing mail server can never stop a
 * form from being accepted.
 *
 * Required environment: SMTP_HOST, SMTP_USER, SMTP_PASS.
 * Optional: SMTP_PORT (default 587), SMTP_SECURE ("true" for port 465),
 * SMTP_FROM (defaults to SMTP_USER), NOTIFY_EMAIL (defaults to the published
 * operations inbox).
 */

function transport() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export type NotificationField = [label: string, value: string | null | undefined];

export async function notifyTeam({
  subject,
  intro,
  fields,
  replyTo,
}: {
  subject: string;
  intro: string;
  fields: NotificationField[];
  replyTo?: string;
}): Promise<void> {
  const mailer = transport();
  if (!mailer) {
    console.info("[aqua] SMTP not configured — notification email skipped.");
    return;
  }

  const rows = fields.filter(([, value]) => value);
  const text = [intro, "", ...rows.map(([l, v]) => `${l}: ${v}`)].join("\n");
  const html = `<p>${escapeHtml(intro)}</p><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="border:1px solid #ddd"><b>${escapeHtml(label)}</b></td><td style="border:1px solid #ddd">${escapeHtml(
          String(value)
        ).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("")}</table>`;

  try {
    await mailer.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: process.env.NOTIFY_EMAIL ?? site.email,
      replyTo,
      subject,
      text,
      html,
    });
  } catch (error) {
    // A failed email must not fail the submission: it is already stored.
    console.error("[aqua] Notification email failed", error);
  }
}
