/**
 * JourneyOS Design System — Design Tokens
 *
 * Centralized token definitions consumed by CSS variables, Tailwind classes,
 * and runtime JavaScript. Every visual decision in the system traces back
 * to these values.
 */

// ─────────────────────────────────────────────
//  COLOR PALETTE
// ─────────────────────────────────────────────

export const colors = {
  // Brand identity
  brand: {
    primary: "#2563EB", // Deep journey blue
    primaryHover: "#1D4ED8",
    primaryActive: "#1E40AF",
    primaryLight: "#DBEAFE",
    primaryDark: "#1E3A8A",
    secondary: "#7C3AED", // Exploration violet
    secondaryHover: "#6D28D9",
    secondaryLight: "#EDE9FE",
    accent: "#F59E0B", // Discovery amber
    accentHover: "#D97706",
    accentLight: "#FEF3C7",
  },

  // Semantic surfaces
  surface: {
    default: "#FFFFFF",
    muted: "#F9FAFB",
    raised: "#FFFFFF",
    overlay: "rgba(0, 0, 0, 0.5)",
    glass: "rgba(255, 255, 255, 0.8)",
  },

  // Text
  text: {
    primary: "#0F172A",
    secondary: "#475569",
    tertiary: "#94A3B8",
    disabled: "#CBD5E1",
    inverse: "#FFFFFF",
    link: "#2563EB",
  },

  // Semantic states
  state: {
    success: "#10B981",
    successLight: "#D1FAE5",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    error: "#EF4444",
    errorLight: "#FEE2E2",
    info: "#3B82F6",
    infoLight: "#DBEAFE",
  },

  // Borders & dividers
  border: {
    default: "#E2E8F0",
    light: "#F1F5F9",
    strong: "#CBD5E1",
    focus: "#2563EB",
    error: "#EF4444",
  },

  // Dark mode overrides
  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    surfaceElevated: "#334155",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textTertiary: "#64748B",
    border: "#334155",
    borderLight: "#1E293B",
  },
} as const;

// ─────────────────────────────────────────────
//  TYPOGRAPHY
// ─────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
    heading: "var(--font-geist-sans)",
  },

  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  },

  letterSpacing: {
    tight: "-0.02em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
  },

  // Heading scale (mobile-first)
  heading: {
    h1: { fontSize: "2.25rem", lineHeight: 1.2, fontWeight: 700 },
    h2: { fontSize: "1.875rem", lineHeight: 1.25, fontWeight: 700 },
    h3: { fontSize: "1.5rem", lineHeight: 1.3, fontWeight: 600 },
    h4: { fontSize: "1.25rem", lineHeight: 1.35, fontWeight: 600 },
    h5: { fontSize: "1.125rem", lineHeight: 1.4, fontWeight: 600 },
    h6: { fontSize: "1rem", lineHeight: 1.4, fontWeight: 600 },
  },
} as const;

// ─────────────────────────────────────────────
//  SPACING (8px base grid)
// ─────────────────────────────────────────────

export const spacing = {
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

// ─────────────────────────────────────────────
//  BORDER RADIUS
// ─────────────────────────────────────────────

export const radius = {
  none: "0",
  xs: "0.25rem",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.625rem",
  xl: "0.875rem",
  "2xl": "1.125rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

// ─────────────────────────────────────────────
//  SHADOWS (Elevation System)
// ─────────────────────────────────────────────

export const shadows = {
  // Elevation 0 — flat, on surface
  none: "none",

  // Elevation 1 — subtle lift (inputs, cards in-list)
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",

  // Elevation 2 — lifted (cards, panels)
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",

  // Elevation 3 — floating (dropdowns, popovers)
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",

  // Elevation 4 — elevated (modals, sheets)
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",

  // Elevation 5 — high (toasts, floating actions)
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",

  // Elevation 6 — dramatic (fullscreen modals, critical overlays)
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",

  // Glow effects
  glowPrimary: "0 0 20px rgba(37, 99, 235, 0.15)",
  glowSuccess: "0 0 20px rgba(16, 185, 129, 0.15)",
  glowError: "0 0 20px rgba(239, 68, 68, 0.15)",
} as const;

// ─────────────────────────────────────────────
//  RESPONSIVE BREAKPOINTS
// ─────────────────────────────────────────────

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ─────────────────────────────────────────────
//  ANIMATION TOKENS
// ─────────────────────────────────────────────

export const animation = {
  duration: {
    instant: "50ms",
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
  },
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

// ─────────────────────────────────────────────
//  ICON SIZES
// ─────────────────────────────────────────────

export const iconSizes = {
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
} as const;

// ─────────────────────────────────────────────
//  Z-INDEX SCALE
// ─────────────────────────────────────────────

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  overlay: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
  drawer: 1080,
} as const;
