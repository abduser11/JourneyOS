/**
 * JourneyOS — Journey Progress Card
 *
 * Displays profile completion percentage and encourages the user
 * to complete their profile for better recommendations.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface JourneyProgressCardProps {
  completionPercent: number;
  fieldsCompleted: number;
  totalFields: number;
}

export function JourneyProgressCard({
  completionPercent,
  fieldsCompleted,
  totalFields,
}: JourneyProgressCardProps) {
  return (
    <motion.div {...pageTransition}>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">JourneyOS Setup</h3>
          <span className="text-sm font-semibold text-brand">{completionPercent}%</span>
        </div>

        <Progress value={completionPercent} className="mb-4" />

        <p className="text-sm text-muted-foreground">
          Complete your profile to unlock better recommendations.
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          {fieldsCompleted} of {totalFields} fields completed
        </p>
      </Card>
    </motion.div>
  );
}
