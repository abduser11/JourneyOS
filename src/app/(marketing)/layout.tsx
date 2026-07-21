import type { Metadata } from "next";
import { ThemeProvider } from "@/components/design-system/theme-provider";
import { QueryProvider } from "@/lib/providers";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "JourneyOS — Intelligent Travel Operating System",
  description:
    "Plan, organize, manage, and enjoy every stage of your journey with intelligent planning, budgeting, visa guidance, and personalized recommendations.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
