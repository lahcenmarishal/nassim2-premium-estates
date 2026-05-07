import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteData";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nassim2 El Jadida" },
      { name: "description", content: "Contactez l'agence Nassim2 à El Jadida." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(80),
  email: z.string().trim().email("Email invalide").max(160),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10, "Message trop court").max(1000),
});

function ContactPage() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name, email: form.email, phone: form.phone || null, message: form.message,
    });
    setSending(false);
    if (error) {
      toast.error("Erreur lors de l'envoi.");
      return;
    }
    toast.success("Message envoyé ! Nous vous répondrons rapidement.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const phone = settings?.phone || "+212 661 765 804";
  const wa = settings?.whatsapp || "212661765804";
  const email = settings?.email || "contact@nassim2.ma";
  const address = settings?.address || "El Jadida, Maroc";

  return (
    <>
      <Toaster />
      <PageHeader eyebrow="Contact" title="Parlons de votre projet" subtitle="Notre équipe est à votre écoute du lundi au samedi." />
      <section className="py-12 md:py-20 bg-background">
        <div className="container-page grid lg:grid-cols-[1fr_1.2fr] gap-10 md:gap-12">
          <div>
            <h2 className="font-display text-3xl mb-8">Coordonnées</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0"><Phone className="h-5 w-5 text-gold" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Téléphone</div>
                  <a href={`tel:${phone}`} className="text-lg hover:text-gold transition">{phone}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0"><MessageCircle className="h-5 w-5 text-gold" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="text-lg hover:text-gold transition">Discuter en direct</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0"><Mail className="h-5 w-5 text-gold" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <a href={`mailto:${email}`} className="text-lg hover:text-gold transition">{email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-gold" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Adresse</div>
                  <p className="text-lg">{address}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-lg border border-border">
              <iframe title="El Jadida Maps" src="https://www.google.com/maps?q=El+Jadida,+Morocco&output=embed" className="w-full h-full" loading="lazy" />
            </div>
          </div>

          <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg p-5 md:p-8 shadow-lg">
            <h2 className="font-display text-3xl mb-2">Envoyer un message</h2>
            <p className="text-sm text-muted-foreground mb-8">Réponse sous 24h ouvrées.</p>
            <div className="grid gap-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Nom complet *</label>
                <input maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background focus:border-gold outline-none transition" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Email *</label>
                  <input type="email" maxLength={160} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background focus:border-gold outline-none transition" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Téléphone</label>
                  <input maxLength={40} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background focus:border-gold outline-none transition" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message *</label>
                <textarea maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 w-full px-4 py-3 border border-border rounded-md bg-background focus:border-gold outline-none transition resize-none" />
              </div>
              <Button type="submit" variant="gold" size="lg" className="w-full" disabled={sending}>
                <Send className="h-4 w-4" /> {sending ? "Envoi…" : "Envoyer le message"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
