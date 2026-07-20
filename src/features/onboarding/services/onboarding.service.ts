/**
 * JourneyOS — Onboarding Service (Server Actions)
 *
 * Saves Travel DNA onboarding data to the database.
 */

"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/services/supabase/server";
import { logger } from "@/core/logger";
import type { OnboardingFormData } from "../types";
import type { Updatable } from "@/types/database";

/**
 * Saves the completed Travel DNA onboarding data.
 * Updates the existing travel_dna row created by the handle_new_user trigger.
 */
export async function saveTravelDNA(formData: OnboardingFormData): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const supabase = await createServerClient();

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Not authenticated. Please sign in.",
      };
    }

    // Build the update payload using the actual database column names.
    // We use TablesUpdate to ensure type safety with the database schema.
    const payload: Updatable<"travel_dna"> = {
      updated_at: new Date().toISOString(),
    };

    if (formData.budget_preference) payload.budget_preference = formData.budget_preference;
    if (formData.travel_style) payload.travel_style = formData.travel_style;
    if (formData.accommodation_preference)
      payload.accommodation_preference = formData.accommodation_preference;
    if (formData.transport_preference)
      payload.transport_preference = formData.transport_preference;
    if (formData.food_preference)
      payload.food_preferences = [formData.food_preference];
    if (formData.activities_preference)
      payload.activity_interests = [formData.activities_preference];
    if (formData.climate_preference)
      payload.climate_preference = formData.climate_preference;
    if (formData.languages?.trim())
      payload.preferred_languages = formData.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

    const { error } = await supabase
      .from("travel_dna")
      .update(payload)
      .eq("user_id", user.id);

    if (error) {
      logger.error("saveTravelDNA db error", error, "onboarding");
      return {
        success: false,
        message: "Failed to save your travel profile. Please try again.",
      };
    }

    // Update the profile to mark onboarding as complete
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (profileError) {
      logger.warn("saveTravelDNA profile update skipped", profileError, "onboarding");
    }

    revalidatePath("/onboarding");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Your Travel DNA has been saved.",
    };
  } catch (_error) {
    logger.error("saveTravelDNA unexpected error", _error, "onboarding");
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
