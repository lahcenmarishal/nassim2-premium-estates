import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { SiteSettings, DbProperty, Testimonial } from "@/lib/db-types";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    supabase.from("site_settings").select("*").maybeSingle().then(({ data }) => {
      setSettings(data as SiteSettings | null);
      setLoading(false);
    });
  }, [tick]);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener("site-settings-updated", handler);
    window.addEventListener("focus", handler);
    return () => {
      window.removeEventListener("site-settings-updated", handler);
      window.removeEventListener("focus", handler);
    };
  }, []);
  return { settings, loading };
}

export function useProperties(opts?: { featured?: boolean; limit?: number }) {
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let q = supabase
      .from("properties")
      .select("*")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (opts?.featured) q = q.eq("featured", true);
    if (opts?.limit) q = q.limit(opts.limit);
    q.then(({ data }) => {
      setProperties((data as DbProperty[]) || []);
      setLoading(false);
    });
  }, [opts?.featured, opts?.limit]);
  return { properties, loading };
}

export function useProperty(slug: string) {
  const [property, setProperty] = useState<DbProperty | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("properties").select("*").eq("slug", slug).maybeSingle().then(({ data }) => {
      setProperty(data as DbProperty | null);
      setLoading(false);
    });
  }, [slug]);
  return { property, loading };
}

export function useTestimonials(opts?: { limit?: number }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let q = supabase.from("testimonials").select("*").eq("published", true).order("sort_order", { ascending: true });
    if (opts?.limit) q = q.limit(opts.limit);
    q.then(({ data }) => {
      setTestimonials((data as Testimonial[]) || []);
      setLoading(false);
    });
  }, [opts?.limit]);
  return { testimonials, loading };
}