import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  bucket: "site-images" | "property-images";
  value?: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  multiple?: boolean;
  onUploaded?: (urls: string[]) => void;
}

export function ImageUpload({ bucket, value, onChange, label, multiple, onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);

  const uploadOne = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) {
      toast.error("Upload échoué : " + error.message);
      return null;
    }
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    if (multiple) {
      const urls: string[] = [];
      for (const f of Array.from(files)) {
        const url = await uploadOne(f);
        if (url) urls.push(url);
      }
      if (urls.length) {
        onUploaded?.(urls);
        toast.success(`${urls.length} image(s) uploadée(s)`);
      }
    } else {
      const url = await uploadOne(files[0]);
      if (url) {
        onChange(url);
        toast.success("Image uploadée");
      }
    }
    setUploading(false);
  };

  return (
    <div>
      {label && <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">{label}</label>}
      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="" className="h-32 w-32 object-cover rounded-md border border-border" />
          <button type="button" onClick={() => onChange(null)} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1">
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <label className="inline-flex flex-col items-center justify-center h-32 w-32 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-gold transition">
          <Upload className="h-5 w-5 text-muted-foreground mb-1" />
          <span className="text-xs text-muted-foreground text-center px-2">{uploading ? "..." : multiple ? "Choisir plusieurs" : "Choisir"}</span>
          <input type="file" accept="image/*" multiple={multiple} className="hidden" onChange={(e) => e.target.files && e.target.files.length > 0 && handleFiles(e.target.files)} />
        </label>
      )}
    </div>
  );
}