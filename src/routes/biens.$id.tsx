import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BedDouble, Bath, Maximize, MapPin, Phone, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProperty, useSiteSettings } from "@/hooks/useSiteData";
import { formatPrice } from "@/lib/db-types";
import fallback from "@/assets/property-1.jpg";

export const Route = createFileRoute("/biens/$id")({
  component: PropertyDetail,
});

function PropertyDetail() {
  const { id } = Route.useParams();
  const { property: p, loading } = useProperty(id);
  const { settings } = useSiteSettings();
  const [active, setActive] = useState(0);

  if (loading) return <div className="pt-40 pb-20 text-center container-page">Chargement…</div>;
  if (!p) return (
    <div className="pt-40 pb-20 text-center container-page">
      <h1 className="font-display text-4xl">Bien introuvable</h1>
      <Link to="/biens" className="text-gold underline mt-4 inline-block">Retour aux biens</Link>
    </div>
  );

  const wa = settings?.whatsapp || "212661765804";
  const phone = settings?.phone || "+212 661 765 804";
  const gallery = p.gallery.length > 0 ? p.gallery : (p.image_url ? [p.image_url] : [fallback]);
  const waMsg = encodeURIComponent(`Bonjour, je suis intéressé(e) par : ${p.title}`);

  return (
    <article className="pt-28">
      <div className="container-page py-6">
        <Link to="/biens" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition">
          <ArrowLeft className="h-4 w-4" /> Retour aux biens
        </Link>
      </div>

      <div className="container-page space-y-3">
        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
          <img src={gallery[active]} alt={p.title} className="h-full w-full object-cover" />
        </div>
        {gallery.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-[4/3] overflow-hidden rounded-md ring-2 transition ${active === i ? "ring-gold" : "ring-transparent hover:ring-border"}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container-page grid lg:grid-cols-[2fr_1fr] gap-12 py-12">
        <div>
          <div className="flex gap-2 mb-3">
            <span className="bg-gold text-gold-foreground text-xs uppercase tracking-wider px-3 py-1 rounded-full">{p.listing === "achat" ? "À vendre" : "Location"}</span>
            <span className="bg-secondary text-secondary-foreground text-xs capitalize px-3 py-1 rounded-full">{p.type}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-3">{p.title}</h1>
          <p className="flex items-center gap-2 text-muted-foreground mb-6"><MapPin className="h-4 w-4 text-gold" /> {p.district}, {p.city}</p>

          <div className="flex flex-wrap gap-6 text-sm border-y border-border py-5 mb-8">
            {p.bedrooms > 0 && <span className="flex items-center gap-2"><BedDouble className="h-5 w-5 text-gold" /> {p.bedrooms} chambres</span>}
            {p.bathrooms > 0 && <span className="flex items-center gap-2"><Bath className="h-5 w-5 text-gold" /> {p.bathrooms} sdb</span>}
            <span className="flex items-center gap-2"><Maximize className="h-5 w-5 text-gold" /> {p.area} m²</span>
          </div>

          <h2 className="font-display text-2xl mb-3">Description</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">{p.description}</p>

          {p.features.length > 0 && (
            <>
              <h2 className="font-display text-2xl mb-3">Caractéristiques</h2>
              <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-gold" /> {f}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 self-start bg-card border border-border rounded-lg p-6 shadow-lg">
          <div className="text-sm text-muted-foreground">Prix</div>
          <div className="font-display text-4xl text-ink mb-6">{formatPrice(p)}</div>
          <div className="space-y-3">
            <Button asChild variant="gold" size="lg" className="w-full">
              <a href={`https://wa.me/${wa}?text=${waMsg}`} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="ink" size="lg" className="w-full">
              <a href={`tel:${phone}`}><Phone className="h-4 w-4" /> Appeler</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/contact">Demander une visite</Link>
            </Button>
          </div>
        </aside>
      </div>
    </article>
  );
}
