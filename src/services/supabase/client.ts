/**
 * JourneyOS — Supabase Browser Client
 *
 * Client-side only Supabase client for use in Client Components.
 * Session is persisted in HTTP-only cookies managed by @supabase/ssr.
 */

"use client";

import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function createBrowserClient() {
  return _createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
