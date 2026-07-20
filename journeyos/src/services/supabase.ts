// Supabase Client Configuration
import { createClient } from "@supabase/supabase-js";
import { config } from "@/config";
import type { Database } from "@/types/database";

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.anonKey;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type SupabaseClient = typeof supabase;
