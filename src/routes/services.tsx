import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Tag, Key, Compass, Check } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Nassim2 El Jadida" },
      { name: "description", content: "Achat, vente, location et accompagnement personnalisé. Découvrez les services de l'agence Nassim2 à El Jadida." },
      { property: "og:title", content: "Services — Nassim2 El Jadida" },
      { property: "og:description", content: "Un accompagnement immobilier sur-mesure à El Jadida." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Home, title: "Achat immobilier", desc: "Nous identifions pour vous les biens correspondant à vos critères, organisons les visites et négocions au meilleur prix.", points: ["Sélection sur-mesure", "Visites privées", "Négociation", "Accompagnement notarial"] },
  { icon: Tag, title: "Vente", desc: "Estimation juste, mise en valeur professionnelle et diffusion ciblée auprès d'un réseau d'acquéreurs qualifiés.", points: ["Estimation gratuite", "Reportage photo HD", "Marketing premium", "Acquéreurs vérifiés"] },
  { icon: Key, title: "Location", desc: "Location longue durée, meublée ou résidence premium. Gestion locative complète possible.", points: ["Sélection des locataires", "Rédaction de bail", "État des lieux", "Gestion locative"] },
  { icon: Compass, title: "Accompagnement personnalisé", desc: "Conseil patrimonial, investissement locatif, suivi de chantier et services de conciergerie.", points: ["Conseil investissement", "Suivi de travaux", "Conciergerie", "Discrétion absolue"] },
];

function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Nos services" title="Un accompagnement complet" subtitle="De la recherche à la signature, nous gérons chaque étape avec rigueur et discrétion." />
      <section className="py-12 md:py-20 bg-background">
        <div className="container-page grid sm:grid-cols-2 gap-6 md:gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-lg p-8 hover:border-gold transition-all hover:shadow-xl">
              <div className="h-14 w-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                <s.icon className="h-6 w-6 text-gold" />
              </div>
              <h2 className="font-display text-3xl mb-3">{s.title}</h2>
              <p className="text-muted-foreground mb-6">{s.desc}</p>
              <ul className="space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-gold" /> {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container-page text-center mt-16">
          <Button asChild variant="gold" size="xl">
            <Link to="/contact">Discuter de votre projet</Link>
          </Button>
        </div>
      </section>
    </>
  );
}