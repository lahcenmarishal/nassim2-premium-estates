import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Award, HeartHandshake, Sparkles, ArrowRight, Quote, Star, Phone } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nassim2 — Immobilier premium à El Jadida" },
      { name: "description", content: "Achat, vente et location de villas, appartements et terrains à El Jadida. L'agence de référence pour l'immobilier haut de gamme." },
      { property: "og:title", content: "Nassim2 — Immobilier premium à El Jadida" },
      { property: "og:description", content: "Votre partenaire de confiance pour l'immobilier à El Jadida." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ listing: "achat", type: "", budget: "" });

  const recents = properties.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-white">
        <img src={hero} alt="Villa de luxe à El Jadida" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/85" />
        <div className="relative z-10 container-page text-center pt-32 pb-20">
          <span className="inline-block uppercase tracking-[0.3em] text-xs text-gold mb-6 animate-fade-in">
            Agence Immobilière — El Jadida
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6 animate-fade-up">
            L'art de vivre <em className="text-gold not-italic">l'immobilier</em>
            <br />à El Jadida
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/80 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Votre partenaire de confiance pour l'achat, la vente et la location de biens d'exception.
          </p>

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/biens" });
            }}
            className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-xl p-3 grid md:grid-cols-[1fr_1fr_1fr_auto] gap-2 shadow-2xl animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <select
              value={filters.listing}
              onChange={(e) => setFilters({ ...filters, listing: e.target.value })}
              className="h-12 px-4 rounded-md bg-transparent text-foreground border border-border md:border-0 md:border-r"
            >
              <option value="achat">Achat</option>
              <option value="location">Location</option>
            </select>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="h-12 px-4 rounded-md bg-transparent text-foreground border border-border md:border-0 md:border-r"
            >
              <option value="">Tout type</option>
              <option value="appartement">Appartement</option>
              <option value="villa">Villa</option>
              <option value="riad">Riad</option>
              <option value="terrain">Terrain</option>
              <option value="penthouse">Penthouse</option>
            </select>
            <select
              value={filters.budget}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              className="h-12 px-4 rounded-md bg-transparent text-foreground border border-border md:border-0"
            >
              <option value="">Budget</option>
              <option value="1">Jusqu'à 1M DH</option>
              <option value="3">1 à 3M DH</option>
              <option value="5">3 à 5M DH</option>
              <option value="10">5M+ DH</option>
            </select>
            <Button type="submit" variant="gold" size="lg" className="h-12">
              <Search className="h-4 w-4" /> Rechercher
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-8 text-xs uppercase tracking-widest text-white/60">
            <span>+15 ans d'expérience</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">+500 biens vendus</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">98% satisfaction</span>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24 bg-background">
        <div className="container-page">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Sélection</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3">Biens récents</h2>
            </div>
            <Link to="/biens" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition">
              Voir tous les biens <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recents.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-cream">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Nos services</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Un accompagnement sur-mesure</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Achat", desc: "Trouvez le bien qui vous ressemble grâce à notre sélection exclusive et notre connaissance fine du marché." },
              { icon: Award, title: "Vente", desc: "Estimation précise, mise en valeur professionnelle et réseau d'acquéreurs qualifiés." },
              { icon: HeartHandshake, title: "Location", desc: "Gestion locative complète, location longue durée et résidences premium." },
            ].map((s) => (
              <div key={s.title} className="group bg-card border border-border p-8 rounded-lg hover:border-gold transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="h-14 w-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                  <s.icon className="h-6 w-6 text-gold group-hover:text-gold-foreground transition-colors" />
                </div>
                <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-ink text-primary-foreground">
        <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Pourquoi Nassim2</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6">L'excellence au service de vos projets</h2>
            <p className="text-white/70 mb-10 leading-relaxed">
              Depuis plus de 15 ans, Nassim2 est l'agence de référence à El Jadida pour les biens d'exception. Nous combinons expertise locale, discrétion et exigence pour offrir une expérience immobilière à la hauteur de vos ambitions.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, t: "Confiance & transparence" },
                { icon: Award, t: "Biens d'exception" },
                { icon: HeartHandshake, t: "Accompagnement complet" },
                { icon: Sparkles, t: "Réseau exclusif" },
              ].map((f) => (
                <div key={f.t} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="pt-1.5 text-sm font-medium">{f.t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 aspect-[4/5] overflow-hidden rounded-lg">
              <img src={recents[0].image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img src={recents[1].image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img src={recents[2].image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="container-page">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Témoignages</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Ils nous ont fait confiance</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Karim B.", role: "Acquéreur villa", text: "Une équipe à l'écoute et d'une grande discrétion. Nassim2 m'a trouvé la villa de mes rêves en moins de deux mois." },
              { name: "Sophia L.", role: "Investisseuse", text: "Professionnalisme exemplaire, conseils avisés sur le marché d'El Jadida. Je recommande sans réserve." },
              { name: "Mohamed R.", role: "Vendeur appartement", text: "Vente conclue au prix souhaité grâce à un accompagnement irréprochable. Merci à toute l'équipe." },
            ].map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-lg p-8">
                <Quote className="h-8 w-8 text-gold mb-4" />
                <p className="text-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gold/95 to-gold">
        <div className="container-page text-center">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-4">Prêt à concrétiser votre projet ?</h2>
          <p className="text-ink/80 max-w-xl mx-auto mb-8">Contactez nos conseillers pour une étude personnalisée et confidentielle.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="ink" size="xl">
              <Link to="/contact">Nous contacter</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-transparent border-ink text-ink hover:bg-ink hover:text-primary-foreground">
              <a href="https://wa.me/212661765804" target="_blank" rel="noreferrer"><Phone className="h-4 w-4" /> +212 661 765 804</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}