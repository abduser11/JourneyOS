/**
 * JourneyOS — Privacy Settings
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

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

export default function PrivacySettingsPage() {
  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Privacy</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your data privacy and sharing preferences.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Profile Visibility</h3>

        <Toggle label="Public profile" description="Allow others to view your profile" />
        <Toggle label="Show travel history" description="Display your trips publicly" />

        <Separator />

        <h3 className="text-sm font-semibold text-foreground">Data & Analytics</h3>

        <Toggle label="Usage analytics" description="Help us improve with anonymous usage data" defaultChecked />
        <Toggle label="Personalized recommendations" description="Allow AI to learn from your preferences" defaultChecked />

        <Separator />

        <h3 className="text-sm font-semibold text-foreground">Data Management</h3>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download my data
          </Button>
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete account
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
