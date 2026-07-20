/**
 * JourneyOS — Shell Bottom Navigation
 *
 * Mobile-only bottom navigation for the protected application shell.
 * Hidden on desktop (md+) where the Sidebar takes over.
 *
 * Updated in Sprint 2: Aligned items with new dashboard routes.
 */

"use client";

import { memo } from "react";
import { BottomNavigation } from "@/components/design-system";
import { LayoutDashboard, Map, Wallet, Compass, Settings } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Trips", href: "/trips", icon: <Map className="h-5 w-5" /> },
  { label: "Budget", href: "/budget", icon: <Wallet className="h-5 w-5" /> },
  { label: "Explore", href: "/destinations", icon: <Compass className="h-5 w-5" /> },
  { label: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
];

function ShellBottomNavInner() {
  return (
    <div className="sm:hidden">
      <BottomNavigation
        items={NAV_ITEMS}
        className="fixed bottom-0 left-0 right-0 z-40"
      />
    </div>
  );
}

export const ShellBottomNav = memo(ShellBottomNavInner);
