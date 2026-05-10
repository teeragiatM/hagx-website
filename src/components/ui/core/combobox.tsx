"use client";

import * as React from "react";

import { responsiveClass } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import type { Responsive } from "@/types/variant-types";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import { Chip, ChipRemove } from "./chips";
import { InputField, InputRoot, InputSlot } from "./input";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { Text } from "./typography";

type ComboboxItemData = {
  value: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
};

type ComboboxProps<T = any> = {
  items: T[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  itemToValue?: (item: T) => string;
  itemToStringLabel?: (item: T) => string;
  itemToKeywords?: (item: T) => string[];
  multiple?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  children: React.ReactNode;
};

type ComboboxContextValue<T = any> = {
  items: T[];
  filteredItems: T[];
  selectedValue: string;
  selectedValues: string[];
  selectedItem?: T;
  selectedItems: T[];
  query: string;
  open: boolean;
  multiple: boolean;
  disabled: boolean;
  invalid?: boolean;
  listId: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  rootRef: React.RefObject<HTMLDivElement | null>;
  listRef: React.RefObject<HTMLDivElement | null>;
  highlightedValue: string;
  setHighlightedValue: (value: string) => void;
  highlightNext: () => void;
  highlightPrev: () => void;
  highlightFirst: () => void;
  highlightLast: () => void;
  selectHighlighted: () => void;
  setQuery: (value: string) => void;
  setOpen: (open: boolean) => void;
  selectValue: (value: string) => void;
  removeValue: (value: string) => void;
  clearValue: () => void;
  moveCaretToEnd: () => void;
  itemToValue: (item: T) => string;
  itemToStringLabel: (item: T) => string;
  itemToKeywords: (item: T) => string[];
};

type ComboboxGroupContextValue = {
  items?: any[];
};

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);
const ComboboxGroupContext =
  React.createContext<ComboboxGroupContextValue | null>(null);

function useComboboxContext() {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error("Combobox components must be used within <Combobox>.");
  }
  return context;
}

function normalizeQuery<T>(
  items: T[],
  query: string,
  itemToStringLabel: (item: T) => string,
  itemToValue: (item: T) => string,
  itemToKeywords: (item: T) => string[]
) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return items;

  return items.filter((item) => {
    const haystacks = [
      itemToStringLabel(item),
      itemToValue(item),
      ...itemToKeywords(item),
    ];
    return haystacks.some((entry) =>
      entry.toLowerCase().includes(normalizedQuery)
    );
  });
}

