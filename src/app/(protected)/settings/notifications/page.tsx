/**
 * JourneyOS — Notifications Settings
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
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

export default function NotificationsSettingsPage() {
  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Control how and when you receive notifications.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Email Notifications</h3>

        <Toggle label="Trip reminders" description="Reminders before upcoming trips" defaultChecked />
        <Toggle label="Price alerts" description="Flight and hotel price changes" defaultChecked />
        <Toggle label="Travel tips" description="Weekly travel recommendations" />

        <Separator />

        <h3 className="text-sm font-semibold text-foreground">Push Notifications</h3>

        <Toggle label="Enable push notifications" description="Receive notifications on your device" defaultChecked />
        <Toggle label="Quiet hours" description="Mute notifications during specified hours" />

        <Separator />

        <h3 className="text-sm font-semibold text-foreground">Marketing</h3>

        <Toggle label="Promotional emails" description="Special offers and deals" />
        <Toggle label="Community updates" description="New features and community news" />
      </Card>
    </motion.div>
  );
}
