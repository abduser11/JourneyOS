/**
 * JourneyOS — Profile Page
 *
 * Complete profile management with editable fields, Travel DNA summary,
 * and a premium UI experience.
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { useSession } from "@/features/auth/hooks/useSession";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import {
  User,
  Mail,
  Globe,
  Flag,
  Languages,
  Currency,
  Clock,
  FileText,
  Camera,
  Save,
  Plane,
  Mountain,
  Hotel,
  UtensilsCrossed,
  Sun,
  Heart,
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { profile, travelDNA, loading } = useSession();
  const [saving, setSaving] = useState(false);
  const defaultForm = {
    display_name: profile?.display_name ?? "",
    bio: profile?.bio ?? "",
    nationality: "",
    passport_country: "",
    preferred_language: "",
    currency: "USD",
    timezone: "",
  };

  const [formData, setFormData] = useState(defaultForm);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { updateProfile } = await import("@/features/profile/services/profile.service");
      const result = await updateProfile({
        display_name: formData.display_name,
        bio: formData.bio,
      });

      if (result.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  const initials = (profile?.display_name || "J")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>

      <div className="space-y-6">
        {/* Avatar & Basic Info Section */}
        <Card className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative group">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url ?? ""} alt={profile?.display_name ?? "User"} />
                <AvatarFallback className="bg-brand/10 text-brand text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {profile?.display_name || "JourneyOS User"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                JourneyOS member since{" "}
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                  : "2026"}
              </p>
              <Badge variant="secondary" className="mt-2">
                Free Plan
              </Badge>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Editable Fields */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="display_name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Display Name
              </Label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, display_name: e.target.value })
                }
                placeholder="Your display name"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                value="user@journeyos.com"
                disabled
                className="mt-1.5 bg-muted/50"
              />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
            </div>

            <div>
              <Label htmlFor="nationality" className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
                Nationality
              </Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, nationality: e.target.value })
                }
                placeholder="Your nationality"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="passport_country" className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Passport Country
              </Label>
              <Input
                id="passport_country"
                value={formData.passport_country}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, passport_country: e.target.value })
                }
                placeholder="Country of passport"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="preferred_language" className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                Preferred Language
              </Label>
              <Input
                id="preferred_language"
                value={formData.preferred_language}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, preferred_language: e.target.value })
                }
                placeholder="e.g., English"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="currency" className="flex items-center gap-2">
                <Currency className="h-4 w-4 text-muted-foreground" />
                Currency
              </Label>
              <Input
                id="currency"
                value={formData.currency}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
                placeholder="e.g., USD, EUR"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="timezone" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Time Zone
              </Label>
              <Input
                id="timezone"
                value={formData.timezone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, timezone: e.target.value })
                }
                placeholder="e.g., UTC+0"
                className="mt-1.5"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Bio
              </Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                className="mt-1.5 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Card>

        {/* Travel DNA Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Travel DNA</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Your travel preferences and style.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Plane, label: "Travel Style", value: travelDNA?.travel_style },
              { icon: Mountain, label: "Budget", value: travelDNA?.budget_preference },
              { icon: Hotel, label: "Accommodation", value: travelDNA?.accommodation_preference },
              { icon: UtensilsCrossed, label: "Food Preference", value: travelDNA?.food_preferences?.[0] },
              { icon: Sun, label: "Climate", value: travelDNA?.climate_preference },
              { icon: Heart, label: "Activities", value: travelDNA?.activity_interests?.[0] },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/5 text-brand">
                  <pref.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{pref.label}</p>
                  <p className="text-sm font-medium text-foreground truncate">
                    {pref.value
                      ? pref.value.charAt(0).toUpperCase() + pref.value.slice(1).replace(/_/g, " ")
                      : "Not set"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {travelDNA?.preferred_languages && travelDNA.preferred_languages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-foreground mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {travelDNA.preferred_languages.map((lang) => (
                  <Badge key={lang} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-border">
            <Button variant="outline" size="sm">
              Edit Travel DNA
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
