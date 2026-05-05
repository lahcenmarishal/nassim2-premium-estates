import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Compte créé. Vérifiez votre email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-28 pb-20">
      <Toaster />
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 shadow-xl">
        <h1 className="font-display text-3xl mb-2">{mode === "login" ? "Connexion" : "Créer un compte"}</h1>
        <p className="text-sm text-muted-foreground mb-6">Accès administrateur Nassim2</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Mot de passe</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background" />
          </div>
          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
            {loading ? "..." : mode === "login" ? "Se connecter" : "S'inscrire"}
          </Button>
        </form>
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="mt-4 text-sm text-muted-foreground hover:text-gold w-full text-center">
          {mode === "login" ? "Pas de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
        </button>
      </div>
    </div>
  );
}