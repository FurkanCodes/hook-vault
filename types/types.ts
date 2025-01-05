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
  codeSandbox?: Example[];
  content?: string;
}

export type HookCategory = "State" | "Effect" | "Performance" | "Form" | "Layout" | "Debug";

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

export interface Metadata {
  title: string;
  date: string;
  description: string;
  category: HookCategory;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags?: any;
}

export interface ParsedContent {
  metadata: Metadata;
  content: string;
}

export interface ParameterProps {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

export interface ExampleProps {
  title: string;
  description: string;
  code: string;
}

export interface Metadata {
  title: string;
  date: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags?: any;
}

export interface ParsedContent {
  metadata: Metadata;
  content: string;
}
