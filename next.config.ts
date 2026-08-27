import type { NextConfig } from "next";
import { redirects as legacyRedirects } from "./src/content/redirects";

/**
 * Section 11.3 — legacy URL migration.
 *
 * Sources come from the Appendix A inventory, which lists every legacy URL in
 * its trailing-slash form. `statusCode: 301` is set explicitly rather than
 * using `permanent: true`, which emits a 308 — the spec asks for 301s, and the
 * redirect map is validated by crawl against that status.
 */
function buildRedirects() {
  return [
    // Legacy URLs resolve straight to their new home — one hop, 301.
    ...legacyRedirects.map((entry) => ({
      source: entry.source,
      destination: entry.destination,
      statusCode: entry.statusCode,
    })),

  ];
}

/** Section 14.3 — security headers. CSP is report-only until asset sources are final. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Enable HSTS only after the production certificate and domain are verified.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.google-analytics.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Section 3.1 lists every canonical URL with a trailing slash, and Appendix A
   * lists the legacy URLs the same way. Matching that form keeps the redirect
   * map, canonicals and sitemap consistent with the documented IA, and lets each
   * legacy URL resolve in a single hop (11.3: one hop maximum).
   */
  trailingSlash: true,

  /**
   * Next's own trailing-slash normalisation runs BEFORE `redirects()`, which
   * turns every legacy URL into a two-hop chain (normalise, then redirect).
   * Section 11.3 allows one hop, so normalisation is disabled here and handled
   * explicitly in `src/proxy.ts`, which runs after `redirects()`.
   */
  skipTrailingSlashRedirect: true,

  // 14.1 — responsive AVIF/WebP delivery for the photography added at content freeze.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 430, 768, 1024, 1280, 1440, 1728, 1920],
  },

  async redirects() {
    return buildRedirects();
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
