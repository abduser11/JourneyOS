# JourneyOS Architecture Upgrade Report

**Date:** July 20, 2026  
**Author:** Manus AI (Lead Software Architect)  
**Status:** Completed  
**Branch:** `architecture-upgrade` (pre-sprint-1)

---

## Executive Summary

The JourneyOS project has been upgraded from a flat Single-Page Application (SPA) structure to a production-ready, enterprise-grade Next.js App Router architecture. This upgrade lays the groundwork for Sprint 1 (Authentication and Travel DNA) without implementing any business features. The changes include secure Server-Side Rendering (SSR) for authentication, route protection via proxy middleware, a responsive application shell, a formalized database schema, and a consolidated development environment.

All changes have been verified. The project now compiles successfully with zero TypeScript errors, zero ESLint errors, and a passing production build.

---

## 1. Route Group Reorganization

The previous routing structure was flat, with the marketing page and the protected dashboard sharing the same root level. This has been reorganized into Next.js Route Groups to enforce architectural boundaries and allow different layouts for different domains.

| Route Group | Path Pattern | Purpose | Layout Behavior |
|---|---|---|---|
| `(marketing)` | `/` | Public landing page, pricing, and onboarding. | Uses the global root layout with the design system showcase. |
| `(auth)` | `/login`, `/register` | Authentication flows (to be built in Sprint 1). | Minimal layout with no sidebar or header. |
| `(protected)` | `/dashboard`, `/trips`, etc. | Authenticated user features. | Injects the Application Shell (Sidebar + Header + Bottom Nav). |

**Why this matters:** Route groups allow us to apply the Application Shell layout *only* to authenticated areas of the app, keeping the marketing pages lightweight. The previous `(protected)/page.tsx` that conflicted with the root marketing page was removed to resolve a routing collision.

---

## 2. Production-Ready SSR Authentication

The original Supabase client was a standard SPA client (`createClient`), which relies on LocalStorage for session tokens. This is insecure and incompatible with Server-Side Rendering. It has been replaced with the official `@supabase/ssr` package.

The new `src/services/supabase.ts` exports three distinct client factories:

1. **`createBrowserClient()`**: Used in Client Components. Reads/writes cookies instead of LocalStorage.
2. **`createServerClient()`**: Used in Server Components and Route Handlers. Provides server-side access to the database and user session.
3. **`createMiddlewareClient()`**: Used exclusively in the Proxy layer for edge-runtime cookie manipulation.

**Why this matters:** This architecture ensures that user sessions are stored in secure, HTTP-only cookies. It prevents Cross-Site Scripting (XSS) attacks that target LocalStorage and allows the server to securely read the user's session before rendering a protected page.

---

## 3. Proxy Middleware & Route Protection

Next.js 16 deprecated the term "middleware" in favor of "proxy" to better reflect its edge-runtime nature. The file `src/middleware.ts` was renamed to `src/proxy.ts`.

The proxy now performs three critical functions on every request:
1. **Session Refresh:** It reads the auth cookies, refreshes them if the token is near expiry, and writes them back to the response.
2. **Auth Guard:** It redirects authenticated users away from `(auth)` pages (e.g., logging out users from `/login`).
3. **Protected Guard:** It redirects unauthenticated users to `/login` when they attempt to access `(protected)` routes like `/dashboard` or `/trips`.

**Why this matters:** Without this proxy, users could manually type `/dashboard` into the URL bar and see the layout even if they weren't logged in. The proxy enforces security at the edge, before the page is ever rendered.

---

## 4. Application Shell

The Application Shell is the persistent UI wrapper for the `(protected)` route group. It has been built in `src/components/shell/` to provide a responsive, dashboard-like experience.

* **`sidebar.tsx`**: Desktop navigation (hidden on mobile).
* **`header.tsx`**: Top navigation containing the hamburger menu, search bar, notifications, theme toggle, and user dropdown.
* **`shell-bottom-nav.tsx`**: Mobile-only bottom navigation (hidden on desktop).
* **`theme-toggle.tsx`**: Isolated component for switching between light and dark modes.
* **`app-shell.tsx`**: The root component that composes the Sidebar, Header, and BottomNav together.

The Zustand store (`src/lib/store.ts`) was updated to manage the `isSidebarOpen` and `isSearchOpen` state, allowing the Header and Sidebar to communicate across the component tree.

**Why this matters:** A unified shell ensures that all authenticated pages share the same navigation, branding, and responsive behavior. It prevents code duplication and guarantees a consistent user experience across the dashboard, trips, and settings pages.

---

## 5. Database Foundation

The database schema has been formalized in `database/schema.sql` and mapped to strict TypeScript types in `src/types/database.ts`.

The V1 schema focuses exclusively on the **Identity Domain**, defining the tables required for Sprint 1:
* `public.profiles` (links to `auth.users`)
* `public.travel_dna` (user preferences)
* `public.subscriptions` (billing state)
* `public.trips` (trip planning)

Row Level Security (RLS) policies have been defined to ensure users can only read and modify their own data. A migrations directory (`database/migrations/`) was created to manage future schema changes using Supabase's migration CLI.

**Why this matters:** By defining the schema and types now, the frontend team can build the UI in Sprint 1 with full TypeScript autocomplete, even before the database is deployed to Supabase.

---

## 6. Folder Structure & ESLint Consolidation

The project structure was expanded to include empty, documented folders for future domains:
* `src/features/` (auth, trips, profile, budget, ai, community)
* `src/core/` (auth, config, errors, logger, analytics, validators)

The `src/core/errors/index.ts` module was implemented to provide a centralized error handling system (e.g., `AppError`, `AuthError`, `ValidationError`).

Finally, the legacy `.eslintrc.json` was deleted. All custom rules (no-console, prefer-const, no-unused-vars, no-explicit-any) were migrated into the modern, flat `eslint.config.mjs` file.

**Why this matters:** A structured, domain-driven folder layout prevents the "spaghetti code" anti-pattern as the team grows. Consolidating ESLint into a flat config ensures compatibility with Next.js 16 and modern tooling, enforcing strict code quality standards across the entire repository.
