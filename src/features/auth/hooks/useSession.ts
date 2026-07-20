/**
 * JourneyOS — useSession Hook
 *
 * Provides session-specific data: profile, travel DNA completion status.
 * Used by the onboarding redirect logic.
 */

"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/services/supabase/client";
import type { Profile, TravelDNA } from "@/types/database";
import { logger } from "@/core/logger";

export interface SessionData {
  profile: Profile | null;
  travelDNA: TravelDNA | null;
  isOnboardingComplete: boolean;
  loading: boolean;
}

export function useSession(): SessionData {
  const supabase = createBrowserClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [travelDNA, setTravelDNA] = useState<TravelDNA | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data: userData } = await supabase.auth.getUser();

        if (!userData.user) {
          setLoading(false);
          return;
        }

        const [profileResult, dnaResult] = await Promise.all([
          supabase
            .from("profiles")
            .select("*")
            .eq("id", userData.user.id)
            .single(),
          supabase
            .from("travel_dna")
            .select("*")
            .eq("user_id", userData.user.id)
            .single(),
        ]);

        if (profileResult.data) {
          setProfile(profileResult.data as Profile);
        }

        if (dnaResult.data) {
          setTravelDNA(dnaResult.data as TravelDNA);
        }
      } catch (error) {
        logger.error("useSession fetch error", { error });
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [supabase]);

  const isOnboardingComplete = !!(
    travelDNA?.budget_preference && travelDNA?.travel_style
  );

  return {
    profile,
    travelDNA,
    isOnboardingComplete,
    loading,
  };
}
