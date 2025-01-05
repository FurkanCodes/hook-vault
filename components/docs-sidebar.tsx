/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DocsSidebar({ className, hooks }: { className?: string; hooks: Array<{ metadata: any; slug: string; content: string }> }) {
  const pathname = usePathname();

  const hooksByCategory = hooks.reduce((acc, hook) => {
    const category = hook.metadata.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      id: hook.slug,
      name: hook.metadata.title,
      category: hook.metadata.category,
    });
    return acc;
  }, {} as Record<string, any[]>);

  // Sort hooks within each category alphabetically by name
  Object.keys(hooksByCategory).forEach((category) => {
    hooksByCategory[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  // Get sorted categories
  const sortedCategories = Object.keys(hooksByCategory).sort();

  return (
    <nav className={cn("sticky top-16", "h-[calc(100vh-64px)]", "overflow-y-auto", "p-4 border-r", className)}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {sortedCategories.map((category) => (
          <div key={category} className="mb-6">
            <h4 className="text-sm font-semibold mb-2">{category}</h4>
            <ul className="space-y-2">
              {hooksByCategory[category].map((hook) => (
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
