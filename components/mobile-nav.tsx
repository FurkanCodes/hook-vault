"use client";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MobileNav({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button onClick={() => setIsOpen(!isOpen)} className="fixed left-4 top-4 z-50 rounded-md bg-background p-2 md:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div className={cn("fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto bg-background transition-transform duration-300 ease-in-out md:hidden", isOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="pt-16">{children}</div>
      </div>
    </>
  );
}
