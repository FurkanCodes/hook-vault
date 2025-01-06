import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Github } from 'lucide-react';
import { CodePreview } from "./code-preview";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden sm:pt-24">
      <div className="container flex flex-col items-center justify-center text-center px-4">
 
        {/* Title and description */}
  <div className="text-5xl font-extrabold text-5xl sm:text-6xl md:text-7xl font-extrabold   mb-6 ">

  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient  ">
 HookVault
</span>
</div>

        <p className="text-xl text-muted-foreground max-w-[600px] mb-12">
          A comprehensive collection of TypeScript-first React hooks for building powerful and efficient applications
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mb-12">
          <Link href="/docs">
            <Button size="lg" className="font-medium">
              Quick start <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://github.com/furkancodes/hook-vault" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="font-medium">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </Link>
        </div>

        {/* Code preview */}
        <CodePreview />
      </div>
    </div>
  );
}