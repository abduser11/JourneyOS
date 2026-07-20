"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardVariants, staggerItem } from "@/lib/animations";

// ─────────────────────────────────────────────
//  ANIMATED CARD (single)
// ─────────────────────────────────────────────

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  hoverable?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AnimatedCard({
  children,
  hoverable = true,
  interactive = false,
  onClick,
  className,
  ...props
}: AnimatedCardProps) {
  const Component = interactive ? motion.div : "div";

  return (
    <Component
      className={cn(
        "group relative rounded-xl border border-border bg-card p-5",
        "transition-shadow duration-200",
        hoverable && "hover:shadow-md",
        interactive && "cursor-pointer",
        className
      )}
      {...(interactive
        ? {
            ...cardVariants,
            whileHover: hoverable ? cardVariants.hover : undefined,
            whileTap: cardVariants.tap,
            onClick,
            initial: "hidden",
            animate: "visible",
          }
        : {})}
      {...(interactive ? props : {})}
    >
      {children}
    </Component>
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
