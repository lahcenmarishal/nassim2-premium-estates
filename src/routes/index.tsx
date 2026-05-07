import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Award, HeartHandshake, Sparkles, ArrowRight, Quote, Star, Phone } from "lucide-react";
import heroFallback from "@/assets/hero.jpg";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/site/PropertyCard";
import { useSiteSettings, useProperties, useTestimonials } from "@/hooks/useSiteData";

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
  const { settings } = useSiteSettings();
  const { properties } = useProperties({ limit: 3 });
  const { testimonials } = useTestimonials({ limit: 3 });

  const heroImg = settings?.hero_image_url || heroFallback;
  const why1 = settings?.why_image_1_url || p1;
  const why2 = settings?.why_image_2_url || p2;
  const why3 = settings?.why_image_3_url || p3;
  const phone = settings?.phone || "+212 661 765 804";
  const wa = settings?.whatsapp || "212661765804";

  return (
    <>
      <section className="relative min-h-[100svh] flex items-center justify-center text-white">
        <img src={heroImg} alt="Hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/85" />
        <div className="relative z-10 container-page text-center pt-28 md:pt-32 pb-16 md:pb-20">
          <span className="inline-block uppercase tracking-[0.3em] text-[10px] md:text-xs text-gold mb-4 md:mb-6 animate-fade-in">
            Agence Immobilière — El Jadida
          </span>
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-4 md:mb-6 animate-fade-up">
            {settings?.hero_title || "L'art de vivre l'immobilier à El Jadida"}
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-white/80 mb-8 md:mb-10 animate-fade-up px-2" style={{ animationDelay: "0.2s" }}>
            {settings?.hero_subtitle || "Votre partenaire de confiance pour l'achat, la vente et la location de biens d'exception."}
          </p>

          <form
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/biens" }); }}
            className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-xl p-2 md:p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] gap-2 shadow-2xl animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <select value={filters.listing} onChange={(e) => setFilters({ ...filters, listing: e.target.value })} className="h-12 px-4 rounded-md bg-transparent text-foreground border border-border md:border-0 md:border-r">
              <option value="achat">Achat</option>
              <option value="location">Location</option>
            </select>
            <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="h-12 px-4 rounded-md bg-transparent text-foreground border border-border md:border-0 md:border-r">
              <option value="">Tout type</option>
              <option value="appartement">Appartement</option>
              <option value="villa">Villa</option>
              <option value="riad">Riad</option>
              <option value="terrain">Terrain</option>
              <option value="penthouse">Penthouse</option>
            </select>
            <select value={filters.budget} onChange={(e) => setFilters({ ...filters, budget: e.target.value })} className="h-12 px-4 rounded-md bg-transparent text-foreground border border-border md:border-0">
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

          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-8 text-[10px] md:text-xs uppercase tracking-widest text-white/60">
            <span>+15 ans d'expérience</span>
            <span className="hidden md:inline">•</span>
            <span>+500 biens vendus</span>
            <span className="hidden md:inline">•</span>
            <span>98% satisfaction</span>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-background">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8 md:mb-12 flex-wrap gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Sélection</span>
              <h2 className="font-display text-3xl md:text-5xl mt-3">Biens récents</h2>
            </div>
            <Link to="/biens" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition">
              Voir tous les biens <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {properties.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-cream">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Nos services</span>
            <h2 className="font-display text-3xl md:text-5xl mt-3">Un accompagnement sur-mesure</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
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

      <section className="py-14 md:py-24 bg-ink text-primary-foreground">
        <div className="container-page grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Pourquoi Nassim2</span>
            <h2 className="font-display text-3xl md:text-5xl mt-3 mb-6">L'excellence au service de vos projets</h2>
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
              <img src={why1} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img src={why2} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-lg">
                <img src={why3} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-background">
        <div className="container-page">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Témoignages</span>
            <h2 className="font-display text-3xl md:text-5xl mt-3">Ils nous ont fait confiance</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-card border border-border rounded-lg p-8">
                <Quote className="h-8 w-8 text-gold mb-4" />
                <p className="text-foreground leading-relaxed mb-6 italic">"{t.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="ink" size="lg">
              <Link to="/temoignages">Voir tous les témoignages <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-gradient-to-br from-gold/95 to-gold">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl md:text-5xl text-ink mb-4">Prêt à concrétiser votre projet ?</h2>
          <p className="text-ink/80 max-w-xl mx-auto mb-8 px-2">Contactez nos conseillers pour une étude personnalisée et confidentielle.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="ink" size="xl">
              <Link to="/contact">Nous contacter</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-transparent border-ink text-ink hover:bg-ink hover:text-primary-foreground max-w-full">
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer"><Phone className="h-4 w-4" /> {phone}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