function Combobox<T = any>({
  items,
  value,
  defaultValue,
  onValueChange,
  itemToValue = (item: any) => (typeof item === "string" ? item : item.value),
  itemToStringLabel = (item: any) =>
    typeof item === "string" ? item : item.label,
  itemToKeywords = (item: any) =>
    typeof item === "string" ? [] : (item.keywords ?? []),
  multiple = false,
  disabled = false,
  invalid,
  children,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [highlightedValue, setHighlightedValue] = React.useState("");
  const listId = React.useId();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    defaultValue ?? (multiple ? [] : "")
  );
  const selectedValues = React.useMemo(() => {
    const rawValue = isControlled
      ? (value ?? (multiple ? [] : ""))
      : internalValue;
    return Array.isArray(rawValue) ? rawValue : rawValue ? [rawValue] : [];
  }, [isControlled, value, multiple, internalValue]);
  const selectedValue = multiple ? "" : (selectedValues[0] ?? "");

  const selectedItem = React.useMemo(
    () => items.find((item) => itemToValue(item) === selectedValue),
    [items, selectedValue, itemToValue]
  );
  const selectedItems = React.useMemo(
    () => items.filter((item) => selectedValues.includes(itemToValue(item))),
    [items, selectedValues, itemToValue]
  );

  const filteredItems = React.useMemo(
    () =>
      normalizeQuery(
        items,
        query,
        itemToStringLabel,
        itemToValue,
        itemToKeywords
      ),
    [items, query, itemToStringLabel, itemToValue, itemToKeywords]
  );

  const commitValue = React.useCallback(
    (nextValue: string | string[]) => {
      if (!isControlled) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange]
  );

  const moveCaretToEnd = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) return;

    const position = input.value.length;
    requestAnimationFrame(() => {
      input.setSelectionRange(position, position);
    });
  }, []);

  const selectValue = React.useCallback(
    (nextValue: string) => {
      if (multiple) {
        if (selectedValues.includes(nextValue)) {
          commitValue(selectedValues.filter((value) => value !== nextValue));
        } else {
          commitValue([...selectedValues, nextValue]);
        }
      } else {
        commitValue(nextValue);
      }
      setQuery("");
      if (!multiple) {
        setOpen(false);
        inputRef.current?.blur();
      } else {
        inputRef.current?.focus();
      }
    },
    [commitValue, multiple, selectedValues]
  );

  const removeValue = React.useCallback(
    (nextValue: string) => {
      if (multiple) {
        commitValue(selectedValues.filter((value) => value !== nextValue));
      } else if (selectedValue === nextValue) {
        commitValue("");
      }
      inputRef.current?.focus();
    },
    [commitValue, multiple, selectedValue, selectedValues]
  );

  const clearValue = React.useCallback(() => {
    if (disabled) return;
    commitValue(multiple ? [] : "");
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }, [commitValue, disabled, multiple]);

  React.useEffect(() => {
    setHighlightedValue("");
  }, [filteredItems]);

  React.useEffect(() => {
    if (!open) setHighlightedValue("");
  }, [open]);

  const scrollHighlightedIntoView = React.useCallback((value: string) => {
    requestAnimationFrame(() => {
      listRef.current
        ?.querySelector(`[data-value="${CSS.escape(value)}"]`)
        ?.scrollIntoView({ block: "nearest" });
    });
  }, []);

  const highlightNext = React.useCallback(() => {
    if (filteredItems.length === 0) return;
    const idx = filteredItems.findIndex(
      (item) => itemToValue(item) === highlightedValue
    );
    const next = itemToValue(filteredItems[(idx + 1) % filteredItems.length]);
    setHighlightedValue(next);
    scrollHighlightedIntoView(next);
  }, [filteredItems, highlightedValue, itemToValue, scrollHighlightedIntoView]);

  const highlightPrev = React.useCallback(() => {
    if (filteredItems.length === 0) return;
    const idx = filteredItems.findIndex(
      (item) => itemToValue(item) === highlightedValue
    );
    const prev = itemToValue(
      filteredItems[idx <= 0 ? filteredItems.length - 1 : idx - 1]
    );
    setHighlightedValue(prev);
    scrollHighlightedIntoView(prev);
  }, [filteredItems, highlightedValue, itemToValue, scrollHighlightedIntoView]);

  const highlightFirst = React.useCallback(() => {
    if (filteredItems.length === 0) return;
    const first = itemToValue(filteredItems[0]);
    setHighlightedValue(first);
    scrollHighlightedIntoView(first);
  }, [filteredItems, itemToValue, scrollHighlightedIntoView]);

  const highlightLast = React.useCallback(() => {
    if (filteredItems.length === 0) return;
    const last = itemToValue(filteredItems[filteredItems.length - 1]);
    setHighlightedValue(last);
    scrollHighlightedIntoView(last);
  }, [filteredItems, itemToValue, scrollHighlightedIntoView]);

  const selectHighlighted = React.useCallback(() => {
    if (highlightedValue) selectValue(highlightedValue);
  }, [highlightedValue, selectValue]);

  const contextValue = React.useMemo(
    () => ({
      items,
      filteredItems,
      selectedValue,
      selectedValues,
      selectedItem,
      selectedItems,
      query,
      open,
      multiple,
      disabled,
      invalid,
      listId,
      inputRef,
      rootRef,
      listRef,
      highlightedValue,
      setHighlightedValue,
      highlightNext,
      highlightPrev,
      highlightFirst,
      highlightLast,
      selectHighlighted,
      setQuery,
      setOpen,
      selectValue,
      removeValue,
      clearValue,
      moveCaretToEnd,
      itemToValue,
      itemToStringLabel,
      itemToKeywords,
    }),
    [
      items,
      filteredItems,
      selectedValue,
      selectedValues,
      selectedItem,
      selectedItems,
      query,
      open,
      multiple,
      disabled,
      invalid,
      listId,
      highlightedValue,
      highlightNext,
      highlightPrev,
      highlightFirst,
      highlightLast,
      selectHighlighted,
      removeValue,
      selectValue,
      clearValue,
      moveCaretToEnd,
      itemToValue,
      itemToStringLabel,
      itemToKeywords,
    ]
  );

  return (
    <ComboboxContext.Provider value={contextValue}>
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  );
}

type ComboboxInputProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  showClear?: boolean;
  showTrigger?: boolean;
  children?: React.ReactNode;
};

function ComboboxInput({
  id,
  name,
  placeholder = "Select an option",
  className,
  showClear = false,
  showTrigger = true,
  children,
}: ComboboxInputProps) {
  const {
    selectedValue,
    selectedValues,
    selectedItem,
    multiple,
    query,
    open,
    disabled,
    invalid,
    listId,
    inputRef,
    rootRef,
    setQuery,
    setOpen,
    selectValue,
    removeValue,
    clearValue,
    moveCaretToEnd,
    itemToStringLabel,
    highlightNext,
    highlightPrev,
    highlightFirst,
    highlightLast,
    selectHighlighted,
    highlightedValue,
  } = useComboboxContext();

  const selectedLabel = selectedItem ? itemToStringLabel(selectedItem) : "";
  const inputValue = query.length > 0 ? query : multiple ? "" : selectedLabel;
  const isPlaceholder = !selectedValue && !multiple && query.length === 0;
  const hasValue = Boolean(
    inputValue || (multiple && selectedValues.length > 0)
  );

  return (
    <PopoverAnchor asChild>
      <InputRoot
        ref={rootRef}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        data-has-value={hasValue || undefined}
        disabled={disabled}
        invalid={invalid}
        className={cn("w-auto", className)}
        onMouseDown={(event) => {
          if (disabled) return;
          const target = event.target as HTMLElement;
          if (target.closest("button")) return;
          event.preventDefault();
          if (!open) setOpen(true);
          inputRef.current?.focus();
          moveCaretToEnd();
        }}
      >
        <InputField
          ref={inputRef}
          id={id}
          name={name}
          data-slot="input"
          data-disabled={disabled || undefined}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={open ? listId : undefined}
          autoComplete="off"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="none"
          value={inputValue}
          placeholder={selectedItem ? undefined : placeholder}
          disabled={disabled}
          onFocus={() => {
            if (!disabled) {
              if (!open) setOpen(true);
              if (query.length === 0) moveCaretToEnd();
            }
          }}
          onChange={(event) => {
            const nextValue = event.target.value;

            if (nextValue === "" && !selectedValue && !multiple) {
              setQuery("");
              setOpen(false);
              return;
            }

            setQuery(nextValue);
            if (!open) setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              if (!open) setOpen(true);
              highlightNext();
              return;
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              if (!open) setOpen(true);
              highlightPrev();
              return;
            }
            if (event.key === "Enter" && highlightedValue) {
              event.preventDefault();
              selectHighlighted();
              return;
            }
            if (event.key === "Home" && open) {
              event.preventDefault();
              highlightFirst();
              return;
            }
            if (event.key === "End" && open) {
              event.preventDefault();
              highlightLast();
              return;
            }
            if (event.key === "Tab" && open) {
              setOpen(false);
              setQuery("");
              return;
            }
            if (event.key === "Escape") {
              setOpen(false);
              setQuery("");
              inputRef.current?.blur();
              return;
            }
            if (
              multiple &&
              query === "" &&
              selectedValues.length > 0 &&
              event.key === "Backspace"
            ) {
              event.preventDefault();
              removeValue(selectedValues[selectedValues.length - 1]);
            } else if (
              query === "" &&
              selectedLabel &&
              event.key === "Backspace"
            ) {
              event.preventDefault();
              selectValue("");
              setQuery(selectedLabel.slice(0, -1));
              setOpen(true);
            }
          }}
          onBlur={() => {
            setQuery("");
          }}
        />

        {children}

        <InputSlot align="inline-end" className="gap-1" aria-hidden="true">
          {showTrigger ? (
            <ComboboxTrigger
              data-placeholder={isPlaceholder ? "" : undefined}
              className="[[data-has-value]_&]:hidden"
            />
          ) : null}
          {showClear ? (
            <ComboboxClear
              className="hidden [[data-has-value]_&]:flex"
              onClear={clearValue}
              disabled={disabled}
            />
          ) : null}
        </InputSlot>
      </InputRoot>
    </PopoverAnchor>
  );
}

function ComboboxTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { open, disabled, setOpen } = useComboboxContext();

  return (
    <Button
      type="button"
      color="gray"
      variant="ghost"
      size="1"
      iconOnly
      data-slot="combobox-trigger"
      className={cn("ui-Combobox-button", className)}
      tabIndex={-1}
      aria-expanded={open}
      aria-haspopup="listbox"
      disabled={disabled}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <ChevronDownIcon />
    </Button>
  );
}

function ComboboxClear({
  onClear,
  className,
  disabled,
}: {
  onClear?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="1"
      iconOnly
      color="gray"
      data-slot="combobox-clear"
      tabIndex={-1}
      disabled={disabled}
      onClick={onClear}
      className={cn("ui-Combobox-clear-button", className)}
    >
      <XIcon />
    </Button>
  );
}

interface ComboboxContentProps extends React.ComponentProps<
  typeof PopoverContent
> {
  size?: Responsive<"1" | "2">;
  variant?: "solid" | "soft";
  color?: string;
  highContrast?: boolean;
}

function ComboboxContent({
  className,
  size = "2",
  variant = "solid",
  color,
  highContrast = false,
  children,
  ...props
}: ComboboxContentProps) {
  const { rootRef } = useComboboxContext();
  const sizeClass = responsiveClass("ui-r-size", size);

  return (
    <PopoverContent
      data-accent-color={color}
      align="start"
      sideOffset={6}
      data-slot="combobox-content"
      data-chips={false}
      className={cn(
        "ui-reset ui-PopperContent ui-BaseMenuContent ui-DropdownMenuContent p-0",
        `ui-variant-${variant}`,
        sizeClass,
        highContrast && "ui-high-contrast",
        "group/combobox-content",
        "relative max-h-(--radix-popover-content-available-height) w-(--radix-popover-trigger-width) max-w-(--radix-popover-content-available-width) min-w-[var(--radix-popover-trigger-width)]",
        "data-[chips=true]:min-w-(--radix-popover-trigger-width)",
        className
      )}
      onOpenAutoFocus={(event) => event.preventDefault()}
      onCloseAutoFocus={(event) => event.preventDefault()}
      onInteractOutside={(event) => {
        if (rootRef.current?.contains(event.target as Node)) {
          event.preventDefault();
        }
      }}
      {...props}
    >
      <div className="ui-BaseMenuViewport ui-DropdownMenuViewport">
        {children}
      </div>
    </PopoverContent>
  );
}

function ComboboxChips<T = unknown>({
  className,
  children,
  renderChip,
  ...props
}: React.ComponentProps<typeof InputRoot> & {
  renderChip?: (item: T) => React.ReactNode;
}) {
  const {
    rootRef,
    disabled,
    invalid,
    open,
    setOpen,
    moveCaretToEnd,
    inputRef,
    selectedItems,
    itemToValue,
    itemToStringLabel,
  } = useComboboxContext();

  return (
    <PopoverAnchor asChild>
      <InputRoot
        ref={rootRef}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        disabled={disabled}
        invalid={invalid}
        className={cn("ui-Chips", className)}
        onMouseDown={(event) => {
          if (disabled) return;
          const target = event.target as HTMLElement;
          if (target.closest("button")) return;
          event.preventDefault();
          if (!open) setOpen(true);
          inputRef.current?.focus();
          moveCaretToEnd();
        }}
        {...props}
      >
        <div
          data-slot="chips"
          className={cn("ui-ChipContent", "has-data-[slot=chip]:px-1")}
        >
          {(selectedItems as T[]).map((item) => {
            const value = itemToValue(item);
            if (renderChip) {
              return (
                <React.Fragment key={value}>{renderChip(item)}</React.Fragment>
              );
            }
            return (
              <ComboboxChip key={value} value={value}>
                {itemToStringLabel(item)}
              </ComboboxChip>
            );
          })}
          {children}
        </div>
      </InputRoot>
    </PopoverAnchor>
  );
}

