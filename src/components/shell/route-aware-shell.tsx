"use client";

import { usePathname } from "next/navigation";
import { ProtectedAppShell } from "./app-shell";

/**
 * Conditionally renders the AppShell based on the current route.
 * Protected routes (/dashboard, /settings/*, /trips/*, /budget, etc.)
 * get the full shell. Marketing and auth routes render children directly.
 */
export function RouteAwareShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes that should NOT have the AppShell (marketing, auth)
  const noShellPrefixes = ["/", "/login", "/register", "/forgot-password", "/verify-email", "/reset-password"];
  const shouldShowShell = !noShellPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));

  if (!shouldShowShell) {
    return <>{children}</>;
  }

  return <ProtectedAppShell>{children}</ProtectedAppShell>;
}
