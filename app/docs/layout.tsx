import DocsSidebar from "@/components/docs-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import Navigation from "@/components/navigation";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container flex-1">
        <div className="grid grid-cols-[220px_1fr] gap-6">
          {/* Mobile Sidebar */}
          <MobileNav>
            <DocsSidebar className="w-full md:hidden" />
          </MobileNav>

          {/* Desktop Sidebar */}
          <DocsSidebar className="hidden lg:block" />

          {/* Main Content */}
          <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid">{children}</main>
        </div>
      </div>
    </div>
  );
}
