import type { Metadata } from "next";

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
  return <>{children}</>;
}
