/**
 * JourneyOS — Settings Navigation
 *
 * Sidebar navigation for settings sub-pages.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Settings,
  Palette,
  Bell,
  Shield,
  User,
  Info,
} from "lucide-react";

interface SettingsNavItem {
  label: string;
  href: string;
  icon: typeof Settings;
}

const SETTINGS_NAV: SettingsNavItem[] = [
  { label: "General", href: "/settings/general", icon: Settings },
  { label: "Appearance", href: "/settings/appearance", icon: Palette },
  { label: "Notifications", href: "/settings/notifications", icon: Bell },
  { label: "Privacy", href: "/settings/privacy", icon: Shield },
  { label: "Account", href: "/settings/account", icon: User },
  { label: "About", href: "/settings/about", icon: Info },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {SETTINGS_NAV.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        const IconComponent = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            )}
          >
            <IconComponent className={cn("h-4 w-4 shrink-0", isActive ? "text-brand" : "text-muted-foreground")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
