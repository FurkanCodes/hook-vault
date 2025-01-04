import { HookDocumentation } from "@/components/hook-documentation";
import { hooks } from "@/lib/hooks";

export default function HookPage({ params }: { params: { id: string } }) {
  const hook = hooks.find((h) => h.id === params.id);

  if (!hook) {
    return <div>Hook not found</div>;
  }

  return <HookDocumentation hook={hook} />;
}
