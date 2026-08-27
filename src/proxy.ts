import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Canonical trailing-slash enforcement.
 *
 * Section 3.1 lists every canonical URL with a trailing slash, so that is the
 * form the site serves. Next's built-in normalisation is disabled in
 * next.config (`skipTrailingSlashRedirect`) because it runs BEFORE
 * `redirects()`, which turned every legacy Appendix A URL into a two-hop chain.
 * Section 11.3 allows one hop, so config redirects now resolve legacy URLs
 * directly, and this proxy adds the canonical slash to everything else.
 *
 * Order in the Next pipeline: headers → redirects (legacy map) → proxy (this
 * file) → rewrites. A legacy URL is therefore already resolved before it
 * reaches here.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.endsWith("/")) return NextResponse.next();

  // Same exceptions Next applies: files with an extension, and /.well-known/.
  if (pathname.startsWith("/.well-known")) return NextResponse.next();
  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  if (lastSegment.includes(".")) return NextResponse.next();

  // Built with `new URL` rather than `nextUrl.clone()`: cloning carries Next's
  // own URL normalisation, which strips the slash straight back off and turns
  // this redirect into a loop.
  return NextResponse.redirect(new URL(`${pathname}/${search}`, request.url), 308);
}

export const config = {
  /**
   * Route handlers are excluded: POST /api/leads must reach the handler, and a
   * 308 on a POST would bounce the form submission through a needless hop.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
