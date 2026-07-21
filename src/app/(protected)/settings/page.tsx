/**
 * JourneyOS — Settings Root
 *
 * Redirects to the General settings page.
 */

import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';
export default function SettingsRoot() {
  redirect("/settings/general");
}
