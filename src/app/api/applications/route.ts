import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { applicationSchema } from "@/lib/applicationSchema";
import { flattenErrors } from "@/lib/leadSchema";
import { makeReference } from "@/lib/utils";

/**
 * Careers application intake (6.34).
 * CV upload is deliberately not accepted yet: Section 13.2 requires a file
 * whitelist, size limit and malware scanning, and that infrastructure is a
 * launch item. The form collects candidate details and a reference; documents
 * are requested by the HR team against that reference.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
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

  const parsed = applicationSchema.safeParse(payload);
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
  if (data.website) {
    return NextResponse.json({ ok: true, reference: makeReference("AQ-JOB") });
  }

  const reference = makeReference("AQ-JOB");

  try {
    // Resolve the job by slug server-side; the client never supplies an id.
    const job = data.jobSlug
      ? await prisma.job.findUnique({
          where: { slug: data.jobSlug },
          select: { id: true },
        })
      : null;

    await prisma.jobApplication.create({
      data: {
        reference,
        jobId: job?.id ?? null,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location || null,
        skill: data.skill || null,
        experience: data.experience || null,
        message: data.message || null,
        consent: data.consent,
      },
    });
  } catch (error) {
    console.error("[aqua] Application persistence failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not record your application just now. Please email your details to careers@aquafacility.com.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, reference });
}
