/**
 * JourneyOS — Auth Service (Server Actions)
 *
 * Server-side authentication logic using Supabase.
 * All functions run on the server for security.
 *
 * Reference: docs/03-Architecture.md (Service Layer)
 */

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient } from "@/services/supabase/server";
import { logger } from "@/core/logger";
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from "../constants";
import type {
  AuthResult,
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ProfileUpdateData,
} from "../types";
import {
  validateLoginForm,
  validateRegisterForm,
  validateForgotPasswordForm,
  validateResetPasswordForm,
  getAuthErrorMessage,
} from "../utils";

// ─────────────────────────────────────────────
//  LOGIN
// ─────────────────────────────────────────────

/**
 * Authenticates a user with email and password.
 * On success, checks if onboarding is needed and redirects accordingly.
 */
export async function signIn(formData: LoginFormData): Promise<AuthResult> {
  const validation = validateLoginForm(formData);
  if (!validation.isValid) {
    return {
      success: false,
      message: validation.errors[0]?.message ?? "Invalid form data.",
    };
  }

  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email.trim(),
      password: formData.password,
    });

    if (error) {
      return {
        success: false,
        message: getAuthErrorMessage(error.message),
      };
    }

    if (!data.user) {
      return {
        success: false,
        message: "Authentication failed. Please try again.",
      };
    }

    // Check if email is confirmed
    if (!data.user.email_confirmed_at) {
      return {
        success: false,
        message: "Please verify your email address before signing in.",
      };
    }

    // Check if onboarding is needed
    const { data: travelDna } = await supabase
      .from("travel_dna")
      .select("budget_preference, travel_style")
      .eq("user_id", data.user.id)
      .single();

    const needsOnboarding =
      !travelDna?.budget_preference || !travelDna?.travel_style;

    return {
      success: true,
      message: "Signed in successfully.",
      data: {
        user: {
          id: data.user.id,
          email: data.user.email ?? "",
          email_confirmed: !!data.user.email_confirmed_at,
          created_at: data.user.created_at,
        },
        needsOnboarding,
      },
      redirectUrl: needsOnboarding
        ? PROTECTED_ROUTES.ONBOARDING
        : PROTECTED_ROUTES.DASHBOARD,
    };
  } catch (error) {
    logger.error("signIn failed", error, "auth");
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

// ─────────────────────────────────────────────
//  REGISTER
// ─────────────────────────────────────────────

/**
 * Creates a new user account.
 * Supabase trigger (handle_new_user) auto-creates profile, travel_dna, and subscription.
 */
export async function signUp(formData: RegisterFormData): Promise<AuthResult> {
  const validation = validateRegisterForm(formData);
  if (!validation.isValid) {
    return {
      success: false,
      message: validation.errors[0]?.message ?? "Invalid form data.",
    };
  }

  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password,
      options: {
        data: {
          display_name: formData.displayName?.trim() || formData.email.split("@")[0],
        },
      },
    });

    if (error) {
      return {
        success: false,
        message: getAuthErrorMessage(error.message),
      };
    }

    if (!data.user) {
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }

    // Update profile display_name if provided
    if (formData.displayName?.trim()) {
      await supabase
        .from("profiles")
        .update({ display_name: formData.displayName.trim() })
        .eq("id", data.user.id);
    }

    return {
      success: true,
      message: "Account created. Please check your email to verify your account.",
      data: {
        user: {
          id: data.user.id,
          email: data.user.email ?? "",
          email_confirmed: !!data.user.email_confirmed_at,
          created_at: data.user.created_at,
        },
        needsOnboarding: true,
      },
      redirectUrl: AUTH_ROUTES.VERIFY_EMAIL,
    };
  } catch (error) {
    logger.error("signUp failed", error, "auth");
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

// ─────────────────────────────────────────────
//  FORGOT PASSWORD
// ─────────────────────────────────────────────

/**
 * Sends a password reset email to the user.
 */
export async function forgotPassword(formData: ForgotPasswordFormData): Promise<AuthResult> {
  const validation = validateForgotPasswordForm(formData);
  if (!validation.isValid) {
    return {
      success: false,
      message: validation.errors[0]?.message ?? "Invalid form data.",
    };
  }

  try {
    const supabase = await createServerClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.email.trim(),
      {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}${AUTH_ROUTES.RESET_PASSWORD}`,
      }
    );

    if (error) {
      // Always return success to prevent email enumeration
      return {
        success: true,
        message: "If an account exists with that email, a password reset link has been sent.",
      };
    }

    return {
      success: true,
      message: "If an account exists with that email, a password reset link has been sent.",
    };
  } catch (error) {
    logger.error("forgotPassword failed", error, "auth");
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

// ─────────────────────────────────────────────
//  RESET PASSWORD
// ─────────────────────────────────────────────

/**
 * Resets the user's password using the recovery token from the URL.
 */
export async function resetPassword(
  formData: ResetPasswordFormData,
  recoveryToken: string
): Promise<AuthResult> {
  const validation = validateResetPasswordForm(formData);
  if (!validation.isValid) {
    return {
      success: false,
      message: validation.errors[0]?.message ?? "Invalid form data.",
    };
  }

  if (!recoveryToken) {
    return {
      success: false,
      message: "Invalid recovery link. Please request a new password reset.",
    };
  }

  try {
    const supabase = await createServerClient();

    const { error } = await supabase.auth.exchangeCodeForSession(recoveryToken);

    if (error) {
      // The token might be in the hash fragment, try updateUser instead
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (updateError) {
        return {
          success: false,
          message: "Password reset failed. The link may have expired. Please try again.",
        };
      }

      return {
        success: true,
        message: "Password updated successfully. You can now sign in with your new password.",
        redirectUrl: AUTH_ROUTES.LOGIN,
      };
    }

    // Token exchange succeeded, now update the password
    const { error: updateError } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (updateError) {
      return {
        success: false,
        message: "Failed to update password. Please try again.",
      };
    }

    return {
      success: true,
      message: "Password updated successfully. You can now sign in with your new password.",
      redirectUrl: AUTH_ROUTES.LOGIN,
    };
  } catch (error) {
    logger.error("resetPassword failed", error, "auth");
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

// ─────────────────────────────────────────────
//  RESEND VERIFICATION EMAIL
// ─────────────────────────────────────────────

/**
 * Resends the email verification link.
 */
export async function resendVerificationEmail(email: string): Promise<AuthResult> {
  try {
    const supabase = await createServerClient();

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/`,
      },
    });

    if (error) {
      return {
        success: false,
        message: getAuthErrorMessage(error.message),
      };
    }

    return {
      success: true,
      message: "Verification email has been resent. Please check your inbox.",
    };
  } catch (error) {
    logger.error("resendVerificationEmail failed", error, "auth");
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

// ─────────────────────────────────────────────
//  SIGN OUT
// ─────────────────────────────────────────────

/**
 * Signs out the current user and clears the session.
 */
export async function signOut(): Promise<void> {
  try {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
  } catch (error) {
    logger.error("signOut failed", error, "auth");
  }
  // Always redirect to login regardless of outcome
  redirect(AUTH_ROUTES.LOGIN);
}

// ─────────────────────────────────────────────
//  PROFILE OPERATIONS
// ─────────────────────────────────────────────

/**
 * Updates the user's profile information.
 */
export async function updateProfile(data: ProfileUpdateData): Promise<AuthResult> {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "Not authenticated.",
      };
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      return {
        success: false,
        message: "Failed to update profile.",
      };
    }

    revalidatePath("/profile");
    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    logger.error("updateProfile failed", error, "auth");
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
