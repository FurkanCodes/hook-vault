import { ParsedContent } from "@/types/types";
import CustomMDX from "./mdx";

interface HookDocumentationProps {
  hook: ParsedContent;
}

export function HookDocumentation({ hook }: HookDocumentationProps) {
  return <CustomMDX source={hook.content} hook={hook} />;
}
