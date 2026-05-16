"use client";

import { getSupabaseClient } from "@/lib/supabase";
import { uploadImage, uploadImages } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui";

type FormState = {
  title_th: string;
  title_en: string;
  description_th: string;
  description_en: string;
  location_th: string;
  location_en: string;
  year: string;
  slug: string;
  project_type: string;
  category: "installation" | "supply" | "";
  status: "published" | "draft";
};

const INITIAL: FormState = {
  title_th: "",
  title_en: "",
  description_th: "",
  description_en: "",
  location_th: "",
  location_en: "",
  year: String(new Date().getFullYear()),
  slug: "",
  project_type: "",
  category: "",
  status: "draft",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function PortfolioForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  function set(key: keyof FormState, value: string) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title_en" && !prev.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function onGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  }

  function removeGallery(index: number) {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.slug) return setError("Slug is required");
    if (!coverFile && !form.title_th) return setError("Please add a cover image");

    setSaving(true);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) throw new Error("Supabase not configured");

      const folder = `portfolio/${form.slug}`;

      // Upload cover image
      let cover_image = "";
      if (coverFile) {
        const ext = coverFile.name.split(".").pop();
        cover_image = await uploadImage(
          coverFile,
          `${folder}/cover.${ext}`
        );
      }

      // Upload gallery images
      let gallery: string[] = [];
      if (galleryFiles.length > 0) {
        gallery = await uploadImages(galleryFiles, `${folder}/gallery`);
      }

      const { error: dbError } = await supabase
        .from("portfolio_items")
        .insert({
          slug: form.slug,
          year: form.year,
          title_th: form.title_th,
          title_en: form.title_en,
          description_th: form.description_th,
          description_en: form.description_en,
          location_th: form.location_th,
          location_en: form.location_en,
          project_type: form.project_type,
          category: form.category || null,
          status: form.status,
          cover_image,
          gallery,
          scope: null,
          highlights: null,
        });

      if (dbError) throw dbError;

      setSuccess(true);
      setTimeout(() => router.push("/portfolio"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <div className="text-2xl text-foreground-200">✓</div>
        <p className="text-sm font-light text-foreground-200">Portfolio item saved. Redirecting…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Cover Image */}
      <Section label="Cover Image">
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onCoverChange}
        />
        {coverPreview ? (
          <div className="relative">
            <img
              src={coverPreview}
              alt="Cover preview"
              className="h-56 w-full object-cover"
            />
            <button
              type="button"
              onClick={() => { setCoverFile(null); setCoverPreview(null); if (coverRef.current) coverRef.current.value = ""; }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-black/60 text-foreground-200 hover:text-foreground-100"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => coverRef.current?.click()}
            className="flex h-40 w-full flex-col items-center justify-center gap-2 border border-dashed border-border-300 text-foreground-400 transition-colors hover:border-foreground-100/40 hover:text-foreground-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-[11px] uppercase tracking-widest">Upload Cover</span>
          </button>
        )}
      </Section>

      {/* Gallery */}
      <Section label="Gallery Images">
        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onGalleryChange}
        />
        <div className="grid grid-cols-3 gap-2">
          {galleryPreviews.map((src, i) => (
            <div key={i} className="relative aspect-square">
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeGallery(i)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-black/60 text-foreground-200 text-xs hover:text-foreground-100"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center border border-dashed border-white/15 text-foreground-400 transition-colors hover:border-border-300 hover:text-foreground-300"
          >
            <span className="text-2xl leading-none">+</span>
          </button>
        </div>
      </Section>

      {/* Title */}
      <Section label="Title">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Thai" value={form.title_th} onChange={(v) => set("title_th", v)} placeholder="ชื่อโครงการ" />
          <Field label="English" value={form.title_en} onChange={(v) => set("title_en", v)} placeholder="Project Title" />
        </div>
      </Section>

      {/* Slug + Year */}
      <Section label="URL Slug & Year">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Slug" value={form.slug} onChange={(v) => set("slug", slugify(v))} placeholder="project-slug" />
          <Field label="Year" value={form.year} onChange={(v) => set("year", v)} placeholder="2024" />
        </div>
      </Section>

      {/* Description */}
      <Section label="Description">
        <div className="flex flex-col gap-3">
          <TextArea label="Thai" value={form.description_th} onChange={(v) => set("description_th", v)} placeholder="รายละเอียดโครงการ" />
          <TextArea label="English" value={form.description_en} onChange={(v) => set("description_en", v)} placeholder="Project description" />
        </div>
      </Section>

      {/* Location */}
      <Section label="Location">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Thai" value={form.location_th} onChange={(v) => set("location_th", v)} placeholder="กรุงเทพฯ" />
          <Field label="English" value={form.location_en} onChange={(v) => set("location_en", v)} placeholder="Bangkok" />
        </div>
      </Section>

      {/* Project Type + Category + Status */}
      <Section label="Classification">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Project Type" value={form.project_type} onChange={(v) => set("project_type", v)} placeholder="curtain-wall" />
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-light uppercase tracking-widest text-foreground-400">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="h-10 border border-white/[0.10] bg-[#0c0c0c] px-3 text-sm font-light text-foreground-100 focus:border-border-300 focus:outline-none"
            >
              <option value="">— none —</option>
              <option value="installation">Installation</option>
              <option value="supply">Supply</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-light uppercase tracking-widest text-foreground-400">Status</label>
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value as "published" | "draft")}
              className="h-10 border border-white/[0.10] bg-[#0c0c0c] px-3 text-sm font-light text-foreground-100 focus:border-border-300 focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </Section>

      {error && (
        <p className="text-[12px] font-light text-red-400">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="default" disabled={saving}>
          {saving ? "Saving…" : "Save Portfolio Item"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-light uppercase tracking-widest text-foreground-400">{label}</p>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-light uppercase tracking-widest text-foreground-400">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 border border-white/[0.10] bg-transparent px-3 text-sm font-light text-foreground-100 placeholder:text-foreground-400 focus:border-border-300 focus:outline-none"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-light uppercase tracking-widest text-foreground-400">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="border border-white/[0.10] bg-transparent px-3 py-2.5 text-sm font-light text-foreground-100 placeholder:text-foreground-400 focus:border-border-300 focus:outline-none resize-none"
      />
    </div>
  );
}
