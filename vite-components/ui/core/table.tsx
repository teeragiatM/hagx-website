"use client";

import * as React from "react";

import { responsiveClass, type Responsive } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { TableAlign, TableJustify, TableSize, TableVariant } from "@/types/variant-types";
import {
  buildLayoutProps,
  ScrollArea,
  stripLayoutProps,
  type LayoutProps,
} from "@ui";

interface TableRootProps extends React.ComponentProps<"div"> {
  size?: Responsive<TableSize>;
  variant?: TableVariant;
}

interface TableCellOwnProps extends LayoutProps {
  justify?: Responsive<TableJustify>;
}

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> &
  TableCellOwnProps;
type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement> &
  TableCellOwnProps;

interface TableRowProps extends React.ComponentProps<"tr"> {
  align?: Responsive<TableAlign>;
}

const JUSTIFY_MAP: Record<TableJustify, string> = {
  start: "left",
  center: "center",
  end: "right",
};

const ALIGN_MAP: Record<TableAlign, string> = {
  start: "top",
  center: "middle",
  end: "bottom",
  baseline: "baseline",
};

function TableRoot({
  className,
  size = "1",
  variant = "ghost",
  children,
  ...props
}: TableRootProps) {
  const content =
    React.isValidElement(children) &&
    typeof children.type !== "string" &&
    "displayName" in children.type &&
    children.type.displayName === "UITable" ? (
      children
    ) : (
      <Table>{children}</Table>
    );

  return (
    <div
      data-slot="table-root"
      className={cn(
        "ui-TableRoot",
        responsiveClass("ui-r-size", size),
        `ui-variant-${variant}`,
        className
      )}
      {...props}
    >
      <ScrollArea type="auto">
        <div
          data-slot="table-inner"
          style={{ minWidth: "100%", display: "table" }}
        >
          {content}
        </div>
      </ScrollArea>
    </div>
  );
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="table"
      className={cn("ui-TableRootTable", className)}
      {...props}
    />
  );
}

Table.displayName = "UITable";

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("ui-TableHeader", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("ui-TableBody", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("ui-TableFooter", className)}
      {...props}
    />
  );
}

function TableRow({ className, align, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "ui-TableRow",
        align && responsiveClass("align", align, ALIGN_MAP),
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, justify, style, ...props }: TableCellProps) {
  const { className: layoutCls, style: layoutStyle } = buildLayoutProps(
    props as LayoutProps
  );
  const htmlProps = stripLayoutProps(props as TableCellProps & LayoutProps);

  return (
    <td
      data-slot="table-cell"
      className={cn(
        "ui-TableCell",
        justify && responsiveClass("text", justify, JUSTIFY_MAP),
        layoutCls,
        className
      )}
      style={{ ...layoutStyle, ...style }}
      {...htmlProps}
    />
  );
}

function TableColumnHeaderCell({
  className,
  justify,
  style,
  scope = "col",
  ...props
}: TableHeaderCellProps) {
  const { className: layoutCls, style: layoutStyle } = buildLayoutProps(
    props as LayoutProps
  );
  const htmlProps = stripLayoutProps(
    props as TableHeaderCellProps & LayoutProps
  );

  return (
    <th
      data-slot="table-column-header-cell"
      scope={scope}
      className={cn(
        "ui-TableCell ui-TableColumnHeaderCell",
        justify && responsiveClass("text", justify, JUSTIFY_MAP),
        layoutCls,
        className
      )}
      style={{ ...layoutStyle, ...style }}
      {...htmlProps}
    />
  );
}

function TableRowHeaderCell({
  className,
  justify,
  style,
  scope = "row",
  ...props
}: TableHeaderCellProps) {
  const { className: layoutCls, style: layoutStyle } = buildLayoutProps(
    props as LayoutProps
  );
  const htmlProps = stripLayoutProps(
    props as TableHeaderCellProps & LayoutProps
  );

  return (
    <th
      data-slot="table-row-header-cell"
      scope={scope}
      className={cn(
        "ui-TableCell ui-TableRowHeaderCell",
        justify && responsiveClass("text", justify, JUSTIFY_MAP),
        layoutCls,
        className
      )}
      style={{ ...layoutStyle, ...style }}
      {...htmlProps}
    />
  );
}

function TableHead(props: TableHeaderCellProps) {
  return <TableColumnHeaderCell {...props} />;
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

const TableNamespace = Object.assign(Table, {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Cell: TableCell,
  Head: TableHead,
  ColumnHeaderCell: TableColumnHeaderCell,
  RowHeaderCell: TableRowHeaderCell,
  Caption: TableCaption,
});

export {
  TableNamespace as Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeaderCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
  TableRowHeaderCell,
};
