/**
 * JourneyOS — Auth Utilities
 */

import { AUTH_ERROR_MESSAGES, VALIDATION_RULES } from "../constants";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ValidationError,
  FormValidation,
} from "../types";

// ─────────────────────────────────────────────
//  ERROR TRANSLATION
// ─────────────────────────────────────────────

/**
 * Translates raw Supabase error messages into user-friendly strings.
 */
export function getAuthErrorMessage(rawMessage: string): string {
  return AUTH_ERROR_MESSAGES[rawMessage] || rawMessage;
}

// ─────────────────────────────────────────────
//  EMAIL VALIDATION
// ─────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
}

// ─────────────────────────────────────────────
//  PASSWORD VALIDATION
// ─────────────────────────────────────────────

export function isValidPassword(password: string): boolean {
  return (
    password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH &&
    password.length <= VALIDATION_RULES.MAX_PASSWORD_LENGTH
  );
}

// ─────────────────────────────────────────────
//  FORM VALIDATORS
// ─────────────────────────────────────────────

export function validateLoginForm(data: LoginFormData): FormValidation<LoginFormData> {
  const errors: ValidationError[] = [];

  if (!data.email.trim()) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  }

  if (!data.password) {
    errors.push({ field: "password", message: "Password is required." });
  }

  return {
    data: errors.length === 0 ? data : null,
    errors,
    isValid: errors.length === 0,
  };
}

export function validateRegisterForm(data: RegisterFormData): FormValidation<RegisterFormData> {
  const errors: ValidationError[] = [];

  if (!data.email.trim()) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  }

  if (!data.password) {
    errors.push({ field: "password", message: "Password is required." });
  } else if (!isValidPassword(data.password)) {
    errors.push({
      field: "password",
      message: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters.`,
    });
  }

  if (!data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Please confirm your password." });
  } else if (data.password !== data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Passwords do not match." });
  }

  if (data.displayName !== undefined && data.displayName.length > VALIDATION_RULES.MAX_DISPLAY_NAME_LENGTH) {
    errors.push({
      field: "displayName",
      message: `Display name must be ${VALIDATION_RULES.MAX_DISPLAY_NAME_LENGTH} characters or less.`,
    });
  }

  return {
    data: errors.length === 0 ? data : null,
    errors,
    isValid: errors.length === 0,
  };
}

export function validateForgotPasswordForm(data: ForgotPasswordFormData): FormValidation<ForgotPasswordFormData> {
  const errors: ValidationError[] = [];

  if (!data.email.trim()) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  }

  return {
    data: errors.length === 0 ? data : null,
    errors,
    isValid: errors.length === 0,
  };
}

export function validateResetPasswordForm(data: ResetPasswordFormData): FormValidation<ResetPasswordFormData> {
  const errors: ValidationError[] = [];

  if (!data.password) {
    errors.push({ field: "password", message: "Password is required." });
  } else if (!isValidPassword(data.password)) {
    errors.push({
      field: "password",
      message: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters.`,
    });
  }

  if (!data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Please confirm your password." });
  } else if (data.password !== data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Passwords do not match." });
  }

  return {
    data: errors.length === 0 ? data : null,
    errors,
    isValid: errors.length === 0,
  };
}
