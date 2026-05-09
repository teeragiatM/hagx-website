# UI Component Reference — ERP App (hagx)

AI assistant reference for using the custom UI component system. Read this before writing any UI code.

---

## Quick Start

```ts
// Always import from @ui — never from individual files
import { Button, Flex, Text, Card, Badge, Input } from "@ui";
```

Path aliases:
- `@ui` → `src/components/ui/index.ts` (barrel export — use this always)
- `@` → `src/`
- `@components` → `src/components/`
- `@lib` → `src/lib/`

---

## Core Concepts

### Responsive Props

Nearly all sizing/layout props support responsive breakpoints:

```tsx
// Fixed value
<Flex direction="column" gap="3" />

// Breakpoint-specific
<Flex direction={{ initial: "column", md: "row" }} />
<Text size={{ initial: "2", md: "4" }} />
<Box p={{ initial: "3", lg: "6" }} />
```

Breakpoints: `initial` · `xs` · `sm` · `md` · `lg` · `xl`

### Spacing Scale

Uses Radix scale — **not Tailwind defaults**:

| Prop value | px   | rem      |
| ---------- | ---- | -------- |
| `"1"`      | 4px  | 0.25rem  |
| `"2"`      | 8px  | 0.5rem   |
| `"3"`      | 12px | 0.75rem  |
| `"4"`      | 16px | 1rem     |
| `"5"`      | 24px | 1.5rem   |
| `"6"`      | 32px | 2rem     |
| `"7"`      | 48px | 3rem     |
| `"8"`      | 64px | 4rem     |
| `"9"`      | 80px | 5rem     |

### Theme Colors

```ts
type ThemeColor = "gray" | "warning" | "destructive" | "brand" | "success" | "info"
```

### Theme Radius

```ts
type ThemeRadius = "none" | "small" | "medium" | "large" | "full"
```

### Class Merging

```ts
import { cn } from "@lib/utils";
className={cn("base-class", condition && "extra-class", className)}
```

---

## Layout Components

### Box

Generic block container. Accepts all layout/spacing props.

```tsx
<Box p="4" mt="2" width="100%" />
<Box as="section" p={{ initial: "3", md: "6" }} />
```

**Props:**
| Prop | Type | Notes |
|------|------|-------|
| `as` | HTML tag | Default: `div` |
| `asChild` | boolean | Merge props into single child |
| `p` `px` `py` `pt` `pr` `pb` `pl` | `"0"–"9"` or CSS | Padding |
| `m` `mx` `my` `mt` `mr` `mb` `ml` | `"0"–"9"` or CSS | Margin |
| `width` `height` `minWidth` `maxWidth` | CSS string | Inline style |
| `overflow` `overflowX` `overflowY` | CSS value | |
| `position` | CSS position | |
| `flex` `flexGrow` `flexShrink` `flexBasis` | string | |
| `gridArea` `gridColumn` | string | |

---

### Flex

Flexbox container.

```tsx
<Flex direction="column" gap="3" align="center" justify="between" />
<Flex direction={{ initial: "column", md: "row" }} gap="4" wrap="wrap" />
```

**Props:** All Box props plus:
| Prop | Type | Default |
|------|------|---------|
| `direction` | `"row" \| "column" \| "row-reverse" \| "column-reverse"` | `"row"` |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` | |
| `justify` | `"start" \| "center" \| "end" \| "between"` | |
| `wrap` | `"nowrap" \| "wrap" \| "wrap-reverse"` | |
| `gap` `gapX` `gapY` | `"0"–"9"` | |

---

### Grid

CSS Grid container.

```tsx
<Grid columns="3" gap="4" />
<Grid columns={{ initial: "1", md: "3" }} gap="4" />
<Grid areas='"header header" "sidebar main"' columns="200px 1fr" />
```

**Props:** All Box props plus:
| Prop | Type |
|------|------|
| `columns` | `"1"–"9"` or CSS string |
| `rows` | `"1"–"9"` or CSS string |
| `areas` | CSS grid-template-areas string |
| `flow` | `"row" \| "column" \| "dense"` |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` |
| `justify` | `"start" \| "center" \| "end" \| "between"` |
| `gap` `gapX` `gapY` | `"0"–"9"` |

---

### Container

Responsive-width page container.

