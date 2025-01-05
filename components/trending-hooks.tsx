import { getAllHooks } from "@/lib/mdx";
import Link from "next/link";

export async function TrendingHooks() {
  const hooks = await getAllHooks();
  const trendingHooks = hooks.slice(0, 6);

  return (
    <div className="w-full px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Trending Hooks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingHooks.map((hook) => (
          <Link key={hook.slug} href={`/docs/hooks/${hook.slug}`} className="group block p-6 rounded-xl border  hover:bg-card/50 transition-colors">
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{hook.metadata.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{hook.metadata.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
