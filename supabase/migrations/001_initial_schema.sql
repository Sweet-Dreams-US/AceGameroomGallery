-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES (with parent for subcategories)
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BRANDS
-- ============================================
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  specifications JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  meta_title TEXT,
  meta_description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCT IMAGES
-- ============================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INQUIRIES (contact form submissions)
-- ============================================
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  product_ids UUID[] DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HERO BANNERS
-- ============================================
CREATE TABLE hero_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  cta_text TEXT,
  cta_link TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FAQ ENTRIES
-- ============================================
CREATE TABLE faq_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEAGUE EVENTS
-- ============================================
CREATE TABLE league_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league_type TEXT NOT NULL CHECK (league_type IN ('pool', 'dart')),
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  description TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SITE CONTENT (editable text blocks)
-- ============================================
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT UNIQUE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_inquiries_read ON inquiries(is_read) WHERE is_read = FALSE;

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE league_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read active products" ON products FOR SELECT USING (status = 'active');
CREATE POLICY "Public read product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read active banners" ON hero_banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active faq" ON faq_entries FOR SELECT USING (is_active = true);
CREATE POLICY "Public read league events" ON league_events FOR SELECT USING (true);
CREATE POLICY "Public read site content" ON site_content FOR SELECT USING (true);

-- Public insert on inquiries
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Admin full access (authenticated users) for all tables
CREATE POLICY "Admin all categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all brands" ON brands FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all product_images" ON product_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all hero_banners" ON hero_banners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all faq_entries" ON faq_entries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all league_events" ON league_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SEED DATA — Categories from current site
-- ============================================
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Billiards', 'billiards', 'Pool tables, cues, cloth, lighting, and accessories', 1),
  ('Games', 'games', 'Pinball, arcade, foosball, air hockey, darts, and more', 2),
  ('Furniture', 'furniture', 'Bars, bar stools, pub tables, game chairs, and neons', 3),
  ('Playsets', 'playsets', 'Rainbow Play Systems for residential and commercial use', 4),
  ('Outdoor', 'outdoor', 'Basketball goals, trampolines, and outdoor games', 5),
  ('Services', 'services', 'Billiard, pinball, and playset services', 6);

-- Subcategories for Billiards
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Billiard Tables', 'billiard-tables', (SELECT id FROM categories WHERE slug = 'billiards'), 1),
  ('Billiard Cloth', 'billiard-cloth', (SELECT id FROM categories WHERE slug = 'billiards'), 2),
  ('Cues', 'cues', (SELECT id FROM categories WHERE slug = 'billiards'), 3),
  ('Cases', 'cases', (SELECT id FROM categories WHERE slug = 'billiards'), 4),
  ('Lighting', 'lighting', (SELECT id FROM categories WHERE slug = 'billiards'), 5),
  ('Accessories', 'accessories', (SELECT id FROM categories WHERE slug = 'billiards'), 6);

-- Subcategories for Games
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Pinball', 'pinball', (SELECT id FROM categories WHERE slug = 'games'), 1),
  ('Arcade Games', 'arcade-games', (SELECT id FROM categories WHERE slug = 'games'), 2),
  ('Foosball', 'foosball', (SELECT id FROM categories WHERE slug = 'games'), 3),
  ('Air Hockey', 'air-hockey', (SELECT id FROM categories WHERE slug = 'games'), 4),
  ('Dome Hockey', 'dome-hockey', (SELECT id FROM categories WHERE slug = 'games'), 5),
  ('Ping Pong', 'ping-pong', (SELECT id FROM categories WHERE slug = 'games'), 6),
  ('Darts and Dartboards', 'darts', (SELECT id FROM categories WHERE slug = 'games'), 7),
  ('Bumper Pool', 'bumper-pool', (SELECT id FROM categories WHERE slug = 'games'), 8),
  ('Shuffleboard Tables', 'shuffleboard', (SELECT id FROM categories WHERE slug = 'games'), 9),
  ('Jukebox', 'jukebox', (SELECT id FROM categories WHERE slug = 'games'), 10);

-- Subcategories for Furniture
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Bars', 'bars', (SELECT id FROM categories WHERE slug = 'furniture'), 1),
  ('Bar Stools', 'bar-stools', (SELECT id FROM categories WHERE slug = 'furniture'), 2),
  ('Pub Tables', 'pub-tables', (SELECT id FROM categories WHERE slug = 'furniture'), 3),
  ('Game Chairs', 'game-chairs', (SELECT id FROM categories WHERE slug = 'furniture'), 4),
  ('Specialty Seating', 'specialty-seating', (SELECT id FROM categories WHERE slug = 'furniture'), 5),
  ('Neons', 'neons', (SELECT id FROM categories WHERE slug = 'furniture'), 6),
  ('Poker and Game Tables', 'poker-tables', (SELECT id FROM categories WHERE slug = 'furniture'), 7);

-- Subcategories for Playsets
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Rainbow Play Systems', 'rainbow-play-systems', (SELECT id FROM categories WHERE slug = 'playsets'), 1),
  ('Rainbow Accessories', 'rainbow-accessories', (SELECT id FROM categories WHERE slug = 'playsets'), 2);

-- Subcategories for Outdoor
INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
  ('Basketball Goals', 'basketball-goals', (SELECT id FROM categories WHERE slug = 'outdoor'), 1),
  ('Trampolines', 'trampolines', (SELECT id FROM categories WHERE slug = 'outdoor'), 2),
  ('Outdoor Games', 'outdoor-games', (SELECT id FROM categories WHERE slug = 'outdoor'), 3);

