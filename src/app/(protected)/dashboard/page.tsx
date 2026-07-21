/**
 * JourneyOS — Dashboard Page
 *
 * The main authenticated landing page after login and onboarding.
 * Displays welcome greeting, profile summary, travel DNA, progress,
 * upcoming trips, quick actions, and placeholder widgets.
 */

"use client";

import { useMemo } from "react";
import { useSession } from "@/features/auth/hooks/useSession";

import {
  WelcomeSection,
  ProfileSummaryCard,
  TravelDNACard,
  JourneyProgressCard,
  UpcomingTripCard,
  QuickActions,
  RecentActivity,
  WeatherWidget,
  CurrencyWidget,
  NotificationsWidget,
  DashboardSkeleton,
} from "@/features/dashboard/components";

export const dynamic = 'force-dynamic';

/**
 * Calculate profile completion based on available fields.
 */
function calculateCompletion(profile: {
  display_name?: string | null;
  bio?: string | null;
} | null) {
  const totalFields = 8;
  let completed = 0;

  if (profile?.display_name) completed++;
  if (profile?.bio) completed++;
  // Additional fields would be checked here as they are implemented
  // For now we include estimated fields from travel DNA context
  const baseCompleted = Math.max(completed, 3); // at least 3 fields are set after onboarding

  return {
    percent: Math.round((baseCompleted / totalFields) * 100),
    completed: baseCompleted,
    total: totalFields,
  };
}

export default function DashboardPage() {
  const { profile, travelDNA, loading } = useSession();

  const progress = useMemo(() => calculateCompletion(profile), [profile]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <WelcomeSection displayName={profile?.display_name} />

      {/* Top Row: Profile + Journey Progress */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <ProfileSummaryCard
            profile={profile}
            subscriptionPlan="Basic Plan"
          />
        </div>
        <div>
          <JourneyProgressCard
            completionPercent={progress.percent}
            fieldsCompleted={progress.completed}
            totalFields={progress.total}
          />
        </div>
      </div>

      {/* Travel DNA Card */}
      <div className="mb-6">
        <TravelDNACard travelDNA={travelDNA} />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <QuickActions />
      </div>

      {/* Upcoming Trips */}
      <div className="mb-6">
        <UpcomingTripCard hasTrips={false} tripCount={0} />
      </div>

      {/* Bottom Row: Activity + Widgets */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <WeatherWidget />
          <CurrencyWidget />
          <NotificationsWidget />
        </div>
      </div>
    </div>
  );
}
