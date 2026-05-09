/**
 * BulkActionBar — floating action bar that appears when rows are selected.
 * Place inside a `relative` container (the table wrapper).
 *
 * Actions:
 *   - Edit: opens BulkEditDialog (handled by parent via onBulkEdit)
 *   - Delete: calls onDelete
 *   - Deselect: resets row selection
 */

import type { Table } from "@tanstack/react-table";
import { Button } from "@ui";
import { AnimatePresence, motion } from "framer-motion";
import { PencilIcon, Trash2Icon, XIcon } from "lucide-react";

type BulkActionBarProps<T> = {
  table: Table<T>;
  onBulkEdit?: (rows: T[]) => void;
  onDelete?: (rows: T[]) => void;
};

export function BulkActionBar<T>({
  table,
  onBulkEdit,
  onDelete,
}: BulkActionBarProps<T>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const count = selectedRows.length;
  const data = selectedRows.map((r) => r.original);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="bulk-bar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex absolute bottom-12 inset-x-0 z-30 items-center gap-1.5 px-4 py-2 mx-auto w-fit border border-border rounded-xl bg-panel-solid shadow-xl shadow-black/10"
        >
          {/* Count */}
          <span className="mr-1 text-foreground text-sm font-semibold whitespace-nowrap">
            เลือกอยู่ {count} รายการ
          </span>

          <div className="mx-1 w-px h-5 bg-border" />

          {/* Edit */}
          {onBulkEdit && (
            <Button
              variant="ghost"
              size="1"
              className="gap-1.5 text-xs"
              onClick={() => onBulkEdit(data)}
            >
              <PencilIcon className="size-3" />
              แก้ไขข้อมูล
            </Button>
          )}

          {/* Delete */}
          {onDelete && (
            <Button
              variant="ghost"
              size="1"
              className="gap-1.5 text-destructive text-xs hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(data)}
            >
              <Trash2Icon className="size-3" />
              ลบที่เลือก
            </Button>
          )}

          <div className="mx-1 w-px h-5 bg-border" />

          {/* Deselect */}
          <Button
            variant="ghost"
            size="1"
            className="size-7"
            title="ยกเลิกการเลือก"
            onClick={() => table.resetRowSelection()}
          >
            <XIcon className="size-3.5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
