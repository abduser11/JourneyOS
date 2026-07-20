/**
 * JourneyOS — Onboarding Feature Types
 *
 * Type definitions for the Travel DNA onboarding wizard.
 */

// ─────────────────────────────────────────────
//  ONBOARDING STEPS
// ─────────────────────────────────────────────

export const ONBOARDING_STEPS = [
  { id: "welcome", title: "Welcome" },
  { id: "budget", title: "Budget" },
  { id: "travelStyle", title: "Travel Style" },
  { id: "accommodation", title: "Accommodation" },
  { id: "transport", title: "Transport" },
  { id: "food", title: "Food & Dining" },
  { id: "activities", title: "Activities" },
  { id: "climate", title: "Climate" },
  { id: "languages", title: "Languages" },
  { id: "summary", title: "Summary" },
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEPS)[number]["id"];

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

// ─────────────────────────────────────────────
//  TRAVEL DNA FORM DATA
// ─────────────────────────────────────────────

export type BudgetPreference =
  | "backpacker"
  | "budget"
  | "moderate"
  | "comfort"
  | "luxury";

export type TravelStyle =
  | "solo"
  | "couple"
  | "family"
  | "group"
  | "digital_nomad";

export type AccommodationType =
  | "hostels"
  | "airbnb"
  | "hotels"
  | "boutique"
  | "resorts";

export type TransportPreference =
  | "public_transit"
  | "walking"
  | "rideshare"
  | "rental_car"
  | "private_driver";

export type FoodPreference =
  | "street_food"
  | "local_restaurants"
  | "fine_dining"
  | "vegan"
  | "all_inclusive";

export type ActivityPreference =
  | "cultural"
  | "adventure"
  | "wellness"
  | "nightlife"
  | "nature";

export type ClimatePreference =
  | "tropical"
  | "temperate"
  | "cold"
  | "desert"
  | "mixed";

export interface OnboardingFormData {
  budget_preference: BudgetPreference | "";
  travel_style: TravelStyle | "";
  accommodation_preference: AccommodationType | "";
  transport_preference: TransportPreference | "";
  food_preference: FoodPreference | "";
  activities_preference: ActivityPreference | "";
  climate_preference: ClimatePreference | "";
  languages: string;
}

// ─────────────────────────────────────────────
//  OPTION LABELS
// ─────────────────────────────────────────────

export const BUDGET_OPTIONS: { value: BudgetPreference; label: string; description: string }[] = [
  { value: "backpacker", label: "Backpacker", description: "Under $30/day" },
  { value: "budget", label: "Budget", description: "$30–75/day" },
  { value: "moderate", label: "Moderate", description: "$75–150/day" },
  { value: "comfort", label: "Comfort", description: "$150–300/day" },
  { value: "luxury", label: "Luxury", description: "$300+/day" },
];

export const TRAVEL_STYLE_OPTIONS: { value: TravelStyle; label: string; description: string }[] = [
  { value: "solo", label: "Solo", description: "Traveling alone" },
  { value: "couple", label: "Couple", description: "Traveling with a partner" },
  { value: "family", label: "Family", description: "Traveling with family" },
  { value: "group", label: "Group", description: "Traveling with friends" },
  { value: "digital_nomad", label: "Digital Nomad", description: "Working while traveling" },
];

export const ACCOMMODATION_OPTIONS: { value: AccommodationType; label: string; description: string }[] = [
  { value: "hostels", label: "Hostels", description: "Social and affordable" },
  { value: "airbnb", label: "Airbnb / Rentals", description: "Home-like experience" },
  { value: "hotels", label: "Hotels", description: "Reliable and convenient" },
  { value: "boutique", label: "Boutique", description: "Unique and stylish" },
  { value: "resorts", label: "Resorts", description: "All-inclusive luxury" },
];

export const TRANSPORT_OPTIONS: { value: TransportPreference; label: string; description: string }[] = [
  { value: "public_transit", label: "Public Transit", description: "Trains, buses, metros" },
  { value: "walking", label: "Walking", description: "Explore on foot" },
  { value: "rideshare", label: "Rideshare", description: "Uber, Grab, local taxis" },
  { value: "rental_car", label: "Rental Car", description: "Freedom to explore" },
  { value: "private_driver", label: "Private Driver", description: "Hire a local driver" },
];

export const FOOD_OPTIONS: { value: FoodPreference; label: string; description: string }[] = [
  { value: "street_food", label: "Street Food", description: "Local and authentic" },
  { value: "local_restaurants", label: "Local Restaurants", description: "Sit-down dining" },
  { value: "fine_dining", label: "Fine Dining", description: "Upscale experiences" },
  { value: "vegan", label: "Vegan / Vegetarian", description: "Plant-based focus" },
  { value: "all_inclusive", label: "All-Inclusive", description: "Everything included" },
];

export const ACTIVITY_OPTIONS: { value: ActivityPreference; label: string; description: string }[] = [
  { value: "cultural", label: "Cultural", description: "Museums, history, art" },
  { value: "adventure", label: "Adventure", description: "Hiking, sports, thrills" },
  { value: "wellness", label: "Wellness", description: "Yoga, spa, mindfulness" },
  { value: "nightlife", label: "Nightlife", description: "Bars, clubs, entertainment" },
  { value: "nature", label: "Nature", description: "Parks, wildlife, outdoors" },
];

export const CLIMATE_OPTIONS: { value: ClimatePreference; label: string; description: string }[] = [
  { value: "tropical", label: "Tropical", description: "Warm and humid" },
  { value: "temperate", label: "Temperate", description: "Mild and comfortable" },
  { value: "cold", label: "Cold", description: "Snow and winter sports" },
  { value: "desert", label: "Desert", description: "Hot and arid" },
  { value: "mixed", label: "Mixed", description: "Variety of climates" },
];
