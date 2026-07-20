/**
 * JourneyOS — Database Types
 *
 * Generated from the Supabase schema.
 * These types must be regenerated via `supabase gen types` after
 * any schema change. Until then, they are manually maintained.
 *
 * Reference: docs/04-Database.md
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      travel_dna: {
        Row: {
          id: string;
          user_id: string;
          budget_preference: string | null;
          travel_style: string | null;
          preferred_languages: string[] | null;
          food_preferences: string[] | null;
          accommodation_preference: string | null;
          transport_preference: string | null;
          activity_interests: string[] | null;
          climate_preference: string | null;
          dietary_restrictions: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          budget_preference?: string | null;
          travel_style?: string | null;
          preferred_languages?: string[] | null;
          food_preferences?: string[] | null;
          accommodation_preference?: string | null;
          transport_preference?: string | null;
          activity_interests?: string[] | null;
          climate_preference?: string | null;
          dietary_restrictions?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          budget_preference?: string | null;
          travel_style?: string | null;
          preferred_languages?: string[] | null;
          food_preferences?: string[] | null;
          accommodation_preference?: string | null;
          transport_preference?: string | null;
          activity_interests?: string[] | null;
          climate_preference?: string | null;
          dietary_restrictions?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "travel_dna_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: string;
          status: string;
          started_at: string | null;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan?: string;
          status?: string;
          started_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan?: string;
          status?: string;
          started_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      trips: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          status: string;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          status?: string;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          status?: string;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// ─────────────────────────────────────────────
//  HELPER TYPES
// ─────────────────────────────────────────────

export type Tables = Database["public"]["Tables"];
export type TableNames = keyof Tables;

export type Insertable<T extends TableNames> = Tables[T]["Insert"];
export type Updatable<T extends TableNames> = Tables[T]["Update"];
export type Row<T extends TableNames> = Tables[T]["Row"];

// ─────────────────────────────────────────────
//  COMMON ALIASES
// ─────────────────────────────────────────────

export type Profile = Row<"profiles">;
export type ProfileInsert = Insertable<"profiles">;
export type ProfileUpdate = Updatable<"profiles">;

export type TravelDNA = Row<"travel_dna">;
export type TravelDNAInsert = Insertable<"travel_dna">;
export type TravelDNAUpdate = Updatable<"travel_dna">;

export type Subscription = Row<"subscriptions">;
export type Trip = Row<"trips">;
export type TripInsert = Insertable<"trips">;
