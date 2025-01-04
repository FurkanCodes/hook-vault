"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { hooks } from "@/lib/hooks";

function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const hooksByCategory = hooks.reduce((acc, hook) => {
    if (!acc[hook.category]) {
      acc[hook.category] = [];
    }
    acc[hook.category].push(hook);
    return acc;
  }, {} as Record<string, typeof hooks>);

  return (
    <nav
      className={cn(
        // Keep the sticky positioning and adjust spacing
        "sticky top-16",
        // Set a fixed height that accounts for the navbar
        "h-[calc(100vh-64px)]", // 64px is the navbar height
        // Add overflow scrolling for content that's too long
        "overflow-y-auto",
        // Keep your existing styles
        "p-4 border-r",
        className
      )}
    >
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {Object.entries(hooksByCategory).map(([category, categoryHooks]) => (
          <div key={category} className="mb-6">
            <h4 className="text-sm font-semibold mb-2">{category}</h4>
            <ul className="space-y-2">
              {categoryHooks.map((hook) => (
                <li key={hook.id}>
                  <Link href={`/docs/hooks/${hook.id}`} className={cn("block px-2 py-1.5 text-sm rounded-md transition-colors", pathname === `/docs/hooks/${hook.id}` ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
                    {hook.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </nav>
  );
}

export default DocsSidebar;
