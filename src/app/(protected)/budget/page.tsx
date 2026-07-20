/**
 * JourneyOS — Budget Page (Placeholder)
 *
 * Placeholder for the Budget management module.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/design-system/empty-state";
import { Wallet, Plus } from "lucide-react";

export default function BudgetPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Budget</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your travel expenses and stay within budget.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <EmptyState
        icon={<Wallet className="h-16 w-16 text-brand/30" />}
        title="No budget data yet"
        description="Start tracking your travel expenses to get insights into your spending patterns."
        action={{
          label: "Set Up Budget",
          onClick: () => {},
        }}
      />
    </motion.div>
  );
}
