-- Create toys table for inventory management
CREATE TABLE public.toys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  personality_types TEXT[] NOT NULL DEFAULT '{}',
  age_group TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10,2),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.toys ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view toys (for public browsing)
CREATE POLICY "Anyone can view toys"
ON public.toys
FOR SELECT
USING (true);

-- Only admins can insert toys
CREATE POLICY "Admins can insert toys"
ON public.toys
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update toys
CREATE POLICY "Admins can update toys"
ON public.toys
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can delete toys
CREATE POLICY "Admins can delete toys"
ON public.toys
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updating updated_at
CREATE TRIGGER update_toys_updated_at
BEFORE UPDATE ON public.toys
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create index for better query performance
CREATE INDEX idx_toys_personality_types ON public.toys USING GIN(personality_types);
CREATE INDEX idx_toys_age_group ON public.toys(age_group);
CREATE INDEX idx_toys_category ON public.toys(category);