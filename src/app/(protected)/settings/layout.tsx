/**
 * JourneyOS — Settings Layout
 *
 * Shared layout for all settings sub-pages with a sidebar navigation.
 */

import type { Metadata } from "next";
import { SettingsNav } from "@/features/settings/components/settings-nav";

export const metadata: Metadata = {
  title: "Settings — JourneyOS",
  description: "Manage your JourneyOS settings and preferences.",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <SettingsNav />
        </aside>

        {/* Settings Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
