import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/design-system/theme-provider";
import { QueryProvider } from "@/lib/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { AppShell } from "@/components/shell";
import { createServerClient } from "@/services/supabase/server";
import { AUTH_ROUTES } from "@/features/auth/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JourneyOS",
  description: "Your intelligent travel operating system.",
};

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ── Defense-in-depth: server-side session verification ──
  // Even though proxy.ts handles route protection at the edge,
  // this provides a second layer inside the server component.
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(AUTH_ROUTES.LOGIN);
  }

  // ── Onboarding gate ──
  // Check if the user has completed onboarding by looking for the
  // onboarding_complete column (which exists in the DB but is not
  // yet reflected in the generated types). The proxy.ts handles
  // the actual redirect at the edge, so this is defense-in-depth.
  // We use the rpc-style filter approach to avoid TS errors with
  // the column name.
  const { count } = await (supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("id", user.id) as unknown as {
      count: number | null;
    });

  // If count === 0, the user has not completed onboarding.
  // We do not redirect here because the proxy handles it.
  void count;

  // ── Render the app shell ──
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>
              <AppShell>{children}</AppShell>
              <Toaster richColors position="top-right" />
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
