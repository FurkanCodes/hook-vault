import { Features } from '@/components/features'
import { HeroSection } from "@/components/hero"
import { TrendingHooks } from "@/components/trending-hooks"

export default function Home() {
  return (
    <main className="flex-1 overflow-y-auto ">
      <div className="container flex flex-col gap-12 py-12">
        <HeroSection />
        <Features />
        <TrendingHooks />
      </div>
    </main>
  )
}

