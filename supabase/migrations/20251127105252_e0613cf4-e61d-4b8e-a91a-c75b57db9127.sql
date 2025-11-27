-- Fix the security definer view issue by explicitly setting SECURITY INVOKER
DROP VIEW IF EXISTS public.toy_ratings_summary;
CREATE OR REPLACE VIEW public.toy_ratings_summary 
WITH (security_invoker = true)
AS
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