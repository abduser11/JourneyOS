/**
 * JourneyOS — Dashboard Skeleton
 *
 * Loading placeholder for the dashboard page.
 */

"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Welcome section */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Top row: profile + progress */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>

      {/* Travel DNA */}
      <Skeleton className="h-56 rounded-2xl" />

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_v, i) => (
          <Skeleton key={`quick-action-${String(i)}`} className="h-28 rounded-2xl" />
        ))}
      </div>

      {/* Upcoming trip */}
      <Skeleton className="h-56 rounded-2xl" />
    </div>
  );
}
