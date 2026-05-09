import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@ui";
import type { BaseCellProps } from "./types";

export type AvatarCellConfig = {
  /**
   * Key in rowData whose value is shown as a secondary (muted) line beneath the name.
   * @example secondaryKey: "email"
   */
  secondaryKey?: string;
  /**
   * Key in rowData whose value is used as the avatar image URL.
   * Falls back to initials when absent or when the image fails to load.
   * @example avatarKey: "avatar_url"
   */
  avatarKey?: string;
  /** Avatar size. Default: "2". */
  size?: "1" | "2" | "3" | "4" | "5";
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AvatarCell<TData extends Record<string, unknown>>({
  value,
  rowData,
  config,
  className,
}: BaseCellProps<TData, AvatarCellConfig>) {
  const name = String(value ?? "");
  const secondary = config?.secondaryKey
    ? String(rowData[config.secondaryKey] ?? "")
    : "";
  const avatarUrl = config?.avatarKey
    ? String(rowData[config.avatarKey] ?? "")
    : "";
  const size = config?.size ?? "2";

  return (
    <div className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <Avatar size={size} className="shrink-0">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
        <AvatarFallback>{initials(name) || "?"}</AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        {name ? (
          <p className="text-sm font-medium leading-none truncate">{name}</p>
        ) : (
          <span className="text-muted-foreground/50">—</span>
        )}
        {secondary && (
          <p className="mt-0.5 text-muted-foreground text-xs truncate">
            {secondary}
          </p>
        )}
      </div>
    </div>
  );
}
