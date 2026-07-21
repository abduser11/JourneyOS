/**
 * JourneyOS — Appearance Settings
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/shell/theme-toggle";

export const dynamic = 'force-dynamic';
function NativeSelect({ defaultValue, options, id }: { defaultValue: string; options: { value: string; label: string }[]; id: string }) {
  return (
    <select
      id={id}
      defaultValue={defaultValue}
      className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default function AppearanceSettingsPage() {
  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Appearance</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize the look and feel of JourneyOS.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Theme</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Display</h3>

          <div>
            <Label htmlFor="font-size">Font Size</Label>
            <NativeSelect
              id="font-size"
              defaultValue="medium"
              options={[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
              ]}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="density">Content Density</Label>
            <NativeSelect
              id="density"
              defaultValue="comfortable"
              options={[
                { value: "compact", label: "Compact" },
                { value: "comfortable", label: "Comfortable" },
                { value: "spacious", label: "Spacious" },
              ]}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Animations</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Enable animations</p>
              <p className="text-xs text-muted-foreground">Smooth transitions and micro-interactions</p>
            </div>
            <NativeSelect
              id="animations"
              defaultValue="enabled"
              options={[
                { value: "enabled", label: "Enabled" },
                { value: "reduced", label: "Reduced" },
                { value: "disabled", label: "Disabled" },
              ]}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
