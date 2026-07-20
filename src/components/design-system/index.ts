/**
 * JourneyOS Design System — Component Exports
 *
 * All design system components are exported from this barrel file.
 * Import from @/components/design-system to keep imports clean.
 */

// Theme
export { ThemeProvider } from "./theme-provider";

// Navigation
export { Navbar, NavbarBrand } from "./navbar";
export type { NavItem } from "./navbar";
export { BottomNavigation } from "./bottom-nav";
export type { BottomNavItem } from "./bottom-nav";

// Cards
export { AnimatedCard, StaggeredCardList, GlassCard } from "./animated-card";

// Feedback
export { EmptyState } from "./empty-state";
export { Chip, ChipGroup } from "./chip";
export type { ChipProps } from "./chip";

// Progress
export { ProgressBar, CircularProgress } from "./progress-bar";

// Loading
export {
  SkeletonLine,
  SkeletonCircle,
  SkeletonCard,
  SkeletonList,
  SkeletonDashboard,
} from "./loading-skeleton";

// Modal
export { AnimatedModal } from "./animated-modal";
