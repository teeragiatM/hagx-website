"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type PageSectionRootProps<T extends ElementType> = {
  as?: T;
  reverse?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const PageSectionRoot = forwardRef<HTMLElement, PageSectionRootProps<ElementType>>(
  ({ as, reverse, className, children, ...props }, ref) => {
    const Tag = (as ?? "section") as ElementType;
    return (
      <Tag
        ref={ref}
        className={cn(
          "pt-0 pb-0 sm:pt-12 sm:pb-24 lg:pt-24 lg:pb-32 mx-auto",
          reverse && "flex sm:flex-col flex-col-reverse",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
PageSectionRoot.displayName = "PageSection";

type PageSectionInnerProps = {
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

function PageSectionInner({ className, children, ...props }: PageSectionInnerProps) {
  return (
    <div className={cn("px-(--homepage-padding-inset)", className)} {...props}>
      {children}
    </div>
  );
}

export const PageSection = Object.assign(PageSectionRoot, { Inner: PageSectionInner });
