/**
 * JourneyOS — Flights Page (Placeholder)
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { EmptyState } from "@/components/design-system/empty-state";
import { Plane } from "lucide-react";

export const dynamic = 'force-dynamic';
export default function FlightsPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Flights</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Search and manage your flight bookings.
        </p>
      </div>

      <EmptyState
        icon={<Plane className="h-16 w-16 text-brand/30" />}
        title="Flight search coming soon"
        description="Search for flights, compare prices, and book directly through JourneyOS."
      />
    </motion.div>
  );
}
