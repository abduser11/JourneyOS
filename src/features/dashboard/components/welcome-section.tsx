/**
 * JourneyOS — Dashboard Welcome Section
 *
 * Displays a dynamic time-based greeting and a motivational travel message.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

const GREETINGS: { start: number; end: number; text: string }[] = [
  { start: 5, end: 12, text: "Good Morning" },
  { start: 12, end: 17, text: "Good Afternoon" },
  { start: 17, end: 21, text: "Good Evening" },
  { start: 21, end: 24, text: "Good Night" },
  { start: 0, end: 5, text: "Good Night" },
];

const MOTIVATIONAL_MESSAGES = [
  "Ready for your next adventure?",
  "The world is waiting.",
  "Let\u2019s plan something unforgettable.",
  "Every journey begins with a single step.",
  "Adventure awaits around every corner.",
];

function getRandomMessage() {
  return MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
}

function getGreeting(): string {
  const hour = new Date().getHours();
  const match = GREETINGS.find((g) => hour >= g.start && hour < g.end);
  return match?.text ?? "Hello";
}

interface WelcomeSectionProps {
  displayName?: string | null;
}

export function WelcomeSection({ displayName }: WelcomeSectionProps) {
  const greeting = getGreeting();
  const message = getRandomMessage();
  const name = displayName || "Traveler";

  return (
    <motion.div {...pageTransition} className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {greeting}, <span className="text-brand">{name}</span>
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">{message}</p>
    </motion.div>
  );
}
