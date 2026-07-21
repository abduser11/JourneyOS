import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication — JourneyOS",
  description: "Sign in, create an account, or reset your password.",
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
