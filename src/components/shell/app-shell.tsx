/**
 * JourneyOS — Protected App Shell
 *
 * The permanent layout container for all authenticated pages.
 * Composes the Sidebar (desktop), Header (all), and BottomNav (mobile).
 *
 * Optimization: Shell components are lazy-loaded to reduce initial bundle size.
 * The layout renders quickly while shell components load in parallel.
 */

"use client";

import { Suspense, lazy } from "react";

const Sidebar = lazy(() => import("./sidebar").then((m) => ({ default: m.Sidebar })));
const Header = lazy(() => import("./header").then((m) => ({ default: m.Header })));
const ShellBottomNav = lazy(() =>
  import("./shell-bottom-nav").then((m) => ({ default: m.ShellBottomNav }))
);

interface ProtectedAppShellProps {
  children: React.ReactNode;
}

export function ProtectedAppShell({ children }: ProtectedAppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — visible on md+, managed by Zustand */}
      <Suspense>
        <Sidebar />
      </Suspense>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header — sticky top bar */}
        <Suspense>
          <Header />
        </Suspense>

        {/* Page Content */}
        <div className="flex-1 pb-20 sm:pb-0">{children}</div>
      </div>

      {/* Bottom Navigation — visible on mobile only */}
      <Suspense>
        <ShellBottomNav />
      </Suspense>
    </div>
  );
}
