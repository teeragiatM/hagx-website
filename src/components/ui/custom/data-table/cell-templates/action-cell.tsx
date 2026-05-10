import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui";
import { MoreHorizontalIcon } from "lucide-react";
import type { BaseCellProps } from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionItem<TData> = {
  label: string;
  icon?: React.ReactNode;
  /** Marks the item red and places it in a separate group at the bottom. */
  destructive?: boolean;
  /** Called when the user selects this item. Receives the full row data. */
  onClick: (rowData: TData) => void;
  /** Return true to disable this item for a specific row. */
  disabled?: (rowData: TData) => boolean;
  /** Render a separator above this item (ignored for destructive items). */
  separator?: boolean;
};

export type ActionCellConfig<TData> = {
  /**
   * Array of action items, or a function that returns items based on the row.
   * Use the function form for dynamic items (e.g. hide "Activate" when already active).
   */
  items: ActionItem<TData>[] | ((rowData: TData) => ActionItem<TData>[]);
  /** Tooltip for the trigger button. Default: "Actions" */
  triggerLabel?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ActionCell<TData>({
  rowData,
  config,
}: BaseCellProps<TData, ActionCellConfig<TData>>) {
  const allItems =
    typeof config?.items === "function"
      ? config.items(rowData)
      : (config?.items ?? []);

  const normalItems = allItems.filter((i) => !i.destructive);
  const destructiveItems = allItems.filter((i) => i.destructive);

  if (allItems.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="1"
          iconOnly
          className="size-6 opacity-0 data-[state=open]:opacity-100 group-hover/row:opacity-100"
          aria-label={config?.triggerLabel ?? "Actions"}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontalIcon className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-40">
        {normalItems.map((item, i) => (
          <>
            {item.separator && i > 0 && (
              <DropdownMenuSeparator key={`sep-${i}`} />
            )}
            <DropdownMenuItem
              key={item.label}
              disabled={item.disabled?.(rowData)}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick(rowData);
              }}
            >
              {item.icon && (
                <span className="flex items-center justify-center mr-2 size-4">
                  {item.icon}
                </span>
              )}
              {item.label}
            </DropdownMenuItem>
          </>
        ))}

        {destructiveItems.length > 0 && normalItems.length > 0 && (
          <DropdownMenuSeparator />
        )}

        {destructiveItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            disabled={item.disabled?.(rowData)}
            className="text-destructive focus:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              item.onClick(rowData);
            }}
          >
            {item.icon && (
              <span className="flex items-center justify-center mr-2 size-4">
                {item.icon}
              </span>
            )}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
