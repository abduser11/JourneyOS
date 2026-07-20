/**
 * JourneyOS — Recent Activity
 *
 * Placeholder timeline showing upcoming activity history.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/design-system/empty-state";
import { Clock } from "lucide-react";

export function RecentActivity() {
  return (
    <motion.div {...pageTransition}>
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-2">Recent Activity</h3>
        <EmptyState
          icon={<Clock className="h-12 w-12 text-brand/40" />}
          title="No recent activity"
          description="Once you begin traveling, your journey history will appear here."
        />
      </Card>
    </motion.div>
  );
}
