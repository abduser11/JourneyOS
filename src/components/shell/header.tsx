/**
 * JourneyOS — Header
 *
 * Top navigation bar for the protected application shell.
 * Contains the hamburger toggle, breadcrumbs, notifications, and user menu.
 *
 * Mobile: hamburger visible, search condensed.
 * Desktop: full search bar, avatar menu.
 *
 * Updated in Sprint 2: Added breadcrumbs, profile link in user menu,
 * improved page title derivation.
 */

"use client";

import { memo, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search, Bell, ChevronRight } from "lucide-react";

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  trips: "Trips",
  profile: "Profile",
  settings: "Settings",
  budget: "Budget",
  "ai-planner": "AI Planner",
  destinations: "Destinations",
  documents: "Documents",
  weather: "Weather",
  community: "Community",
};

function HeaderInner() {
  const { toggleSidebar } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();

  // Derive breadcrumb segments from pathname
  const segments = useMemo(() => {
    return pathname
      .split("/")
      .filter(Boolean)
      .map((segment) => ({
        label: PAGE_TITLES[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        href: "/" + pathname
          .split("/")
          .slice(
            0,
            pathname.split("/").indexOf(segment) + 1
          )
          .filter(Boolean)
          .join("/"),
      }));
  }, [pathname]);

  const currentPage = segments[segments.length - 1]?.label || "Dashboard";

  const handleToggle = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  const handleSignOut = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-6">
      {/* Left: Hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumbs */}
        {segments.length > 1 && (
          <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex" aria-label="Breadcrumb">
            {segments.slice(0, -1).map((segment) => (
              <span key={segment.href} className="flex items-center gap-1">
                <Link
                  href={segment.href}
                  className="hover:text-foreground transition-colors"
                >
                  {segment.label}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            ))}
            <span className="text-foreground font-medium">{currentPage}</span>
          </nav>
        )}

        {segments.length <= 1 && (
          <h1 className="hidden text-lg font-semibold text-foreground sm:block">
            {currentPage}
          </h1>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search (desktop) */}
        <button
          className="hidden items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent md:flex"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
          <span className="text-muted-foreground">Search...</span>
          <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            &curren;K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand" />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User avatar" />
              <AvatarFallback className="bg-brand/10 text-sm font-medium text-brand">
                JO
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <Link href="/settings/account">
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export const Header = memo(HeaderInner);
