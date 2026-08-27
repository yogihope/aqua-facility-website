import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { proposalSchema, flattenErrors } from "@/lib/leadSchema";
import { routeLead } from "@/content/site";
import { makeReference } from "@/lib/utils";

/**
 * Section 13 — form handling, lead routing and CRM handoff.
 *
 * Implemented here:
 *  - server-side validation independent of the client (13.2)
 *  - rate limiting and a honeypot as bot protection (13.2)
 *  - source page and UTM stored with the lead (13.2)
 *  - routing derived from the 13.1 table, never from the client payload
 *  - acknowledgement returned ONLY after the database write succeeds (13.2)
 *
 * Still to wire before launch:
 *  - CAPTCHA / Turnstile token verification
 *  - CRM push and internal notification email
 *  - file upload handling for tender/RFP documents (whitelist + size + scan)
 * Recipient addresses stay server-side — they are never sent to the client.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * In-memory limiter: correct for a single instance, and the right default for
 * a site that has not yet chosen a shared store. Move to Redis or the edge
 * platform's rate limiter before scaling past one server.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = proposalSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        errors: flattenErrors(parsed.error),
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot: accept silently so a bot cannot distinguish success from failure.
  if (data.website) {
    return NextResponse.json({ ok: true, reference: makeReference("AQ-RFP") });
  }

  const reference = makeReference(data.type === "contact" ? "AQ-CON" : "AQ-RFP");

  try {
    await prisma.lead.create({
      data: {
        reference,
        type: data.type,
        fullName: data.fullName,
        company: data.company || "Not provided",
        designation: data.designation || null,
        email: data.email,
        phone: data.phone,
        cityState: data.cityState || null,
        servicesNeeded: data.servicesNeeded,
        industry: data.industry || null,
        siteLocation: data.siteLocation || null,
        workforceNeed: data.workforceNeed || null,
        summary: data.summary,
        consent: data.consent,
        // Routing is derived server-side from the 13.1 table.
        routedTo: routeLead(data.servicesNeeded),
        sourcePage: data.sourcePage || null,
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
      },
    });
  } catch (error) {
    console.error("[aqua] Lead persistence failed", error);
    // 13.2: no acknowledgement unless the lead was actually stored.
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not record your requirement just now. Please call or email us and we will pick it up directly.",
      },
      { status: 503 }
    );
  }

  // TODO(launch): CRM push + internal notification, after the write succeeds.

  return NextResponse.json({ ok: true, reference });
}
