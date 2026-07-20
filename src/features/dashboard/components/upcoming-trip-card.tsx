/**
 * JourneyOS — Upcoming Trip Card
 *
 * Displays upcoming trips or a beautiful empty state with CTA.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/design-system/empty-state";
import { MapPin } from "lucide-react";

interface UpcomingTripCardProps {
  hasTrips: boolean;
  tripCount: number;
}

export function UpcomingTripCard({ hasTrips, tripCount }: UpcomingTripCardProps) {
  if (hasTrips) {
    return (
      <motion.div {...pageTransition}>
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Upcoming Trips</h3>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="h-5 w-5 text-brand" />
            <p className="text-sm">{tripCount} trip{tripCount !== 1 ? "s" : ""} planned</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div {...pageTransition}>
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-2">Upcoming Trips</h3>
        <EmptyState
          icon={<MapPin className="h-12 w-12 text-brand/40" />}
          title="No trips yet"
          description="Create your first unforgettable journey."
          action={{
            label: "Create Trip",
            onClick: () => {
              window.location.href = "/trips";
            },
          }}
        />
      </Card>
    </motion.div>
  );
}
