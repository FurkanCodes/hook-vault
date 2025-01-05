"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function MobileNav({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Handle scroll events for sticky menu
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button onClick={() => setIsOpen(!isOpen)} className={cn("fixed left-4 top-4 z-50 rounded-md p-2 md:hidden transition-all duration-300", isSticky && "bg-background shadow-md")}>
        {isOpen ? null : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div className={cn("fixed inset-y-0 left-0 z-50 w-72 transform bg-background p-6 transition-transform duration-300 ease-in-out md:hidden", isOpen ? "translate-x-0" : "-translate-x-full")}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {pathname.includes("docs") && (
              <Link href="/" className="flex items-center text-sm font-medium transition-colors hover:text-primary mr-4" onClick={() => setIsOpen(false)}>
                <ChevronLeft size={16} className="mr-2" />
                Homepage
              </Link>
            )}
            <ThemeToggle />
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-accent" aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        {/* Navigation content */}
        <nav>{children}</nav>
      </div>
    </>
  );
}
