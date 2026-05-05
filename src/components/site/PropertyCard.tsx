import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { formatPrice, type Property } from "@/data/properties";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      to="/biens/$id"
      params={{ id: p.id }}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-2xl hover:shadow-ink/10 transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-gold text-gold-foreground text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full">
            {p.listing === "achat" ? "À vendre" : "Location"}
          </span>
          <span className="bg-white/90 backdrop-blur text-ink text-xs font-medium capitalize px-3 py-1 rounded-full">
            {p.type}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 text-gold" /> {p.district}, {p.city}
        </div>
        <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-gold transition-colors">
          {p.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
          {p.bedrooms > 0 && <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {p.bedrooms}</span>}
          {p.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {p.bathrooms}</span>}
          <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {p.area} m²</span>
        </div>
        <div className="mt-4 text-2xl font-display font-semibold text-ink">
          {formatPrice(p)}
        </div>
      </div>
    </Link>
  );
}