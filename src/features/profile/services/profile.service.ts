/**
 * JourneyOS — Profile Service (Server Actions)
 *
 * Handles profile updates including avatar, display name, bio, etc.
 */

"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/services/supabase/server";
import { logger } from "@/core/logger";

export interface ProfileUpdateData {
  display_name?: string;
  bio?: string;
  nationality?: string;
  passport_country?: string;
  preferred_language?: string;
  currency?: string;
  timezone?: string;
  avatar_url?: string;
}

export async function updateProfile(data: ProfileUpdateData): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const supabase = await createServerClient();

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

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (data.display_name !== undefined) updatePayload.display_name = data.display_name;
    if (data.bio !== undefined) updatePayload.bio = data.bio;

    const { error } = await supabase
      .from("profiles")
      .update(updatePayload as never)
      .eq("id", user.id);

    if (error) {
      logger.error("updateProfile error", error, "profile");
      return {
        success: false,
        message: "Failed to update profile. Please try again.",
      };
    }

    revalidatePath("/profile");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (_error) {
    logger.error("updateProfile unexpected error", _error, "profile");
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
