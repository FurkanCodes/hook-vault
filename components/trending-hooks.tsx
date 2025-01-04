import { hooks } from "@/lib/hooks";
import Link from "next/link";

export function TrendingHooks() {
  const trendingHooks = hooks.slice(0, 6); // In reality, you'd track popularity

  return (
    <div className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Trending Hooks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {trendingHooks.map((hook) => (
          <Link key={hook.id} href={`/docs/hooks/${hook.id}`} className="block p-6 rounded-lg border bg-card hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">{hook.name}</h3>
            <p className="text-muted-foreground">{hook.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