-- ============================================
-- SEED DATA — Brands from current site
-- ============================================
INSERT INTO brands (name, slug) VALUES
  ('Olhausen', 'olhausen'),
  ('Valley', 'valley'),
  ('C.L. Bailey', 'cl-bailey'),
  ('Plank and Hide', 'plank-and-hide'),
  ('Championship', 'championship'),
  ('Simonis', 'simonis'),
  ('Proline', 'proline'),
  ('J. Pechauer', 'j-pechauer'),
  ('McDermott', 'mcdermott'),
  ('Lucasi', 'lucasi'),
  ('Viking', 'viking'),
  ('Players', 'players'),
  ('Cuetec', 'cuetec'),
  ('Jacoby', 'jacoby'),
  ('Joss', 'joss'),
  ('Valhalla', 'valhalla'),
  ('Predator', 'predator'),
  ('Darafeev', 'darafeev'),
  ('American Heritage', 'american-heritage'),
  ('Callee', 'callee'),
  ('Holland Bar Stool Co.', 'holland-bar-stool'),
  ('H.J. Scott', 'hj-scott'),
  ('RAM Game Room', 'ram-game-room'),
  ('Z-Lite', 'z-lite'),
  ('Rainbow Play Systems', 'rainbow-play-systems'),
  ('Springfree', 'springfree'),
  ('Presidential Billiards', 'presidential-billiards');

-- ============================================
-- SEED DATA — Site content
-- ============================================
INSERT INTO site_content (section_key, title, content) VALUES
  ('about_story', 'Our Story', 'Ace Game Room Gallery was established in 1992 as a coin-operated amusement supplier serving local businesses with pool tables, pinball machines, video games, and jukeboxes. Two years later, founder Bret Almashie expanded the business model to include retail sales, recognizing the community''s demand for quality recreational products.'),
  ('why_shop', 'Why Shop at ACE?', 'ACE Game Room sells more pool tables than all of the surrounding competition combined. We''re the experts! With over 25 years of experience in the industry, we realize that buying a pool table is an exciting and unique experience. Our goal is to help you find a pool table that best matches your style and budget. We proudly offer Olhausen Billiards, shuffleboards, poker tables, and an assortment of game room furniture. ACE Game Room Gallery has premium brands with exceptional service at guaranteed lowest prices. Stop in today and let us help you!'),
  ('services_billiard', 'Billiard Services', 'Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables. We also have the ability to replace broken pockets and replace dead rail rubbers.'),
  ('services_pinball', 'Pinball Services', 'Professional pinball machine maintenance and repair services.'),
  ('services_playset', 'Playset Services', 'Installation and maintenance for Rainbow Play Systems residential and commercial playsets.');

-- ============================================
-- SEED DATA — FAQ
-- ============================================
INSERT INTO faq_entries (question, answer, sort_order) VALUES
  ('Does Ace Game Room do services on pool tables?', 'Ace Game Room Gallery offers services such as tearing down, moving, setting up, and recovering pool tables. We also have the ability to replace broken pockets and replace dead rail rubbers. We do not have the ability to repair damaged wood on tables.', 1),
  ('What brands of pool tables do you carry?', 'We proudly carry Olhausen Billiards, Valley, C.L. Bailey, Plank and Hide, and Presidential Billiards pool tables. All are premium American-made brands.', 2),
  ('Do you offer financing?', 'Yes! We offer Wells Fargo financing. Buy today, pay over time with convenient monthly payments to fit your budget.', 3),
  ('Do you deliver and install?', 'Yes, we offer free delivery and installation on qualifying purchases. Our expert technicians handle the complete setup.', 4),
  ('What are your hours?', 'We are open Monday through Saturday from 10:00 AM to 6:00 PM. We are closed on Sundays.', 5);

-- ============================================
-- SEED DATA — Testimonials
-- ============================================
INSERT INTO testimonials (author_name, content, rating) VALUES
  ('Mike R.', 'Best pool table selection in Fort Wayne. The staff really knows their stuff and helped us pick the perfect table for our basement.', 5),
  ('Sarah T.', 'We bought a shuffleboard table and bar stools. The quality is outstanding and the delivery was free! Highly recommend.', 5),
  ('David L.', 'Had our pool table recovered and it looks brand new. Great service at a fair price. Will definitely use them again.', 5);

-- ============================================
-- STORAGE BUCKETS (run these separately in Supabase dashboard or via SQL)
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES
  ('product-images', 'product-images', true),
  ('brand-logos', 'brand-logos', true),
  ('hero-banners', 'hero-banners', true),
  ('category-images', 'category-images', true),
  ('general', 'general', true);

-- Storage policies — public read
CREATE POLICY "Public read product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public read brand-logos" ON storage.objects FOR SELECT USING (bucket_id = 'brand-logos');
CREATE POLICY "Public read hero-banners" ON storage.objects FOR SELECT USING (bucket_id = 'hero-banners');
CREATE POLICY "Public read category-images" ON storage.objects FOR SELECT USING (bucket_id = 'category-images');
CREATE POLICY "Public read general" ON storage.objects FOR SELECT USING (bucket_id = 'general');

-- Storage policies — admin write
CREATE POLICY "Admin upload product-images" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update product-images" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete product-images" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
