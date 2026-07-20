/**
 * JourneyOS — General Settings
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function Toggle({ defaultChecked = false, label, description }: { defaultChecked?: boolean; label: string; description: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-muted peer-checked:bg-brand rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 transition-colors">
          <div className="absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
        </div>
      </label>
    </div>
  );
}

export default function GeneralSettingsPage() {
  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">General</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your general preferences and regional settings.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="language">Language</Label>
            <Input id="language" defaultValue="English" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="region">Region</Label>
            <Input id="region" defaultValue="United States" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" defaultValue="USD ($)" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="timezone">Time Zone</Label>
            <Input id="timezone" defaultValue="UTC" className="mt-1.5" />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Preferences</h3>

          <Toggle label="Auto-save trips" description="Automatically save trip drafts" defaultChecked />
          <Toggle label="Show distances in metric" description="Metric or Imperial units" defaultChecked />
          <Toggle label="Compact view" description="Use compact layout where possible" />
        </div>
      </Card>
    </motion.div>
  );
}
