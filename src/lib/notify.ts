import "server-only";

import { site } from "@/content/site";

/**
 * Enquiry notifications through EmailJS.
 *
 * Every submission is written to the database first — that is the record the
 * admin screen reads. This sends a copy to the operations inbox on top of it,
 * and only when EmailJS is configured. With the keys missing the function does
 * nothing and says so in the log, so mail setup can never stop a form from
 * being accepted.
 *
 * The call is made from the server with the private key, so the keys never
 * reach the browser and EmailJS's strict mode stays satisfied.
 *
 * Required environment:
 *   EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY,
 *   EMAILJS_PRIVATE_KEY
 * Optional: NOTIFY_EMAIL (defaults to the published operations inbox).
 *
 * The EmailJS template should use these variables:
 *   {{subject}} {{message}} {{reply_to}} {{from_name}} {{to_email}}
 */

const ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export type NotificationField = [label: string, value: string | null | undefined];

function config() {
  const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.EMAILJS_PUBLIC_KEY?.trim();
  const privateKey = process.env.EMAILJS_PRIVATE_KEY?.trim();
  if (!serviceId || !templateId || !publicKey || !privateKey) return null;
  return { serviceId, templateId, publicKey, privateKey };
}

export async function notifyTeam({
  subject,
  intro,
  fields,
  replyTo,
  fromName,
}: {
  subject: string;
  intro: string;
  fields: NotificationField[];
  replyTo?: string;
  fromName?: string;
}): Promise<void> {
  const cfg = config();
  if (!cfg) {
    console.info("[aqua] EmailJS not configured — notification email skipped.");
    return;
  }

  const message = [
    intro,
    "",
    ...fields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: cfg.serviceId,
        template_id: cfg.templateId,
        user_id: cfg.publicKey,
        accessToken: cfg.privateKey,
        template_params: {
          subject,
          message,
          reply_to: replyTo ?? "",
          from_name: fromName ?? site.companyName,
          to_email: process.env.NOTIFY_EMAIL ?? site.email,
        },
      }),
      // A slow mail provider must not hold the visitor's submission open.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(
        "[aqua] EmailJS rejected the notification",
        response.status,
        (await response.text()).slice(0, 300)
      );
    }
  } catch (error) {
    // A failed email must not fail the submission: it is already stored.
    console.error("[aqua] Notification email failed", error);
  }
}
