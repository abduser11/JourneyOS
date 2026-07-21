/**
 * JourneyOS — Documents Page (Placeholder)
 *
 * Placeholder for the travel documents management module.
 */

"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/design-system/empty-state";
import { FileText, Upload } from "lucide-react";

export const dynamic = 'force-dynamic';
export default function DocumentsPage() {
  return (
    <motion.div {...pageTransition} className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Store and organize your travel documents securely.
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>

      <EmptyState
        icon={<FileText className="h-16 w-16 text-brand/30" />}
        title="No documents yet"
        description="Upload your passport, visas, travel insurance, and other important documents."
        action={{
          label: "Upload First Document",
          onClick: () => {},
        }}
      />
    </motion.div>
  );
}
