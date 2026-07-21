/**
 * JourneyOS — Email Verification Page
 *
 * Displays after registration. Instructs user to check their email.
 * Provides option to resend the verification email.
 *
 * Reference: docs/01-Product-Requirements.md (Authentication module)
 */

"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Mail, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_ROUTES } from "@/features/auth/constants";
import { useAuth } from "@/features/auth/hooks";
import { pageTransition } from "@/lib/animations";

export const dynamic = 'force-dynamic';
function VerifyEmailContent() {
  const { resendVerification, loading } = useAuth();
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(prefilledEmail);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleResend(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!email.trim()) return;

    const result = await resendVerification(email);

    if (result.success) {
      setMessage("Verification email resent successfully.");
      setIsError(false);
    } else {
      setMessage(result.message);
      setIsError(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        {...pageTransition}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-2xl font-bold text-foreground tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            JourneyOS
          </motion.h1>
          <motion.p
            className="text-sm text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Verify your email address
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          className="bg-card border border-border rounded-xl p-8 shadow-sm text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Mail className="h-12 w-12 text-primary/60 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Check your inbox
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            We&apos;ve sent a verification link to your email address. Please click the link to verify your account.
          </p>

          {/* Status Message */}
          {message && (
            <div
              className={`mb-5 text-sm rounded-lg p-3 ${
                isError
                  ? "bg-destructive/10 border border-destructive/20 text-destructive"
                  : "bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
              }`}
            >
              {message}
            </div>
          )}

          {/* Resend Form */}
          <form onSubmit={handleResend} className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="verify-email" className="text-sm font-medium">
                Resend to email
              </Label>
              <div className="flex gap-2">
                <Input
                  id="verify-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 flex-1"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="h-11 px-4 text-sm"
                  disabled={loading || !email.trim()}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">
                Already verified?
              </span>
            </div>
          </div>

          {/* Back to Login */}
          <Link
            href={AUTH_ROUTES.LOGIN}
            className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 h-11 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Didn&apos;t receive the email? Check your spam folder or request a new one above.
        </p>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
