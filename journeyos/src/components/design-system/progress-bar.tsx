"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  labelPosition?: "inside" | "above" | "below";
  animated?: boolean;
  className?: string;
}

const variantColors = {
  default: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
} as const;

const barHeights = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
} as const;

export function ProgressBar({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  labelPosition = "above",
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {/* Label */}
      {showLabel && labelPosition === "above" && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Progress</span>
          <span className="text-xs font-semibold text-foreground">{Math.round(percentage)}%</span>
        </div>
      )}

      {/* Bar */}
      <div className={cn("w-full overflow-hidden rounded-full bg-muted", barHeights[size])}>
        <motion.div
          className={cn("h-full rounded-full", variantColors[variant])}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>

      {/* Label */}
      {showLabel && labelPosition === "below" && (
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Progress</span>
          <span className="text-xs font-semibold text-foreground">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  CIRCULAR PROGRESS
// ─────────────────────────────────────────────

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "warning" | "error";
  showLabel?: boolean;
  className?: string;
}

const circularColors = {
  default: "#2563EB",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
} as const;

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = "default",
  showLabel = true,
  className,
}: CircularProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={circularColors[variant]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-lg font-bold text-foreground">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
