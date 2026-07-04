-- =========================================================
-- AL AYAAN FURNITURE  -- schema + seed
-- =========================================================

-- CATEGORIES ----------------------------------------------
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  image_key TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories readable by all" ON public.categories FOR SELECT USING (true);

-- PRODUCTS ------------------------------------------------
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  sku TEXT NOT NULL UNIQUE,
  price_aed NUMERIC(10,2) NOT NULL,
  compare_at_price_aed NUMERIC(10,2),
  material TEXT,
  color TEXT,
  room TEXT,
  dimensions JSONB DEFAULT '{}'::jsonb,
  image_key TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  stock INT NOT NULL DEFAULT 10,
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.8,
  review_count INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  collection TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX products_category_idx ON public.products (category_id);
CREATE INDEX products_price_idx ON public.products (price_aed);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products readable by all" ON public.products FOR SELECT USING (true);

-- PROFILES ------------------------------------------------
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  default_emirate TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "own profile upsert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ADDRESSES -----------------------------------------------
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  emirate TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX addresses_user_idx ON public.addresses (user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.addresses TO authenticated;
GRANT ALL ON public.addresses TO service_role;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own addresses" ON public.addresses FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- WISHLISTS -----------------------------------------------
CREATE TABLE public.wishlists (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, product_id)
);
GRANT SELECT, INSERT, DELETE ON public.wishlists TO authenticated;
GRANT ALL ON public.wishlists TO service_role;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own wishlist" ON public.wishlists FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- REVIEWS -------------------------------------------------
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX reviews_product_idx ON public.reviews (product_id);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews readable by all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "own review insert" ON public.reviews FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "own review update" ON public.reviews FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "own review delete" ON public.reviews FOR DELETE TO authenticated USING (user_id = auth.uid());

