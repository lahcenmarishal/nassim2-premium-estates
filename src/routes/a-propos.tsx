import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Eye, HeartHandshake } from "lucide-react";
import about from "@/assets/about.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Agence Nassim2 El Jadida" },
      { name: "description", content: "Découvrez l'agence Nassim2 : 15 ans d'expertise immobilière premium à El Jadida, valeurs de confiance et de transparence." },
      { property: "og:title", content: "À propos — Agence Nassim2 El Jadida" },
      { property: "og:description", content: "L'agence de référence pour l'immobilier haut de gamme à El Jadida." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="L'agence" title="À propos de Nassim2" subtitle="L'art de l'immobilier à El Jadida depuis plus de 15 ans." />
      <section className="py-20 bg-background">
        <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-lg">
            <img src={about} alt="El Jadida" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Notre histoire</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6">Une vision premium de l'immobilier</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Fondée à El Jadida, l'agence Nassim2 a bâti sa réputation sur la sélection rigoureuse de biens d'exception et la qualité d'un accompagnement entièrement personnalisé.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Notre connaissance profonde du marché local — de la Cité Portugaise classée UNESCO aux nouveaux quartiers résidentiels de Mazagan et Sidi Bouzid — nous permet de conseiller acquéreurs, vendeurs et investisseurs avec finesse et discrétion.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nous croyons que l'immobilier est avant tout une histoire humaine. Chaque projet mérite écoute, patience et excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container-page">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Nos valeurs</span>
            <h2 className="font-display text-4xl mt-3">Ce qui nous guide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, t: "Confiance", d: "Une relation durable basée sur l'engagement et le respect de la parole donnée." },
              { icon: Eye, t: "Transparence", d: "Information claire, prix justes, conseils objectifs à chaque étape de votre projet." },
              { icon: HeartHandshake, t: "Accompagnement", d: "Un interlocuteur unique, disponible et engagé jusqu'à la remise des clés." },
            ].map((v) => (
              <div key={v.t} className="text-center">
                <div className="h-16 w-16 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-5">
                  <v.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-display text-2xl mb-2">{v.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ink text-primary-foreground">
        <div className="container-page grid sm:grid-cols-3 gap-8 text-center">
          {[{ n: "15+", l: "Années d'expérience" }, { n: "500+", l: "Biens vendus" }, { n: "98%", l: "Clients satisfaits" }].map((s) => (
            <div key={s.l}>
              <div className="font-display text-6xl text-gold mb-2">{s.n}</div>
              <div className="text-sm uppercase tracking-widest text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="container-page text-center mt-12">
          <Button asChild variant="gold" size="xl">
            <Link to="/contact">Rencontrons-nous</Link>
          </Button>
        </div>
      </section>
    </>
  );
}