/**
 * BulkEditDialog — Edit a shared field across multiple selected rows.
 *
 * Usage:
 *   <BulkEditDialog
 *     open={bulkEditOpen}
 *     onClose={() => setBulkEditOpen(false)}
 *     selectedRows={selectedEmployees}
 *     getRowId={(r) => r.id}
 *     getRowLabel={(r) => r.name}
 *     fields={EMPLOYEE_BULK_FIELDS}
 *     onSave={(ids, patch) => bulkUpdate.mutate({ ids, patch })}
 *     isSaving={bulkUpdate.isPending}
 *   />
 */

import { cn } from "@/lib/utils";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BulkEditField = {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

type BulkEditDialogProps<T> = {
  open: boolean;
  onClose: () => void;
  selectedRows: T[];
  getRowId: (row: T) => string;
  getRowLabel: (row: T) => string;
  fields: BulkEditField[];
  onSave: (ids: string[], patch: Record<string, unknown>) => void;
  isSaving?: boolean;
};

// ─── Field input ──────────────────────────────────────────────────────────────

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: BulkEditField;
  value: string;
  onChange: (v: string) => void;
}) {
  if (field.type === "select" && field.options) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-8 text-sm">
          <SelectValue
            placeholder={field.placeholder ?? `เลือก${field.label}`}
          />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return (
    <Input
      type={
        field.type === "number"
          ? "number"
          : field.type === "date"
            ? "date"
            : "text"
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder ?? `กรอก${field.label}`}
      className="h-8 text-sm"
    />
  );
}

// ─── Field selector dropdown ──────────────────────────────────────────────────

function FieldSelector({
  fields,
  selected,
  onToggle,
}: {
  fields: BulkEditField[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const label =
    selected.length === 0
      ? "เลือกฟิลด์ที่ต้องการแก้ไข..."
      : `${selected.length} ฟิลด์ที่เลือก`;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "border-input flex h-8 w-full items-center justify-between rounded-md border px-3",
          "bg-background hover:bg-accent/20 text-left text-sm transition-colors",
          selected.length === 0 && "text-muted-foreground"
        )}
      >
        <span className="truncate">{label}</span>
        <ChevronDownIcon
          className={cn(
            "size-3.5 shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 py-1 mt-1 max-h-52 overflow-y-auto border border-border rounded-md bg-panel-solid shadow-lg">
          {fields.map((f) => {
            const checked = selected.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onToggle(f.id)}
                className="flex items-center gap-2 px-3 py-1.5 w-full text-left text-sm transition-colors hover:bg-accent/30"
              >
                <span
                  className={cn(
                    "flex size-3.5 shrink-0 items-center justify-center rounded border transition-colors",
                    checked
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border"
                  )}
                >
                  {checked && <CheckIcon className="size-2.5" />}
                </span>
                {f.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Dialog ───────────────────────────────────────────────────────────────────

export function BulkEditDialog<T>({
  open,
  onClose,
  selectedRows,
  getRowId,
  getRowLabel,
  fields,
  onSave,
  isSaving = false,
}: BulkEditDialogProps<T>) {
  // Local copy of IDs — user can remove items from this batch
  const [batchIds, setBatchIds] = useState<string[]>(() =>
    selectedRows.map(getRowId)
  );

  // Reset batchIds when dialog opens with fresh rows
  const [prevRows, setPrevRows] = useState(selectedRows);
  if (selectedRows !== prevRows) {
    setPrevRows(selectedRows);
    setBatchIds(selectedRows.map(getRowId));
  }

  // Which fields are selected for editing
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  // Values keyed by field.id
  const [values, setValues] = useState<Record<string, string>>({});

  const toggleField = (id: string) => {
    setSelectedFields((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const removeFromBatch = (id: string) =>
    setBatchIds((prev) => prev.filter((i) => i !== id));

  const handleSave = () => {
    if (batchIds.length === 0 || selectedFields.length === 0) return;
    const patch: Record<string, unknown> = {};
    for (const fid of selectedFields) {
      if (values[fid] !== undefined && values[fid] !== "") {
        patch[fid] = values[fid];
      }
    }
    if (Object.keys(patch).length === 0) return;
    onSave(batchIds, patch);
  };

  const canSave =
    batchIds.length > 0 &&
    selectedFields.length > 0 &&
    selectedFields.some((fid) => values[fid]);

  const rowMap = new Map(selectedRows.map((r) => [getRowId(r), r]));

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลพร้อมกัน</DialogTitle>
        </DialogHeader>

        <div className="py-1 space-y-5">
          {/* ── Step 1: Selected items ──────────────────────────── */}
          <div>
            <Label className="block mb-2 text-muted-foreground text-xs">
              รายการที่จะแก้ไข ({batchIds.length} รายการ)
            </Label>
            <div className="flex flex-wrap gap-1.5 p-2.5 min-h-10 max-h-28 overflow-y-auto border border-border rounded-md bg-muted/30">
              {batchIds.length === 0 && (
                <p className="text-muted-foreground text-xs italic">
                  ไม่มีรายการ
                </p>
              )}
              {batchIds.map((id) => {
                const row = rowMap.get(id);
                const label = row ? getRowLabel(row) : id;
                return (
                  <Badge
                    key={id}
                    variant="soft"
                    className="flex items-center gap-1 py-0.5 pl-2 pr-1 text-xs font-normal"
                  >
                    <span className="max-w-28 truncate">{label}</span>
                    <button
                      type="button"
                      title="เอาออกจากชุดนี้"
                      onClick={() => removeFromBatch(id)}
                      className="p-0.5 ml-0.5 text-muted-foreground rounded-full transition-colors hover:text-destructive hover:bg-destructive/20"
                    >
                      <XIcon className="size-2.5" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* ── Step 2: Field selector ──────────────────────────── */}
          <div>
            <Label className="block mb-2 text-muted-foreground text-xs">
              เลือกฟิลด์ที่ต้องการแก้ไข
            </Label>
            <FieldSelector
              fields={fields}
              selected={selectedFields}
              onToggle={toggleField}
            />
          </div>

          {/* ── Step 3: Dynamic inputs ──────────────────────────── */}
          {selectedFields.length > 0 && (
            <div className="p-3 space-y-3 border border-border rounded-md bg-muted/20">
              <p className="text-muted-foreground text-xs font-medium">
                ค่าใหม่ที่จะใส่ให้ทุกรายการที่เลือก
              </p>
              {selectedFields.map((fid) => {
                const field = fields.find((f) => f.id === fid);
                if (!field) return null;
                return (
                  <div key={fid} className="space-y-1">
                    <Label className="text-xs">{field.label}</Label>
                    <FieldInput
                      field={field}
                      value={values[fid] ?? ""}
                      onChange={(v) =>
                        setValues((prev) => ({ ...prev, [fid]: v }))
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            ยกเลิก
          </Button>
          <Button onClick={handleSave} disabled={!canSave || isSaving}>
            {isSaving ? "กำลังบันทึก..." : `บันทึก (${batchIds.length} รายการ)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
