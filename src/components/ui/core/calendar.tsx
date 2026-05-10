import * as React from "react";
import {
  DayPicker,
  type ClassNames,
  type CustomComponents,
  type DayButton,
  type Locale,
} from "react-day-picker";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type {
  Responsive,
  ThemeColor,
  ThemeRadius,
} from "@/types/variant-types";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  variant?: "solid" | "surface";
  size?: Responsive<"1" | "2">;
  color?: ThemeColor;
  radius?: Responsive<ThemeRadius>;
  highContrast?: boolean;
};

type CalendarClassNamesOptions = Pick<
  CalendarProps,
  "captionLayout" | "showWeekNumber" | "variant"
> & {
  classNames?: CalendarProps["classNames"];
};

function getCalendarClassNames({
  captionLayout,
  showWeekNumber,
  classNames,
}: CalendarClassNamesOptions): Partial<ClassNames> {
  return {
    root: "ui-CalendarRoot",
    months: "ui-CalendarMonths",
    month: "ui-CalendarMonth",
    nav: "ui-CalendarNav",
    button_previous:
      "ui-BaseButton ui-IconButton ui-CalendarNavButton ui-variant-ghost",
    button_next:
      "ui-BaseButton ui-IconButton ui-CalendarNavButton ui-variant-ghost",
    month_caption: "ui-CalendarMonthCaption",
    dropdowns: "ui-CalendarDropdowns",
    dropdown_root: "ui-CalendarDropdownRoot",
    dropdown: "ui-CalendarDropdown",
    caption_label: cn(
      "ui-CalendarCaptionLabel",
      captionLayout === "label"
        ? "ui-CalendarCaptionLabelPlain"
        : "ui-CalendarCaptionLabelDropdown"
    ),
    month_grid: "ui-CalendarTable",
    weekdays: "ui-CalendarWeekdays",
    weekday: "ui-reset ui-Text ui-r-size-1 ui-CalendarWeekday",
    week: "ui-CalendarWeek",
    week_number_header: "ui-CalendarWeekNumberHeader",
    week_number: "ui-reset ui-Text ui-r-size-1 ui-CalendarWeekNumber",
    day: cn(
      "ui-CalendarDay group/day",
      showWeekNumber
        ? "ui-CalendarDayWithWeekNumber"
        : "ui-CalendarDayWithoutWeekNumber"
    ),
    range_start: "ui-CalendarRangeStart",
    range_middle: "ui-CalendarRangeMiddle",
    range_end: "ui-CalendarRangeEnd",
    today: "ui-CalendarToday",
    outside: "ui-CalendarOutside",
    disabled: "ui-CalendarDisabled",
    hidden: "ui-CalendarHidden",
    ...classNames,
  };
}

function getCalendarComponents(
  locale: Partial<Locale> | undefined,
  components: CalendarProps["components"],
  color?: ThemeColor
): Partial<CustomComponents> {
  return {
    Root: ({ className, rootRef, ...props }) => (
      <div
        data-slot="calendar"
        data-accent-color={color}
        ref={rootRef}
        className={cn(className)}
        {...props}
      />
    ),
    Chevron: ({ className, orientation, ...props }) => {
      if (orientation === "left")
        return (
          <ChevronLeftIcon className={cn("size-4", className)} {...props} />
        );
      if (orientation === "right")
        return (
          <ChevronRightIcon className={cn("size-4", className)} {...props} />
        );
      return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
    },
    DayButton: (props) => <CalendarDayButton locale={locale} {...props} />,
    WeekNumber: ({ children, ...props }) => (
      <td {...props}>
        <div className="ui-CalendarWeekNumberCell">{children}</div>
      </td>
    ),
    ...components,
  };
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  variant = "solid",
  size = "1",
  color,
  radius,
  highContrast,
  locale,
  formatters,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "ui-Calendar group/calendar",
        `ui-variant-${variant}`,
        responsiveClass("ui-r-size", size),
        responsiveClass("ui-r-radius", radius),
        highContrast && "ui-high-contrast",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      data-radius={typeof radius === "string" ? radius : undefined}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={getCalendarClassNames({
        captionLayout,
        showWeekNumber: props.showWeekNumber,
        variant,
        classNames,
      })}
      components={getCalendarComponents(locale, components, color)}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "ui-CalendarDayButton",
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50",
        "group-data-[focused=true]/day:relative",
        "group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