function ComboboxChip({
  value,
  className,
  children,
  showRemove = true,
  ...props
}: React.ComponentProps<typeof Chip> & {
  value: string;
  showRemove?: boolean;
}) {
  const { removeValue, disabled } = useComboboxContext();

  return (
    <Chip className={className} {...props}>
      {children}
      {showRemove ? (
        <ChipRemove disabled={disabled} onClick={() => removeValue(value)} />
      ) : null}
    </Chip>
  );
}

function ComboboxChipsInput({
  id,
  name,
  placeholder = "Add item...",
  className,
  showTrigger = true,
  children,
}: {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  showTrigger?: boolean;
  children?: React.ReactNode;
}) {
  const {
    query,
    open,
    disabled,
    listId,
    inputRef,
    setQuery,
    setOpen,
    selectedValues,
    removeValue,
    clearValue,
    highlightNext,
    highlightPrev,
    highlightFirst,
    highlightLast,
    selectHighlighted,
    highlightedValue,
  } = useComboboxContext();

  return (
    <>
      <InputField
        ref={inputRef}
        id={id}
        name={name}
        data-slot="chips-input"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-controls={open ? listId : undefined}
        autoComplete="off"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="none"
        value={query}
        placeholder={selectedValues.length === 0 ? placeholder : undefined}
        disabled={disabled}
        className={cn("ui-chip-input", className)}
        onFocus={() => {
          if (!disabled && !open) setOpen(true);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          if (!open) setOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!open) setOpen(true);
            highlightNext();
            return;
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!open) setOpen(true);
            highlightPrev();
            return;
          }
          if (event.key === "Enter" && highlightedValue) {
            event.preventDefault();
            selectHighlighted();
            return;
          }
          if (event.key === "Home" && open) {
            event.preventDefault();
            highlightFirst();
            return;
          }
          if (event.key === "End" && open) {
            event.preventDefault();
            highlightLast();
            return;
          }
          if (event.key === "Tab" && open) {
            setOpen(false);
            setQuery("");
            return;
          }
          if (event.key === "Escape") {
            setOpen(false);
            setQuery("");
            inputRef.current?.blur();
            return;
          }
          if (
            event.key === "Backspace" &&
            query === "" &&
            selectedValues.length > 0
          ) {
            event.preventDefault();
            const last = selectedValues[selectedValues.length - 1];
            if (last) removeValue(last);
          }
        }}
        onBlur={() => setQuery("")}
      />
      {children}
      <InputSlot align="inline-end" aria-hidden="true">
        {showTrigger ? (
          <ComboboxTrigger className="[.ui-Chips:has([data-slot=chip])_&]:hidden" />
        ) : null}
        <ComboboxClear
          className="[.ui-Chips:has([data-slot=chip])_&]:hidden"
          onClear={clearValue}
          disabled={disabled}
        />
      </InputSlot>
    </>
  );
}

function ComboboxEmpty({ className, children }: React.ComponentProps<"div">) {
  const { filteredItems } = useComboboxContext();

  return (
    <Text
      role="status"
      aria-live="polite"
      aria-atomic="true"
      color="gray"
      size={"2"}
      align={"center"}
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2",
        filteredItems.length === 0 && "flex",
        className
      )}
    >
      {filteredItems.length === 0 ? children : null}
    </Text>
  );
}

function ComboboxList({ className, children }: React.ComponentProps<"div">) {
  const { filteredItems, listId, listRef } = useComboboxContext();

  return (
    <div
      ref={listRef}
      id={listId}
      tabIndex={-1}
      role="listbox"
      aria-orientation="vertical"
      data-slot="combobox-list"
      data-empty={filteredItems.length === 0 ? "" : undefined}
      className={cn(
        "ui-BaseMenuViewport ui-DropdownMenuViewport no-scrollbar max-h-[(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1",
        filteredItems.length === 0 && "p-0",
        className
      )}
    >
      {children}
    </div>
  );
}

