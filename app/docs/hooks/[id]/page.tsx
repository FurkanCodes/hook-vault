import { HookDocumentation } from "@/components/hook-documentation";
import { getAllHooks } from "@/lib/mdx";

export default async function HookPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const slugString = Array.isArray(params.id) ? params.id.join("/") : params.id;
  console.log("slugString", slugString);
  const hook = await getAllHooks().find((post) => post.slug === slugString);
  console.log(hook);
  // const hook = hooks.find((h) => h.id === params.id);

  if (!hook) {
    return <div>Hook not found</div>;
  }

  return <HookDocumentation hook={hook} />;
}
