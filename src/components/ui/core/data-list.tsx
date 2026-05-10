import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  DataListAlign,
  DataListOrientation,
  DataListSize,
  DataListTrim,
  Responsive,
  ThemeColor,
} from "@/types/variant-types";

// ─── Root ─────────────────────────────────────────────────────────────────────

interface DataListRootProps extends React.ComponentProps<"dl"> {
  size?: Responsive<DataListSize>;
  orientation?: Responsive<DataListOrientation>;
  trim?: Responsive<DataListTrim>;
}

function DataListRoot({
  className,
  size = "2",
  orientation = "horizontal",
  trim,
  ...props
}: DataListRootProps) {
  return (
    <dl
      data-slot="data-list"
      className={cn(
        "ui-reset ui-Text ui-DataListRoot",
        responsiveClass("ui-r-size", size),
        responsiveClass("ui-r-orientation", orientation),
        trim && responsiveClass("ui-r-trim", trim),
        className,
      )}
      {...props}
    />
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

interface DataListItemProps extends React.ComponentProps<"div"> {
  align?: Responsive<DataListAlign>;
}

function DataListItem({ className, align, ...props }: DataListItemProps) {
  return (
    <div
      data-slot="data-list-item"
      className={cn(
        "ui-DataListItem",
        align && responsiveClass("ui-r-ai", align),
        className,
      )}
      {...props}
    />
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────

interface DataListLabelProps extends React.ComponentProps<"dt"> {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  color?: ThemeColor;
  highContrast?: boolean;
}

function DataListLabel({
  className,
  style,
  width,
  minWidth,
  maxWidth,
  color,
  highContrast = false,
  ...props
}: DataListLabelProps) {
  const cssVars: React.CSSProperties = {
    ...(width !== undefined && ({ "--width": width } as React.CSSProperties)),
    ...(minWidth !== undefined &&
      ({ "--min-width": minWidth } as React.CSSProperties)),
    ...(maxWidth !== undefined &&
      ({ "--max-width": maxWidth } as React.CSSProperties)),
    ...style,
  };

  return (
    <dt
      data-slot="data-list-label"
      data-accent-color={color}
      className={cn(
        "ui-DataListLabel",
        width !== undefined && "ui-r-w",
        minWidth !== undefined && "ui-r-min-w",
        maxWidth !== undefined && "ui-r-max-w",
        highContrast && "ui-high-contrast",
        className,
      )}
      style={cssVars}
      {...props}
    />
  );
}

// ─── Value ────────────────────────────────────────────────────────────────────

function DataListValue({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="data-list-value"
      className={cn("ui-DataListValue", className)}
      {...props}
    />
  );
}

export { DataListItem, DataListLabel, DataListRoot, DataListValue };
export type {
  DataListAlign,
  DataListItemProps,
  DataListLabelProps,
  DataListOrientation,
  DataListRootProps,
  DataListSize,
  DataListTrim,
};
