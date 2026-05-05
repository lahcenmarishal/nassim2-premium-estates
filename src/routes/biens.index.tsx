import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { PropertyCard } from "@/components/site/PropertyCard";
import { properties } from "@/data/properties";

export const Route = createFileRoute("/biens/")({
  head: () => ({
    meta: [
      { title: "Biens immobiliers — Nassim2 El Jadida" },
      { name: "description", content: "Découvrez nos appartements, villas, riads et terrains à vendre ou à louer à El Jadida." },
      { property: "og:title", content: "Biens immobiliers — Nassim2 El Jadida" },
      { property: "og:description", content: "Sélection premium de biens à El Jadida." },
    ],
  }),
  component: BiensPage,
});

function BiensPage() {
  const [listing, setListing] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (listing !== "all" && p.listing !== listing) return false;
      if (type !== "all" && p.type !== type) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      return true;
    });
  }, [listing, type, maxPrice]);

  return (
    <>
      <PageHeader eyebrow="Catalogue" title="Biens immobiliers" subtitle="Une sélection rigoureuse de propriétés à El Jadida et ses environs." />
      <section className="py-12 bg-background">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-3 mb-10 p-4 bg-card border border-border rounded-lg">
            <select value={listing} onChange={(e) => setListing(e.target.value)} className="h-11 px-4 rounded-md border border-border bg-background">
              <option value="all">Achat & Location</option>
              <option value="achat">À vendre</option>
              <option value="location">Location</option>
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className="h-11 px-4 rounded-md border border-border bg-background">
              <option value="all">Tous types</option>
              <option value="appartement">Appartement</option>
              <option value="villa">Villa</option>
              <option value="riad">Riad</option>
              <option value="terrain">Terrain</option>
              <option value="penthouse">Penthouse</option>
            </select>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-11 px-4 rounded-md border border-border bg-background">
              <option value="">Budget max</option>
              <option value="1000000">1M DH</option>
              <option value="3000000">3M DH</option>
              <option value="5000000">5M DH</option>
              <option value="20000000">20M DH</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">Aucun bien ne correspond à votre recherche.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}