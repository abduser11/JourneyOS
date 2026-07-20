"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInProps } from "@/lib/animations";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  brand?: React.ReactNode;
  items: NavItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  className?: string;
}

export function Navbar({
  brand,
  items,
  actions,
  sticky = true,
  className = "",
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <motion.nav
      {...fadeInProps}
      className={`
        w-full border-b border-border bg-background/80 backdrop-blur-xl
        ${sticky ? "sticky top-0 z-[1020]" : ""}
        ${className}
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          {brand || (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground">
                JourneyOS
              </span>
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`
                  relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium
                  transition-colors
                  ${isActive
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }
                `}
              >
                {item.icon}
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-lg bg-secondary"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {actions}
        </div>
      </div>
    </motion.nav>
  );
}

// ─────────────────────────────────────────────
//  NAVBAR BRANDING
// ─────────────────────────────────────────────

export function NavbarBrand() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
        <span className="text-sm font-bold text-white">J</span>
      </div>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        JourneyOS
      </span>
    </Link>
  );
}
