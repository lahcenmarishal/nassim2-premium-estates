import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-display text-gold">404</h1>
        <h2 className="mt-4 text-2xl font-display text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page recherchée n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-gold-foreground transition-colors hover:bg-gold/90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nassim2 — Agence Immobilière El Jadida" },
      { name: "description", content: "Agence Nassim2 : achat, vente et location de biens immobiliers premium à El Jadida." },
      { property: "og:title", content: "Nassim2 — Agence Immobilière El Jadida" },
      { property: "og:description", content: "Votre partenaire de confiance pour l'immobilier à El Jadida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
