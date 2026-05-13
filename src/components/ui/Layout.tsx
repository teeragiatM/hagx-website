import { cn } from "@/lib/utils";
import * as React from "react";

type AsProp<E extends React.ElementType> = { as?: E };

type LayoutOwnProps<E extends React.ElementType> = AsProp<E> & {
  className?: string;
  children?: React.ReactNode;
};

type LayoutProps<E extends React.ElementType> = LayoutOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof LayoutOwnProps<E>>;

export function Layout<E extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: LayoutProps<E>) {
  const Component = (as ?? "div") as React.ElementType;
  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}
