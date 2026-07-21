/**
 * JourneyOS — Proxy
 *
 * Handles authentication checks and route protection.
 *
 * Responsibilities:
 * - Refresh Supabase session cookies on every request
 * - Protect routes under (protected) from unauthenticated access
 * - Redirect unauthenticated users to the login page
 * - Prevent authenticated users from accessing auth pages
 * - Redirect authenticated users who haven't completed onboarding
 *
 * This proxy runs on every request and must remain lightweight.
 * No business logic belongs here.
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// ─────────────────────────────────────────────
//  ROUTE CONFIGURATION
// ─────────────────────────────────────────────

/**
 * Routes that require authentication.
 */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/trips",
  "/profile",
  "/settings",
  "/budget",
  "/ai-planner",
  "/destinations",
  "/documents",
  "/weather",
  "/community",
  "/onboarding",
];

/**
 * Routes that should be inaccessible to authenticated users.
 * Authenticated users visiting these will be redirected to /dashboard.
 */
const AUTH_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
];

/**
 * Routes that require authentication but also work for unauthenticated users
 * (password reset links contain tokens that are used server-side).
 */
const AUTH_TOKEN_PREFIXES = [
  "/reset-password",
  "/verify-email",
];

/**
 * Public routes that are always accessible regardless of auth state.
 */
const PUBLIC_PATHS = ["/", "/pricing", "/about", "/contact"];

/**
 * Paths that should bypass proxy entirely (static assets, API routes).
 */
const BYPASS_PREFIXES = ["/api", "/_next", "/favicon", "/icons", "/static"];

// ─────────────────────────────────────────────
//  PROXY
// ─────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass for static assets and API routes
  if (BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Always allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Create a Supabase client that reads/writes cookies
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookieOptions: {
        name: "journeyos-auth",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) => {
            request.cookies.set({ name, value, ...options });
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  // Refresh the session (updates cookies if the token is near expiry)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ─── AUTH TOKEN ROUTES (reset-password, verify-email) ───
  // These routes don't require auth but shouldn't redirect authenticated users away
  if (AUTH_TOKEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return response;
  }

  // ─── AUTH ROUTE GUARD ───
  // Redirect authenticated users away from auth pages
  if (AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return response;
  }

  // ─── PROTECTED ROUTE GUARD ───
  // Redirect unauthenticated users to login
  if (PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!user) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // ─── ONBOARDING GUARD ───
    // Authenticated users who haven't completed onboarding are redirected
    // to /onboarding — EXCEPT when they are already on the onboarding page.
    const isOnboardingPage = pathname.startsWith("/onboarding");

    if (!isOnboardingPage) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_complete")
          .eq("id", user.id)
          .single();

        if (profile && !profile.onboarding_complete) {
          return NextResponse.redirect(new URL("/onboarding", request.url));
        }
      } catch {
        // If the query fails, let the request through — the server-side
        // layout will handle the error.
      }
    }

    return response;
  }

  return response;
}

// ─────────────────────────────────────────────
//  MATCHER
// ─────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (icons, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|icons/).*)",
  ],
};