-- ORDERS --------------------------------------------------
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE DEFAULT ('ALY-' || upper(substring(replace(gen_random_uuid()::text,'-','') from 1 for 8))),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal_aed NUMERIC(10,2) NOT NULL,
  vat_aed NUMERIC(10,2) NOT NULL,
  shipping_aed NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_aed NUMERIC(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX orders_user_idx ON public.orders (user_id);
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own orders select" ON public.orders FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "own orders insert" ON public.orders FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- =========================================================
-- SEED  categories
-- =========================================================
INSERT INTO public.categories (slug, name_en, name_ar, description_en, description_ar, image_key, sort_order) VALUES
('living-room', 'Living Room', 'غرفة المعيشة', 'Sofas, armchairs and coffee tables crafted for premium homes across the UAE.', 'أرائك وكراسي وطاولات قهوة مصممة للمنازل الفاخرة في الإمارات.', 'cat-living', 1),
('bedroom', 'Bedroom', 'غرفة النوم', 'Beds, wardrobes and dressers designed for restful nights.', 'أسرة وخزائن ومكاتب لتوفير ليالٍ هادئة.', 'cat-bedroom', 2),
('dining', 'Dining', 'غرفة الطعام', 'Dining tables and chairs to gather the ones you love.', 'طاولات وكراسي طعام لجمع أحبائك.', 'cat-dining', 3),
('office', 'Office', 'المكتب', 'Executive desks, chairs and storage for focused work.', 'مكاتب تنفيذية وكراسي ومخازن للعمل المركز.', 'cat-office', 4),
('outdoor', 'Outdoor', 'خارجي', 'Weather-ready terrace and garden furniture.', 'أثاث للمناطق الخارجية والحدائق.', 'cat-outdoor', 5),
('lighting', 'Lighting', 'الإضاءة', 'Pendants, floor lamps and sconces in warm brass and glass.', 'ثريات ومصابيح أرضية وجدارية.', 'cat-lighting', 6),
('decor', 'Decor', 'ديكور', 'Vases, sculptures and art to complete the room.', 'مزهريات ومنحوتات وقطع فنية.', 'cat-decor', 7),
('storage', 'Storage', 'التخزين', 'Wardrobes, shelving and sideboards.', 'خزائن ورفوف وأدراج جانبية.', 'cat-storage', 8),
('mattress', 'Mattress', 'المرتبة', 'Pocket-spring, memory-foam and hotel-grade mattresses.', 'مراتب زنبركية ومن الرغوة وذات جودة فندقية.', 'cat-mattress', 9),
('accessories', 'Accessories', 'إكسسوارات', 'Rugs, throws, trays and finishing pieces.', 'سجاد وأغطية وصواني وقطع تكميلية.', 'cat-accessories', 10);

-- =========================================================
-- SEED  products (24)
-- =========================================================
WITH c AS (SELECT slug, id FROM public.categories)
INSERT INTO public.products (slug, category_id, name_en, name_ar, description_en, description_ar, sku, price_aed, compare_at_price_aed, material, color, room, image_key, stock, rating, review_count, is_featured, is_new, is_bestseller, collection) VALUES
('halo-boucle-sectional', (SELECT id FROM c WHERE slug='living-room'), 'Halo Boucle Sectional', 'أريكة هالو بوكليه', 'A sculptural curved sectional wrapped in cream boucle with a champagne brass base. Made for slow afternoons.', 'أريكة منحنية منحوتة بغلاف بوكليه كريمي وقاعدة نحاسية.', 'ALY-HALO-01', 12850.00, 15900.00, 'Boucle, Brass', 'Cream', 'Living Room', 'p-sofa-halo', 8, 4.9, 42, true, true, true, 'Luxury'),
('nimbus-lounge-chair', (SELECT id FROM c WHERE slug='living-room'), 'Nimbus Lounge Chair', 'كرسي نيمبوس', 'A curved boucle armchair on a solid brass ring base. Comfort with quiet drama.', 'كرسي بغلاف بوكليه منحنى على قاعدة نحاسية.', 'ALY-NIM-02', 4200.00, NULL, 'Boucle, Brass', 'Cream', 'Living Room', 'p-chair-nimbus', 12, 4.8, 28, true, false, true, 'New Arrivals'),
('mira-marble-coffee-table', (SELECT id FROM c WHERE slug='living-room'), 'Mira Marble Coffee Table', 'طاولة قهوة ميرا الرخامية', 'Carrara marble top on a solid brass pedestal. Weighty presence, delicate silhouette.', 'سطح من رخام كارارا على قاعدة نحاسية.', 'ALY-MIRA-03', 3850.00, 4500.00, 'Marble, Brass', 'White / Gold', 'Living Room', 'p-table-mira', 6, 4.7, 19, true, false, false, 'Best Sellers'),
('atlas-linen-bed', (SELECT id FROM c WHERE slug='bedroom'), 'Atlas Linen Bed', 'سرير أطلس الكتاني', 'A tall upholstered headboard in Belgian linen on solid oak legs. King and super king available.', 'سرير مبطن بالكتان البلجيكي على أرجل من خشب البلوط.', 'ALY-ATL-04', 7900.00, 9500.00, 'Linen, Oak', 'Cream', 'Bedroom', 'p-bed-atlas', 10, 4.9, 56, true, true, true, 'Luxury'),
('verde-oak-wardrobe', (SELECT id FROM c WHERE slug='storage'), 'Verde Oak Wardrobe', 'خزانة فيردي', 'Solid oak wardrobe with brass finger-pulls and soft-close doors.', 'خزانة من خشب البلوط الصلب مع سحابات نحاسية.', 'ALY-VER-05', 6400.00, NULL, 'Oak, Brass', 'Natural Oak', 'Bedroom', 'p-wardrobe-verde', 5, 4.6, 14, false, false, false, 'Villa'),
('marlow-dining-table', (SELECT id FROM c WHERE slug='dining'), 'Marlow Dining Table', 'طاولة طعام مارلو', 'Solid walnut with a brass trestle. Seats six comfortably.', 'خشب الجوز الصلب مع قاعدة نحاسية.', 'ALY-MAR-06', 8900.00, 10500.00, 'Walnut, Brass', 'Walnut', 'Dining', 'p-table-marlow', 7, 4.9, 33, true, true, true, 'Luxury'),
('orion-executive-desk', (SELECT id FROM c WHERE slug='office'), 'Orion Executive Desk', 'مكتب أوريون التنفيذي', 'A generous walnut desk with brass campaign hardware. Cable management built in.', 'مكتب فسيح من خشب الجوز مع أجهزة نحاسية.', 'ALY-ORI-07', 6900.00, NULL, 'Walnut, Brass', 'Walnut', 'Office', 'p-desk-orion', 6, 4.8, 21, true, false, true, 'Office'),
('luna-brass-pendant', (SELECT id FROM c WHERE slug='lighting'), 'Luna Brass Pendant', 'مصباح لونا النحاسي', 'A hand-spun brass pendant with a clear glass globe. Dimmable warm LED.', 'مصباح معلق من النحاس المصقول مع كرة زجاجية.', 'ALY-LUN-08', 1290.00, 1500.00, 'Brass, Glass', 'Gold', 'Lighting', 'p-lamp-luna', 24, 4.7, 38, true, true, true, 'New Arrivals'),
('solace-teak-lounger', (SELECT id FROM c WHERE slug='outdoor'), 'Solace Teak Lounger', 'كرسي صولاس الخارجي', 'FSC teak with cream Sunbrella cushions. UAE weather-tested.', 'خشب الساج مع وسائد كريمية مقاومة للطقس.', 'ALY-SOL-09', 3450.00, NULL, 'Teak, Sunbrella', 'Teak / Cream', 'Outdoor', 'p-lounge-solace', 9, 4.6, 12, false, false, false, 'Villa'),
('cloud-hotel-mattress', (SELECT id FROM c WHERE slug='mattress'), 'Cloud Hotel Mattress', 'مرتبة كلاود الفندقية', 'Seven-zone pocket springs, cashmere pillow-top. Hotel-grade comfort.', 'مرتبة بسبع مناطق زنبركية وطبقة كشمير علوية.', 'ALY-CLD-10', 4990.00, 6200.00, 'Pocket Spring, Cashmere', 'White', 'Bedroom', 'p-mattress-cloud', 14, 4.9, 71, true, false, true, 'Hotel'),
('cora-ceramic-vase', (SELECT id FROM c WHERE slug='decor'), 'Cora Ceramic Vase', 'مزهرية كورا', 'Hand-thrown matte ceramic with an organic aperture.', 'مزهرية سيراميك يدوية.', 'ALY-COR-11', 420.00, NULL, 'Ceramic', 'Off-white', 'Decor', 'p-vase-cora', 30, 4.5, 9, false, true, false, 'New Arrivals'),
('dune-jute-rug', (SELECT id FROM c WHERE slug='accessories'), 'Dune Jute Rug', 'سجاد دون الجوت', 'Hand-woven round jute rug with knotted fringe. 2m diameter.', 'سجاد دائري منسوج يدوياً من الجوت.', 'ALY-DUN-12', 890.00, 1100.00, 'Jute', 'Natural', 'Accessories', 'p-rug-dune', 18, 4.4, 15, false, false, false, 'Best Sellers'),
-- second batch reusing product images with variant names
('halo-boucle-loveseat', (SELECT id FROM c WHERE slug='living-room'), 'Halo Boucle Loveseat', 'أريكة هالو الصغيرة', 'The two-seat companion to the Halo Sectional.', 'الإصدار الصغير من أريكة هالو.', 'ALY-HALO-13', 7900.00, NULL, 'Boucle, Brass', 'Cream', 'Living Room', 'p-sofa-halo', 6, 4.8, 11, false, true, false, 'Luxury'),
('nimbus-swivel-chair', (SELECT id FROM c WHERE slug='living-room'), 'Nimbus Swivel Chair', 'كرسي نيمبوس الدوار', 'The swivel version of our Nimbus lounge, on a polished brass ring.', 'الإصدار الدوار من كرسي نيمبوس.', 'ALY-NIM-14', 4600.00, NULL, 'Boucle, Brass', 'Cream', 'Living Room', 'p-chair-nimbus', 8, 4.7, 6, false, true, false, 'New Arrivals'),
('mira-side-table', (SELECT id FROM c WHERE slug='living-room'), 'Mira Marble Side Table', 'طاولة ميرا الجانبية', 'A smaller pedestal companion to the Mira coffee table.', 'الإصدار الصغير من طاولة ميرا.', 'ALY-MIRA-15', 1890.00, 2400.00, 'Marble, Brass', 'White / Gold', 'Living Room', 'p-table-mira', 10, 4.6, 5, false, false, false, 'Best Sellers'),
('atlas-king-bed', (SELECT id FROM c WHERE slug='bedroom'), 'Atlas King Bed', 'سرير أطلس كنج', 'King-size Atlas bed with matching upholstered footboard.', 'سرير أطلس بمقاس كنج.', 'ALY-ATL-16', 9400.00, NULL, 'Linen, Oak', 'Cream', 'Bedroom', 'p-bed-atlas', 6, 4.9, 22, true, false, true, 'Luxury'),
('verde-tall-cabinet', (SELECT id FROM c WHERE slug='storage'), 'Verde Tall Cabinet', 'خزانة فيردي العالية', 'Tall four-door storage cabinet in solid oak.', 'خزانة تخزين بأربعة أبواب.', 'ALY-VER-17', 5400.00, NULL, 'Oak, Brass', 'Natural Oak', 'Living Room', 'p-wardrobe-verde', 4, 4.5, 3, false, true, false, 'Office'),
('marlow-round-dining', (SELECT id FROM c WHERE slug='dining'), 'Marlow Round Dining Table', 'طاولة مارلو المستديرة', 'Round walnut dining table on a brass pedestal. Seats four.', 'طاولة طعام مستديرة من خشب الجوز.', 'ALY-MAR-18', 6800.00, 7900.00, 'Walnut, Brass', 'Walnut', 'Dining', 'p-table-marlow', 5, 4.8, 9, true, false, false, 'Best Sellers'),
('orion-writing-desk', (SELECT id FROM c WHERE slug='office'), 'Orion Writing Desk', 'مكتب أوريون الصغير', 'A compact walnut desk with brass hardware. Ideal for studies and home offices.', 'مكتب صغير من خشب الجوز.', 'ALY-ORI-19', 4200.00, NULL, 'Walnut, Brass', 'Walnut', 'Office', 'p-desk-orion', 11, 4.6, 14, false, true, false, 'Office'),
('luna-floor-lamp', (SELECT id FROM c WHERE slug='lighting'), 'Luna Brass Floor Lamp', 'مصباح لونا الأرضي', 'The floor-standing version of the Luna pendant.', 'الإصدار الأرضي من مصباح لونا.', 'ALY-LUN-20', 2190.00, NULL, 'Brass, Glass', 'Gold', 'Living Room', 'p-lamp-luna', 15, 4.7, 8, false, true, false, 'New Arrivals'),
('solace-dining-set', (SELECT id FROM c WHERE slug='outdoor'), 'Solace Outdoor Dining Set', 'طقم طعام صولاس', 'Six-seat teak dining set with cream Sunbrella cushions.', 'طقم طعام خارجي لستة أشخاص.', 'ALY-SOL-21', 8900.00, 10500.00, 'Teak, Sunbrella', 'Teak / Cream', 'Outdoor', 'p-lounge-solace', 4, 4.7, 6, true, false, false, 'Villa'),
('cloud-plush-mattress', (SELECT id FROM c WHERE slug='mattress'), 'Cloud Plush Mattress', 'مرتبة كلاود بلاش', 'Softer variant of the Cloud with an extra pillow-top layer.', 'الإصدار الأكثر ليونة من مرتبة كلاود.', 'ALY-CLD-22', 5700.00, NULL, 'Pocket Spring, Cashmere', 'White', 'Bedroom', 'p-mattress-cloud', 10, 4.8, 27, false, true, false, 'Hotel'),
('cora-large-vase', (SELECT id FROM c WHERE slug='decor'), 'Cora Large Ceramic Vase', 'مزهرية كورا الكبيرة', 'A larger sibling to the Cora ceramic vase.', 'الإصدار الكبير من مزهرية كورا.', 'ALY-COR-23', 620.00, NULL, 'Ceramic', 'Off-white', 'Decor', 'p-vase-cora', 22, 4.5, 4, false, false, false, 'New Arrivals'),
('dune-runner-rug', (SELECT id FROM c WHERE slug='accessories'), 'Dune Jute Runner', 'سجاد دون الطويل', 'Long runner in hand-woven jute. Perfect for hallways.', 'سجاد طويل منسوج يدوياً.', 'ALY-DUN-24', 690.00, NULL, 'Jute', 'Natural', 'Accessories', 'p-rug-dune', 25, 4.4, 3, false, false, false, 'Best Sellers');
