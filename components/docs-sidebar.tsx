// components/docs-sidebar.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docsConfig";

interface DocsSidebarProps {
  className?: string;
}

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-4 border-r", className)}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-6">
          {docsConfig.sidebarNav.map((section, index) => (
            <div key={index} className="flex flex-col gap-1">
              {/* Section Title */}
              <h4 className="text-sm font-semibold mb-2">{section.title}</h4>

              {/* Section Items */}
              {section.items?.length && (
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-2 py-1.5 text-sm rounded-md transition-colors",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

export default DocsSidebar;