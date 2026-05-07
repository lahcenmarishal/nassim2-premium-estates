import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { SiteSettings, DbProperty, ContactMessage, Testimonial } from "@/lib/db-types";
import { LogOut, Plus, Trash2, Edit, Check, Mail, MailOpen, Star } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Tab = "hero" | "contact-info" | "properties" | "testimonials" | "messages";

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("hero");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading) return <div className="pt-40 text-center">Chargement…</div>;
  if (!user) return null;
  if (!isAdmin) return (
    <div className="pt-40 text-center container-page">
      <h1 className="font-display text-3xl">Accès refusé</h1>
      <p className="text-muted-foreground mt-2">Vous n'avez pas les permissions administrateur.</p>
      <Button onClick={() => supabase.auth.signOut()} className="mt-4">Se déconnecter</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream pt-24 md:pt-28 pb-20">
      <Toaster />
      <div className="container-page">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">Administration</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button asChild variant="outline"><Link to="/">Voir le site</Link></Button>
            <Button variant="ink" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}>
              <LogOut className="h-4 w-4" /> Déconnexion
            </Button>
          </div>
        </div>

        <div className="flex gap-1 md:gap-2 border-b border-border mb-8 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          {([
            ["hero", "Hero & Images"],
            ["contact-info", "Coordonnées"],
            ["properties", "Biens"],
            ["testimonials", "Témoignages"],
            ["messages", "Messages"],
          ] as [Tab, string][]).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`px-3 md:px-4 py-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${tab === k ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {l}
            </button>
          ))}
        </div>

        {tab === "hero" && <HeroPanel />}
        {tab === "contact-info" && <ContactInfoPanel />}
        {tab === "properties" && <PropertiesPanel />}
        {tab === "testimonials" && <TestimonialsPanel />}
        {tab === "messages" && <MessagesPanel />}
      </div>
    </div>
  );
}

function useSettings() {
  const [s, setS] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("site_settings").select("*").maybeSingle().then(({ data }) => {
      setS(data as SiteSettings | null); setLoading(false);
    });
  }, []);
  return { s, setS, loading };
}

function HeroPanel() {
  const { s, setS, loading } = useSettings();
  const [saving, setSaving] = useState(false);
  if (loading || !s) return <div>Chargement…</div>;

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({
      hero_title: s.hero_title, hero_subtitle: s.hero_subtitle,
      hero_image_url: s.hero_image_url,
      why_image_1_url: s.why_image_1_url, why_image_2_url: s.why_image_2_url, why_image_3_url: s.why_image_3_url,
    }).eq("id", s.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Enregistré"); window.dispatchEvent(new Event("site-settings-updated")); }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 md:p-8 space-y-6">
      <div>
        <h2 className="font-display text-xl md:text-2xl mb-4">Section Hero</h2>
        <label className="text-xs uppercase tracking-widest text-muted-foreground">Titre</label>
        <input value={s.hero_title} onChange={(e) => setS({ ...s, hero_title: e.target.value })} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background" />
        <label className="text-xs uppercase tracking-widest text-muted-foreground block mt-4">Sous-titre</label>
        <textarea value={s.hero_subtitle} rows={3} onChange={(e) => setS({ ...s, hero_subtitle: e.target.value })} className="mt-2 w-full px-4 py-3 border border-border rounded-md bg-background" />
        <div className="mt-4">
          <ImageUpload bucket="site-images" label="Image Hero" value={s.hero_image_url} onChange={(url) => setS({ ...s, hero_image_url: url })} />
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <h2 className="font-display text-xl md:text-2xl mb-4">Section "Pourquoi Nassim2"</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ImageUpload bucket="site-images" label="Image 1 (grande)" value={s.why_image_1_url} onChange={(url) => setS({ ...s, why_image_1_url: url })} />
          <ImageUpload bucket="site-images" label="Image 2" value={s.why_image_2_url} onChange={(url) => setS({ ...s, why_image_2_url: url })} />
          <ImageUpload bucket="site-images" label="Image 3" value={s.why_image_3_url} onChange={(url) => setS({ ...s, why_image_3_url: url })} />
        </div>
      </div>
      <Button onClick={save} disabled={saving} variant="gold" size="lg"><Check className="h-4 w-4" /> Enregistrer</Button>
    </div>
  );
}

function ContactInfoPanel() {
  const { s, setS, loading } = useSettings();
  const [saving, setSaving] = useState(false);
  if (loading || !s) return <div>Chargement…</div>;

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({
      phone: s.phone, whatsapp: s.whatsapp, email: s.email, address: s.address,
      instagram_url: s.instagram_url, facebook_url: s.facebook_url,
    }).eq("id", s.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Enregistré"); window.dispatchEvent(new Event("site-settings-updated")); }
  };

  const fields: [keyof SiteSettings, string, string?][] = [
    ["phone", "Téléphone", "+212 6 00 00 00 00"],
    ["whatsapp", "WhatsApp (numéro sans + ni espaces)", "212600000000"],
    ["email", "Email", "contact@nassim2.ma"],
    ["address", "Adresse"],
    ["instagram_url", "Instagram (URL)", "https://instagram.com/..."],
    ["facebook_url", "Facebook (URL)", "https://facebook.com/..."],
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-5 md:p-8 space-y-4">
      <h2 className="font-display text-2xl mb-4">Coordonnées du site</h2>
      {fields.map(([k, label, ph]) => (
        <div key={k}>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
          <input value={(s[k] as string) || ""} placeholder={ph} onChange={(e) => setS({ ...s, [k]: e.target.value } as SiteSettings)} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background" />
        </div>
      ))}
      <Button onClick={save} disabled={saving} variant="gold" size="lg"><Check className="h-4 w-4" /> Enregistrer</Button>
    </div>
  );
}

function PropertiesPanel() {
  const [list, setList] = useState<DbProperty[]>([]);
  const [editing, setEditing] = useState<DbProperty | null>(null);

  const load = () => {
    supabase.from("properties").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setList((data as DbProperty[]) || []));
  };
  useEffect(load, []);

  const newProperty = (): DbProperty => ({
    id: "", slug: "", title: "", city: "El Jadida", district: "", price: 0,
    type: "appartement", listing: "achat", bedrooms: 0, bathrooms: 0, area: 0,
    image_url: null, gallery: [], description: "", features: [], featured: false, published: true,
  });

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce bien ?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Supprimé"); load(); }
  };

  if (editing) return <PropertyForm property={editing} onClose={() => { setEditing(null); load(); }} />;

  return (
    <div className="bg-card border border-border rounded-lg p-5 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl">Biens immobiliers ({list.length})</h2>
        <Button variant="gold" onClick={() => setEditing(newProperty())}><Plus className="h-4 w-4" /> Ajouter</Button>
      </div>
      <div className="space-y-2">
        {list.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-3 border border-border rounded-md">
            <img src={p.image_url || ""} alt="" className="h-14 w-14 object-cover rounded bg-muted" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{p.title}</div>
              <div className="text-xs text-muted-foreground">{p.district} · {p.type} · {p.listing} · {p.price.toLocaleString("fr-FR")} DH {!p.published && "· (non publié)"}</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setEditing(p)}><Edit className="h-3 w-3" /></Button>
            <Button variant="outline" size="sm" onClick={() => remove(p.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PropertyForm({ property, onClose }: { property: DbProperty; onClose: () => void }) {
  const [p, setP] = useState<DbProperty>(property);
  const [saving, setSaving] = useState(false);
  const [featuresInput, setFeaturesInput] = useState(p.features.join(", "));

  const save = async () => {
    if (!p.title || !p.slug) return toast.error("Titre et slug requis");
    setSaving(true);
    const payload = {
      slug: p.slug, title: p.title, city: p.city, district: p.district, price: Number(p.price),
      type: p.type, listing: p.listing, bedrooms: Number(p.bedrooms), bathrooms: Number(p.bathrooms),
      area: Number(p.area), image_url: p.image_url, gallery: p.gallery,
      description: p.description, features: featuresInput.split(",").map((s) => s.trim()).filter(Boolean),
      featured: p.featured, published: p.published,
    };
    const { error } = p.id
      ? await supabase.from("properties").update(payload).eq("id", p.id)
      : await supabase.from("properties").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success("Enregistré"); onClose(); }
  };

  const addGalleryImage = (url: string | null) => {
    if (url) setP({ ...p, gallery: [...p.gallery, url] });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 md:p-8 space-y-4">
      <div className="flex justify-between mb-4">
        <h2 className="font-display text-2xl">{p.id ? "Modifier" : "Nouveau bien"}</h2>
        <Button variant="outline" onClick={onClose}>Annuler</Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Titre *" value={p.title} onChange={(v) => setP({ ...p, title: v, slug: p.slug || v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })} />
        <Field label="Slug *" value={p.slug} onChange={(v) => setP({ ...p, slug: v })} />
        <Field label="Ville" value={p.city} onChange={(v) => setP({ ...p, city: v })} />
        <Field label="Quartier" value={p.district} onChange={(v) => setP({ ...p, district: v })} />
        <Field label="Prix (DH)" type="number" value={String(p.price)} onChange={(v) => setP({ ...p, price: Number(v) })} />
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Type</label>
          <select value={p.type} onChange={(e) => setP({ ...p, type: e.target.value })} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background">
            {["appartement", "villa", "riad", "terrain", "penthouse"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Transaction</label>
          <select value={p.listing} onChange={(e) => setP({ ...p, listing: e.target.value as "achat" | "location" })} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background">
            <option value="achat">Achat</option><option value="location">Location</option>
          </select>
        </div>
        <Field label="Chambres" type="number" value={String(p.bedrooms)} onChange={(v) => setP({ ...p, bedrooms: Number(v) })} />
        <Field label="Salles de bain" type="number" value={String(p.bathrooms)} onChange={(v) => setP({ ...p, bathrooms: Number(v) })} />
        <Field label="Surface (m²)" type="number" value={String(p.area)} onChange={(v) => setP({ ...p, area: Number(v) })} />
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-muted-foreground">Description</label>
        <textarea value={p.description} rows={5} onChange={(e) => setP({ ...p, description: e.target.value })} className="mt-2 w-full px-4 py-3 border border-border rounded-md bg-background" />
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-muted-foreground">Caractéristiques (séparées par des virgules)</label>
        <input value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background" />
      </div>

      <ImageUpload bucket="property-images" label="Image principale" value={p.image_url} onChange={(url) => setP({ ...p, image_url: url })} />

      <div>
        <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Galerie</label>
        <div className="flex flex-wrap gap-3">
          {p.gallery.map((g, i) => (
            <div key={i} className="relative">
              <img src={g} className="h-24 w-24 object-cover rounded border border-border" />
              <button onClick={() => setP({ ...p, gallery: p.gallery.filter((_, idx) => idx !== i) })} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"><Trash2 className="h-3 w-3" /></button>
            </div>
          ))}
          <ImageUpload bucket="property-images" value={null} onChange={addGalleryImage} />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.featured} onChange={(e) => setP({ ...p, featured: e.target.checked })} /> Mis en avant</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.published} onChange={(e) => setP({ ...p, published: e.target.checked })} /> Publié</label>
      </div>

      <Button onClick={save} disabled={saving} variant="gold" size="lg"><Check className="h-4 w-4" /> Enregistrer</Button>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-11 px-4 border border-border rounded-md bg-background" />
    </div>
  );
}

function MessagesPanel() {
  const [list, setList] = useState<ContactMessage[]>([]);
  const load = () => {
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setList((data as ContactMessage[]) || []));
  };
  useEffect(() => { load(); }, []);

  const toggleRead = async (m: ContactMessage) => {
    await supabase.from("contact_messages").update({ read: !m.read }).eq("id", m.id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    load();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 md:p-8">
      <h2 className="font-display text-2xl mb-6">Messages reçus ({list.length})</h2>
      {list.length === 0 ? <p className="text-muted-foreground">Aucun message.</p> : (
        <div className="space-y-3">
          {list.map((m) => (
            <div key={m.id} className={`p-4 border rounded-md ${m.read ? "border-border" : "border-gold bg-gold/5"}`}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="font-medium">{m.name} <span className="text-sm text-muted-foreground">— {m.email}</span></div>
                  {m.phone && <div className="text-xs text-muted-foreground">{m.phone}</div>}
                  <div className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("fr-FR")}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toggleRead(m)}>{m.read ? <Mail className="h-3 w-3" /> : <MailOpen className="h-3 w-3" />}</Button>
                  <Button size="sm" variant="outline" onClick={() => remove(m.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                </div>
              </div>
              <p className="text-sm whitespace-pre-line">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TestimonialsPanel() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const load = () => {
    supabase.from("testimonials").select("*").order("sort_order", { ascending: true })
      .then(({ data }) => setList((data as Testimonial[]) || []));
  };
  useEffect(() => { load(); }, []);

  const blank = (): Testimonial => ({
    id: "", name: "", role: "", content: "", avatar_url: null,
    rating: 5, published: true, sort_order: list.length, created_at: "",
  });

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Supprimé"); load(); }
  };

  if (editing) return <TestimonialForm t={editing} onClose={() => { setEditing(null); load(); }} />;

  return (
    <div className="bg-card border border-border rounded-lg p-5 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl">Témoignages ({list.length})</h2>
        <Button variant="gold" onClick={() => setEditing(blank())}><Plus className="h-4 w-4" /> Ajouter</Button>
      </div>
      <div className="space-y-2">
        {list.map((t) => (
          <div key={t.id} className="flex items-center gap-4 p-3 border border-border rounded-md">
            <div className="flex-1 min-w-0">
              <div className="font-medium">{t.name} <span className="text-xs text-muted-foreground">— {t.role}</span></div>
              <div className="text-xs text-muted-foreground line-clamp-1">{t.content}</div>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}
                {!t.published && <span className="text-xs text-muted-foreground ml-2">(non publié)</span>}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setEditing(t)}><Edit className="h-3 w-3" /></Button>
            <Button variant="outline" size="sm" onClick={() => remove(t.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialForm({ t, onClose }: { t: Testimonial; onClose: () => void }) {
  const [v, setV] = useState<Testimonial>(t);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!v.name || !v.content) return toast.error("Nom et témoignage requis");
    setSaving(true);
    const payload = {
      name: v.name, role: v.role, content: v.content, avatar_url: v.avatar_url,
      rating: Number(v.rating), published: v.published, sort_order: Number(v.sort_order),
    };
    const { error } = v.id
      ? await supabase.from("testimonials").update(payload).eq("id", v.id)
      : await supabase.from("testimonials").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success("Enregistré"); onClose(); }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 md:p-8 space-y-4">
      <div className="flex justify-between mb-4">
        <h2 className="font-display text-2xl">{v.id ? "Modifier témoignage" : "Nouveau témoignage"}</h2>
        <Button variant="outline" onClick={onClose}>Annuler</Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nom *" value={v.name} onChange={(x) => setV({ ...v, name: x })} />
        <Field label="Rôle / Statut" value={v.role || ""} onChange={(x) => setV({ ...v, role: x })} />
        <Field label="Note (1-5)" type="number" value={String(v.rating)} onChange={(x) => setV({ ...v, rating: Math.max(1, Math.min(5, Number(x))) })} />
        <Field label="Ordre d'affichage" type="number" value={String(v.sort_order)} onChange={(x) => setV({ ...v, sort_order: Number(x) })} />
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-muted-foreground">Témoignage *</label>
        <textarea value={v.content} rows={5} onChange={(e) => setV({ ...v, content: e.target.value })} className="mt-2 w-full px-4 py-3 border border-border rounded-md bg-background" />
      </div>
      <ImageUpload bucket="site-images" label="Photo (optionnel)" value={v.avatar_url} onChange={(url) => setV({ ...v, avatar_url: url })} />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={v.published} onChange={(e) => setV({ ...v, published: e.target.checked })} /> Publié</label>
      <Button onClick={save} disabled={saving} variant="gold" size="lg"><Check className="h-4 w-4" /> Enregistrer</Button>
    </div>
  );
}
