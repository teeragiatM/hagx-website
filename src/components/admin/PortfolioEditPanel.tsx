"use client";

import { useAuth } from "@/context/AuthContext";
import { upsertPortfolioItem, type PortfolioRow } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, X, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditableFields = Pick<
  PortfolioRow,
  | "title_th"
  | "title_en"
  | "description_th"
  | "description_en"
  | "location_th"
  | "location_en"
  | "year"
  | "scope"
  | "category"
  | "status"
>;

type Props = {
  item: PortfolioRow;
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

export default function PortfolioEditPanel({ item }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [fields, setFields] = useState<EditableFields>({
    title_th: item.title_th,
    title_en: item.title_en,
    description_th: item.description_th,
    description_en: item.description_en,
    location_th: item.location_th,
    location_en: item.location_en,
    year: item.year,
    scope: item.scope ?? "",
    category: item.category ?? "installation",
    status: item.status,
  });

  if (!user) return null;

  function set(key: keyof EditableFields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const { error } = await upsertPortfolioItem({ id: item.id, ...fields });
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
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-24 right-6 z-[200] flex items-center gap-2 border border-accent-500/60 bg-black/80 px-4 py-2.5 text-[10px] font-light tracking-widest text-accent-500 uppercase backdrop-blur-sm transition-colors hover:bg-accent-500 hover:text-white"
      >
        <Pencil className="h-3 w-3" strokeWidth={1.5} />
        แก้ไข
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-[310] flex h-full w-full max-w-md flex-col border-l border-white/[0.08] bg-[#0c0a08]"
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-6 py-4">
                <p className="text-xs font-light tracking-widest text-foreground-300 uppercase">
                  แก้ไขผลงาน
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="text-foreground-400 transition-colors hover:text-foreground-100"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Form */}
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

                  <Field label="รายละเอียด (TH)">
                    <textarea className={textareaCls} value={fields.description_th} onChange={(e) => set("description_th", e.target.value)} />
                  </Field>

                  <Field label="รายละเอียด (EN)">
                    <textarea className={textareaCls} value={fields.description_en} onChange={(e) => set("description_en", e.target.value)} />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="สถานที่ (TH)">
                      <input className={inputCls} value={fields.location_th} onChange={(e) => set("location_th", e.target.value)} />
                    </Field>
                    <Field label="สถานที่ (EN)">
                      <input className={inputCls} value={fields.location_en} onChange={(e) => set("location_en", e.target.value)} />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="ปี">
                      <input className={inputCls} value={fields.year} onChange={(e) => set("year", e.target.value)} />
                    </Field>
                    <Field label="ประเภทงาน">
                      <select
                        className={inputCls + " cursor-pointer appearance-none"}
                        value={fields.category}
                        onChange={(e) => set("category", e.target.value)}
                      >
                        <option value="installation">Installation</option>
                        <option value="supply">Supply & Sales</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Scope of Work">
                    <textarea className={textareaCls} value={fields.scope as string ?? ""} onChange={(e) => set("scope", e.target.value)} />
                  </Field>

                  <Field label="สถานะ">
                    <select
                      className={inputCls + " cursor-pointer appearance-none"}
                      value={fields.status}
                      onChange={(e) => set("status", e.target.value as PortfolioRow["status"])}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* Footer */}
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
