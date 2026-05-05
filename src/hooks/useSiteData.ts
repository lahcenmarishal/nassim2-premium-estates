import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { SiteSettings, DbProperty } from "@/lib/db-types";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("site_settings").select("*").maybeSingle().then(({ data }) => {
      setSettings(data as SiteSettings | null);
      setLoading(false);
    });
  }, []);
  return { settings, loading };
}

export function useProperties(opts?: { featured?: boolean; limit?: number }) {
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let q = supabase.from("properties").select("*").eq("published", true).order("created_at", { ascending: false });
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