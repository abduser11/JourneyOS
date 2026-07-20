/**
 * JourneyOS — Supabase Server Client
 *
 * Server-side only Supabase client for use in Server Components and Route Handlers.
 * Reads and writes cookies to maintain session state via HTTP-only cookies.
 */

import {
  createServerClient as _createServerClient,
} from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const COOKIE_NAME = "journeyos-auth";

const defaultCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function createServerClient() {
  const cookieStore = await cookies();

  return _createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookieOptions: {
      name: COOKIE_NAME,
      ...defaultCookieOptions,
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set({
            name,
            value,
            ...options,
            ...defaultCookieOptions,
          });
        });
      },
    },
  });
}

export type { Database };
