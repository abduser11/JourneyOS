/**
 * JourneyOS — Account Settings
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { KeyRound, ShieldCheck, LogOut } from "lucide-react";

export const dynamic = 'force-dynamic';
export default function AccountSettingsPage() {
  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account security and subscription.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Subscription</h3>
            <Badge variant="secondary" className="mt-1">Free Plan</Badge>
          </div>
          <Button variant="outline" size="sm">Upgrade</Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Security</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Password</p>
            </div>
            <Button variant="ghost" size="sm">Change</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
            </div>
            <Button variant="ghost" size="sm">Enable</Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Sessions</h3>

          <div className="rounded-lg bg-muted/50 p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Current session</p>
              <p className="text-xs text-muted-foreground">This device &middot; Active now</p>
            </div>
            <Badge variant="outline" className="text-xs text-success-foreground border-success/30 bg-success/10">
              Active
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-foreground">Sign out of all devices</p>
            <p className="text-xs text-muted-foreground">End all active sessions</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign out all
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
