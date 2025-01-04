import DocsSidebar from "@/components/docs-sidebar";
import { MobileNav } from "@/components/mobile-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Sidebar */}
      <MobileNav>
        <DocsSidebar className="w-full md:hidden" />
      </MobileNav>

      {/* Desktop Sidebar */}
      <DocsSidebar className="w-64 hidden md:block" />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:px-6 mx-auto w-full">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
