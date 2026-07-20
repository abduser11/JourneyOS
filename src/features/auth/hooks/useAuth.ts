/**
 * JourneyOS — useAuth Hook
 *
 * Provides authentication state and methods to client components.
 * Manages session listening, user state, and auth actions.
 *
 * Reference: docs/03-Architecture.md (Application Layer)
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/services/supabase/client";
import type { AuthUser, AuthResult } from "../types";
import {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  resendVerificationEmail,
  signOut,
} from "../services";
import { AUTH_ROUTES } from "../constants";

export function useAuth() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // ───────────────────────────────────────────
  //  SESSION LISTENER
  // ───────────────────────────────────────────

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          email_confirmed: !!session.user.email_confirmed_at,
          created_at: session.user.created_at,
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          email_confirmed: !!session.user.email_confirmed_at,
          created_at: session.user.created_at,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // ───────────────────────────────────────────
  //  AUTH ACTIONS
  // ───────────────────────────────────────────

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const result = await signIn({ email, password });
        if (result.success && result.redirectUrl) {
          router.push(result.redirectUrl);
        }
        return result;
      } catch {
        return {
          success: false,
          message: "An unexpected error occurred.",
        } satisfies AuthResult;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const handleSignUp = useCallback(
    async (email: string, password: string, displayName?: string) => {
      setLoading(true);
      try {
        const result = await signUp({
          email,
          password,
          confirmPassword: password,
          displayName,
        });
        if (result.success && result.redirectUrl) {
          router.push(result.redirectUrl);
        }
        return result;
      } catch {
        return {
          success: false,
          message: "An unexpected error occurred.",
        } satisfies AuthResult;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const handleForgotPassword = useCallback(
    async (email: string) => {
      setLoading(true);
      try {
        const result = await forgotPassword({ email });
        return result;
      } catch {
        return {
          success: false,
          message: "An unexpected error occurred.",
        } satisfies AuthResult;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleResetPassword = useCallback(
    async (password: string, recoveryToken: string) => {
      setLoading(true);
      try {
        const result = await resetPassword(
          { password, confirmPassword: password },
          recoveryToken
        );
        if (result.success && result.redirectUrl) {
          router.push(result.redirectUrl);
        }
        return result;
      } catch {
        return {
          success: false,
          message: "An unexpected error occurred.",
        } satisfies AuthResult;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const handleResendVerification = useCallback(
    async (email: string) => {
      setLoading(true);
      try {
        const result = await resendVerificationEmail(email);
        return result;
      } catch {
        return {
          success: false,
          message: "An unexpected error occurred.",
        } satisfies AuthResult;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push(AUTH_ROUTES.LOGIN);
  }, [router]);

  return {
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    resendVerification: handleResendVerification,
    signOut: handleSignOut,
  };
}
