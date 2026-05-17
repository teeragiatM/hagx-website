"use client";

import { signOut } from "@/lib/auth";
import {
  getArticlesAdmin,
  getCustomerReviewsAdmin,
  getPortfolioAdmin,
  upsertArticle,
  upsertPortfolioItem,
  upsertReview,
  type ArticleRow,
  type CustomerReviewRow,
  type PortfolioRow,
} from "@/lib/supabase";
import { useEffect, useState } from "react";

// ── Primitives ────────────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-sm font-light text-foreground-100 outline-none focus:border-accent-500/50";

const textareaCls = inputCls + " resize-y";

// ── Articles panel ────────────────────────────────────────────────────────────

function ArticlesPanel() {
  const [rows, setRows] = useState<ArticleRow[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [editing, setEditing] = useState<ArticleRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    const { data, error } = await getArticlesAdmin();
    setRows(data);
    setFetchError(error);
  }

  useEffect(() => { load(); }, []);

  function newDraft(): ArticleRow {
    return {
      id: "",
      slug: "",
      title_th: "",
      title_en: "",
      category: null,
      excerpt_th: null,
      excerpt_en: null,
      body_th: null,
      body_en: null,
      cover_image: null,
      gallery: null,
      reading_time: null,
      author: null,
      tags: null,
      is_published: false,
      is_featured: false,
      display_order: 0,
      published_at: null,
      created_at: "",
      updated_at: "",
    };
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setMsg(null);
    const payload: Partial<ArticleRow> = { ...editing };
    if (!payload.id) delete payload.id;
    const { error } = await upsertArticle(payload);
    setSaving(false);
    if (error) {
      setMsg("Error: " + error);
    } else {
      setMsg("Saved.");
      await load();
      setEditing(null);
    }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-foreground-100">
            {editing.id ? "Edit Article" : "New Article"}
          </h2>
          <button
            onClick={() => setEditing(null)}
            className="text-xs font-light text-foreground-400 hover:text-foreground-100"
          >
            ← Back
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title (TH)">
            <input
              className={inputCls}
              value={editing.title_th}
              onChange={(e) => setEditing({ ...editing, title_th: e.target.value })}
            />
          </Field>
          <Field label="Title (EN)">
            <input
              className={inputCls}
              value={editing.title_en}
              onChange={(e) => setEditing({ ...editing, title_en: e.target.value })}
            />
          </Field>
          <Field label="Slug">
            <input
              className={inputCls}
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
            />
          </Field>
          <Field label="Category">
            <input
              className={inputCls}
              value={editing.category ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value || null })
              }
            />
          </Field>
          <Field label="Author">
            <input
              className={inputCls}
              value={editing.author ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, author: e.target.value || null })
              }
            />
          </Field>
          <Field label="Reading time (min)">
            <input
              type="number"
              className={inputCls}
              value={editing.reading_time ?? ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  reading_time: e.target.value ? Number(e.target.value) : null,
                })
              }
            />
          </Field>
          <Field label="Cover image URL">
            <input
              className={inputCls}
              value={editing.cover_image ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, cover_image: e.target.value || null })
              }
            />
          </Field>
          <Field label="Published at (YYYY-MM-DD)">
            <input
              className={inputCls}
              value={editing.published_at ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, published_at: e.target.value || null })
              }
            />
          </Field>
          <Field label="Excerpt (TH)">
            <textarea
              className={textareaCls}
              rows={2}
              value={editing.excerpt_th ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, excerpt_th: e.target.value || null })
              }
            />
          </Field>
          <Field label="Excerpt (EN)">
            <textarea
              className={textareaCls}
              rows={2}
              value={editing.excerpt_en ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, excerpt_en: e.target.value || null })
              }
            />
          </Field>
          <Field label="Body (TH)">
            <textarea
              className={textareaCls}
              rows={8}
              value={editing.body_th ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, body_th: e.target.value || null })
              }
            />
          </Field>
          <Field label="Body (EN)">
            <textarea
              className={textareaCls}
              rows={8}
              value={editing.body_en ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, body_en: e.target.value || null })
              }
            />
          </Field>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-light text-foreground-300">
            <input
              type="checkbox"
              checked={editing.is_published}
              onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
            />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm font-light text-foreground-300">
            <input
              type="checkbox"
              checked={editing.is_featured}
              onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
            />
            Featured
          </label>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="border border-accent-500/60 bg-accent-500/10 px-6 py-2 text-xs font-light tracking-widest text-accent-500 uppercase transition hover:bg-accent-500 hover:text-black disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => setEditing(null)}
            className="text-xs font-light text-foreground-400 hover:text-foreground-100"
          >
            Cancel
          </button>
          {msg && <p className="text-xs text-foreground-400">{msg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-light text-foreground-100">Articles</h2>
        <button
          onClick={() => setEditing(newDraft())}
          className="border border-white/[0.12] px-4 py-2 text-[10px] font-light tracking-widest text-foreground-300 uppercase hover:border-accent-500/50 hover:text-accent-500"
        >
          + New
        </button>
      </div>

      {fetchError && (
        <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-light text-red-400">
          ⚠ Fetch error: {fetchError}
        </div>
      )}

      <div className="divide-y divide-white/[0.06]">
        {!fetchError && rows.length === 0 && (
          <p className="py-4 text-sm font-light text-foreground-400">No articles found.</p>
        )}
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between gap-4 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-light text-foreground-100">{row.title_th}</p>
              <p className="mt-0.5 text-[11px] font-light text-foreground-400">
                {row.slug} · {row.category ?? "—"} ·{" "}
                <span className={row.is_published ? "text-green-400" : "text-yellow-400"}>
                  {row.is_published ? "published" : "draft"}
                </span>
              </p>
            </div>
            <button
              onClick={() => setEditing({ ...row })}
              className="shrink-0 border border-white/[0.1] px-3 py-1.5 text-[10px] font-light tracking-widest text-foreground-400 uppercase hover:border-accent-500/40 hover:text-accent-500"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reviews panel ─────────────────────────────────────────────────────────────

function ReviewsPanel() {
  const [rows, setRows] = useState<CustomerReviewRow[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [editing, setEditing] = useState<CustomerReviewRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    const { data, error } = await getCustomerReviewsAdmin();
    setRows(data);
    setFetchError(error);
  }

  useEffect(() => { load(); }, []);

  function newDraft(): CustomerReviewRow {
    return {
      id: "",
      client_name: "",
      client_type: null,
      location: null,
      logo_initials: null,
      logo_url: null,
      cover_image_url: null,
      project: "",
      scope: null,
      quote_th: null,
      quote_en: null,
      rating: null,
      is_featured: false,
      display_order: 0,
      is_published: false,
      created_at: "",
      updated_at: "",
    };
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setMsg(null);
    const payload: Partial<CustomerReviewRow> = { ...editing };
    if (!payload.id) delete payload.id;
    const { error } = await upsertReview(payload);
    setSaving(false);
    if (error) {
      setMsg("Error: " + error);
    } else {
      setMsg("Saved.");
      await load();
      setEditing(null);
    }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-foreground-100">
            {editing.id ? "Edit Review" : "New Review"}
          </h2>
          <button
            onClick={() => setEditing(null)}
            className="text-xs font-light text-foreground-400 hover:text-foreground-100"
          >
            ← Back
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Client name">
            <input
              className={inputCls}
              value={editing.client_name}
              onChange={(e) => setEditing({ ...editing, client_name: e.target.value })}
            />
          </Field>
          <Field label="Client type">
            <input
              className={inputCls}
              value={editing.client_type ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, client_type: e.target.value || null })
              }
            />
          </Field>
          <Field label="Location">
            <input
              className={inputCls}
              value={editing.location ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, location: e.target.value || null })
              }
            />
          </Field>
          <Field label="Project">
            <input
              className={inputCls}
              value={editing.project}
              onChange={(e) => setEditing({ ...editing, project: e.target.value })}
            />
          </Field>
          <Field label="Scope">
            <input
              className={inputCls}
              value={editing.scope ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, scope: e.target.value || null })
              }
            />
          </Field>
          <Field label="Rating (1–5)">
            <input
              type="number"
              min={1}
              max={5}
              className={inputCls}
              value={editing.rating ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, rating: e.target.value ? Number(e.target.value) : null })
              }
            />
          </Field>
          <Field label="Quote (TH)">
            <textarea
              className={textareaCls}
              rows={4}
              value={editing.quote_th ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, quote_th: e.target.value || null })
              }
            />
          </Field>
          <Field label="Quote (EN)">
            <textarea
              className={textareaCls}
              rows={4}
              value={editing.quote_en ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, quote_en: e.target.value || null })
              }
            />
          </Field>
          <Field label="Cover image URL">
            <input
              className={inputCls}
              value={editing.cover_image_url ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, cover_image_url: e.target.value || null })
              }
            />
          </Field>
          <Field label="Display order">
            <input
              type="number"
              className={inputCls}
              value={editing.display_order}
              onChange={(e) =>
                setEditing({ ...editing, display_order: Number(e.target.value) })
              }
            />
          </Field>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-light text-foreground-300">
            <input
              type="checkbox"
              checked={editing.is_published}
              onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
            />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm font-light text-foreground-300">
            <input
              type="checkbox"
              checked={editing.is_featured}
              onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
            />
            Featured
          </label>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="border border-accent-500/60 bg-accent-500/10 px-6 py-2 text-xs font-light tracking-widest text-accent-500 uppercase transition hover:bg-accent-500 hover:text-black disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => setEditing(null)}
            className="text-xs font-light text-foreground-400 hover:text-foreground-100"
          >
            Cancel
          </button>
          {msg && <p className="text-xs text-foreground-400">{msg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-light text-foreground-100">Customer Reviews</h2>
        <button
          onClick={() => setEditing(newDraft())}
          className="border border-white/[0.12] px-4 py-2 text-[10px] font-light tracking-widest text-foreground-300 uppercase hover:border-accent-500/50 hover:text-accent-500"
        >
          + New
        </button>
      </div>

      {fetchError && (
        <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-light text-red-400">
          ⚠ Fetch error: {fetchError}
        </div>
      )}

      <div className="divide-y divide-white/[0.06]">
        {!fetchError && rows.length === 0 && (
          <p className="py-4 text-sm font-light text-foreground-400">No reviews found.</p>
        )}
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between gap-4 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-light text-foreground-100">{row.client_name}</p>
              <p className="mt-0.5 text-[11px] font-light text-foreground-400">
                {row.project} · order {row.display_order} ·{" "}
                <span className={row.is_published ? "text-green-400" : "text-yellow-400"}>
                  {row.is_published ? "published" : "draft"}
                </span>
              </p>
            </div>
            <button
              onClick={() => setEditing({ ...row })}
              className="shrink-0 border border-white/[0.1] px-3 py-1.5 text-[10px] font-light tracking-widest text-foreground-400 uppercase hover:border-accent-500/40 hover:text-accent-500"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Portfolio panel ───────────────────────────────────────────────────────────

function PortfolioPanel() {
  const [rows, setRows] = useState<PortfolioRow[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [editing, setEditing] = useState<PortfolioRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    const { data, error } = await getPortfolioAdmin();
    setRows(data);
    setFetchError(error);
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    setMsg(null);
    const payload: Partial<PortfolioRow> = { ...editing };
    const { error } = await upsertPortfolioItem(payload);
    setSaving(false);
    if (error) {
      setMsg("Error: " + error);
    } else {
      setMsg("Saved.");
      await load();
      setEditing(null);
    }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-foreground-100">Edit Portfolio Item</h2>
          <button
            onClick={() => setEditing(null)}
            className="text-xs font-light text-foreground-400 hover:text-foreground-100"
          >
            ← Back
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title (TH)">
            <input
              className={inputCls}
              value={editing.title_th}
              onChange={(e) => setEditing({ ...editing, title_th: e.target.value })}
            />
          </Field>
          <Field label="Title (EN)">
            <input
              className={inputCls}
              value={editing.title_en}
              onChange={(e) => setEditing({ ...editing, title_en: e.target.value })}
            />
          </Field>
          <Field label="Slug">
            <input
              className={inputCls}
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
            />
          </Field>
          <Field label="Year">
            <input
              className={inputCls}
              value={editing.year}
              onChange={(e) => setEditing({ ...editing, year: e.target.value })}
            />
          </Field>
          <Field label="Location (TH)">
            <input
              className={inputCls}
              value={editing.location_th}
              onChange={(e) => setEditing({ ...editing, location_th: e.target.value })}
            />
          </Field>
          <Field label="Location (EN)">
            <input
              className={inputCls}
              value={editing.location_en}
              onChange={(e) => setEditing({ ...editing, location_en: e.target.value })}
            />
          </Field>
          <Field label="Project type">
            <input
              className={inputCls}
              value={editing.project_type}
              onChange={(e) => setEditing({ ...editing, project_type: e.target.value })}
            />
          </Field>
          <Field label="Status">
            <select
              className={inputCls}
              value={editing.status}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  status: e.target.value as PortfolioRow["status"],
                })
              }
            >
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="archived">archived</option>
            </select>
          </Field>
          <Field label="Description (TH)">
            <textarea
              className={textareaCls}
              rows={4}
              value={editing.description_th}
              onChange={(e) => setEditing({ ...editing, description_th: e.target.value })}
            />
          </Field>
          <Field label="Description (EN)">
            <textarea
              className={textareaCls}
              rows={4}
              value={editing.description_en}
              onChange={(e) => setEditing({ ...editing, description_en: e.target.value })}
            />
          </Field>
          <Field label="Cover image URL">
            <input
              className={inputCls}
              value={editing.cover_image}
              onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })}
            />
          </Field>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="border border-accent-500/60 bg-accent-500/10 px-6 py-2 text-xs font-light tracking-widest text-accent-500 uppercase transition hover:bg-accent-500 hover:text-black disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => setEditing(null)}
            className="text-xs font-light text-foreground-400 hover:text-foreground-100"
          >
            Cancel
          </button>
          {msg && <p className="text-xs text-foreground-400">{msg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-light text-foreground-100">Portfolio Items</h2>

      {fetchError && (
        <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-light text-red-400">
          ⚠ Fetch error: {fetchError}
        </div>
      )}

      <div className="divide-y divide-white/[0.06]">
        {!fetchError && rows.length === 0 && (
          <p className="py-4 text-sm font-light text-foreground-400">No items found.</p>
        )}
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between gap-4 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-light text-foreground-100">{row.title_th}</p>
              <p className="mt-0.5 text-[11px] font-light text-foreground-400">
                {row.slug} · {row.year} ·{" "}
                <span
                  className={
                    row.status === "published"
                      ? "text-green-400"
                      : row.status === "draft"
                        ? "text-yellow-400"
                        : "text-foreground-400"
                  }
                >
                  {row.status}
                </span>
              </p>
            </div>
            <button
              onClick={() => setEditing({ ...row })}
              className="shrink-0 border border-white/[0.1] px-3 py-1.5 text-[10px] font-light tracking-widest text-foreground-400 uppercase hover:border-accent-500/40 hover:text-accent-500"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

type Tab = "articles" | "portfolio" | "reviews";

export default function AdminDashboard({ email, initialTab }: { email: string; initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab ?? "articles");
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await signOut();
    } catch (_) {
      // sign out best-effort
    }
    // Hard redirect — avoids Next.js router race with onAuthStateChange
    window.location.replace("/login");
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "articles", label: "Articles" },
    { id: "portfolio", label: "Portfolio" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-[#090807] text-foreground-100">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <p className="text-[11px] font-light tracking-[0.25em] text-foreground-400 uppercase">
            HAGX
          </p>
          <span className="text-white/20">/</span>
          <p className="text-[11px] font-light tracking-widest text-foreground-300 uppercase">
            Dashboard
          </p>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden text-[11px] font-light text-foreground-400 sm:block">
            {email}
          </span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="border border-white/[0.12] px-4 py-2 text-[10px] font-light tracking-widest text-foreground-300 uppercase transition hover:border-red-500/40 hover:text-red-400 disabled:opacity-40"
          >
            {loggingOut ? "…" : "Logout"}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06] px-6 sm:px-10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3.5 text-xs font-light tracking-widest uppercase transition-colors ${
              tab === t.id
                ? "border-b-2 border-accent-500 text-accent-500"
                : "text-foreground-400 hover:text-foreground-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
        {tab === "articles" && <ArticlesPanel />}
        {tab === "portfolio" && <PortfolioPanel />}
        {tab === "reviews" && <ReviewsPanel />}
      </main>
    </div>
  );
}
