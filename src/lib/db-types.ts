export interface SiteSettings {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string | null;
  why_image_1_url: string | null;
  why_image_2_url: string | null;
  why_image_3_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  address: string | null;
}

export interface DbProperty {
  id: string;
  slug: string;
  title: string;
  city: string;
  district: string;
  price: number;
  type: string;
  listing: "achat" | "location";
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string | null;
  gallery: string[];
  description: string;
  features: string[];
  featured: boolean;
  published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export function formatPrice(p: Pick<DbProperty, "price" | "listing">) {
  const fmt = new Intl.NumberFormat("fr-FR").format(p.price);
  return p.listing === "location" ? `${fmt} DH / mois` : `${fmt} DH`;
}