```tsx
<Container size="3">
  <p>Content</p>
</Container>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3" \| "4"` | `"4"` |
| `align` | `"left" \| "center" \| "right"` | `"center"` |

---

### Section

Vertical rhythm section with padding.

```tsx
<Section size="2">
  <Heading>Title</Heading>
</Section>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3" \| "4"` | `"3"` |
| `as` | `"section" \| "div" \| "span"` | `"section"` |

---

## Typography

### Text

Inline/block text with Radix sizing scale.

```tsx
<Text size="3" weight="medium" color="gray" />
<Text as="p" size={{ initial: "2", md: "3" }} />
<Text size="2" color="destructive" />
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `as` | `"span" \| "div" \| "p" \| "label" \| "pre" \| "h1"–"h6"` | `"span"` |
| `size` | `"1"–"9"` | `"3"` |
| `weight` | `"light" \| "regular" \| "medium" \| "bold" \| "extrabold"` | |
| `color` | `ThemeColor` | |
| `align` | `"left" \| "center" \| "right"` | |
| `wrap` | `"wrap" \| "nowrap" \| "pretty" \| "balance"` | |
| `truncate` | boolean | |
| `highContrast` | boolean | |

---

### Heading

Semantic heading with automatic size adjustment.

```tsx
<Heading size="6" as="h2">Page Title</Heading>
<Heading size="3" as="h3" weight="medium">Section</Heading>
```

Same props as Text, but `as` is restricted to `h1`–`h6`.

---

### Link

```tsx
<Link href="/path" underline="hover" color="brand">Go here</Link>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `underline` | `"auto" \| "always" \| "hover" \| "none"` | `"auto"` |
| `size` | TextSize | |
| `weight` | TextWeight | |
| `color` | ThemeColor | |
| `asChild` | boolean | |

---

## Buttons

### Button

```tsx
<Button variant="solid" size="2" color="brand">Save</Button>
<Button variant="outline" size="1" color="destructive">Delete</Button>
<Button variant="ghost" loading loadingLabel="Saving…">Save</Button>
<Button variant="soft" iconOnly><TrashIcon /></Button>
```

**Variants:** `"classic" | "solid" | "soft" | "surface" | "outline" | "ghost"`

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `variant` | above | `"solid"` |
| `size` | `"1" \| "2" \| "3" \| "4"` | `"2"` |
| `color` | ThemeColor | |
| `radius` | ThemeRadius | |
| `loading` | boolean | |
| `loadingLabel` | string | |
| `iconOnly` | boolean | |
| `highContrast` | boolean | |
| `asChild` | boolean | |

---

### ToggleButton

Button with pressed state, renders as Radix Toggle.

```tsx
<ToggleButton variant="soft" size="2">Bold</ToggleButton>
```

Same props as Button minus `loading`.

---

### ButtonGroup

Group of adjacent buttons sharing borders.

```tsx
<ButtonGroup orientation="horizontal">
  <Button variant="outline">Left</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
```

---

### ToggleGroup / ToggleGroupItem

Radix-managed selection group.

```tsx
<ToggleGroup variant="surface" size="2">
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="week">Week</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
</ToggleGroup>
```

---

## Badge

```tsx
<Badge variant="soft" color="success" size="2">Active</Badge>
<Badge variant="solid" color="destructive">Error</Badge>
<Badge variant="outline" radius="medium">Draft</Badge>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `variant` | `"solid" \| "surface" \| "soft" \| "outline"` | `"soft"` |
| `size` | `"1"–"5"` | `"2"` |
| `color` | ThemeColor | |
| `radius` | ThemeRadius | `"full"` |
| `iconOnly` | boolean | |

---

## Card

```tsx
<Card size="2" variant="surface">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
    <CardAction><Button size="1">Edit</Button></CardAction>
  </CardHeader>
  <CardContent>
    <p>Body content</p>
  </CardContent>
  <CardFooter>
    <Button>Submit</Button>
  </CardFooter>
</Card>
```

**Card Props:**
| Prop | Type | Default |
|------|------|---------|
| `variant` | `"surface" \| "classic" \| "ghost"` | `"surface"` |
| `size` | `"1"–"5"` | `"1"` |
| `color` | ThemeColor | |

---

## Alert

```tsx
<Alert color="destructive" variant="surface">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>

