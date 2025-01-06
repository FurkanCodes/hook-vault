import { getAllHooks } from "@/lib/mdx";
import { Code2 } from "lucide-react"; // Use any icon for consistency
import { FeatureCard } from "./feature-card";

export async function TrendingHooks() {
  const hooks = await getAllHooks();
  const trendingHooks = hooks.slice(0, 6);

  return (
    <section className="container mb-24">
      <div>
        <h2 className="text-3xl font-bold text-center mb-12">Trending Hooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingHooks.map((hook) => (
            <FeatureCard
              key={hook.slug}
              icon={Code2} // Use a consistent icon for all trending hooks
              title={hook.metadata.title}
              description={hook.metadata.description}
              tag={hook.metadata.category} // Pass the category as a tag
              href={`/docs/hooks/${hook.slug}`} // Pass the href for clickable cards
            />
          ))}
        </div>
      </div>
    </section>
  );
}