/**
 * NotifyBadge — shows an unread count badge or dot for a module / route path.
 *
 * Usage:
 *   <NotifyBadge moduleKey="staff" />          // module-level count
 *   <NotifyBadge path="/staff/employees" />     // path-level dot
 *   <NotifyBadge moduleKey="staff" variant="dot" />  // always dot
 */

import { cn } from "@/lib/utils";
import { useNotifications } from "@/stores/notificationStore";

type NotifyBadgeProps = {
  moduleKey?: string;
  path?: string;
  variant?: "count" | "dot" | "auto";
  compact?: boolean;
  className?: string;
};

export function NotifyBadge({
  moduleKey,
  path,
  variant = "count",
  compact = false,
  className,
}: NotifyBadgeProps) {
  const moduleBadge = useNotifications((s) => s.moduleBadge);
  const pathBadge = useNotifications((s) => s.pathBadge);

  const count = moduleKey != null ? moduleBadge(moduleKey) : pathBadge(path!);

  if (count === 0) return null;

  const resolvedVariant =
    variant === "auto" ? (compact && count > 9 ? "dot" : "count") : variant;

  if (resolvedVariant === "dot") {
    return (
      <span
        data-accent-color="destructive"
        className={cn(
          "size-1.5 shrink-0 rounded-full bg-(--accent-8)",
          className,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold shrink-0",
        compact
          ? count > 9
            ? "min-w-3.5 h-3.5 px-0.5 text-[8px]"
            : "size-3.5 text-[8px]"
          : count > 9
            ? "min-w-4 h-4 px-1 text-[9px]"
            : "size-4 text-[9px]",
        className,
      )}
    >
      {compact ? (count > 9 ? "9+" : count) : count > 99 ? "99+" : count}
    </span>
  );
}
