import { TrendingHooks } from "@/components/trending-hooks";

import { HeroSection } from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-20">
      <HeroSection />
      <TrendingHooks />
    </main>
  );
}
