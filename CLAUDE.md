# HAGX Website — Project Guide

## Stack

- **Framework**: Next.js (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) — no `tailwind.config.js`
- **Animation**: Framer Motion, Lenis (smooth scroll)
- **i18n**: i18next + react-i18next (TH / EN)
- **Backend**: Supabase (auth, storage), Sanity (CMS)
- **Icons**: Lucide React
- **UI primitives**: Radix UI (Slot, etc.)

---

## Breakpoint System

ใช้ระบบ breakpoint custom ที่ define ใน `src/app/globals.css` ภายใน `@theme`:

| Prefix | Range | Device |
|--------|-------|--------|
| _(none / initial)_ | 0px+ | Phones portrait |
| `xs:` | 520px+ | Phones landscape |
| `sm:` | 768px+ | Tablets portrait |
| `md:` | 1024px+ | Tablets landscape |
| `lg:` | 1280px+ | Laptops |
| `xl:` | 1640px+ | Desktops |

**Mobile-first** เสมอ — เขียน base class ก่อน แล้วค่อย override ด้วย `xs:` → `sm:` → `md:` → `lg:` → `xl:`

```tsx
// ถูก
<div className="text-sm md:text-base lg:text-lg" />

// ผิด
<div className="lg:text-sm" />  // ← อย่าเขียน desktop ลงมา
```

---

## Color Token System

ใช้ **2 ชั้น** — primitive → semantic:

### Primitive (อย่าใช้ตรงใน component)
```
--gray-1 … --gray-12        (charcoal dark scale)
--gray-a1 … --gray-a12      (alpha)
--brand-1 … --brand-12      (HAGX orange #DB5828)
--brand-a1 … --brand-a12    (alpha)
--accent-*                  (alias ชี้ไปที่ brand หรือ gray ตาม data-accent-color)
```

### Semantic token — ใช้ใน component ผ่าน Tailwind utility
```css
bg-background-100       /* --gray-1  : พื้นหลังหลัก */
text-foreground     /* --gray-12 : เนื้อหาหลัก */
bg-background-level-1          /* --accent-surface */
border-border-100       /* --gray-a6 */
text-foreground-200          /* --gray-a11 */
text-subtle         /* --gray-a10 */
bg-accent-500           /* --accent-9  : primary orange */
text-text-foreground/90      /* --accent-a11 */
text-text-foreground/90-high /* --accent-12 */
text-text-foreground-200    /* --gray-a11 */
```

Dark mode: ใส่ class `.dark` บน `<html>` — token สลับอัตโนมัติ

---

## Typography

ไม่มี Typography component แล้ว — ใช้ Tailwind class ตรงๆ:

```tsx
// Heading
<h2 className="text-4xl font-light text-foreground" />

// Body
<p className="text-sm font-light text-foreground-200" />

// Accent text
<span className="text-text-foreground/90" />
```

**Font weights ที่ใช้**: `font-light` (300), `font-normal` (400), `font-medium` (500), `font-bold` (700)
ภาษาไทย: `--font-weight-bold` override เป็น 600 อัตโนมัติ

### Leading trim utilities
```
trim-start    ตัด whitespace บน
trim-end      ตัด whitespace ล่าง
trim-both     ตัดทั้งสองด้าน
trim-normal   ปิด
```

---

## Button Component

`src/components/ui/Button.tsx` — ใช้ Tailwind ล้วน ไม่มี CSS class แยก

```tsx
<Button variant="default" size="2">Primary</Button>
<Button variant="outline" color="gray">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="secondary">Secondary</Button>
<Button iconOnly><Icon /></Button>
<Button asChild><a href="/contact">Link</a></Button>
```

| size | height | text |
|------|--------|------|
| `"1"` | 24px | xs |
| `"2"` | 32px | sm _(default)_ |
| `"3"` | 40px | base |
| `"4"` | 48px | lg |

Responsive size: `size={{ initial: '1', md: '2' }}`

---

## Navigation

`src/components/NavLink.tsx` — ใช้แทน `<a>` สำหรับ nav links:

```tsx
<NavLink href="/about" className="text-sm font-light">
  About
</NavLink>
```
- Active state (`text-foreground`) และ inactive (`text-foreground-200 hover:text-foreground`) จัดการใน component อัตโนมัติ
- รับ `className` เพื่อ override font/size ได้

---

## Responsive Utility (`src/lib/responsive.ts`)

ใช้กับ component ที่รับ `Responsive<T>`:

```tsx
// ค่าเดียว
size="2"

// responsive object
size={{ initial: '1', sm: '2', md: '3' }}
```

`toEntries()` export แล้ว ใช้ใน component เพื่อแปลง responsive object → Tailwind classes with breakpoint prefix

---

## File Structure

```
src/
  app/
    globals.css       ← @theme tokens, breakpoints, @utility
    variant.css       ← ui-Section, ui-Container, ui-Text, ui-Heading
    layout.tsx
    page.tsx
  components/
    ui/
      Button.tsx      ← primary button component
      Layout.tsx      ← Section, Container
      ...
    NavLink.tsx       ← nav-specific link
    SiteNav.tsx       ← header + mobile menu
  lib/
    responsive.ts     ← Responsive<T> type + helpers
    utils.ts          ← cn()
  i18n/
    locales/en/
    locales/th/
```

---

## Rules

- **ห้ามใช้ hardcoded สี** (`#fff`, `rgba(...)`) ใน component — ใช้ semantic token แทน (`text-foreground`, `bg-background-100`)
- ข้อยกเว้น: brand orange `#DB5828` และ secondary variant ที่เป็น white-on-dark โดยเฉพาะ
- **ห้ามสร้าง CSS class ใหม่** ถ้า Tailwind utility ทำได้
- **ห้ามใช้ `md:hidden`** สำหรับ mobile menu — ใช้ `xs:hidden` (desktop nav เริ่มที่ 520px)
- Prettier จัด sort Tailwind class อัตโนมัติเมื่อ save (`tailwindStylesheet` ชี้ไปที่ globals.css)
