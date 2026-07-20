/**
 * JourneyOS Design System — Animation Presets
 *
 * Framer Motion animation variants and presets for consistent
 * transitions across the entire application.
 *
 * Usage:
 *   <motion.div variants={fadeVariants} initial="hidden" animate="visible" />
 *   <motion.div {...pageTransition} />
 */

import { type Variants, type Transition, type HTMLMotionProps } from "framer-motion";

// ─────────────────────────────────────────────
//  TRANSITIONS
// ─────────────────────────────────────────────

const transition = {
  instant: { duration: 0.05 } as Transition,
  fast: { duration: 0.15, ease: [0, 0, 0.2, 1] } as Transition,
  normal: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } as Transition,
  slow: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } as Transition,
  slower: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } as Transition,
  spring: { type: "spring", stiffness: 350, damping: 30 } as Transition,
  springSoft: { type: "spring", stiffness: 280, damping: 25 } as Transition,
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

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transition.spring,
  },
  hover: {
    scale: 1.02,
    transition: transition.fast,
  },
  tap: {
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
  hover: {
    y: -2,
    transition: transition.fast,
  },
  tap: {
    y: 0,
    transition: transition.fast,
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
//  BUTTON INTERACTION
// ─────────────────────────────────────────────

export const buttonVariants: Variants = {
  hover: {
    scale: 1.01,
    transition: transition.fast,
  },
  tap: {
    scale: 0.98,
    transition: transition.fast,
  },
};

export const buttonInteractionProps = {
  whileHover: "hover",
  whileTap: "tap",
  variants: buttonVariants,
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
