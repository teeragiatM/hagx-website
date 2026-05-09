import { cn } from "@/lib/utils";
import type { ThemeColor } from "@/types/variant-types";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

// ─── IconContainer ────────────────────────────────────────────────────────────
const ICON_PROPS = { size: 12, strokeWidth: 1.5 };

function IconContainer({
  children,
  accentColor,
}: {
  children: React.ReactNode;
  accentColor: ThemeColor;
}) {
  return (
    <div
      data-accent-color={accentColor}
      className="flex items-center justify-center self-start size-5 shrink-0 text-(--accent-11) border border-(--accent-a8) rounded-md bg-(--accent-a5)"
    >
      {children}
    </div>
  );
}
// ─── Toast classes ────────────────────────────────────────────────────────────
const TOAST_BASE = cn(
  "font-sans!",
  "group-data-[panel-background=translucent]/theme:backdrop-blur-(--blur-radius)",
  "bg-panel!",
  "rounded-md!",
  "p-4! items-start!",
  "border-(--gray-a5)!",
  "relative",
);

const TITLE_CLASS = "text-sm! ml-2 font-medium! leading-snug! text-foreground!";
const DESC_CLASS = "text-xs! ml-2 leading-snug! text-foreground!";
const ERROR_CLASS = "border";
const WARNING_CLASS = "border";
const INFO_CLASS = "border";

// ─── Toaster ──────────────────────────────────────────────────────────────────

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="group toaster"
      icons={{
        success: (
          <IconContainer accentColor="success">
            <CircleCheckIcon {...ICON_PROPS} />
          </IconContainer>
        ),
        info: (
          <IconContainer accentColor="info">
            <InfoIcon {...ICON_PROPS} />
          </IconContainer>
        ),
        warning: (
          <IconContainer accentColor="warning">
            <TriangleAlertIcon {...ICON_PROPS} />
          </IconContainer>
        ),
        error: (
          <IconContainer accentColor="destructive">
            <OctagonXIcon {...ICON_PROPS} />
          </IconContainer>
        ),
        loading: (
          <IconContainer accentColor="gray">
            <Loader2Icon {...ICON_PROPS} className="animate-spin" />
          </IconContainer>
        ),
      }}
      toastOptions={{
        classNames: {
          toast: TOAST_BASE,
          title: TITLE_CLASS,
          description: DESC_CLASS,
          error: ERROR_CLASS,
          warning: WARNING_CLASS,
          info: INFO_CLASS,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
