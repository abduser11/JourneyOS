"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { chipVariants } from "@/lib/animations";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  variant?: "default" | "primary" | "secondary" | "outline" | "destructive";
  size?: "sm" | "md";
  removable?: boolean;
  onRemove?: () => void;
  selected?: boolean;
  className?: string;
}

const chipStyles = {
  default: "bg-muted text-muted-foreground hover:bg-muted/80",
  primary: "bg-brand text-white hover:bg-brand-hover",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border text-foreground hover:bg-muted",
  destructive: "bg-error/10 text-error hover:bg-error/20",
} as const;

const chipSizes = {
  sm: "h-6 px-2 text-xs gap-1",
  md: "h-7 px-2.5 text-sm gap-1.5",
} as const;

export function Chip({
  label,
  variant = "default",
  size = "md",
  removable = false,
  onRemove,
  selected,
  className,
  ...props
}: ChipProps) {
  return (
    <motion.div
      variants={chipVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-all duration-150",
        "cursor-default select-none",
        chipStyles[variant],
        chipSizes[size],
        selected && "ring-2 ring-brand ring-offset-1",
        className
      )}
      {...props}
    >
      <span>{label}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="flex h-3.5 w-3.5 items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-opacity"
          aria-label={`Remove ${label}`}
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  CHIP GROUP
// ─────────────────────────────────────────────

interface ChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ChipGroup({ children, className }: ChipGroupProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.03 },
        },
      }}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {children}
    </motion.div>
  );
}
