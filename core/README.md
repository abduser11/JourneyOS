# Core — Platform Infrastructure

This directory contains the foundational infrastructure modules that power the entire JourneyOS platform. These are cross-cutting concerns that every feature depends on, separated from application code to enforce clean boundaries.

## Subdirectories

| Folder | Purpose |
|---|---|
| `auth/` | Authentication providers, session management, auth guards, and role-based access control |
| `config/` | Runtime configuration loaders, environment validation, and feature flag evaluation |
| `errors/` | Custom error classes, error boundaries, error codes, and standardized error responses |
| `logger/` | Structured logging, log levels, log transports, and request tracing |
| `analytics/` | Event tracking, user behavior analytics, and performance monitoring |

## Design Principles

- **Zero dependency on features.** Core modules must never import from `src/features/`.
- **Dependency injection ready.** Each module exports factories or service interfaces that can be swapped at runtime.
- **Type-safe contracts.** Every public API in core is fully typed — no implicit `any` boundaries.
- **Environment-agnostic.** Core logic works identically in development, staging, and production.
