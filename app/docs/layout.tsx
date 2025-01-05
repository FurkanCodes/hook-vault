import DocsSidebar from "@/components/docs-sidebar";
import Footer from "@/components/footer";
import { MobileNav } from "@/components/mobile-nav";
import Navigation from "@/components/navigation";
import { getAllHooks } from "@/lib/mdx";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const hooks = getAllHooks();

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation className="hidden md:block" />
      <div className="flex flex-1 relative">
        {/* Mobile Sidebar */}
        <MobileNav>
          <DocsSidebar hooks={hooks} className="w-full md:hidden" />
          <Navigation className="hidden" />
        </MobileNav>

        {/* Desktop Sidebar */}
        <DocsSidebar hooks={hooks} className="w-64 hidden md:block" />

        {/* Main Content */}
        <main className="flex-1 flex flex-col w-full">
          <div className="flex-1 px-4 py-8 md:px-6 mx-auto w-full max-w-4xl lg:mt-0 mt-8">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
