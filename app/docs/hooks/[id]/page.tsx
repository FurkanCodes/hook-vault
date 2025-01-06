import CustomMDX from "@/components/mdx";
import { getAllHooks } from "@/lib/mdx";
import { Metadata } from "@/types/types";

type Hook = {
  slug: string;
  metadata: Metadata;
  content: string;
};

export default async function HookPage(props: { params: Promise<{ id: string }> }) {
  const params = (await props.params);

  const slugString = Array.isArray(params.id) ? params.id.join("/") : params.id;
console.log("slugString",slugString
)
  // Await the result of getAllHooks
  const hooks = await getAllHooks();

  const hook = hooks.find((post: Hook) => post.slug === slugString);
  console.log("hookhookhook",hook)
  if (!hook) {
    return <div>Hook not found</div>;
  }

  return <CustomMDX source={hook.content} hook={hook} />;
}