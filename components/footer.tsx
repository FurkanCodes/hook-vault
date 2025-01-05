"use client";
import { cn } from "@/lib/utils";
import { Github, Globe, Mail } from "lucide-react";
import Link from "next/link";

function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("w-full border-t mt-auto", className)}>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Brand/Copyright */}
        <div className="text-sm text-muted-foreground">
          <Link href="/" className="font-medium hover:text-primary transition-colors">
            HookVault
          </Link>
          <span className="mx-1">©</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <Link href="mailto:turkogluvelifurkan@gmail.com" className="p-2 hover:text-primary transition-colors" aria-label="Email">
            <Mail className="h-5 w-5" />
          </Link>
          <Link href="https://velifurkanturkoglu.me" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors" aria-label="Personal Website">
            <Globe className="h-5 w-5" />
          </Link>
          <Link href="https://github.com/furkancodes" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
