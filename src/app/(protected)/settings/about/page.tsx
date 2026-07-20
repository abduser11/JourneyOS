/**
 * JourneyOS — About Settings Page
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutSettingsPage() {
  return (
    <motion.div {...pageTransition} className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">About JourneyOS</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Learn more about the platform and its mission.
        </p>
      </div>

      <Card className="p-8 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
          <Compass className="h-8 w-8 text-brand" />
        </div>

        <h2 className="text-2xl font-bold text-foreground">JourneyOS</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Your intelligent travel operating system. Plan, organize, manage, and enjoy
          every stage of your journey.
        </p>

        <div className="flex items-center justify-center gap-2 pt-2">
          <Badge variant="outline">v0.2.0</Badge>
          <Badge variant="outline">Sprint 2</Badge>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Connect</h3>

        <div className="flex flex-wrap gap-3">
          <Link href="#" className="inline-flex">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              GitHub
            </Button>
          </Link>
          <Link href="#" className="inline-flex">
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </Button>
          </Link>
        </div>

        <div className="pt-2 text-xs text-muted-foreground">
          <p>Built with Next.js, Supabase, and Tailwind CSS.</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} JourneyOS. All rights reserved.</p>
        </div>
      </Card>
    </motion.div>
  );
}
