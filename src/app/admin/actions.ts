"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  codeMatches,
  sessionToken,
} from "@/lib/adminAuth";

// A short numeric code is guessable, so wrong attempts are capped per IP.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map<string, number[]>();

function recentFailures(ip: string, now: number): number[] {
  return (failures.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
}

export type LoginState = { error: string | null };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  const now = Date.now();
  const recent = recentFailures(ip, now);

  if (recent.length >= MAX_FAILURES) {
    return { error: "Too many wrong attempts. Try again in 15 minutes." };
  }

  const code = String(formData.get("code") ?? "");
  const token = sessionToken();

  if (!token || !codeMatches(code)) {
    failures.set(ip, [...recent, now]);
    return { error: token ? "Wrong code." : "Admin access is not configured." };
  }

  failures.delete(ip);
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: ADMIN_SESSION_SECONDS,
  });
  redirect("/admin/");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/");
}
