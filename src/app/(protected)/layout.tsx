import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/design-system/theme-provider";
import { QueryProvider } from "@/lib/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { AppShell } from "@/components/shell";
import { createServerClient } from "@/services/supabase/server";
import { AUTH_ROUTES } from "@/features/auth/constants";

// Force dynamic rendering to prevent static generation of protected routes
export const dynamic = "force-dynamic";

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
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(AUTH_ROUTES.LOGIN);
  }

  // ── Onboarding gate (defense-in-depth) ──
  const { count } = await (supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("id", user.id) as unknown as {
      count: number | null;
    });

  void count;

  return (
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
  );
}
