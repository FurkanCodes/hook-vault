export interface Hook {
  id: string;
  name: string;
  category: HookCategory;
  description: string;
  code: string;
  usage: string[];
  parameters: Parameter[];
  returnValue: ReturnValue;
  bestPractices: string[];
  pitfalls: string[];
  examples: Example[];
  performance: string[];
}

export type HookCategory = "State" | "Effect" | "Performance" | "Custom" | "Layout" | "Debug";

export interface Parameter {
  name: string;
  type: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface ReturnValue {
  type: string;
  description: string;
}

export interface Example {
  title: string;
  description: string;
  code: string;
}