<Alert color="success" variant="soft">
  <AlertTitle>Saved!</AlertTitle>
</Alert>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `variant` | `"soft" \| "surface" \| "outline"` | `"surface"` |
| `color` | ThemeColor | |
| `size` | `"1" \| "2" \| "3"` | `"2"` |
| `highContrast` | boolean | |

---

## Avatar

```tsx
<Avatar size="3" variant="soft" color="brand" radius="full">
  <AvatarImage src="/photo.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

<AvatarGroup>
  <Avatar size="2"><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar size="2"><AvatarFallback>B</AvatarFallback></Avatar>
  <AvatarGroupCount>+5</AvatarGroupCount>
</AvatarGroup>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1"–"9"` | `"3"` |
| `variant` | `"solid" \| "soft"` | `"solid"` |
| `color` | ThemeColor | |
| `radius` | ThemeRadius | `"medium"` |

---

## Form Inputs

### Input

```tsx
<Input size="2" variant="surface" placeholder="Search…" />

{/* With slots */}
<InputRoot size="2" variant="surface">
  <InputSlot align="inline-start"><SearchIcon /></InputSlot>
  <InputField placeholder="Search…" />
  <InputSlot align="inline-end"><ClearIcon /></InputSlot>
</InputRoot>

{/* Multiline */}
<Input multiline resize="vertical" rows={4} placeholder="Notes…" />
```

**Input Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3"` | `"2"` |
| `variant` | `"classic" \| "surface" \| "soft"` | `"surface"` |
| `color` | ThemeColor | |
| `radius` | ThemeRadius | |
| `multiline` | boolean | |
| `resize` | `"none" \| "vertical" \| "horizontal" \| "both"` | |
| `invalid` | boolean | |
| `disabled` | boolean | |

---

### Select

```tsx
<Select size="2" variant="surface">
  <SelectTrigger placeholder="Pick one…" />
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
    <SelectGroup>
      <SelectLabel>Group</SelectLabel>
      <SelectItem value="c">Option C</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3"` | `"2"` |
| `variant` | SelectTriggerVariant | `"surface"` |
| `contentVariant` | `"solid" \| "soft"` | `"solid"` |
| `color` | ThemeColor | |

---

### Checkbox

```tsx
<Checkbox size="2" variant="surface" color="brand" />

{/* Group */}
<CheckboxGroup value={selected} onValueChange={setSelected}>
  <CheckboxGroupItem value="a">Option A</CheckboxGroupItem>
  <CheckboxGroupItem value="b">Option B</CheckboxGroupItem>
</CheckboxGroup>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3"` | `"2"` |
| `variant` | `"classic" \| "surface" \| "soft"` | `"surface"` |
| `color` | ThemeColor | |

---

### Switch

```tsx
<Switch size="2" variant="surface" color="brand" />
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3"` | `"2"` |
| `variant` | `"classic" \| "surface" \| "soft"` | `"surface"` |
| `color` | ThemeColor | |

---

### Radio

```tsx
<RadioGroup defaultValue="a">
  <Radio value="a" size="2" color="brand" /> Option A
  <Radio value="b" size="2" /> Option B
</RadioGroup>
```

---

### Slider

```tsx
<Slider min={0} max={100} step={5} defaultValue={[50]} size="2" color="brand" />
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3"` | `"2"` |
| `variant` | `"classic" \| "surface" \| "soft"` | `"surface"` |
| `min` `max` `step` | number | 0, 100, 1 |
| `value` `defaultValue` | number[] | |

---

### Calendar

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  size="1"
  variant="solid"
  color="brand"
/>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2"` | `"1"` |
| `variant` | `"solid" \| "surface"` | `"solid"` |
| `color` | ThemeColor | |
| `radius` | ThemeRadius | |
| Plus all react-day-picker props | | |

---

## Form Field Layout

Wraps inputs with label, description, and error messaging.

