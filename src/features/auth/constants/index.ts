/**
 * JourneyOS — Auth Feature Constants
 */

export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
} as const;

export const PROTECTED_ROUTES = {
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
} as const;

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "The email or password you entered is incorrect.",
  "Email not confirmed": "Please verify your email address before signing in.",
  "User already registered": "An account with this email already exists.",
  "Weak password": "Your password must be at least 6 characters.",
  "Email address is already registered": "This email is already in use. Try signing in instead.",
  "Password should be at least 6 characters": "Please use a password with at least 6 characters.",
  "Invalid refresh token": "Your session has expired. Please sign in again.",
  "User not found": "No account found with this email address.",
  "Rate limit exceeded": "Too many attempts. Please wait a moment and try again.",
};

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 72,
  MIN_DISPLAY_NAME_LENGTH: 1,
  MAX_DISPLAY_NAME_LENGTH: 50,
} as const;

export const AUTH_QUERY_KEYS = {
  USER: "auth-user",
  PROFILE: "auth-profile",
  SESSION: "auth-session",
} as const;
