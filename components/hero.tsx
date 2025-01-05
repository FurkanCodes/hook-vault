import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 mb-32">
      {/* Logo or Icon (optional) */}
      <div className="mb-8 bg-primary rounded-full p-6 w-34 h-34 flex items-center justify-center">
        <span className="text-2xl font-bold text-primary-foreground">HookVault</span>
      </div>

      {/* Title and description with increased spacing */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6">Modern React Hooks Library</h1>
      <p className="text-xl text-muted-foreground max-w-[600px] mb-12">A comprehensive collection of TypeScript-first React hooks for JavaScript and React</p>

      {/* Command display similar to Motion's npm install */}
      <div className="flex items-center gap-4 mb-12">
        <Link href="/docs">
          <Button size="lg" className="font-medium">
            Quick start
          </Button>
        </Link>
      </div>
    </div>
  );
}
