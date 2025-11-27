-- Create toy reviews table
CREATE TABLE public.toy_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  toy_id UUID NOT NULL REFERENCES public.toys(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(toy_id, user_id)
);

-- Enable RLS
ALTER TABLE public.toy_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews"
ON public.toy_reviews
FOR SELECT
USING (true);

-- Users can create their own reviews
CREATE POLICY "Users can create their own reviews"
ON public.toy_reviews
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews"
ON public.toy_reviews
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
ON public.toy_reviews
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all reviews
CREATE POLICY "Admins can view all reviews"
ON public.toy_reviews
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updating updated_at
CREATE TRIGGER update_toy_reviews_updated_at
BEFORE UPDATE ON public.toy_reviews
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create index for better query performance
CREATE INDEX idx_toy_reviews_toy_id ON public.toy_reviews(toy_id);
CREATE INDEX idx_toy_reviews_user_id ON public.toy_reviews(user_id);
CREATE INDEX idx_toy_reviews_rating ON public.toy_reviews(rating);

-- Create a view for toy ratings summary
CREATE OR REPLACE VIEW public.toy_ratings_summary AS
SELECT 
  t.id,
  t.name,
  COALESCE(AVG(tr.rating), 0) as average_rating,
  COUNT(tr.id) as review_count,
  COUNT(CASE WHEN tr.rating = 5 THEN 1 END) as five_star_count,
  COUNT(CASE WHEN tr.rating = 4 THEN 1 END) as four_star_count,
  COUNT(CASE WHEN tr.rating = 3 THEN 1 END) as three_star_count,
  COUNT(CASE WHEN tr.rating = 2 THEN 1 END) as two_star_count,
  COUNT(CASE WHEN tr.rating = 1 THEN 1 END) as one_star_count
FROM public.toys t
LEFT JOIN public.toy_reviews tr ON t.id = tr.toy_id
GROUP BY t.id, t.name;