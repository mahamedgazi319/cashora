import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — currently a passthrough.
 *
 * Future integrations:
 * - Verify Supabase/NextAuth session tokens
 * - Redirect unauthenticated users away from /dashboard, /profile, /settings, /withdraw
 * - Role-based access control (admin routes)
 * - Rate limiting via Upstash Redis
 * - i18n locale detection and redirect
 * - GeoIP blocking for restricted regions
 */

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings", "/withdraw"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Future: check session token
  // const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  // if (!token && PROTECTED_ROUTES.some(r => pathname.startsWith(r))) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Passthrough for now
  void PROTECTED_ROUTES; // prevent unused warning
  void pathname;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
