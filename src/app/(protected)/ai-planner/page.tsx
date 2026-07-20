/**
 * JourneyOS — AI Planner Page (Placeholder)
 *
 * Placeholder for the AI-powered trip planning module.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { EmptyState } from "@/components/design-system/empty-state";
import { Sparkles } from "lucide-react";

export default function AIPlannerPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">AI Trip Planner</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Let AI help you plan the perfect trip based on your preferences.
        </p>
      </div>

      <EmptyState
        icon={<Sparkles className="h-16 w-16 text-brand/30" />}
        title="AI Planner coming soon"
        description="Our AI will analyze your Travel DNA to suggest personalized itineraries, destinations, and activities."
        action={{
          label: "Get Early Access",
          onClick: () => {},
        }}
      />
    </motion.div>
  );
}
