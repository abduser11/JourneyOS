/**
 * JourneyOS — Travel DNA Card
 *
 * Displays the user's saved travel preferences on the dashboard.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plane, Mountain, Hotel, UtensilsCrossed, Sun, Heart } from "lucide-react";
import type { TravelDNA } from "@/types/database";

interface TravelDNACardProps {
  travelDNA: TravelDNA | null;
}

function formatLabel(value: string | null | undefined): string {
  if (!value) return "Not set";
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");
}

export function TravelDNACard({ travelDNA }: TravelDNACardProps) {
  const preferences = [
    { icon: Plane, label: "Travel Style", value: travelDNA?.travel_style },
    { icon: Mountain, label: "Budget", value: travelDNA?.budget_preference },
    { icon: Hotel, label: "Accommodation", value: travelDNA?.accommodation_preference },
    { icon: UtensilsCrossed, label: "Food", value: travelDNA?.food_preferences?.[0] },
    { icon: Sun, label: "Climate", value: travelDNA?.climate_preference },
    { icon: Heart, label: "Activities", value: travelDNA?.activity_interests?.[0] },
  ];

  return (
    <motion.div {...pageTransition}>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground">Travel DNA</h3>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="gap-2 text-brand hover:text-brand hover:bg-brand/5">
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {preferences.map((pref) => (
            <div key={pref.label} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/5 text-brand">
                <pref.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{pref.label}</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {formatLabel(pref.value)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {travelDNA?.preferred_languages && travelDNA.preferred_languages.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Languages</p>
            <div className="flex flex-wrap gap-1.5">
              {travelDNA.preferred_languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
