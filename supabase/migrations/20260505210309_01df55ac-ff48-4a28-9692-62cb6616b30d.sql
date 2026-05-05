
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('356d7a03-1177-451f-890e-89e5c10aa29a', 'admin');

-- ============ TIMESTAMP TRIGGER ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- ============ SITE SETTINGS ============
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton BOOLEAN NOT NULL DEFAULT true UNIQUE,
  hero_title TEXT NOT NULL DEFAULT '',
  hero_subtitle TEXT NOT NULL DEFAULT '',
  hero_image_url TEXT,
  why_image_1_url TEXT,
  why_image_2_url TEXT,
  why_image_3_url TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings
  FOR SELECT USING (true);
CREATE POLICY "Admins can update site settings" ON public.site_settings
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert site settings" ON public.site_settings
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (
  hero_title, hero_subtitle, phone, whatsapp, email, address,
  instagram_url, facebook_url
) VALUES (
  'L''immobilier d''exception à El Jadida',
  'Nassim2 vous accompagne dans l''achat, la vente et la location de biens premium sur la côte atlantique marocaine.',
  '+212 6 00 00 00 00',
  '212600000000',
  'contact@nassim2.ma',
  'El Jadida, Maroc',
  'https://instagram.com/nassim2',
  'https://facebook.com/nassim2'
);

-- ============ PROPERTIES ============
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  price BIGINT NOT NULL,
  type TEXT NOT NULL,
  listing TEXT NOT NULL,
  bedrooms INT NOT NULL DEFAULT 0,
  bathrooms INT NOT NULL DEFAULT 0,
  area INT NOT NULL DEFAULT 0,
  image_url TEXT,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published properties viewable by everyone" ON public.properties
  FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert properties" ON public.properties
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update properties" ON public.properties
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete properties" ON public.properties
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.properties (slug, title, city, district, price, type, listing, bedrooms, bathrooms, area, description, features, featured) VALUES
('appartement-vue-mer', 'Appartement vue mer panoramique', 'El Jadida', 'Sidi Bouzid', 2400000, 'appartement', 'achat', 3, 2, 145, 'Splendide appartement traversant avec terrasse face à l''océan. Finitions haut de gamme, marbre, baies vitrées toute hauteur, cuisine équipée et résidence sécurisée avec piscine.', ARRAY['Vue mer','Terrasse','Parking','Sécurité 24/7','Piscine'], true),
('villa-prestige-palmiers', 'Villa de prestige aux Palmiers', 'El Jadida', 'Mazagan', 8500000, 'villa', 'achat', 5, 4, 420, 'Villa contemporaine d''architecte sur 800m² de jardin paysagé. Piscine à débordement, suite parentale, dressing, hammam, garage 3 voitures.', ARRAY['Piscine','Jardin','Hammam','Garage','Domotique'], true),
('penthouse-mazagan', 'Penthouse terrasse — Mazagan Beach', 'El Jadida', 'Mazagan Beach', 18500, 'penthouse', 'location', 4, 3, 220, 'Penthouse exceptionnel avec terrasse de 120m² et vue à 180° sur l''océan. Idéal résidence secondaire, services hôteliers du resort inclus.', ARRAY['Terrasse 120m²','Vue mer','Resort','Conciergerie'], true),
('riad-medina', 'Riad authentique — Cité Portugaise', 'El Jadida', 'Cité Portugaise', 3200000, 'riad', 'achat', 6, 5, 320, 'Riad entièrement rénové au cœur de la Cité Portugaise classée UNESCO. Patio à fontaine, zellige, plafonds peints, terrasse panoramique.', ARRAY['Patio','Terrasse','UNESCO','Charme'], false),
('terrain-azemmour', 'Terrain pieds dans l''eau — Haouzia', 'El Jadida', 'Haouzia', 4800000, 'terrain', 'achat', 0, 0, 1200, 'Terrain constructible face à la plage. Titre foncier, viabilisé, idéal projet villa de luxe ou résidence privée.', ARRAY['Front de mer','Titré','Viabilisé','1200 m²'], false),
('appartement-familial', 'Appartement familial — Centre ville', 'El Jadida', 'Centre', 9500, 'appartement', 'location', 3, 2, 130, 'Bel appartement lumineux meublé avec goût, proche commerces et écoles. Résidence calme et sécurisée.', ARRAY['Meublé','Centre','Lumineux','Sécurisé'], false);

-- ============ CONTACT MESSAGES ============
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a message" ON public.contact_messages
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view messages" ON public.contact_messages
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update messages" ON public.contact_messages
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete messages" ON public.contact_messages
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- ============ STORAGE ============
INSERT INTO storage.buckets (id, name, public) VALUES
  ('site-images', 'site-images', true),
  ('property-images', 'property-images', true);

CREATE POLICY "Site images public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admins manage site images" ON storage.objects
  FOR ALL USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Property images public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Admins manage property images" ON storage.objects
  FOR ALL USING (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'property-images' AND public.has_role(auth.uid(), 'admin'));
