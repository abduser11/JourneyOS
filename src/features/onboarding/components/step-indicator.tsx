/**
 * JourneyOS — Step Indicator Component
 *
 * Displays the current progress through the onboarding wizard.
 * Updated in Sprint 1.5: accepts progressPercent from parent for accurate tracking.
 */

"use client";

import { motion } from "framer-motion";
import { ONBOARDING_STEPS, type OnboardingStepId } from "../types";

interface StepIndicatorProps {
  currentStep: OnboardingStepId;
  progressPercent?: number;
}

export function StepIndicator({ currentStep, progressPercent }: StepIndicatorProps) {
  const currentIndex = ONBOARDING_STEPS.findIndex((s) => s.id === currentStep);
  const totalSteps = ONBOARDING_STEPS.length - 1;
  const displayProgress = progressPercent ?? (Math.max(0, currentIndex) / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${displayProgress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Step Label */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Step {Math.max(1, currentIndex)} of {totalSteps}
        </span>
        <span className="text-xs font-medium text-foreground">
          {ONBOARDING_STEPS[currentIndex]?.title ?? "Welcome"}
        </span>
      </div>
    </div>
  );
}
