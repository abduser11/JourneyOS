"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
//  INDIVIDUAL SKELETON ITEMS
// ─────────────────────────────────────────────

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SkeletonLine({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "h-4 w-full rounded-md bg-muted animate-pulse",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCircle({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-muted animate-pulse",
        className
      )}
      {...props}
    />
  );
}

// ─────────────────────────────────────────────
//  PRESET SKELETONS
// ─────────────────────────────────────────────

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 space-y-4", className)}>
      <div className="flex items-center gap-3">
        <SkeletonCircle className="h-10 w-10" />
        <div className="space-y-2">
          <SkeletonLine className="h-3 w-32" />
          <SkeletonLine className="h-2 w-24" />
        </div>
      </div>
      <SkeletonLine className="h-3 w-full" />
      <SkeletonLine className="h-3 w-4/5" />
      <SkeletonLine className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonList({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg p-3">
          <SkeletonCircle className="h-10 w-10 shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonLine className="h-3 w-1/2" />
            <SkeletonLine className="h-2 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-3">
            <SkeletonLine className="h-2 w-16" />
            <SkeletonLine className="h-6 w-24" />
          </div>
        ))}
      </div>
      {/* Content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
