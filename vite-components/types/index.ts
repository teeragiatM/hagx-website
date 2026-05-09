import type { ComponentType, LazyExoticComponent } from 'react';

export * from "./pagination";

// ─── Domain Types ───────────────────────────────────────────────────────────

export type Employee = {
  id: string;
  tenant_id: string;
  created_at: string | null;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  status: string | null;
  status_group: string;
  employee_code: string | null;
  department_id: string | null;
  position_id: string | null;
  pay_type_code: string | null;
  payment_method_code: string | null;
  work_schedule_id: string | null;
  work_day_calculation: string;
  sso_enabled: boolean | null;
  sso_number: string | null;
  sso_type: string | null;
  start_date: string | null;
  hire_date: string | null;
  base_salary: number | null;
  bank_name: string | null;
  bank_account_number: string | null;
};

/** Alias for Employee — used in payroll domain where data comes from the same RPC */
export type PayrollEmployee = Employee;

// ─── Tenant Types ────────────────────────────────────────────────────────────

export type Tenant = {
  id: string;
  name: string;
  slug: string;
  plan: string | null;
  status: string | null;
  created_at: string | null;
};

export type TenantMembership = {
  role: string;
  tenant: Tenant;
};

// ─── Route Map Types ─────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SvgIcon = ComponentType<any>;

/** A single navigable tab — each tab is one route + one page component */
export type TabConfig = {
  key: string;
  label: string;
  /** Short title for breadcrumb/document.title. Falls back to `label` if omitted. */
  title?: string;
  path: string;
  component: LazyExoticComponent<ComponentType>;
};

export type RouteEntry = {
  path: string;
  icon: SvgIcon;
  label: string;
  /** Short title for breadcrumb/document.title. Falls back to `label` if omitted. */
  title?: string;
  /** present when the module is a single-page route (no tabs) */
  component?: LazyExoticComponent<ComponentType>;
  roles?: string[];
  /** Tab-based sub-navigation — groups become tabs, items become views */
  tabs?: TabConfig[];
  /** If true, only rendered in import.meta.env.DEV builds. Hidden + unrouted in production. */
  devOnly?: boolean;
};

export type RouteMap = Record<string, RouteEntry>;
