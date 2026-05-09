import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { Responsive, ThemeRadius } from "@/types/variant-types";
import {
  InputRoot,
  InputSlot,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui";
import { ClockIcon } from "lucide-react";

type TimePickerProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  hourPlaceholder?: string;
  minutePlaceholder?: string;
  hourLabel?: string;
  minuteLabel?: string;
  minuteStep?: number;
  disabled?: boolean;
  className?: string;
  variant?: "solid" | "surface";
  size?: Responsive<"1" | "2">;
  highContrast?: boolean;
  radius?: Responsive<ThemeRadius>;
};

const HOURS = Array.from({ length: 24 }, (_, index) =>
  String(index).padStart(2, "0")
);

function buildMinuteOptions(step: number) {
  const safeStep = Math.max(1, Math.min(step, 30));
  const values: string[] = [];

  for (let minute = 0; minute < 60; minute += safeStep) {
    values.push(String(minute).padStart(2, "0"));
  }

  return values;
}

function parseTime(value: string | undefined) {
  if (!value) return { hour: "", minute: "" };

  const [hour = "", minute = ""] = value.split(":");
  return { hour, minute };
}

function TimePicker({
  value,
  onValueChange,
  hourPlaceholder = "HH",
  minutePlaceholder = "MM",
  hourLabel = "ชั่วโมง",
  minuteLabel = "นาที",
  minuteStep = 5,
  disabled,
  className,
  variant = "solid",
  size = "1",
  highContrast,
  radius,
}: TimePickerProps) {
  const minuteOptions = React.useMemo(
    () => buildMinuteOptions(minuteStep),
    [minuteStep]
  );
  const { hour, minute } = parseTime(value);

  const emitChange = React.useCallback(
    (nextHour: string, nextMinute: string) => {
      if (!nextHour || !nextMinute) return;
      onValueChange?.(`${nextHour}:${nextMinute}`);
    },
    [onValueChange]
  );

  const handleHourChange = React.useCallback(
    (nextHour: string) => {
      emitChange(nextHour, minute || minuteOptions[0] || "00");
    },
    [emitChange, minute, minuteOptions]
  );

  const handleMinuteChange = React.useCallback(
    (nextMinute: string) => {
      emitChange(hour || HOURS[0], nextMinute);
    },
    [emitChange, hour]
  );

  const displayValue = value || `${hourPlaceholder}:${minutePlaceholder}`;

  return (
    <InputRoot
      data-slot="time-picker"
      data-variant={variant}
      data-radius={typeof radius === "string" ? radius : undefined}
      className={cn(
        "w-full",
        `ui-variant-${variant}`,
        responsiveClass("ui-r-size", size),
        responsiveClass("ui-r-radius", radius),
        highContrast && "ui-high-contrast",
        className
      )}
    >
      <InputSlot align="inline-start">
        <ClockIcon className="size-4" />
      </InputSlot>

      <div
        className={cn(
          "flex min-w-0 flex-1 items-center px-0 text-sm tabular-nums",
          value ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {displayValue}
      </div>

      <InputSlot align="inline-end" className="gap-1">
        <Select
          value={hour}
          onValueChange={handleHourChange}
          disabled={disabled}
        >
          <SelectTrigger
            size="1"
            variant="ghost"
            className="min-w-14"
            aria-label={hourLabel}
          >
            <SelectValue placeholder={hourPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {HOURS.map((hourOption) => (
              <SelectItem key={hourOption} value={hourOption}>
                {hourOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-(--gray-10)">:</span>

        <Select
          value={minute}
          onValueChange={handleMinuteChange}
          disabled={disabled}
        >
          <SelectTrigger
            size="1"
            variant="ghost"
            className="min-w-14"
            aria-label={minuteLabel}
          >
            <SelectValue placeholder={minutePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {minuteOptions.map((minuteOption) => (
              <SelectItem key={minuteOption} value={minuteOption}>
                {minuteOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputSlot>
    </InputRoot>
  );
}

export { TimePicker };
export type { TimePickerProps };
