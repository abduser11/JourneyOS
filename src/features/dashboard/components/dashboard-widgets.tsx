/**
 * JourneyOS — Dashboard Placeholder Widgets
 *
 * Beautiful placeholder widgets for Weather, Currency, and Notifications.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/design-system/empty-state";
import { Sun, DollarSign, Bell, CloudSun } from "lucide-react";

export function WeatherWidget() {
  return (
    <motion.div {...pageTransition}>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Weather</h3>
          <CloudSun className="h-5 w-5 text-brand/50" />
        </div>
        <EmptyState
          icon={<Sun className="h-10 w-10 text-brand/30" />}
          title="Weather services coming soon"
          description="Get real-time weather for your destinations."
        />
      </Card>
    </motion.div>
  );
}

export function CurrencyWidget() {
  return (
    <motion.div {...pageTransition}>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Currency</h3>
          <DollarSign className="h-5 w-5 text-brand/50" />
        </div>
        <EmptyState
          icon={<DollarSign className="h-10 w-10 text-brand/30" />}
          title="Currency converter coming soon"
          description="Convert currencies at real-time rates."
        />
      </Card>
    </motion.div>
  );
}

export function NotificationsWidget() {
  return (
    <motion.div {...pageTransition}>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Notifications</h3>
          <Bell className="h-5 w-5 text-brand/50" />
        </div>
        <EmptyState
          icon={<Bell className="h-10 w-10 text-brand/30" />}
          title="All caught up"
          description="You have no new notifications."
        />
      </Card>
    </motion.div>
  );
}
