"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export interface BottomNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number | string;
}

interface BottomNavigationProps {
  items: BottomNavItem[];
  className?: string;
}

export function BottomNavigation({ items, className = "" }: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-[1020]
        border-t border-border bg-background/90 backdrop-blur-xl
        sm:hidden
        ${className}
      `}
    >
      <div className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-0.5 py-2 px-3"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div
                className={`
                  flex h-6 w-6 items-center justify-center
                  transition-colors duration-150
                  ${isActive ? "text-brand" : "text-muted-foreground"}
                `}
              >
                {item.icon}
              </div>

              {/* Label */}
              <span
                className={`
                  text-[10px] font-medium
                  transition-colors duration-150
                  ${isActive ? "text-brand" : "text-muted-foreground"}
                `}
              >
                {item.label}
              </span>

              {/* Badge */}
              {item.badge !== undefined && (
                <span className="absolute top-1 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
