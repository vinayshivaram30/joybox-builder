-- Add admin UPDATE policy for review moderation
CREATE POLICY "Admins can update any review"
ON toy_reviews FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));