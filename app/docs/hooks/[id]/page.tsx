import { HookDocumentation } from "@/components/hook-documentation";
import { hooks } from "@/lib/hooks";

export default async function HookPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const hook = hooks.find((h) => h.id === params.id);

  if (!hook) {
    return <div>Hook not found</div>;
  }

  return <HookDocumentation hook={hook} />;
}
