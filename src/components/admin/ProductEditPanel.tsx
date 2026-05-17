"use client";

import { useAuth } from "@/context/AuthContext";
import { upsertProduct, type ProductRow } from "@/lib/supabase";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, X, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditableFields = {
  name_th: string;
  name_en: string;
  tagline_th: string;
  tagline_en: string;
  description_th: string;
  description_en: string;
  price_from: string;
  price_unit_th: string;
  price_unit_en: string;
  price_note_th: string;
  in_stock: boolean;
  is_featured: boolean;
  is_published: boolean;
};

type Props = { product: ProductRow };

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

export default function ProductEditPanel({ product }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [fields, setFields] = useState<EditableFields>({
    name_th: product.name_th,
    name_en: product.name_en,
    tagline_th: product.tagline_th ?? "",
    tagline_en: product.tagline_en ?? "",
    description_th: product.description_th ?? "",
    description_en: product.description_en ?? "",
    price_from: product.price_from?.toString() ?? "",
    price_unit_th: product.price_unit_th ?? "",
    price_unit_en: product.price_unit_en ?? "",
    price_note_th: product.price_note_th ?? "",
    in_stock: product.in_stock,
    is_featured: product.is_featured,
    is_published: product.is_published,
  });

  if (!user) return null;

  function set<K extends keyof EditableFields>(key: K, value: EditableFields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const { error } = await upsertProduct({
      id: product.id,
      name_th: fields.name_th,
      name_en: fields.name_en,
      tagline_th: fields.tagline_th || null,
      tagline_en: fields.tagline_en || null,
      description_th: fields.description_th || null,
      description_en: fields.description_en || null,
      price_from: fields.price_from ? Number(fields.price_from) : null,
      price_unit_th: fields.price_unit_th || null,
      price_unit_en: fields.price_unit_en || null,
      price_note_th: fields.price_note_th || null,
      in_stock: fields.in_stock,
      is_featured: fields.is_featured,
      is_published: fields.is_published,
    });
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
        แก้ไขสินค้า
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
                  แก้ไขสินค้า
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
                      <input className={inputCls} value={fields.name_th} onChange={(e) => set("name_th", e.target.value)} />
                    </Field>
                    <Field label="ชื่อ (EN)">
                      <input className={inputCls} value={fields.name_en} onChange={(e) => set("name_en", e.target.value)} />
                    </Field>
                  </div>

                  <Field label="Tagline (TH)">
                    <input className={inputCls} value={fields.tagline_th} onChange={(e) => set("tagline_th", e.target.value)} />
                  </Field>

                  <Field label="Tagline (EN)">
                    <input className={inputCls} value={fields.tagline_en} onChange={(e) => set("tagline_en", e.target.value)} />
                  </Field>

                  <Field label="รายละเอียด (TH)">
                    <textarea className={textareaCls} value={fields.description_th} onChange={(e) => set("description_th", e.target.value)} />
                  </Field>

                  <Field label="รายละเอียด (EN)">
                    <textarea className={textareaCls} value={fields.description_en} onChange={(e) => set("description_en", e.target.value)} />
                  </Field>

                  <div className="grid grid-cols-3 gap-3">
                    <Field label="ราคาเริ่มต้น">
                      <input type="number" className={inputCls} value={fields.price_from} onChange={(e) => set("price_from", e.target.value)} />
                    </Field>
                    <Field label="หน่วย (TH)">
                      <input className={inputCls} value={fields.price_unit_th} onChange={(e) => set("price_unit_th", e.target.value)} />
                    </Field>
                    <Field label="หน่วย (EN)">
                      <input className={inputCls} value={fields.price_unit_en} onChange={(e) => set("price_unit_en", e.target.value)} />
                    </Field>
                  </div>

                  <Field label="หมายเหตุราคา">
                    <input className={inputCls} value={fields.price_note_th} onChange={(e) => set("price_note_th", e.target.value)} />
                  </Field>

                  <div className="flex gap-6">
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-light text-foreground-300">
                      <input type="checkbox" checked={fields.in_stock} onChange={(e) => set("in_stock", e.target.checked)} className="accent-accent-500" />
                      พร้อมส่ง
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-light text-foreground-300">
                      <input type="checkbox" checked={fields.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="accent-accent-500" />
                      Featured
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-xs font-light text-foreground-300">
                      <input type="checkbox" checked={fields.is_published} onChange={(e) => set("is_published", e.target.checked)} className="accent-accent-500" />
                      เผยแพร่
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
