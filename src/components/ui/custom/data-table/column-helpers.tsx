/**
 * Column helper factories — pre-built column templates.
 * Use these instead of writing raw ColumnDef every time.
 *
 * Quick reference:
 *   col.text("name",       "ชื่อ",     { width: 200 })
 *   col.number("amount",   "จำนวน",    { width: 120 })
 *   col.currency("salary", "เงินเดือน", { prefix: "฿ ", width: 130 })
 *   col.date("hire_date",  "วันที่",   { display: "date" })
 *   col.badge("status",    "สถานะ",    { map: { active: "ทำงาน" }, colorMap: { active: "bg-green-100 …" } })
 *   col.avatar("name",     "พนักงาน",  { secondaryKey: "email", width: 220 })
 *   col.action({ items: [{ label: "แก้ไข", onClick: (r) => openEdit(r) }] })
 *   col.select()           ← checkbox column (always first)
 *   col.custom(def)        ← escape hatch, pass raw ColumnDef
 *
 * To add a new template: create a file in cell-templates/, then add a factory here.
 */

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@ui";
import type {
  ActionCellConfig,
  ActionItem,
  AvatarCellConfig,
  BadgeCellConfig,
  CurrencyCellConfig,
  DateCellConfig,
} from "./cell-templates";
import {
  ActionCell,
  AvatarCell,
  BadgeCell,
  CurrencyCell,
  DateCell,
  TextCell,
} from "./cell-templates";

// ─── Shared option types ──────────────────────────────────────────────────────

type BaseOptions = {
  width?: number;
  align?: "left" | "right" | "center";
  frozen?: boolean;
};

type TextOptions = BaseOptions;
type NumberOptions = BaseOptions & { format?: Intl.NumberFormatOptions };
type DateOptions = BaseOptions & Pick<DateCellConfig, "display" | "locale">;
type BadgeOptions = BaseOptions & BadgeCellConfig;
type AvatarOptions = BaseOptions & AvatarCellConfig;
type CurrencyOptions = BaseOptions & CurrencyCellConfig;
type ActionOptions<TData> = BaseOptions & ActionCellConfig<TData>;

// ─── Singleton formatter for plain numbers ────────────────────────────────────

const defaultNumberFmt = new Intl.NumberFormat("th-TH");

// ─── Factories ────────────────────────────────────────────────────────────────

function text<TData>(
  accessorKey: keyof TData & string,
  header: string,
  options: TextOptions = {}
): ColumnDef<TData> {
  return {
    accessorKey,
    header,
    meta: {
      width: options.width,
      align: options.align ?? "left",
      type: "text",
      frozen: options.frozen,
    },
    cell: ({ getValue }) => <TextCell value={getValue()} rowData={undefined} />,
  };
}

function number<TData>(
  accessorKey: keyof TData & string,
  header: string,
  options: NumberOptions = {}
): ColumnDef<TData> {
  const formatter = options.format
    ? new Intl.NumberFormat("th-TH", options.format)
    : defaultNumberFmt;
  return {
    accessorKey,
    header,
    meta: {
      width: options.width ?? 120,
      align: options.align ?? "right",
      type: "number",
    },
    cell: ({ getValue }) => {
      const v = getValue();
      if (v == null) return <span className="text-muted-foreground/50">—</span>;
      return (
        <span className="tabular-nums">{formatter.format(Number(v))}</span>
      );
    },
  };
}

function currency<TData>(
  accessorKey: keyof TData & string,
  header: string,
  options: CurrencyOptions = {}
): ColumnDef<TData> {
  const { width, align, frozen, ...cellConfig } = options;
  return {
    accessorKey,
    header,
    meta: {
      width: width ?? 130,
      align: align ?? "right",
      type: "number",
      frozen,
    },
    cell: ({ getValue }) => (
      <CurrencyCell
        value={getValue()}
        rowData={undefined}
        config={cellConfig}
      />
    ),
  };
}

function date<TData>(
  accessorKey: keyof TData & string,
  header: string,
  options: DateOptions = {}
): ColumnDef<TData> {
  const { width, align, frozen, ...cellConfig } = options;
  return {
    accessorKey,
    header,
    meta: { width: width ?? 120, align: align ?? "left", type: "date", frozen },
    cell: ({ getValue }) => (
      <DateCell value={getValue()} rowData={undefined} config={cellConfig} />
    ),
  };
}

function badge<TData>(
  accessorKey: keyof TData & string,
  header: string,
  options: BadgeOptions = {}
): ColumnDef<TData> {
  const { width, align, frozen, map, colorMap } = options;
  return {
    accessorKey,
    header,
    meta: {
      width: width ?? 100,
      align: align ?? "left",
      type: "badge",
      frozen,
    },
    cell: ({ getValue }) => (
      <BadgeCell
        value={getValue()}
        rowData={undefined}
        config={{ map, colorMap }}
      />
    ),
  };
}

function avatar<TData>(
  accessorKey: keyof TData & string,
  header: string,
  options: AvatarOptions = {}
): ColumnDef<TData> {
  const { width, align, frozen, secondaryKey, avatarKey, size } = options;
  return {
    accessorKey,
    header,
    meta: { width: width ?? 220, align: align ?? "left", type: "text", frozen },
    cell: ({ getValue, row }) => (
      <AvatarCell
        value={getValue()}
        rowData={row.original as Record<string, unknown>}
        config={{ secondaryKey, avatarKey, size }}
      />
    ),
  };
}

function action<TData>(options: ActionOptions<TData>): ColumnDef<TData> {
  const { width, align, frozen, items, triggerLabel } = options;
  return {
    id: "__actions__",
    header: "",
    meta: { width: width ?? 52, align: align ?? "center", frozen },
    cell: ({ row }) => (
      <ActionCell<TData>
        value={null}
        rowData={row.original}
        config={{ items: items as ActionItem<TData>[], triggerLabel }}
      />
    ),
    enableSorting: false,
    enableResizing: false,
  };
}

function select<TData>(): ColumnDef<TData> {
  return {
    id: "__select__",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="เลือกทั้งหมด"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="เลือกแถวนี้"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    meta: { width: 68, align: "center" },
    enableSorting: false,
    enableResizing: false,
  };
}

function custom<TData>(def: ColumnDef<TData>): ColumnDef<TData> {
  return def;
}

// ─── Export as namespace ─────────────────────────────────────────────────────

export const col = {
  text,
  number,
  currency,
  date,
  badge,
  avatar,
  action,
  select,
  custom,
};
