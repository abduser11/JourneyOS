/**
 * JourneyOS — Weather Page (Placeholder)
 *
 * Placeholder for the weather information module.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { EmptyState } from "@/components/design-system/empty-state";
import { CloudSun } from "lucide-react";

export default function WeatherPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Weather</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Get real-time weather information for your destinations.
        </p>
      </div>

      <EmptyState
        icon={<CloudSun className="h-16 w-16 text-brand/30" />}
        title="Weather services coming soon"
        description="Check weather forecasts for your destinations and plan accordingly."
      />
    </motion.div>
  );
}
