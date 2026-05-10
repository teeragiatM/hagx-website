/**
 * DataTableFooter — composable footer with start/end slots.
 *
 * Built-in default slots:
 *   start = <DataTablePagination />
 *   end   = <DataTablePageSize /> + <DataTableRefresh />
 *
 * Override entire footer:
 *   <DataTableFooter override={<MyFooter />} />
 */

import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Text,
} from "@ui";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshCwIcon,
} from "lucide-react";
import type { DataTableFooterSlots } from "./types";

// ─── Built-in slot components (re-export for use in pages) ───────────────────

export function DataTablePagination<T>({ table }: { table: Table<T> }) {
  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="1"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronFirstIcon className="size-3.5" />
      </Button>
      <Button
        variant="outline"
        size="1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className="size-3.5" />
      </Button>

      <Text color="gray" size={"1"} className="flex items-center gap-1">
        <span>Page</span>
        <Input
          type="number"
          min={1}
          max={pageCount || 1}
          value={pageIndex + 1}
          onChange={(e) => {
            const p = Number(e.target.value) - 1;
            if (p >= 0 && p < pageCount) table.setPageIndex(p);
          }}
          className="px-1 w-12 text-center"
        />
        <span>/ {pageCount}</span>
      </Text>

      <Button
        variant="outline"
        size="1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon className="size-3.5" />
      </Button>
      <Button
        variant="outline"
        size="1"
        onClick={() => table.setPageIndex(pageCount - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronLastIcon className="size-3.5" />
      </Button>
    </div>
  );
}

export function DataTableRowCount<T>({ table }: { table: Table<T> }) {
  const total = table.getFilteredRowModel().rows.length;
  const selected = table.getFilteredSelectedRowModel().rows.length;
  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {selected > 0 ? `${selected} / ` : ""}
      {total} รายการ
    </span>
  );
}

export function DataTablePageSize<T>({
  table,
  options = [25, 50, 100],
}: {
  table: Table<T>;
  options?: number[];
}) {
  const pageSize = table.getState().pagination.pageSize;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="1" className="text-xs">
          {pageSize} rows
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((n) => (
          <DropdownMenuItem key={n} onClick={() => table.setPageSize(n)}>
            {n} rows
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DataTableRefresh({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <Button variant="outline" size="1" onClick={onRefresh}>
      <RefreshCwIcon className="size-3.5" />
    </Button>
  );
}

// ─── Footer shell ─────────────────────────────────────────────────────────────

export function DataTableFooter({
  start,
  end,
  override,
  className,
}: DataTableFooterSlots & { className?: string }) {
  if (override) return <>{override}</>;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2",
        "shrink-0 px-3 py-1.5",
        "border-border border-t",
        "text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">{start}</div>
      <div className="flex items-center gap-2">{end}</div>
    </div>
  );
}
