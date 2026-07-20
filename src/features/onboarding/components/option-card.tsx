/**
 * JourneyOS — Option Card Component
 *
 * A selectable card used throughout the Travel DNA onboarding wizard.
 * Supports single-selection mode with animation.
 */

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface OptionCardProps {
  value: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: (_value: string) => void;
  icon?: string;
}

export function OptionCard({ value, label, description, selected, onSelect, icon }: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(value)}
      className={`
        relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200
        ${selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
        }
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {icon && (
        <span className="text-2xl mb-2 block">{icon}</span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className={`font-medium text-sm ${selected ? "text-primary" : "text-foreground"}`}>
            {label}
          </span>
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        </div>
        {selected && (
          <motion.div
            className="h-5 w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <Check className="h-3 w-3 text-white" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
