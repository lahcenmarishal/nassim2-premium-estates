
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  content text NOT NULL,
  avatar_url text,
  rating integer NOT NULL DEFAULT 5,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials viewable by everyone" ON public.testimonials
FOR SELECT USING (published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert testimonials" ON public.testimonials
FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update testimonials" ON public.testimonials
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonials" ON public.testimonials
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.testimonials (name, role, content, rating, sort_order) VALUES
('Sara El Idrissi', 'Acheteuse à El Jadida', 'Une équipe à l''écoute et très professionnelle. Ils ont trouvé exactement le bien que nous cherchions. Je recommande vivement Nassim2.', 5, 1),
('Karim Benali', 'Investisseur', 'Accompagnement irréprochable du début à la fin. Conseils précieux et grande transparence sur tous les aspects de la transaction.', 5, 2),
('Leila Ouazzani', 'Vendeuse', 'J''ai vendu mon appartement en moins de deux mois grâce à Nassim2. Service haut de gamme et communication exemplaire.', 5, 3);
