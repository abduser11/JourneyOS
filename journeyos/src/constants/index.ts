// JourneyOS - Application Constants

export const APP_NAME = "JourneyOS";

export const APP_DESCRIPTION =
  "An Intelligent Travel Operating System";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  PLANS: "/plans",
  BUDGET: "/budget",
  VISA: "/visa",
  BOOKINGS: "/bookings",
  SETTINGS: "/settings",
  PROFILE: "/profile",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
} as const;

export const QUERY_KEYS = {
  TRIPS: ["trips"] as const,
  BUDGETS: ["budgets"] as const,
  BOOKINGS: ["bookings"] as const,
  USER: ["user"] as const,
  DESTINATIONS: ["destinations"] as const,
} as const;

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
] as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
} as const;
