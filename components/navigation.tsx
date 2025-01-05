"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur">
      <nav className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-base font-bold">
          HookVault
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {pathname.includes("docs") && (
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Back
            </Link>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 -mr-2" aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={cn("fixed inset-x-0 top-16 z-50 h-screen bg-background md:hidden transition-transform duration-300 ease-in-out", isMenuOpen ? "translate-y-0" : "-translate-y-full")}>
        <div className="border-b">
          <div className="flex flex-col space-y-4 p-6">
            {pathname.includes("docs") && (
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Back
              </Link>
            )}
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)} />}
    </header>
  );
}

export default Navigation;
