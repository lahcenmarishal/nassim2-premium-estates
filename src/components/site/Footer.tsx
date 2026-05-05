import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-ink text-primary-foreground mt-24">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={logo} alt="Nassim2" className="h-20 w-auto mb-4 bg-white rounded-md p-2" />
          <p className="text-sm text-white/70 leading-relaxed">
            Votre partenaire de confiance pour l'immobilier à El Jadida.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-gold transition">Accueil</Link></li>
            <li><Link to="/biens" className="hover:text-gold transition">Biens immobiliers</Link></li>
            <li><Link to="/services" className="hover:text-gold transition">Services</Link></li>
            <li><Link to="/a-propos" className="hover:text-gold transition">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Achat immobilier</li>
            <li>Vente</li>
            <li>Location</li>
            <li>Accompagnement</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2 items-start"><Phone className="h-4 w-4 mt-0.5 text-gold" /> +212 661 765 804</li>
            <li className="flex gap-2 items-start"><Mail className="h-4 w-4 mt-0.5 text-gold" /> contact@nassim2.ma</li>
            <li className="flex gap-2 items-start"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> El Jadida, Maroc</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-gold-foreground transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-gold-foreground transition"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-white/50 text-center">
          © {new Date().getFullYear()} Agence Nassim2 El Jadida — Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}