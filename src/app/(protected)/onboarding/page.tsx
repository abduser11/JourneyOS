/**
 * JourneyOS — Onboarding Page
 *
 * Protected route that displays the Travel DNA wizard.
 * Only accessible to authenticated users who haven't completed onboarding.
 *
 * Reference: docs/01-Product-Requirements.md (Travel DNA module)
 */

import { TravelDNAWizard } from "@/features/onboarding/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setup Your Travel DNA — JourneyOS",
  description: "Personalize your travel experience with a quick setup wizard.",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return <TravelDNAWizard />;
}
