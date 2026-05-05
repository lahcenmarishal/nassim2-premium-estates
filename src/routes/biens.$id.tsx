import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BedDouble, Bath, Maximize, MapPin, Phone, MessageCircle, Check } from "lucide-react";
import { properties, formatPrice } from "@/data/properties";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/biens/$id")({
  loader: ({ params }) => {
    const property = properties.find((p) => p.id === params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title} — Nassim2` },
          { name: "description", content: loaderData.property.description.slice(0, 160) },
          { property: "og:title", content: loaderData.property.title },
          { property: "og:description", content: loaderData.property.description.slice(0, 160) },
          { property: "og:image", content: loaderData.property.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="pt-40 pb-20 text-center container-page">
      <h1 className="font-display text-4xl">Bien introuvable</h1>
      <Link to="/biens" className="text-gold underline mt-4 inline-block">Retour aux biens</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="pt-40 pb-20 text-center container-page">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const waMsg = encodeURIComponent(`Bonjour, je suis intéressé(e) par : ${p.title}`);

  return (
    <article className="pt-28">
      <div className="container-page py-6">
        <Link to="/biens" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition">
          <ArrowLeft className="h-4 w-4" /> Retour aux biens
        </Link>
      </div>

      {/* Gallery */}
      <div className="container-page grid md:grid-cols-[2fr_1fr] gap-3">
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          <img src={p.gallery[active]} alt={p.title} className="h-full w-full object-cover" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
          {p.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-[4/3] overflow-hidden rounded-lg ring-2 transition ${active === i ? "ring-gold" : "ring-transparent"}`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
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
          <p className="text-muted-foreground leading-relaxed mb-8">{p.description}</p>

          <h2 className="font-display text-2xl mb-3">Caractéristiques</h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-10">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-gold" /> {f}</li>
            ))}
          </ul>

          <h2 className="font-display text-2xl mb-3">Localisation</h2>
          <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border">
            <iframe
              title="Carte El Jadida"
              src="https://www.google.com/maps?q=El+Jadida,+Morocco&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 self-start bg-card border border-border rounded-lg p-6 shadow-lg">
          <div className="text-sm text-muted-foreground">Prix</div>
          <div className="font-display text-4xl text-ink mb-6">{formatPrice(p)}</div>
          <div className="space-y-3">
            <Button asChild variant="gold" size="lg" className="w-full">
              <a href={`https://wa.me/212661765804?text=${waMsg}`} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="ink" size="lg" className="w-full">
              <a href="tel:+212661765804"><Phone className="h-4 w-4" /> Appeler</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/contact">Demander une visite</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-6 text-center">Réf. {p.id.toUpperCase()}</p>
        </aside>
      </div>
    </article>
  );
}