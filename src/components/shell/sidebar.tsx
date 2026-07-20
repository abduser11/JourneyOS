/**
 * JourneyOS — Sidebar
 *
 * Desktop sidebar navigation for the protected application shell.
 * Hidden on mobile in favor of BottomNavigation.
 *
 * Responsive: visible on md+ breakpoints, hidden on mobile.
 *
 * Updated in Sprint 2: Added breadcrumbs, cleaned up navigation items,
 * and improved active state indicators.
 */

"use client";

import { memo, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  Wallet,
  Sun,
  Users,
  Compass,
  Sparkles,
  FileText,
  Settings,
  X,
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  Icon: typeof LayoutDashboard;
}

const NAV_ITEMS: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Trips", href: "/trips", Icon: Map },
  { label: "Budget", href: "/budget", Icon: Wallet },
  { label: "AI Planner", href: "/ai-planner", Icon: Sparkles },
  { label: "Destinations", href: "/destinations", Icon: Compass },
  { label: "Documents", href: "/documents", Icon: FileText },
  { label: "Weather", href: "/weather", Icon: Sun },
  { label: "Community", href: "/community", Icon: Users },
  { label: "Settings", href: "/settings", Icon: Settings },
];

function SidebarInner() {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useAppStore();

  const handleClose = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  const activeItems = useMemo(() => {
    return NAV_ITEMS.map((item) => ({
      ...item,
      isActive: pathname === item.href || pathname.startsWith(item.href + "/"),
    }));
  }, [pathname]);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full w-64 border-r border-border bg-sidebar transition-transform duration-300 ease-[var(--ease-out)] md:translate-x-0 md:static md:flex",
        isSidebarOpen
          ? "translate-x-0"
          : "-translate-x-full md:w-0 md:border-0 md:overflow-hidden"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-brand" />
          <span className="text-lg font-semibold text-foreground">
            JourneyOS
          </span>
        </Link>
        <button
          onClick={handleClose}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground md:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {activeItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  item.isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <item.Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    item.isActive ? "text-brand" : "text-muted-foreground"
                  )}
                />
                {item.label}
                {item.isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-brand"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export const Sidebar = memo(SidebarInner);
