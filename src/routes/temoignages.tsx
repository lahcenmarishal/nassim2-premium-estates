import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { useTestimonials } from "@/hooks/useSiteData";

export const Route = createFileRoute("/temoignages")({
  head: () => ({
    meta: [
      { title: "Témoignages clients — Nassim2" },
      { name: "description", content: "Découvrez les avis et témoignages de nos clients sur l'agence immobilière Nassim2 à El Jadida." },
      { property: "og:title", content: "Témoignages clients — Nassim2" },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { testimonials, loading } = useTestimonials();
  return (
    <>
      <PageHeader eyebrow="Avis clients" title="Ils nous ont fait confiance" subtitle="Découvrez l'expérience de ceux qui ont choisi Nassim2 pour leur projet immobilier." />
      <section className="py-12 md:py-20 bg-background">
        <div className="container-page">
          {loading ? <p className="text-center text-muted-foreground">Chargement…</p> : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
          )}
        </div>
      </section>
    </>
  );
}