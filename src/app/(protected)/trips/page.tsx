/**
 * JourneyOS — Trips Page (Placeholder)
 *
 * Placeholder for the Trips management module.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/design-system/empty-state";
import { Map, Plus } from "lucide-react";

export default function TripsPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trips</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Plan and manage all your travel adventures.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Trip
        </Button>
      </div>

      <EmptyState
        icon={<Map className="h-16 w-16 text-brand/30" />}
        title="No trips yet"
        description="Create your first trip to start planning your next adventure. Add destinations, flights, hotels, and more."
        action={{
          label: "Create Your First Trip",
          onClick: () => {
            window.location.href = "/trips/new";
          },
        }}
      />
    </motion.div>
  );
}