```tsx
<Field orientation="vertical" size="2" required>
  <FieldLabel>Email</FieldLabel>
  <FieldDescription>We won't share this.</FieldDescription>
  <FieldContent>
    <Input placeholder="you@example.com" />
  </FieldContent>
  <FieldError errors={["Invalid email"]} />
</Field>

{/* Horizontal layout */}
<Field orientation="horizontal">
  <FieldLabel>Name</FieldLabel>
  <FieldContent><Input /></FieldContent>
</Field>

{/* Group of fields */}
<FieldSet>
  <FieldLegend>Personal Info</FieldLegend>
  <FieldGroup>
    <Field><FieldLabel>First</FieldLabel><FieldContent><Input /></FieldContent></Field>
    <Field><FieldLabel>Last</FieldLabel><FieldContent><Input /></FieldContent></Field>
  </FieldGroup>
</FieldSet>
```

**Field Props:**
| Prop | Type | Default |
|------|------|---------|
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` |
| `size` | `"1" \| "2" \| "3"` | `"2"` |
| `invalid` | boolean | |
| `disabled` | boolean | |
| `required` | boolean | |

---

## Combobox (Advanced Select)

Single or multi-select with filtering.

```tsx
// Single select
<Combobox items={options} value={value} onValueChange={setValue}
  itemToValue={(i) => i.id} itemToStringLabel={(i) => i.name}>
  <ComboboxInput placeholder="Search…" showClear />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxEmpty>No results</ComboboxEmpty>
      <ComboboxCollection>
        {(item) => <ComboboxItem value={item.id}>{item.name}</ComboboxItem>}
      </ComboboxCollection>
    </ComboboxList>
  </ComboboxContent>
</Combobox>

// Multi-select with chips
<Combobox items={options} multiple value={values} onValueChange={setValues}
  itemToValue={(i) => i.id} itemToStringLabel={(i) => i.name}>
  <ComboboxChips>
    {(item) => <Chip key={item.id}>{item.name}<ChipRemove /></Chip>}
    <ComboboxChipsInput placeholder="Add…" />
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxList>
      <ComboboxCollection>
        {(item) => <ComboboxCheckboxItem value={item.id}>{item.name}</ComboboxCheckboxItem>}
      </ComboboxCollection>
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

---

## Feedback / Overlays

### Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent size="2" showClose="footer">
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <Button color="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**DialogContent Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3" \| "4"` | `"2"` |
| `maxWidth` | `"1" \| "2" \| "3" \| "4"` | `"1"` |
| `showClose` | `"corner" \| "footer" \| "both"` | `"footer"` |
| `align` | `"start" \| "center"` | `"center"` |

---

### Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button iconOnly><InfoIcon /></Button>
    </TooltipTrigger>
    <TooltipContent>
      <TooltipText>Help text</TooltipText>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### Popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent size="2" align="start">
    <PopoverHeader>
      <PopoverTitle>Settings</PopoverTitle>
    </PopoverHeader>
    <p>Content here</p>
  </PopoverContent>
</Popover>
```

---

## Data Display

### Table

```tsx
<Table.Root size="1" variant="surface">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {rows.map((row) => (
      <Table.Row key={row.id}>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell><Badge>{row.status}</Badge></Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table.Root>
```

**TableRoot Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3"` | `"1"` |
| `variant` | `"surface" \| "ghost"` | `"ghost"` |

---

### DataTable

Feature-rich table with sorting, filtering, pagination.

```tsx
import { DataTable } from "@ui";

<DataTable
  columns={columns}
  data={rows}
  enableSorting
  enableFiltering
  enablePagination
/>
```

---

### DataTableGrid

Card-grid view alternative to DataTable.

```tsx
<DataTableGrid
  columns={columns}
  data={rows}
  renderCard={(row) => <Card>{row.name}</Card>}
/>
```

---

### Progress

```tsx
<Progress value={65} size="2" variant="surface" color="brand" />
<Progress value={null} size="1" /> {/* indeterminate */}
```

---

### Spinner

```tsx
<Spinner size="2" />
<Spinner loading={isLoading}><Button>Submit</Button></Spinner>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2" \| "3"` | `"2"` |
| `variant` | `"default" \| "circle" \| "icon"` | `"default"` |
| `loading` | boolean | |

---

## Navigation

### Tabs

```tsx
<Tabs defaultValue="overview">
  <TabsList variant="surface" size="2">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="details">…</TabsContent>
</Tabs>
```

**TabsList Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `"1" \| "2"` | `"2"` |
| `variant` | `"default" \| "solid" \| "surface" \| "classic" \| "soft"` | `"default"` |
| `color` | ThemeColor | |

