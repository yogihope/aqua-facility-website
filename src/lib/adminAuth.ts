import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin access is a single shared code from `ADMIN_CODE`. The session cookie
 * holds an HMAC of that code rather than the code itself, so changing the code
 * in the environment signs everyone out. With no code configured the admin
 * area stays locked.
 */

export const ADMIN_COOKIE = "aqua_admin";
export const ADMIN_SESSION_SECONDS = 12 * 60 * 60;

function adminCode(): string | null {
  const code = process.env.ADMIN_CODE?.trim();
  return code ? code : null;
}

export function adminEnabled(): boolean {
  return adminCode() !== null;
}

export function sessionToken(): string | null {
  const code = adminCode();
  if (!code) return null;
  return createHmac("sha256", code).update("aqua-admin-session").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function codeMatches(input: string): boolean {
  const code = adminCode();
  return code !== null && safeEqual(input.trim(), code);
}

export async function isAdmin(): Promise<boolean> {
  const expected = sessionToken();
  if (!expected) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return value ? safeEqual(value, expected) : false;
}
