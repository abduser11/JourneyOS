/**
 * JourneyOS — Travel DNA Onboarding Wizard
 *
 * Multi-step wizard that collects the user's travel preferences.
 * Saves data to the database on completion.
 *
 * Improvements in Sprint 1.5:
 * - Proper loading spinner during save
 * - Error state with retry capability
 * - Success animation on completion
 * - Stronger validation feedback
 * - Optimized re-renders with useCallback
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Wallet,
  Compass,
  Hotel,
  Car,
  Utensils,
  Mountain,
  Sun,
  Languages,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROTECTED_ROUTES } from "@/features/auth/constants";
import { OptionCard } from "./option-card";
import { StepIndicator } from "./step-indicator";
import { saveTravelDNA } from "../services";
import type { OnboardingStepId, OnboardingFormData } from "../types";
import {
  BUDGET_OPTIONS,
  TRAVEL_STYLE_OPTIONS,
  ACCOMMODATION_OPTIONS,
  TRANSPORT_OPTIONS,
  FOOD_OPTIONS,
  ACTIVITY_OPTIONS,
  CLIMATE_OPTIONS,
} from "../types";
import { pageTransition } from "@/lib/animations";

const STEP_ICONS: Record<OnboardingStepId, React.ReactNode> = {
  welcome: <Globe className="h-8 w-8 text-primary" />,
  budget: <Wallet className="h-6 w-6 text-primary" />,
  travelStyle: <Compass className="h-6 w-6 text-primary" />,
  accommodation: <Hotel className="h-6 w-6 text-primary" />,
  transport: <Car className="h-6 w-6 text-primary" />,
  food: <Utensils className="h-6 w-6 text-primary" />,
  activities: <Mountain className="h-6 w-6 text-primary" />,
  climate: <Sun className="h-6 w-6 text-primary" />,
  languages: <Languages className="h-6 w-6 text-primary" />,
  summary: <CheckCircle2 className="h-6 w-6 text-primary" />,
};

const STEP_ORDER: OnboardingStepId[] = [
  "welcome",
  "budget",
  "travelStyle",
  "accommodation",
  "transport",
  "food",
  "activities",
  "climate",
  "languages",
  "summary",
];

const INITIAL_FORM_DATA: OnboardingFormData = {
  budget_preference: "",
  travel_style: "",
  accommodation_preference: "",
  transport_preference: "",
  food_preference: "",
  activities_preference: "",
  climate_preference: "",
  languages: "",
};

export function TravelDNAWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStepId>("welcome");
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_FORM_DATA);

  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const isLastStep = currentStep === "summary";
  const isFirstStep = currentStep === "welcome";
  const progressPercent = useMemo(
    () => Math.round(((currentIndex + 1) / STEP_ORDER.length) * 100),
    [currentIndex]
  );

  const updateField = useCallback(
    (field: keyof OnboardingFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setError("");
    },
    []
  );

  const goNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < STEP_ORDER.length) {
      setCurrentStep(STEP_ORDER[nextIndex]);
    }
  }, [currentIndex]);

  const goBack = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEP_ORDER[prevIndex]);
    }
  }, [currentIndex]);

  const handleSelect = useCallback(
    (field: keyof Omit<OnboardingFormData, "languages">, value: string) => {
      updateField(field, value);
      // Auto-advance after a short delay for UX
      setTimeout(goNext, 300);
    },
    [updateField, goNext]
  );

  const handleFinish = useCallback(async () => {
    setSaving(true);
    setError("");

    try {
      const result = await saveTravelDNA(formData);

      if (result.success) {
        setCompleted(true);
        // Give the success animation a moment before redirecting
        setTimeout(() => {
          router.push(PROTECTED_ROUTES.DASHBOARD);
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [formData, router]);

  const handleRetry = useCallback(() => {
    setError("");
    handleFinish();
  }, [handleFinish]);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case "welcome":
        return true;
      case "budget":
        return !!formData.budget_preference;
      case "travelStyle":
        return !!formData.travel_style;
      case "accommodation":
        return !!formData.accommodation_preference;
      case "transport":
        return !!formData.transport_preference;
      case "food":
        return !!formData.food_preference;
      case "activities":
        return !!formData.activities_preference;
      case "climate":
        return !!formData.climate_preference;
      case "languages":
        return true;
      case "summary":
        return true;
      default:
        return false;
    }
  }, [currentStep, formData]);

  // ───────────────────────────────────────────
  //  SUCCESS STATE
  // ───────────────────────────────────────────

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="bg-card border border-border rounded-xl p-8 shadow-sm"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <motion.div
              className="flex justify-center mb-5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="bg-primary/10 rounded-full p-4">
                <PartyPopper className="h-10 w-10 text-primary" />
              </div>
            </motion.div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your Travel DNA is Ready!
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              We&apos;ve personalized your experience. Redirecting to your dashboard...
            </p>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">Loading dashboard</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Step Indicator */}
        {!isFirstStep && !isLastStep && (
          <div className="mb-6">
            <StepIndicator currentStep={currentStep} progressPercent={progressPercent} />
          </div>
        )}

        {/* Card */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
          {/* Error State */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-5"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-destructive">{error}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRetry}
                      disabled={saving}
                      className="mt-2 h-7 text-xs text-destructive hover:text-destructive/80 p-0"
                    >
                      Try again
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
            {!isFirstStep && !isLastStep && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="text-sm"
                aria-label="Go back to previous step"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
            )}

            <div className="ml-auto">
              {isLastStep ? (
                <Button
                  onClick={handleFinish}
                  disabled={saving}
                  className="h-10 text-sm font-medium"
                  aria-label="Complete onboarding setup"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="h-10 text-sm font-medium"
                  aria-label="Continue to next step"
                >
                  Continue
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // ───────────────────────────────────────────
  //  STEP RENDERERS
  // ───────────────────────────────────────────

  function renderStep() {
    switch (currentStep) {
      case "welcome":
        return (
          <motion.div className="text-center py-8" {...pageTransition}>
            <div className="flex justify-center mb-6">{STEP_ICONS.welcome}</div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Welcome to JourneyOS
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-2">
              Let&apos;s personalize your travel experience. Answer a few questions
              about your preferences and we&apos;ll craft the perfect travel
              operating system for you.
            </p>
            <p className="text-xs text-muted-foreground">
              This takes about 2 minutes.
            </p>
          </motion.div>
        );

      case "budget":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.budget}
              <h2 className="text-lg font-semibold text-foreground">
                What&apos;s your daily budget?
              </h2>
            </div>
            <div className="space-y-3">
              {BUDGET_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={formData.budget_preference === opt.value}
                  onSelect={(v) => handleSelect("budget_preference", v)}
                />
              ))}
            </div>
          </motion.div>
        );

      case "travelStyle":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.travelStyle}
              <h2 className="text-lg font-semibold text-foreground">
                How do you travel?
              </h2>
            </div>
            <div className="space-y-3">
              {TRAVEL_STYLE_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={formData.travel_style === opt.value}
                  onSelect={(v) => handleSelect("travel_style", v)}
                />
              ))}
            </div>
          </motion.div>
        );

      case "accommodation":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.accommodation}
              <h2 className="text-lg font-semibold text-foreground">
                Where do you stay?
              </h2>
            </div>
            <div className="space-y-3">
              {ACCOMMODATION_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={formData.accommodation_preference === opt.value}
                  onSelect={(v) => handleSelect("accommodation_preference", v)}
                />
              ))}
            </div>
          </motion.div>
        );

      case "transport":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.transport}
              <h2 className="text-lg font-semibold text-foreground">
                How do you get around?
              </h2>
            </div>
            <div className="space-y-3">
              {TRANSPORT_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={formData.transport_preference === opt.value}
                  onSelect={(v) => handleSelect("transport_preference", v)}
                />
              ))}
            </div>
          </motion.div>
        );

      case "food":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.food}
              <h2 className="text-lg font-semibold text-foreground">
                What&apos;s your food style?
              </h2>
            </div>
            <div className="space-y-3">
              {FOOD_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={formData.food_preference === opt.value}
                  onSelect={(v) => handleSelect("food_preference", v)}
                />
              ))}
            </div>
          </motion.div>
        );

      case "activities":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.activities}
              <h2 className="text-lg font-semibold text-foreground">
                What do you love doing?
              </h2>
            </div>
            <div className="space-y-3">
              {ACTIVITY_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={formData.activities_preference === opt.value}
                  onSelect={(v) => handleSelect("activities_preference", v)}
                />
              ))}
            </div>
          </motion.div>
        );

      case "climate":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.climate}
              <h2 className="text-lg font-semibold text-foreground">
                What climate do you prefer?
              </h2>
            </div>
            <div className="space-y-3">
              {CLIMATE_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={formData.climate_preference === opt.value}
                  onSelect={(v) => handleSelect("climate_preference", v)}
                />
              ))}
            </div>
          </motion.div>
        );

      case "languages":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.languages}
              <h2 className="text-lg font-semibold text-foreground">
                Languages you speak
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tell us which languages you speak so we can recommend destinations
              where communication is easy.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="e.g. English, Spanish, French"
                value={formData.languages}
                onChange={(e) => updateField("languages", e.target.value)}
                className="h-11"
                aria-label="Languages you speak"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple languages with commas. This step is optional.
              </p>
            </div>
          </motion.div>
        );

      case "summary":
        return (
          <motion.div {...pageTransition}>
            <div className="flex items-center gap-3 mb-6">
              {STEP_ICONS.summary}
              <h2 className="text-lg font-semibold text-foreground">
                Your Travel DNA
              </h2>
            </div>
            <div className="space-y-3 mb-6">
              <SummaryRow
                label="Budget"
                value={
                  BUDGET_OPTIONS.find((o) => o.value === formData.budget_preference)
                    ?.label ?? ""
                }
              />
              <SummaryRow
                label="Travel Style"
                value={
                  TRAVEL_STYLE_OPTIONS.find(
                    (o) => o.value === formData.travel_style
                  )?.label ?? ""
                }
              />
              <SummaryRow
                label="Accommodation"
                value={
                  ACCOMMODATION_OPTIONS.find(
                    (o) => o.value === formData.accommodation_preference
                  )?.label ?? ""
                }
              />
              <SummaryRow
                label="Transport"
                value={
                  TRANSPORT_OPTIONS.find(
                    (o) => o.value === formData.transport_preference
                  )?.label ?? ""
                }
              />
              <SummaryRow
                label="Food"
                value={
                  FOOD_OPTIONS.find(
                    (o) => o.value === formData.food_preference
                  )?.label ?? ""
                }
              />
              <SummaryRow
                label="Activities"
                value={
                  ACTIVITY_OPTIONS.find(
                    (o) => o.value === formData.activities_preference
                  )?.label ?? ""
                }
              />
              <SummaryRow
                label="Climate"
                value={
                  CLIMATE_OPTIONS.find(
                    (o) => o.value === formData.climate_preference
                  )?.label ?? ""
                }
              />
              {formData.languages && (
                <SummaryRow label="Languages" value={formData.languages} />
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              You can always change these preferences later in your profile
              settings.
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  }
}

// ─────────────────────────────────────────────
//  SUMMARY ROW (memoized to prevent re-renders)
// ─────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
