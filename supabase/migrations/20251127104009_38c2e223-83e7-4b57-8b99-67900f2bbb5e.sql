-- Create storage bucket for toy images
INSERT INTO storage.buckets (id, name, public)
VALUES ('toy-images', 'toy-images', true);

-- Allow authenticated users to view all toy images
CREATE POLICY "Anyone can view toy images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'toy-images');

-- Only admins can upload toy images
CREATE POLICY "Admins can upload toy images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'toy-images' AND
  has_role(auth.uid(), 'admin')
);

-- Only admins can update toy images
CREATE POLICY "Admins can update toy images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'toy-images' AND
  has_role(auth.uid(), 'admin')
)
WITH CHECK (
  bucket_id = 'toy-images' AND
  has_role(auth.uid(), 'admin')
);

-- Only admins can delete toy images
CREATE POLICY "Admins can delete toy images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'toy-images' AND
  has_role(auth.uid(), 'admin')
);