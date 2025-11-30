-- Create waitlist table for pre-launch signups
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  parent_name TEXT,
  child_age TEXT,
  interested_plan TEXT,
  personality_type TEXT,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notified BOOLEAN DEFAULT false,
  CONSTRAINT unique_email UNIQUE (email)
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can add themselves to waitlist (no auth required)
CREATE POLICY "Anyone can join waitlist"
  ON public.waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Users can view their own waitlist entry (optional, for future use)
CREATE POLICY "Users can view own waitlist entry"
  ON public.waitlist
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);