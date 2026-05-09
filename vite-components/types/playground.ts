/**
 * Playground — In-memory data model for the Dev Workflow Builder.
 *
 * These types are NEVER persisted to the DB directly.
 * Publishing calls fn_start_process / DB inserts via the domain layer.
 */

import type { Edge, Node } from "@xyflow/react";

// ─── Node types ───────────────────────────────────────────────────────────────

export type PlaygroundNodeType = "state" | "transition" | "condition" | "action";

export type StateData      = { label: string };
export type TransitionData = { from_state: string; to_state: string; label: string };
export type ConditionData  = { field_key: string; operator: string; value: string };
export type ActionData     = { function_key: string; params: string };  // params as JSON string

export type PlaygroundNodeData =
  | StateData
  | TransitionData
  | ConditionData
  | ActionData;

// React Flow typed nodes
export type PGNode = Node<Record<string, unknown>, PlaygroundNodeType>;
export type PGEdge = Edge;

// ─── Template ─────────────────────────────────────────────────────────────────

export type TemplateStatus = "draft" | "validated" | "published";

export type PlaygroundTemplate = {
  id:          string;
  name:        string;
  entity_type: string;
  status:      TemplateStatus;
  nodes:       PGNode[];
  edges:       PGEdge[];
  createdAt:   number;
  updatedAt:   number;
};

// ─── Validation ───────────────────────────────────────────────────────────────

export type ValidationResult = {
  valid:  boolean;
  errors: string[];
};

// ─── Default node data ────────────────────────────────────────────────────────

export const DEFAULT_NODE_DATA: Record<PlaygroundNodeType, Record<string, unknown>> = {
  state:      { label: "NEW_STATE" } satisfies StateData,
  transition: { from_state: "", to_state: "", label: "" } satisfies TransitionData,
  condition:  { field_key: "", operator: "eq", value: "" } satisfies ConditionData,
  action:     { function_key: "", params: "{}" } satisfies ActionData,
};

export const NODE_PALETTE_ITEMS: { type: PlaygroundNodeType; label: string; description: string }[] = [
  { type: "state",      label: "State",      description: "สถานะ workflow" },
  { type: "transition", label: "Transition", description: "การเปลี่ยนสถานะ" },
  { type: "condition",  label: "Condition",  description: "เงื่อนไขการตรวจสอบ" },
  { type: "action",     label: "Action",     description: "การกระทำที่ต้องดำเนินการ" },
];

export const CONDITION_OPERATORS = [
  { value: "eq",       label: "= (เท่ากับ)" },
  { value: "neq",      label: "≠ (ไม่เท่ากับ)" },
  { value: "gt",       label: "> (มากกว่า)" },
  { value: "gte",      label: "≥ (มากกว่าหรือเท่ากับ)" },
  { value: "lt",       label: "< (น้อยกว่า)" },
  { value: "lte",      label: "≤ (น้อยกว่าหรือเท่ากับ)" },
  { value: "contains", label: "contains (มีค่า)" },
  { value: "in",       label: "in (อยู่ใน list)" },
];
