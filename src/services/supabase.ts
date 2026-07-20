/**
 * JourneyOS — Supabase Client Factory
 *
 * Re-exports client and server clients from separate modules.
 * This prevents Turbopack build errors caused by mixing
 * server-only imports (next/headers) with client-side exports.
 */

export { createBrowserClient } from "./supabase/client";
export { createServerClient } from "./supabase/server";
export type { Database } from "./supabase/server";
