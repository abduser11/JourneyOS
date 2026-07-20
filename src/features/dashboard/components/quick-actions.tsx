/**
 * JourneyOS — Quick Actions
 *
 * Animated navigation cards for quick access to major features.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerListProps, staggerItem } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Sparkles,
  Wallet,
  Compass,
  FileText,
  Users,
} from "lucide-react";

interface QuickAction {
  label: string;
  href: string;
  icon: typeof Plus;
  color: string;
  bgClass: string;
}

const ACTIONS: QuickAction[] = [
  { label: "New Trip", href: "/trips", icon: Plus, color: "text-blue-600", bgClass: "bg-blue-500/10" },
  { label: "AI Planner", href: "/ai-planner", icon: Sparkles, color: "text-purple-600", bgClass: "bg-purple-500/10" },
  { label: "Budget", href: "/budget", icon: Wallet, color: "text-green-600", bgClass: "bg-green-500/10" },
  { label: "Destinations", href: "/destinations", icon: Compass, color: "text-orange-600", bgClass: "bg-orange-500/10" },
  { label: "Documents", href: "/documents", icon: FileText, color: "text-amber-600", bgClass: "bg-amber-500/10" },
  { label: "Community", href: "/community", icon: Users, color: "text-rose-600", bgClass: "bg-rose-500/10" },
];

export function QuickActions() {
  return (
    <motion.div {...staggerListProps}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {ACTIONS.map((action) => (
          <motion.div key={action.label} variants={staggerItem}>
            <Link href={action.href}>
              <Card className="group p-4 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${action.bgClass} transition-transform duration-200 group-hover:scale-110`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <p className="text-sm font-medium text-foreground">{action.label}</p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
