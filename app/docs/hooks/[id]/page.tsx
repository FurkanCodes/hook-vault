import CustomMDX from "@/components/mdx";
import { getAllHooks } from "@/lib/mdx";

export default async function HookPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const slugString = Array.isArray(params.id) ? params.id.join("/") : params.id;
  const hook =  getAllHooks().find((post) => post.slug === slugString);

  if (!hook) {
    return <div>Hook not found</div>;
  }

  return <CustomMDX source={hook.content} hook={hook} />
}
