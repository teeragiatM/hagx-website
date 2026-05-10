/**
 * DataTableExport — unified export button (DropdownMenu).
 *
 * When rows are selected (N > 0):
 *   Each format shows a section header + two scope items:
 *     "เฉพาะที่เลือก  N รายการ"
 *     "ทั้งหมด (ตาม Filter)  M รายการ"
 *
 * When no rows selected:
 *   Each format shows a single direct action: "ส่งออกทั้งหมด  M รายการ"
 */

import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui";
import {
  DownloadIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PrinterIcon,
} from "lucide-react";

export type ExportScope = "selected" | "all";
type ExportHandler<T> = (rows: T[], scope: ExportScope) => void;

type DataTableExportProps<T> = {
  table: Table<T>;
  onExportExcel?: ExportHandler<T>;
  onExportCsv?: ExportHandler<T>;
  onPrint?: ExportHandler<T>;
};

// ─── Format section ────────────────────────────────────────────────────────────

function ExportSection<T>({
  icon,
  label,
  selectedRows,
  allRows,
  hasSelection,
  handler,
  isLast,
}: {
  icon: React.ReactNode;
  label: string;
  selectedRows: T[];
  allRows: T[];
  hasSelection: boolean;
  handler?: ExportHandler<T>;
  isLast: boolean;
}) {
  if (!handler) return null;

  if (!hasSelection) {
    return (
      <>
        <DropdownMenuItem
          onClick={() => handler(allRows, "all")}
          className="flex items-center gap-2.5 px-3 py-2"
        >
          <span className="shrink-0">{icon}</span>
          <span className="flex-1 text-sm font-medium">{label}</span>
          <span className="text-muted-foreground text-xs tabular-nums">
            {allRows.length} รายการ
          </span>
        </DropdownMenuItem>
        {!isLast && <DropdownMenuSeparator />}
      </>
    );
  }

  return (
    <>
      <DropdownMenuLabel className="flex items-center gap-2 px-3 pt-2 pb-1 text-xs font-medium">
        <span className="shrink-0">{icon}</span>
        {label}
      </DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => handler(selectedRows, "selected")}
        className="py-1.5 pl-8 pr-3 text-primary text-xs font-medium"
      >
        <span className="flex-1">เฉพาะที่เลือก</span>
        <span className="text-muted-foreground tabular-nums">
          {selectedRows.length} รายการ
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => handler(allRows, "all")}
        className="py-1.5 pl-8 pr-3 text-xs"
      >
        <span className="flex-1">ทั้งหมด (ตาม Filter)</span>
        <span className="text-muted-foreground tabular-nums">
          {allRows.length} รายการ
        </span>
      </DropdownMenuItem>
      {!isLast && <DropdownMenuSeparator />}
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function DataTableExport<T>({
  table,
  onExportExcel,
  onExportCsv,
  onPrint,
}: DataTableExportProps<T>) {
  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((r) => r.original);
  const allRows = table.getFilteredRowModel().rows.map((r) => r.original);
  const selectedCount = selectedRows.length;
  const hasSelection = selectedCount > 0;

  const sections = [
    {
      handler: onExportExcel,
      icon: <FileSpreadsheetIcon className="size-3.5 text-green-600" />,
      label: "Excel (.xlsx)",
    },
    {
      handler: onExportCsv,
      icon: <FileTextIcon className="size-3.5 text-blue-500" />,
      label: "CSV",
    },
    {
      handler: onPrint,
      icon: <PrinterIcon className="size-3.5 text-muted-foreground" />,
      label: "Print / PDF",
    },
  ].filter((s) => !!s.handler);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="1"
          className={cn(
            "gap-1.5 text-xs",
            hasSelection && "border-accent/60 text-accent"
          )}
        >
          <DownloadIcon className="size-3" />
          ส่งออก
          {hasSelection && (
            <span className="ml-0.5 text-[10px] text-muted-foreground">
              ({selectedCount})
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {sections.map((s, i) => (
          <ExportSection
            key={s.label}
            icon={s.icon}
            label={s.label}
            selectedRows={selectedRows}
            allRows={allRows}
            hasSelection={hasSelection}
            handler={s.handler}
            isLast={i === sections.length - 1}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
