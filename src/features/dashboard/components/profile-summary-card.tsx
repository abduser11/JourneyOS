/**
 * JourneyOS — Profile Summary Card
 *
 * Displays avatar, name, email, subscription plan, and edit button.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import type { Profile } from "@/types/database";

interface ProfileSummaryCardProps {
  profile: Profile | null;
  subscriptionPlan?: string;
}

export function ProfileSummaryCard({ profile, subscriptionPlan }: ProfileSummaryCardProps) {
  const initials = (profile?.display_name || "J")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
      {...pageTransition}
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={profile?.avatar_url ?? ""} alt={profile?.display_name ?? "User"} />
          <AvatarFallback className="bg-brand/10 text-brand font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {profile?.display_name || "JourneyOS User"}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {profile?.bio || "No bio yet"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="text-xs">
          Free
        </Badge>
        <span className="text-xs text-muted-foreground">
          {subscriptionPlan || "Basic Plan"}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Link href="/profile">
          <Button variant="ghost" size="sm" className="gap-2 text-brand hover:text-brand hover:bg-brand/5">
            <Pencil className="h-3.5 w-3.5" />
            Edit Profile
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
