-- Add admin role to existing user
INSERT INTO user_roles (user_id, role) 
VALUES ('d54d0021-afc8-4a23-8ec2-0e88d8b6a67e', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Create sample toys
INSERT INTO toys (name, description, age_group, category, price, stock_quantity, personality_types, is_featured, image_url)
VALUES 
  ('Wooden Building Blocks', 'Classic wooden blocks for creative construction and imaginative play', '2-4 years', 'Building & Construction', 29.99, 50, ARRAY['builder', 'creator'], true, '/placeholder.svg'),
  ('Art & Craft Set', 'Complete art supplies including paints, brushes, and paper for young artists', '3-5 years', 'Arts & Crafts', 24.99, 30, ARRAY['creator', 'explorer'], true, '/placeholder.svg'),
  ('Puzzle Adventure Box', 'Age-appropriate puzzles that challenge problem-solving skills', '4-6 years', 'Puzzles & Games', 19.99, 40, ARRAY['thinker', 'explorer'], false, '/placeholder.svg'),
  ('Musical Instruments Set', 'Child-safe instruments including xylophone, tambourine, and maracas', '2-5 years', 'Music & Sound', 34.99, 25, ARRAY['performer', 'creator'], true, '/placeholder.svg'),
  ('Science Discovery Kit', 'Hands-on experiments for curious young minds', '5-7 years', 'STEM', 39.99, 20, ARRAY['thinker', 'explorer'], false, '/placeholder.svg')
ON CONFLICT (id) DO NOTHING;

-- Create sample reviews using the admin user
INSERT INTO toy_reviews (toy_id, user_id, rating, review_text, is_hidden)
SELECT 
  t.id,
  'd54d0021-afc8-4a23-8ec2-0e88d8b6a67e',
  CASE 
    WHEN t.name = 'Wooden Building Blocks' THEN 5
    WHEN t.name = 'Art & Craft Set' THEN 4
    WHEN t.name = 'Puzzle Adventure Box' THEN 5
    WHEN t.name = 'Musical Instruments Set' THEN 3
    WHEN t.name = 'Science Discovery Kit' THEN 4
  END,
  CASE 
    WHEN t.name = 'Wooden Building Blocks' THEN 'Amazing quality! My 3-year-old loves building towers with these blocks. They are sturdy and the colors are beautiful.'
    WHEN t.name = 'Art & Craft Set' THEN 'Great starter set for creative kids. Includes everything needed for hours of artistic fun!'
    WHEN t.name = 'Puzzle Adventure Box' THEN 'Perfect difficulty level for my 5-year-old. She completed them all and asked for more!'
    WHEN t.name = 'Musical Instruments Set' THEN 'Good quality but a bit loud! Kids enjoy making music though.'
    WHEN t.name = 'Science Discovery Kit' THEN 'Educational and fun. Great way to introduce science concepts to young children.'
  END,
  CASE 
    WHEN t.name = 'Musical Instruments Set' THEN true
    ELSE false
  END
FROM toys t
WHERE t.name IN ('Wooden Building Blocks', 'Art & Craft Set', 'Puzzle Adventure Box', 'Musical Instruments Set', 'Science Discovery Kit')
ON CONFLICT DO NOTHING;