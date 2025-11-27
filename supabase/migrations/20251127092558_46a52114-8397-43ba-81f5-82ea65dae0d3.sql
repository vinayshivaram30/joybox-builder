-- Add profile fields for user preferences and delivery
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS child_age text,
ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS delivery_address text;

-- Allow admins to view all quiz results
CREATE POLICY "Admins can view all quiz results" 
ON public.quiz_results 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));