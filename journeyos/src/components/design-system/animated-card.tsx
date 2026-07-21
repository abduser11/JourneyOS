"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";

// ─────────────────────────────────────────────
// ANIMATED CARD
// ─────────────────────────────────────────────

interface AnimatedCardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

const hoverTarget: TargetAndTransition = {
  y: -2,
  transition: {
    duration: 0.15,
    ease: [0, 0, 0.2, 1],
  },
};

const tapTarget: TargetAndTransition = {
  y: 0,
  transition: {
    duration: 0.15,
    ease: [0, 0, 0.2, 1],
  },
};

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
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
        whileHover={hoverable ? hoverTarget : undefined}
        whileTap={tapTarget}
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
// STAGGERED CARD LIST
// ─────────────────────────────────────────────

interface StaggeredCardListProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggeredCardList({
  children,
  className,
}: StaggeredCardListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.02,
        },
      }}
      className={cn("grid gap-4", className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={staggerItem}
          initial="hidden"
          animate="visible"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// GLASS CARD
// ─────────────────────────────────────────────

interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
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
