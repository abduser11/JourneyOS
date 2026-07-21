import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JourneyOS",
  description: "Your intelligent travel operating system.",
};

/**
 * Auth checking is handled at the edge by middleware (middleware.ts).
 * This layout does NOT perform server-side auth checks during prerender.
 */
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
