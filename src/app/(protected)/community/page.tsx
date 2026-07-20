/**
 * JourneyOS — Community Page (Placeholder)
 *
 * Placeholder for the community and social module.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { EmptyState } from "@/components/design-system/empty-state";
import { Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Community</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect with fellow travelers and share your experiences.
        </p>
      </div>

      <EmptyState
        icon={<Users className="h-16 w-16 text-brand/30" />}
        title="Community coming soon"
        description="Join discussions, share travel tips, and connect with travelers around the world."
        action={{
          label: "Start a Discussion",
          onClick: () => {},
        }}
      />
    </motion.div>
  );
}
