import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 mt-10">
      <h1 className="text-6xl font-bold tracking-tighter mb-4">Modern React Hooks Library</h1>
      <p className="text-xl text-muted-foreground max-w-[600px] mb-8">A comprehensive collection of TypeScript-first React hooks to build better applications faster. Production-ready, tested, and documented.</p>
      <div className="flex gap-4">
        <Link href="/docs">
          <Button size="lg">Browse Hooks</Button>
        </Link>
      </div>
    </div>
  );
}
