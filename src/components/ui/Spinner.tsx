import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-[1.5px]",
  md: "h-8 w-8 border-2",
  lg: "h-14 w-14 border-2",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-white/15 border-t-white/70",
        sizeMap[size],
        className,
      )}
    />
  );
}

export function SpinnerOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[320px] w-full items-center justify-center",
        className,
      )}
    >
      <Spinner size="lg" />
    </div>
  );
}
