/**
 * JourneyOS — Core Analytics Module
 *
 * Centralized analytics tracking interface.
 * Abstracts over the actual analytics provider (PostHog, Mixpanel, etc.)
 * so that providers can be swapped without touching feature code.
 *
 * Usage:
 *   import { analytics } from "@/core/analytics";
 *   analytics.track("trip_created", { destination: "Paris" });
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
}

const TRACKING_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

function track(event: AnalyticsEvent): void {
  if (!TRACKING_ENABLED) return;

  const payload = {
    name: event.name,
    properties: event.properties ?? {},
    timestamp: event.timestamp ?? new Date().toISOString(),
  };

  // TODO: Wire up actual analytics provider (PostHog, Mixpanel, etc.)
  // For now, log to console in development
  if (process.env.NODE_ENV !== "production") {
    console.debug("[ANALYTICS]", payload);
  }
}

function identify(userId: string, traits?: Record<string, unknown>): void {
  if (!TRACKING_ENABLED) return;
  if (process.env.NODE_ENV !== "production") {
    console.debug("[ANALYTICS:IDENTIFY]", { userId, traits });
  }
}

function pageView(path: string, title?: string): void {
  track({ name: "page_view", properties: { path, title } });
}

export const analytics = {
  track,
  identify,
  pageView,
};

export type { AnalyticsEvent };
