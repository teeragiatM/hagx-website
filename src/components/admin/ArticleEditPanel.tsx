"use client";

import { useAuth } from "@/context/AuthContext";
import { upsertArticle, type ArticleRow } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, X, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditableFields = Pick<
  ArticleRow,
  | "title_th"
  | "title_en"
  | "category"
  | "excerpt_th"
  | "excerpt_en"
  | "body_th"
  | "body_en"
  | "reading_time"
  | "is_published"
  | "is_featured"
>;

type Props = {
  article: ArticleRow;
};

const inputCls =
  "w-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-light text-foreground-100 outline-none transition-colors focus:border-accent-500/60 placeholder:text-foreground-400";

const textareaCls = inputCls + " resize-y min-h-[80px]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] font-light tracking-widest text-foreground-400 uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ArticleEditPanel({ article }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [fields, setFields] = useState<EditableFields>({
    title_th: article.title_th,
    title_en: article.title_en,
    category: article.category ?? "",
    excerpt_th: article.excerpt_th ?? "",
    excerpt_en: article.excerpt_en ?? "",
    body_th: article.body_th ?? "",
    body_en: article.body_en ?? "",
    reading_time: article.reading_time ?? null,
    is_published: article.is_published,
    is_featured: article.is_featured,
  });

  if (!user) return null;

  function set<K extends keyof EditableFields>(key: K, value: EditableFields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const { error } = await upsertArticle({ id: article.id, ...fields });
    setSaving(false);
    if (error) {
      setMsg({ type: "err", text: error });
    } else {
      setMsg({ type: "ok", text: "บันทึกแล้ว" });
      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-24 right-6 z-[200] flex items-center gap-2 border border-accent-500/60 bg-black/80 px-4 py-2.5 text-[10px] font-light tracking-widest text-accent-500 uppercase backdrop-blur-sm transition-colors hover:bg-accent-500 hover:text-white"
      >
        <Pencil className="h-3 w-3" strokeWidth={1.5} />
        แก้ไขบทความ
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-[310] flex h-full w-full max-w-md flex-col border-l border-white/[0.08] bg-[#0c0a08]"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-6 py-4">
                <p className="text-xs font-light tracking-widest text-foreground-300 uppercase">
                  แก้ไขบทความ
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="text-foreground-400 transition-colors hover:text-foreground-100"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="ชื่อ (TH)">
                      <input className={inputCls} value={fields.title_th} onChange={(e) => set("title_th", e.target.value)} />
                    </Field>
                    <Field label="ชื่อ (EN)">
                      <input className={inputCls} value={fields.title_en} onChange={(e) => set("title_en", e.target.value)} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="หมวดหมู่">
                      <select
                        className={inputCls + " cursor-pointer appearance-none"}
                        value={fields.category ?? ""}
                        onChange={(e) => set("category", e.target.value)}
                      >
                        <option value="TECHNICAL">Technical</option>
                        <option value="CASE STUDY">Case Study</option>
                        <option value="DESIGN">Design</option>
                        <option value="MAINTENANCE">Maintenance</option>
                      </select>
                    </Field>
                    <Field label="เวลาอ่าน (นาที)">
                      <input
                        type="number"
                        className={inputCls}
                        value={fields.reading_time ?? ""}
                        onChange={(e) => set("reading_time", e.target.value ? Number(e.target.value) : null)}
                      />
                    </Field>
                  </div>

                  <Field label="บทนำ (TH)">
                    <textarea className={textareaCls} value={fields.excerpt_th ?? ""} onChange={(e) => set("excerpt_th", e.target.value)} />
                  </Field>

                  <Field label="บทนำ (EN)">
                    <textarea className={textareaCls} value={fields.excerpt_en ?? ""} onChange={(e) => set("excerpt_en", e.target.value)} />
                  </Field>

                  <Field label="เนื้อหา (TH)">
                    <textarea className={textareaCls + " min-h-[160px]"} value={fields.body_th ?? ""} onChange={(e) => set("body_th", e.target.value)} />
                  </Field>

                  <Field label="เนื้อหา (EN)">
                    <textarea className={textareaCls + " min-h-[160px]"} value={fields.body_en ?? ""} onChange={(e) => set("body_en", e.target.value)} />
                  </Field>

                  <div className="flex gap-6">
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-light text-foreground-300">
                      <input
                        type="checkbox"
                        checked={fields.is_published}
                        onChange={(e) => set("is_published", e.target.checked)}
                        className="accent-accent-500"
                      />
                      เผยแพร่
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-light text-foreground-300">
                      <input
                        type="checkbox"
                        checked={fields.is_featured}
                        onChange={(e) => set("is_featured", e.target.checked)}
                        className="accent-accent-500"
                      />
                      แนะนำ (Featured)
                    </label>
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-t border-white/[0.08] px-6 py-4">
                {msg && (
                  <p className={`mb-3 text-[11px] font-light ${msg.type === "ok" ? "text-green-400" : "text-red-400"}`}>
                    {msg.text}
                  </p>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 bg-accent-500 py-3 text-xs font-light tracking-widest text-white uppercase transition-colors hover:bg-accent-600 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <Save className="h-3.5 w-3.5" strokeWidth={1.5} />
                  )}
                  {saving ? "กำลังบันทึก…" : "บันทึก"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
