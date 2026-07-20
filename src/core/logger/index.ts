/**
 * JourneyOS — Core Logger Module
 *
 * Provides a consistent logging interface across the application.
 * In development, logs to console with structured output.
 * In production, can be wired to a logging service (e.g., Axiom, Datadog).
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  module?: string;
  data?: unknown;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const MIN_LEVEL: LogLevel =
  (process.env.LOG_LEVEL as LogLevel) ??
  (process.env.NODE_ENV === "production" ? "warn" : "debug");

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[MIN_LEVEL];
}

export const logger = {
  debug(message: string, data?: unknown, module?: string) {
    if (!shouldLog("debug")) return;
    console.debug(`[DEBUG][${module ?? "app"}] ${message}`, data ?? "");
  },

  info(message: string, data?: unknown, module?: string) {
    if (!shouldLog("info")) return;
    console.info(`[INFO][${module ?? "app"}] ${message}`, data ?? "");
  },

  warn(message: string, data?: unknown, module?: string) {
    if (!shouldLog("warn")) return;
    console.warn(`[WARN][${module ?? "app"}] ${message}`, data ?? "");
  },

  error(message: string, error?: unknown, module?: string) {
    if (!shouldLog("error")) return;
    console.error(`[ERROR][${module ?? "app"}] ${message}`, error ?? "");
  },
};

export type { LogEntry, LogLevel };
