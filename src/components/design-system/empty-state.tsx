"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { scaleInProps } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: ButtonVariant;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div
      {...scaleInProps}
      className={`
        flex flex-col items-center justify-center py-16 px-4 text-center
        ${className}
      `}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <span className="h-8 w-8">{icon}</span>
        </div>
      )}

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>

      {/* Description */}
      {description && (
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <Button
          variant={action.variant || "default"}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
