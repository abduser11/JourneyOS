-- ═══════════════════════════════════════════════════════════════
--  JourneyOS Database Schema — Version 1
--  Generated for Supabase (PostgreSQL 15+)
--  Domain-Driven Design: Identity, Travel, Finance, Intelligence,
--  Knowledge, Community, System
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────
--  EXTENSIONS
-- ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
--  IDENTITY DOMAIN
--  Manages user identity, profiles, and preferences.
-- ─────────────────────────────────────────────────────────────

-- Extended user profile (separate from auth.users per DB-002)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.profiles IS 'Extended user profile data. Separated from auth.users per DB-002.';

-- Travel DNA: stores traveler preferences for AI personalization
CREATE TABLE IF NOT EXISTS public.travel_dna (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  budget_preference TEXT, -- 'budget', 'mid-range', 'luxury'
  travel_style TEXT, -- 'adventure', 'relaxation', 'cultural', 'business'
  preferred_languages TEXT[],
  food_preferences TEXT[],
  accommodation_preference TEXT, -- 'hotel', 'hostel', 'airbnb', 'resort'
  transport_preference TEXT, -- 'flight', 'train', 'bus', 'car'
  activity_interests TEXT[],
  climate_preference TEXT, -- 'warm', 'cold', 'temperate'
  dietary_restrictions TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.travel_dna IS 'Traveler preference profile for AI personalization. Part of the Identity Domain.';

-- User subscription
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.subscriptions IS 'User subscription and plan data. Identity Domain.';

-- ─────────────────────────────────────────────────────────────
--  TRAVEL DOMAIN (Version 1 placeholders)
--  Will be implemented in Sprint 2+.
-- ─────────────────────────────────────────────────────────────

-- Trips
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planning', -- 'planning', 'active', 'completed', 'cancelled'
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.trips IS 'Core travel entity. Each trip belongs to one user. Travel Domain.';

-- ─────────────────────────────────────────────────────────────
--  ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_dna ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read and update their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Travel DNA: users can only access their own preferences
CREATE POLICY "Users can view their own travel DNA"
  ON public.travel_dna FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own travel DNA"
  ON public.travel_dna FOR ALL
  USING (auth.uid() = user_id);

-- Subscriptions: users can only view their own subscription
CREATE POLICY "Users can view their own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Trips: users can only access their own trips
CREATE POLICY "Users can manage their own trips"
  ON public.trips FOR ALL
  USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
--  FUNCTIONS & TRIGGERS
-- ─────────────────────────────────────────────────────────────

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);

  INSERT INTO public.travel_dna (user_id)
  VALUES (NEW.id);

  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');

  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_travel_dna_updated_at
  BEFORE UPDATE ON public.travel_dna
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
