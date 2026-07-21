/**
 * JourneyOS — Hotels Page (Placeholder)
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { EmptyState } from "@/components/design-system/empty-state";
import { Building2 } from "lucide-react";

export const dynamic = 'force-dynamic';
export default function HotelsPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Hotels</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Find and manage your accommodation bookings.
        </p>
      </div>

      <EmptyState
        icon={<Building2 className="h-16 w-16 text-brand/30" />}
        title="Hotel search coming soon"
        description="Search for accommodations, compare prices, and book directly through JourneyOS."
      />
    </motion.div>
  );
}
