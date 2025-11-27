-- Add moderation fields to toy_reviews
ALTER TABLE public.toy_reviews
ADD COLUMN is_hidden BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN hidden_reason TEXT,
ADD COLUMN hidden_by UUID REFERENCES auth.users(id),
ADD COLUMN hidden_at TIMESTAMP WITH TIME ZONE;

-- Create storage bucket for review photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-photos', 'review-photos', true);

-- Create review_photos table
CREATE TABLE public.review_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id UUID NOT NULL REFERENCES public.toy_reviews(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on review_photos
ALTER TABLE public.review_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can view review photos
CREATE POLICY "Anyone can view review photos"
ON public.review_photos
FOR SELECT
USING (true);

-- Users can upload photos for their own reviews
CREATE POLICY "Users can upload photos for their reviews"
ON public.review_photos
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.toy_reviews
    WHERE toy_reviews.id = review_photos.review_id
    AND toy_reviews.user_id = auth.uid()
  )
);

-- Users can delete their own review photos
CREATE POLICY "Users can delete their review photos"
ON public.review_photos
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.toy_reviews
    WHERE toy_reviews.id = review_photos.review_id
    AND toy_reviews.user_id = auth.uid()
  )
);

-- Create review_votes table for helpful/unhelpful voting
CREATE TABLE public.review_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id UUID NOT NULL REFERENCES public.toy_reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Enable RLS on review_votes
ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;

-- Anyone can view votes
CREATE POLICY "Anyone can view votes"
ON public.review_votes
FOR SELECT
USING (true);

-- Authenticated users can vote
CREATE POLICY "Users can vote on reviews"
ON public.review_votes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own votes
CREATE POLICY "Users can update their votes"
ON public.review_votes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own votes
CREATE POLICY "Users can delete their votes"
ON public.review_votes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_review_photos_review_id ON public.review_photos(review_id);
CREATE INDEX idx_review_votes_review_id ON public.review_votes(review_id);
CREATE INDEX idx_review_votes_user_id ON public.review_votes(user_id);
CREATE INDEX idx_toy_reviews_is_hidden ON public.toy_reviews(is_hidden);

-- Storage policies for review photos
CREATE POLICY "Anyone can view review photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'review-photos');

CREATE POLICY "Authenticated users can upload review photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'review-photos');

CREATE POLICY "Users can update their own review photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'review-photos' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'review-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own review photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'review-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Update the toy_ratings_summary view to exclude hidden reviews
DROP VIEW IF EXISTS public.toy_ratings_summary;
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
LEFT JOIN public.toy_reviews tr ON t.id = tr.toy_id AND tr.is_hidden = false
GROUP BY t.id, t.name;