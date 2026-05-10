/**
 * Built-in toolbar slot components — drop into DataTableToolbar start/end slots.
 * All components that persist state read tableKey from DataTableContext.
 */

import { useDataTableKey } from "./context";
import { cn } from "@/lib/utils";
import { useTableSettings } from "@/stores/tableSettingsStore";
import type { Table } from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  Input,
  Text,
} from "@ui";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  RefreshCwIcon,
  UploadIcon,
} from "lucide-react";

// ─── Pagination ───────────────────────────────────────────────────────────────

export function DataTablePagination<T>({
  table,
  totalCount,
}: {
  table: Table<T>;
  totalCount?: number;
}) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();
  // pageCount = -1 when total is unknown (count RPC not deployed)
  const knownPageCount = pageCount > 0;

  const start = pageIndex * pageSize + 1;
  const end =
    totalCount != null
      ? Math.min((pageIndex + 1) * pageSize, totalCount)
      : (pageIndex + 1) * pageSize;

  return (
    <Flex align={"center"} gap={"2"}>
      {totalCount != null && (
        <Text color="gray" size="1" className="tabular-nums">
          {start}–{end} of {totalCount}
        </Text>
      )}
      <Flex align={"center"} gap={"2"}>
        <Button
          variant="outline"
          iconOnly
          size="1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronFirstIcon className="size-3" />
        </Button>
        <Button
          variant="outline"
          size="1"
          iconOnly
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="size-3" />
        </Button>

        <Flex align={"center"} gap={"2"} color="gray">
          <Text color="gray" size="1">
            หน้า
          </Text>
          <Input
            size={"1"}
            type="number"
            min={1}
            max={knownPageCount ? pageCount : undefined}
            value={pageIndex + 1}
            onChange={(e) => {
              const p = Number(e.target.value) - 1;
              if (p >= 0 && (!knownPageCount || p < pageCount))
                table.setPageIndex(p);
            }}
          />
          <Text color="gray" size="1" wrap="nowrap">
            / {knownPageCount ? pageCount : "..."}
          </Text>
        </Flex>

        <Button
          variant="outline"
          size="1"
          iconOnly
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="size-3" />
        </Button>
        <Button
          variant="outline"
          size="1"
          iconOnly
          onClick={() => knownPageCount && table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage() || !knownPageCount}
        >
          <ChevronLastIcon className="size-3" />
        </Button>
      </Flex>
    </Flex>
  );
}

// ─── Row count ────────────────────────────────────────────────────────────────

export function DataTableRowCount<T>({
  table,
  totalCount,
}: {
  table: Table<T>;
  totalCount?: number;
}) {
  const selected = table.getFilteredSelectedRowModel().rows.length;
  // When manualPagination=true, getFilteredRowModel() only has current-page rows.
  // Use totalCount from server when available.
  const total = totalCount ?? table.getFilteredRowModel().rows.length;
  return (
    <Text color="gray" size={"1"} className="tabular-nums">
      {selected > 0 ? `${selected} / ` : ""}
      {total > 0 ? `${total} รายการ` : "ไม่มีข้อมูล"}
    </Text>
  );
}

// ─── Page size ────────────────────────────────────────────────────────────────

export function DataTablePageSize<T>({
  table,
  options = [25, 50, 100],
}: {
  table: Table<T>;
  options?: number[];
}) {
  const { setPageSize: storeSetPageSize } = useTableSettings(useDataTableKey());
  const pageSize = table.getState().pagination.pageSize;

  const handleSelect = (n: number) => {
    table.setPageSize(n);
    storeSetPageSize(n);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="1">
          {pageSize} rows
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((n) => (
          <DropdownMenuItem
            key={n}
            onClick={() => handleSelect(n)}
            className={cn(pageSize === n && "text-accent font-medium")}
          >
            {n} rows {pageSize === n && "✓"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Refresh ──────────────────────────────────────────────────────────────────

export function DataTableRefresh({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <Button variant="outline" size="1" iconOnly onClick={onRefresh}>
      <RefreshCwIcon className="size-3" />
    </Button>
  );
}

// ─── Import — DropdownMenu ────────────────────────────────────────────────────

type ImportOption = {
  icon?: React.ReactNode;
  label: string;
  description: string;
  onSelect: () => void;
};

const DEFAULT_IMPORT_OPTIONS: ImportOption[] = [
  {
    icon: <FileSpreadsheetIcon className="size-4 shrink-0 text-green-600" />,
    label: "Excel (.xlsx)",
    description: "นำเข้าข้อมูลจำนวนมากผ่านไฟล์ Excel มาตรฐาน",
    onSelect: () => {},
  },
  {
    icon: <FileTextIcon className="size-4 shrink-0 text-blue-500" />,
    label: "CSV File",
    description: "รองรับการนำเข้าข้อมูลจากระบบอื่นผ่านไฟล์ CSV",
    onSelect: () => {},
  },
];

export function DataTableImport({
  options = DEFAULT_IMPORT_OPTIONS,
}: {
  options?: ImportOption[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="1">
          <UploadIcon className="size-3" />
          นำเข้า
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-1.5 w-72">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.label}
            onClick={opt.onSelect}
            className="flex items-start gap-3 px-3 py-2.5 rounded-md cursor-pointer"
          >
            <div className="mt-0.5 shrink-0">{opt.icon}</div>
            <div className="min-w-0">
              <Text as="p" size={"2"} className="mb-1 font-medium">
                {opt.label}
              </Text>
              <Text color="gray" size={"1"}>
                {opt.description}
              </Text>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
