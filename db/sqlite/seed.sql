-- Seed creators
INSERT INTO creators(name, title, avatar_url) VALUES
  ('Upcycle Master','DIY Specialist','/images/kh/avatar-1.jpg'),
  ('TrendSetter','Stylist','/images/kh/avatar-1.jpg'),
  ('Fashion Forward','Curator','/images/kh/avatar-1.jpg')
ON CONFLICT(name) DO UPDATE SET title=excluded.title, avatar_url=excluded.avatar_url;

-- Seed platforms
INSERT INTO platforms(name) VALUES ('tiktok'),('instagram'),('youtube'),('substack')
ON CONFLICT(name) DO NOTHING;

-- Seed content
INSERT INTO content (external_id, type, title, creator_id, date_published, cover_url, duration_text, excerpt, url, platform_id, comments_count, likes_count)
SELECT '1','video','Fashion Essentials You Need in Your Closet', c.id,'2025-05-14',
       '/images/kh/video-1.jpg','10:26',
       'Learn professional techniques for transforming outdated garments into fashionable pieces. This step-by-step tutorial demonstrates creative upcycling methods...',
       'https://example.com/video/1', p.id, 2, 42
FROM creators c, platforms p WHERE c.name='Upcycle Master' AND p.name='tiktok'
ON CONFLICT(external_id) DO NOTHING;

INSERT INTO content (external_id, type, title, creator_id, date_published, cover_url, duration_text, excerpt, url, platform_id, comments_count, likes_count)
SELECT '2','video','Wardrobe Management 101', c.id,'2025-04-20',
       '/images/kh/video-2.jpg','08:19',
       'Modular layering, storage tips, and maintenance for longevity...',
       'https://example.com/video/2', p.id, 2, 27
FROM creators c, platforms p WHERE c.name='TrendSetter' AND p.name='instagram'
ON CONFLICT(external_id) DO NOTHING;

INSERT INTO content (external_id, type, title, creator_id, date_published, cover_url, duration_text, excerpt, url, platform_id, comments_count, likes_count)
SELECT '3','video','Sourcing Specific Pieces Like a Pro', c.id,'2025-05-10',
       '/images/kh/video-3.jpg','12:03',
       'Hunting rare fits, fabrics, and the right price — playbook for efficient sourcing...',
       'https://example.com/video/3', p.id, 2, 27
FROM creators c, platforms p WHERE c.name='Fashion Forward' AND p.name='youtube'
ON CONFLICT(external_id) DO NOTHING;

INSERT INTO content (external_id, type, title, creator_id, date_published, cover_url, excerpt, url, platform_id, comments_count, likes_count)
SELECT '4','article','How to Assess Your Fashion Needs', c.id,'2025-05-16',
       '/images/kh/article-1.jpg',
       'Learn the step-by-step process to evaluate your wardrobe, identify gaps, and determine your true fashion needs...',
       'https://example.com/article/1', p.id, 2, 27
FROM creators c, platforms p WHERE c.name='Upcycle Master' AND p.name='substack'
ON CONFLICT(external_id) DO NOTHING;

-- Tags
INSERT INTO tags(name) VALUES
  ('Tutorial'),('DIY'),('Upcycling'),('Wardrobe'),('Basics'),('Sourcing'),('Occasion'),('Textile')
ON CONFLICT(name) DO NOTHING;

-- Tag mappings
INSERT INTO content_tags(content_id, tag_id)
SELECT c.id, t.id FROM content c, tags t WHERE c.external_id='1' AND t.name IN ('Tutorial','DIY','Upcycling')
ON CONFLICT DO NOTHING;

INSERT INTO content_tags(content_id, tag_id)
SELECT c.id, t.id FROM content c, tags t WHERE c.external_id='2' AND t.name IN ('Wardrobe','Basics')
ON CONFLICT DO NOTHING;

INSERT INTO content_tags(content_id, tag_id)
SELECT c.id, t.id FROM content c, tags t WHERE c.external_id='3' AND t.name IN ('Sourcing','Occasion')
ON CONFLICT DO NOTHING;

INSERT INTO content_tags(content_id, tag_id)
SELECT c.id, t.id FROM content c, tags t WHERE c.external_id='4' AND t.name IN ('Textile','DIY','Upcycling')
ON CONFLICT DO NOTHING;

