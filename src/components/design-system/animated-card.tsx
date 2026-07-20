"use client";

import * as React from "react";
import { motion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardVariants, staggerItem } from "@/lib/animations";

// ─────────────────────────────────────────────
//  ANIMATED CARD (single)
// ─────────────────────────────────────────────

interface AnimatedCardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

const hoverAnimation: TargetAndTransition = { y: -2, transition: { duration: 0.15, ease: [0, 0, 0.2, 1] } };
const tapAnimation: TargetAndTransition = { y: 0, transition: { duration: 0.15, ease: [0, 0, 0.2, 1] } };

export function AnimatedCard({
  children,
  hoverable = true,
  interactive = false,
  onClick,
  className,
}: AnimatedCardProps) {
  if (interactive) {
    return (
      <motion.div
        className={cn(
          "group relative rounded-xl border border-border bg-card p-5",
          "transition-shadow duration-200",
          hoverable && "hover:shadow-md",
          "cursor-pointer",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={hoverable ? hoverAnimation : undefined}
        whileTap={tapAnimation}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-5",
        "transition-shadow duration-200",
        hoverable && "hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
//  STAGGERED CARD LIST
// ─────────────────────────────────────────────

interface StaggeredCardListProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggeredCardList({ children, className }: StaggeredCardListProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.02,
          },
        },
      }}
      className={cn("grid gap-4", className)}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={staggerItem}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  GLASS CARD
// ─────────────────────────────────────────────

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl border border-border/50 p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
