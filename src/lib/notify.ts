import "server-only";

import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/content/site";

/**
 * Enquiry notifications over SMTP.
 *
 * Every submission is written to the database first — that is the record the
 * admin screen reads. This sends a copy to the operations inbox on top of it,
 * and only when SMTP is configured. With the settings missing the function
 * does nothing and says so in the log, so mail setup can never stop a form
 * from being accepted.
 *
 * Required environment: SMTP_HOST, SMTP_USER, SMTP_PASS.
 * Optional: SMTP_PORT (default 465), SMTP_SECURE ("false" for STARTTLS on 587),
 * SMTP_FROM (defaults to SMTP_USER), NOTIFY_EMAIL (defaults to the published
 * operations inbox).
 *
 * Gmail note: SMTP_PASS must be a Google App Password, not the account
 * password, and the From address Gmail shows is always the authenticated
 * account.
 */

export type NotificationField = [label: string, value: string | null | undefined];

let cached: Transporter | null | undefined;

function transport() {
  if (cached !== undefined) return cached;

  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  // App passwords are often pasted with the spaces Google displays.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");

  if (!host || !user || !pass) {
    cached = null;
    return cached;
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  cached = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
  });
  return cached;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

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
  const html = `<p>${escapeHtml(intro)}</p><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="border:1px solid #ddd;background:#f7f4ee"><b>${escapeHtml(
          label
        )}</b></td><td style="border:1px solid #ddd">${escapeHtml(String(value)).replace(
          /\n/g,
          "<br>"
        )}</td></tr>`
    )
    .join("")}</table>`;

  try {
    await mailer.sendMail({
      from: `"${site.companyName} website" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
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
