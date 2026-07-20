# JourneyOS Animation System

## Overview

JourneyOS uses Framer Motion as the primary animation engine, with CSS keyframes available as a fallback. The animation system prioritizes perceived performance, natural motion, and consistency.

## Framer Motion Presets

All presets are defined in `src/lib/animations.ts` and exported as ready-to-use variants and props.

### Page Transitions

`pageVariants` — Fade in with subtle upward slide (8px). Exit with faster upward fade (-4px). Duration: 350ms in, 150ms out.

### Fade

`fadeVariants` — Simple opacity transition from 0 to 1. Duration: 250ms.

### Slide

Four directional slide variants: `slideUpVariants`, `slideDownVariants`, `slideLeftVariants`, `slideRightVariants`. Each moves 20px with 250ms easing.

### Scale

`scaleVariants` — Scale from 0.95 to 1 with opacity. Uses spring physics (stiffness: 350, damping: 30). Includes hover (1.02) and tap (0.98) states.

### Card Interactions

`cardVariants` — Entrance: fade + slide up 12px. Hover: lift up 2px. Tap: return to original position.

### Staggered Lists

`staggerContainer` + `staggerItem` — Parent triggers staggerChildren (50ms delay, 20ms stagger). Children fade in with 12px upward slide.

### Modal / Dialog

`modalBackdropVariants` — Backdrop fades in/out (250ms in, 150ms out).
`modalContentVariants` — Content scales from 0.95 with 10px slide. Uses spring physics.

### Toast

`toastVariants` — Enters from bottom (20px) with scale (0.95 to 1). Spring exit.

### Button Interaction

`buttonInteractionProps` — Hover scale (1.01), tap scale (0.98). Duration: 150ms.

### Progress

`progressVariants` — Width animates from 0% to target percentage. Duration: 600ms.
`skeletonPulse` — Infinite opacity pulse (1 → 0.5 → 1) over 1.5s.

## CSS Animation Utilities

For components not using Framer Motion, CSS keyframes are available in `styles/animations.css`.

### Keyframes

`fade-in`, `fade-in-up`, `fade-in-down`, `scale-in`, `slide-in-right`, `slide-in-left`, `shimmer`, `pulse-glow`, `spin-slow`.

### Utility Classes

Apply directly: `.animate-fade-in`, `.animate-fade-in-up`, `.animate-scale-in`, `.animate-shimmer`, `.animate-pulse-glow`, `.animate-spin-slow`.

### Stagger Delays

`.stagger-1` through `.stagger-6` — Incremental animation-delay (20ms increments).

## Timing & Easing

| Name | Duration | Easing |
|------|----------|--------|
| Instant | 50ms | ease-in |
| Fast | 150ms | ease-out |
| Normal | 250ms | ease-in-out |
| Slow | 350ms | ease-in-out |
| Slower | 500ms | ease-in-out |
| Spring | — | stiffness: 350, damping: 30 |

## Guidelines

1. Use Framer Motion variants from `src/lib/animations.ts` — never define animations inline.
2. Page transitions must use `pageVariants`.
3. List items must use `staggerListProps` + `staggerItem`.
4. Modals must use `modalBackdropVariants` + `modalContentVariants`.
5. Keep all animations under 500ms for perceived performance.
6. Prefer spring physics for interactive feedback, ease-in-out for directional transitions.
7. Respect `prefers-reduced-motion` (automatically handled by Framer Motion).
