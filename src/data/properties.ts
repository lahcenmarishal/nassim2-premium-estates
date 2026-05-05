import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import p4 from "@/assets/property-4.jpg";
import p5 from "@/assets/property-5.jpg";
import p6 from "@/assets/property-6.jpg";

export type PropertyType = "appartement" | "villa" | "terrain" | "riad" | "penthouse";
export type Listing = "achat" | "location";

export interface Property {
  id: string;
  title: string;
  city: string;
  district: string;
  price: number;
  type: PropertyType;
  listing: Listing;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
}

export const properties: Property[] = [
  {
    id: "appartement-vue-mer",
    title: "Appartement vue mer panoramique",
    city: "El Jadida",
    district: "Sidi Bouzid",
    price: 2400000,
    type: "appartement",
    listing: "achat",
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    image: p1,
    gallery: [p1, p3, p6],
    description:
      "Splendide appartement traversant avec terrasse face à l'océan. Finitions haut de gamme, marbre, baies vitrées toute hauteur, cuisine équipée et résidence sécurisée avec piscine.",
    features: ["Vue mer", "Terrasse", "Parking", "Sécurité 24/7", "Piscine"],
  },
  {
    id: "villa-prestige-palmiers",
    title: "Villa de prestige aux Palmiers",
    city: "El Jadida",
    district: "Mazagan",
    price: 8500000,
    type: "villa",
    listing: "achat",
    bedrooms: 5,
    bathrooms: 4,
    area: 420,
    image: p2,
    gallery: [p2, p4, p1],
    description:
      "Villa contemporaine d'architecte sur 800m² de jardin paysagé. Piscine à débordement, suite parentale, dressing, hammam, garage 3 voitures.",
    features: ["Piscine", "Jardin", "Hammam", "Garage", "Domotique"],
  },
  {
    id: "penthouse-mazagan",
    title: "Penthouse terrasse — Mazagan Beach",
    city: "El Jadida",
    district: "Mazagan Beach",
    price: 18500,
    type: "penthouse",
    listing: "location",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    image: p3,
    gallery: [p3, p1, p6],
    description:
      "Penthouse exceptionnel avec terrasse de 120m² et vue à 180° sur l'océan. Idéal résidence secondaire, services hôteliers du resort inclus.",
    features: ["Terrasse 120m²", "Vue mer", "Resort", "Conciergerie"],
  },
  {
    id: "riad-medina",
    title: "Riad authentique — Cité Portugaise",
    city: "El Jadida",
    district: "Cité Portugaise",
    price: 3200000,
    type: "riad",
    listing: "achat",
    bedrooms: 6,
    bathrooms: 5,
    area: 320,
    image: p4,
    gallery: [p4, p2, p1],
    description:
      "Riad entièrement rénové au cœur de la Cité Portugaise classée UNESCO. Patio à fontaine, zellige, plafonds peints, terrasse panoramique.",
    features: ["Patio", "Terrasse", "UNESCO", "Charme"],
  },
  {
    id: "terrain-azemmour",
    title: "Terrain pieds dans l'eau — Haouzia",
    city: "El Jadida",
    district: "Haouzia",
    price: 4800000,
    type: "terrain",
    listing: "achat",
    bedrooms: 0,
    bathrooms: 0,
    area: 1200,
    image: p5,
    gallery: [p5, p2],
    description:
      "Terrain constructible face à la plage. Titre foncier, viabilisé, idéal projet villa de luxe ou résidence privée.",
    features: ["Front de mer", "Titré", "Viabilisé", "1200 m²"],
  },
  {
    id: "appartement-familial",
    title: "Appartement familial — Centre ville",
    city: "El Jadida",
    district: "Centre",
    price: 9500,
    type: "appartement",
    listing: "location",
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    image: p6,
    gallery: [p6, p1],
    description:
      "Bel appartement lumineux meublé avec goût, proche commerces et écoles. Résidence calme et sécurisée.",
    features: ["Meublé", "Centre", "Lumineux", "Sécurisé"],
  },
];

export function formatPrice(p: Property) {
  const fmt = new Intl.NumberFormat("fr-FR").format(p.price);
  return p.listing === "location" ? `${fmt} DH / mois` : `${fmt} DH`;
}