/**
 * DataTableDensity — row height switcher (Default / Comfortable / Compact).
 * Reads and writes to the per-table Zustand store via DataTableContext.
 */

import { useDataTableKey } from "../context";
import { cn } from "@/lib/utils";
import type { TableDensity } from "@/stores/tableSettingsStore";
import { useTableSettings } from "@/stores/tableSettingsStore";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui";
import { AlignJustifyIcon } from "lucide-react";

const OPTIONS: { value: TableDensity; label: string; desc: string }[] = [
  { value: "default", label: "Default", desc: "ระยะห่างปกติ อ่านง่าย" },
  { value: "comfortable", label: "Comfortable", desc: "ระยะห่างมาก สบายตา" },
  { value: "compact", label: "Compact", desc: "แถวชิด เห็นข้อมูลมากขึ้น" },
];

export function DataTableDensity() {
  const { density, setDensity } = useTableSettings(useDataTableKey());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="1"
          className={cn(
            "gap-1.5 text-xs",
            density !== "default" && "border-accent/60 text-accent"
          )}
          title="ความแน่นของแถว"
        >
          <AlignJustifyIcon className="size-3" />
          {density === "default"
            ? "Default"
            : density === "comfortable"
              ? "Comfy"
              : "Compact"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onSelect={() => setDensity(opt.value)}
            className="flex flex-col items-start gap-0.5 py-2"
          >
            <span
              className={cn(
                "text-xs font-medium",
                density === opt.value && "text-accent"
              )}
            >
              {opt.label} {density === opt.value && "✓"}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {opt.desc}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
