/**
 * JourneyOS — Auth Feature Types
 */

import type { Profile, TravelDNA } from "@/types/database";

// ─────────────────────────────────────────────
//  AUTH STATE
// ─────────────────────────────────────────────

export interface AuthState {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  email_confirmed: boolean;
  created_at: string;
}

// ─────────────────────────────────────────────
//  FORM TYPES
// ─────────────────────────────────────────────

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

// ─────────────────────────────────────────────
//  AUTH RESPONSES
// ─────────────────────────────────────────────

export interface AuthResult {
  success: boolean;
  message: string;
  data?: {
    user?: AuthUser;
    profile?: Profile | null;
    needsOnboarding?: boolean;
  };
  redirectUrl?: string;
}

// ─────────────────────────────────────────────
//  PROFILE CREATION
// ─────────────────────────────────────────────

export interface ProfileUpdateData {
  display_name?: string;
  avatar_url?: string;
  bio?: string;
}

export interface ProfileWithDNA {
  profile: Profile;
  travel_dna: TravelDNA | null;
  is_onboarding_complete: boolean;
}

// ─────────────────────────────────────────────
//  VALIDATION
// ─────────────────────────────────────────────

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation<T> {
  data: T | null;
  errors: ValidationError[];
  isValid: boolean;
}
