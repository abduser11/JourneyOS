/**
 * JourneyOS — Destinations Page (Placeholder)
 *
 * Placeholder for the destinations discovery module.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/design-system/empty-state";
import { Compass, Search } from "lucide-react";

export const dynamic = 'force-dynamic';
export default function DestinationsPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Destinations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover amazing places around the world.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      <EmptyState
        icon={<Compass className="h-16 w-16 text-brand/30" />}
        title="Destinations explorer coming soon"
        description="Browse curated destinations, get AI recommendations, and build your wishlist."
        action={{
          label: "Explore Destinations",
          onClick: () => {},
        }}
      />
    </motion.div>
  );
}