---

### Breadcrumb

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

## Misc Components

### ScrollArea

```tsx
<ScrollArea size="1" style={{ height: 300 }}>
  <div>Long content…</div>
</ScrollArea>
```

---

### Collapsible

```tsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
```

---

### Separator

```tsx
<Separator orientation="horizontal" />
<Separator orientation="vertical" />
```

---

### Skeleton

```tsx
<Skeleton className="h-4 w-32" />
<Skeleton className="h-10 w-full" />
```

---

### Kbd

```tsx
<Kbd>⌘K</Kbd>
<Kbd size="2">Ctrl+S</Kbd>
```

---

### Code

```tsx
<Code size="2" variant="soft" color="gray">npm install</Code>
```

---

### Chips (standalone)

```tsx
<Chips>
  <Chip>Tag 1<ChipRemove onClick={() => remove("Tag 1")} /></Chip>
  <Chip>Tag 2<ChipRemove onClick={() => remove("Tag 2")} /></Chip>
  <ChipsInput placeholder="Add tag…" onKeyDown={handleAdd} />
</Chips>
```

---

### Drawer

Bottom/side drawer for mobile-friendly panels.

```tsx
<Drawer>
  <DrawerTrigger asChild><Button>Open</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader><DrawerTitle>Title</DrawerTitle></DrawerHeader>
    <p>Content</p>
    <DrawerFooter><DrawerClose asChild><Button>Close</Button></DrawerClose></DrawerFooter>
  </DrawerContent>
</Drawer>
```

---

### Sheet

Side panel (slide-in drawer).

```tsx
<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader><SheetTitle>Panel</SheetTitle></SheetHeader>
    <p>Content</p>
  </SheetContent>
</Sheet>
```

---

### DropdownMenu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Actions</Button></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onSelect={() => edit()}>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive" onSelect={() => del()}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### ContextMenu

```tsx
<ContextMenu>
  <ContextMenuTrigger asChild><div>Right-click me</div></ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Open</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

---

### AlertDialog

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild><Button color="destructive">Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### Toast (Sonner)

```tsx
import { toast } from "sonner";

toast.success("Saved!");
toast.error("Something went wrong.");
toast("Message", { description: "Details here" });
```

`<Toaster />` is mounted in the app root — no need to add it.

---

## Charts

Built on Recharts. Import from `@ui`:

```tsx
import { BarChart, LineChart, AreaChart, PieChart, ChartContainer, ChartTooltip } from "@ui";

<ChartContainer config={chartConfig} className="h-64">
  <BarChart data={data}>
    <Bar dataKey="value" fill="var(--color-brand)" />
    <ChartTooltip />
  </BarChart>
</ChartContainer>
```

---

## Notification Badge

Shows unread count badge per module.

```tsx
<NotifyBadge moduleKey="sales" variant="count" />
<NotifyBadge moduleKey="buying" variant="dot" />
```

Module keys: `dashboard` · `sales` · `buying` · `product` · `contacts` · `staff` · `finance` · `expenses`

---

## Routing Patterns

Routes are defined in `src/routes/routeMap.tsx` — **single source of truth**.

```tsx
// Lazy page load with error boundary
const MyPage = makeLazy(() => import("@/pages/module/MyPage"));

// Adding a tab to a module
t("tab-key", "Tab Label", "/module/tab-path", () => import("@/pages/module/TabPage"))
```

Use `<Link>` from `react-router-dom` for internal navigation.

---

## Anti-Patterns to Avoid

```tsx
// ❌ Never import from individual UI files
import { Button } from "@/components/ui/button";
import { Button } from "src/components/ui/core/button";

// ✅ Always use @ui barrel
import { Button } from "@ui";

// ❌ Don't use Tailwind spacing that conflicts with Radix scale
<div className="gap-5">   // Tailwind gap-5 = 1.25rem, but scale "5" = 1.5rem

// ✅ Use layout props instead
<Flex gap="5">             // Correct: 1.5rem

// ❌ Don't add Tailwind classes for dynamic responsive props without @source inline()
// If you build class strings like `md:flex-row` in JS at runtime, add a @source inline() in index.css

// ❌ Don't import from shadcn directly
import { Button } from "@/components/ui/button"; // shadcn path
```
