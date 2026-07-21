/**
 * JourneyOS Design System — Animation Presets
 *
 * Framer Motion 12 compatible animation variants and presets.
 *
 * FM12 rules:
 * - Never use string variant names in whileHover/whileTap — use explicit TargetAndTransition objects
 * - Never name variant keys "hover" or "tap" in a Variants object (conflicts with FM12 inference)
 * - Use TargetAndTransition for all whileHover/whileTap values
 * - Spread objects must be typed as MotionProps-compatible
 *
 * Usage:
 *   <motion.div variants={fadeVariants} initial="hidden" animate="visible" />
 *   <motion.div {...pageTransition} />
 */

import { type Variants, type Transition, type TargetAndTransition } from "framer-motion";

// ─────────────────────────────────────────────
//  TRANSITIONS
// ─────────────────────────────────────────────

export const transition = {
  instant: { duration: 0.05 } as Transition,
  fast: { duration: 0.15, ease: [0, 0, 0.2, 1] } as Transition,
  normal: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } as Transition,
  slow: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } as Transition,
  slower: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } as Transition,
  spring: { type: "spring" as const, stiffness: 350, damping: 30 } as Transition,
  springSoft: { type: "spring" as const, stiffness: 280, damping: 25 } as Transition,
} as const;

// ─────────────────────────────────────────────
//  PAGE TRANSITIONS
// ─────────────────────────────────────────────

export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.slow,
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: transition.fast,
  },
};

export const pageTransitionProps = {
  variants: pageVariants,
  initial: "hidden",
  animate: "visible",
  exit: "exit",
} as const;

/**
 * Shorthand props for page-level transitions.
 * Usage: <motion.div {...pageTransition} /> on a motion component.
 */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
} as const;

// ─────────────────────────────────────────────
//  FADE ANIMATIONS
// ─────────────────────────────────────────────

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transition.normal,
  },
};

export const fadeInProps = {
  variants: fadeVariants,
  initial: "hidden",
  animate: "visible",
} as const;

// ─────────────────────────────────────────────
//  SLIDE ANIMATIONS
// ─────────────────────────────────────────────

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.normal,
  },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.normal,
  },
};

// ─────────────────────────────────────────────
//  SCALE ANIMATIONS
// ─────────────────────────────────────────────

/**
 * Scale variants for entrance animation.
 * Renamed "hover" → "scaledUp" and "tap" → "scaledDown" to avoid
 * FM12 type inference conflicts with whileHover/whileTap.
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transition.spring,
  },
  scaledUp: {
    scale: 1.02,
    transition: transition.fast,
  },
  scaledDown: {
    scale: 0.98,
    transition: transition.fast,
  },
};

export const scaleInProps = {
  variants: scaleVariants,
  initial: "hidden",
  animate: "visible",
} as const;

// ─────────────────────────────────────────────
//  CARD ANIMATIONS
// ─────────────────────────────────────────────

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

// ─────────────────────────────────────────────
//  LIST / STAGGER ANIMATIONS
// ─────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.normal,
  },
};

export const staggerListProps = {
  variants: staggerContainer,
  initial: "hidden",
  animate: "visible",
} as const;

// ─────────────────────────────────────────────
//  MODAL / DIALOG ANIMATIONS
// ─────────────────────────────────────────────

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transition.normal,
  },
  exit: {
    opacity: 0,
    transition: transition.fast,
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transition.spring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: transition.fast,
  },
};

// ─────────────────────────────────────────────
//  TOAST ANIMATIONS
// ─────────────────────────────────────────────

export const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transition.spring,
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: transition.fast,
  },
};

// ─────────────────────────────────────────────
//  BUTTON INTERACTION (FM12 COMPATIBLE)
// ─────────────────────────────────────────────

/**
 * Explicit TargetAndTransition objects for hover/tap interactions.
 * These are used directly as whileHover/whileTap values instead of
 * string variant names, which FM12's type system rejects.
 */
export const buttonHoverTarget: TargetAndTransition = {
  scale: 1.01,
  transition: transition.fast,
};

export const buttonTapTarget: TargetAndTransition = {
  scale: 0.98,
  transition: transition.fast,
};

/**
 * Backward-compatible button interaction props using explicit objects.
 * This replaces the old string-based pattern that caused FM12 errors.
 */
export const buttonInteractionProps = {
  whileHover: buttonHoverTarget,
  whileTap: buttonTapTarget,
} as const;

// ─────────────────────────────────────────────
//  SKELETON PULSE
// ─────────────────────────────────────────────

export const skeletonPulse = {
  animate: {
    opacity: [1, 0.5, 1],
  },
  transition: {
    duration: 1.5,
    ease: "easeInOut",
    repeat: Infinity,
  },
} as const;

// ─────────────────────────────────────────────
//  CHIP / BADGE ENTRANCE
// ─────────────────────────────────────────────

export const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transition.spring,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: transition.fast,
  },
};

// ─────────────────────────────────────────────
//  PROGRESS BAR
// ─────────────────────────────────────────────

export const progressVariants: Variants = {
  hidden: { width: "0%" },
  visible: (custom: number) => ({
    width: `${custom}%`,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

// ─────────────────────────────────────────────
//  HELPER: AnimatePresence wrapper
// ─────────────────────────────────────────────

export { AnimatePresence } from "framer-motion";
