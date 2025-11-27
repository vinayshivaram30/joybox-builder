-- Create quiz_results table
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  personality_type TEXT NOT NULL,
  answers JSONB NOT NULL,
  parent_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  pincode TEXT NOT NULL,
  child_age TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quiz results (for anonymous quiz takers)
CREATE POLICY "Anyone can insert quiz results"
ON public.quiz_results
FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to view their own quiz results
CREATE POLICY "Users can view their own quiz results"
ON public.quiz_results
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to update their own quiz results
CREATE POLICY "Users can update their own quiz results"
ON public.quiz_results
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updated_at
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.quiz_results
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create index on user_id for faster queries
CREATE INDEX idx_quiz_results_user_id ON public.quiz_results(user_id);

-- Create index on personality_type for analytics
CREATE INDEX idx_quiz_results_personality_type ON public.quiz_results(personality_type);