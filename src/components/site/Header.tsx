import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/biens", label: "Biens" },
  { to: "/services", label: "Services" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container-page flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <img src={logo} alt="Nassim2 — Agence Immobilière El Jadida" className="h-14 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors relative text-ink hover:text-gold",
                "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full",
              )}
              activeProps={{ className: "text-gold after:w-full" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://wa.me/212661765804"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-md text-sm font-medium transition-all bg-gold text-gold-foreground hover:bg-gold/90"
        >
          +212 661 765 804
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-ink"
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container-page py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-foreground py-2 text-base"
                activeProps={{ className: "text-gold" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="https://wa.me/212661765804"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-gold text-gold-foreground font-medium"
            >
              WhatsApp +212 661 765 804
            </a>
          </div>
        </div>
      )}
    </header>
  );
}