function ComboboxGroup({
  items,
  children,
  className,
}: React.ComponentProps<"div"> & { items?: any[] }) {
  return (
    <ComboboxGroupContext.Provider value={{ items }}>
      <div
        data-slot="combobox-group"
        role="group"
        className={cn("ui-BaseMenuGroup ui-DropdownMenuGroup", className)}
      >
        {children}
      </div>
    </ComboboxGroupContext.Provider>
  );
}

function ComboboxLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-label"
      className={cn("ui-BaseMenuLabel ui-DropdownMenuLabel", className)}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  full = false,
  ...props
}: React.ComponentProps<"div"> & { full?: boolean }) {
  return (
    <div
      data-slot="combobox-separator"
      className={cn(
        "ui-BaseMenuSeparator ui-DropdownMenuSeparator",
        full && "ui-full",
        className
      )}
      {...props}
    />
  );
}

function ComboboxCollection<T = any>({
  children,
}: {
  children: (item: T) => React.ReactNode;
}) {
  const { items, query, itemToValue, itemToStringLabel, itemToKeywords } =
    useComboboxContext();
  const groupContext = React.useContext(ComboboxGroupContext);
  const scopedItems = groupContext?.items ?? items;
  const visibleItems = React.useMemo(
    () =>
      normalizeQuery(
        scopedItems,
        query,
        itemToStringLabel,
        itemToValue,
        itemToKeywords
      ),
    [scopedItems, query, itemToStringLabel, itemToValue, itemToKeywords]
  );

  return <>{visibleItems.map((item) => children(item))}</>;
}

type ComboboxItemBaseProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
  variant?: "default" | "destructive";
  shortcut?: string;
  color?: string;
  disabled?: boolean;
  withIndicator?: boolean;
  slot?: string;
};

function ComboboxItemBase({
  value,
  children,
  className,
  inset,
  variant = "default",
  shortcut,
  color,
  disabled,
  withIndicator = false,
  slot = "combobox-item",
}: ComboboxItemBaseProps) {
  const {
    multiple,
    selectedValue,
    selectedValues,
    selectValue,
    highlightedValue,
    setHighlightedValue,
  } = useComboboxContext();

  const selected = multiple
    ? selectedValues.includes(value)
    : value === selectedValue;
  const highlighted = highlightedValue === value;

  return (
    <div
      role="option"
      aria-selected={selected}
      data-slot={slot}
      data-value={value}
      data-selected={selected ? "" : undefined}
      data-highlighted={highlighted ? "" : undefined}
      data-accent-color={variant === "destructive" ? "destructive" : color}
      data-inset={inset || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "ui-reset ui-BaseMenuItem ui-DropdownMenuItem cursor-default select-none",
        withIndicator && "ui-BaseMenuCheckboxItem ui-ComboboxItem",
        inset && "ui-inset",
        className
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        selectValue(value);
      }}
      onMouseEnter={() => setHighlightedValue(value)}
      onMouseLeave={() => setHighlightedValue("")}
    >
      {withIndicator && selected && <ComboboxItemIndicator />}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <div className="ui-BaseMenuShortcut ui-DropdownMenuShortcut">
          {shortcut}
        </div>
      )}
    </div>
  );
}

function ComboboxItem(
  props: Omit<ComboboxItemBaseProps, "withIndicator" | "slot">
) {
  return <ComboboxItemBase {...props} slot="combobox-item" />;
}

function ComboboxItemIndicator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-item-indicator"
      className={cn(
        "ui-BaseMenuItemIndicator ui-ComboboxItemIndicator",
        className
      )}
      {...props}
    >
      <CheckIcon className="ui-BaseMenuItemIndicatorIcon" />
    </div>
  );
}

function ComboboxCheckboxItem({
  inset = true,
  ...props
}: Omit<ComboboxItemBaseProps, "withIndicator" | "slot">) {
  return (
    <ComboboxItemBase
      {...props}
      inset={inset}
      withIndicator
      slot="combobox-checkbox-item"
    />
  );
}

export {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
};
export type { ComboboxItemData, ComboboxProps };
