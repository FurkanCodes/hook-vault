import { TrendingHooks } from "@/components/trending-hooks";

import { HeroSection } from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <TrendingHooks />
    </main>
  );
}
