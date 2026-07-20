/**
 * JourneyOS — Core Error Handling Module
 *
 * Centralized error types, utilities, and handlers.
 * Provides a consistent error model across the application.
 */

// ─── ERROR TYPES ──────────────────────────────────────────────

export class AppError extends Error {
  code: string;
  statusCode: number;
  details?: unknown;

  constructor(message: string, code: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class AuthError extends AppError {
  constructor(message = "Authentication failed", details?: unknown) {
    super(message, "AUTH_ERROR", 401, details);
    this.name = "AuthError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Access denied", details?: unknown) {
    super(message, "FORBIDDEN", 403, details);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", details?: unknown) {
    super(message, "NOT_FOUND", 404, details);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details?: unknown) {
    super(message, "VALIDATION_ERROR", 400, details);
    this.name = "ValidationError";
  }
}

// ─── ERROR UTILITIES ──────────────────────────────────────────

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function safeGetError<T>(fn: () => T): { data: T | null; error: Error | null } {
  try {
    return { data: fn(), error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
