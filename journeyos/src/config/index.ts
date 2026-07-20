// JourneyOS - Application Configuration
// Environment-based configuration

export const config = {
  app: {
    name: "JourneyOS",
    version: "0.1.0",
    env: process.env.NODE_ENV ?? "development",
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  },
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    enableAIAssistant: process.env.NEXT_PUBLIC_ENABLE_AI === "true",
  },
} as const;
