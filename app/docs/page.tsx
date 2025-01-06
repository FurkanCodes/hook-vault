import { FeatureCard } from "@/components/feature-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Package, Zap, Copy } from 'lucide-react'


export default function Page() {
  return (
    <main className="flex-1 overflow-hidden">
      <div className="container flex h-[calc(100vh-3.5rem)] flex-col gap-8 py-8">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="space-y-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              Welcome to HookVault
            </h1>
            <p className="text-lg text-muted-foreground">
              A modern copy-paste library of React hooks built with the latest technologies.
              To start, please select a hook from the sidebar.
            </p>
          </div>

          <Tabs defaultValue="features" className="space-y-4">
            <TabsList>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tech">Tech Stack</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FeatureCard
                  icon={Zap}
                  title="Modern React Hooks"
                  description="Built for React 19 with the latest patterns and best practices"
                />
                <FeatureCard
                  icon={Code2}
                  title="Interactive Examples"
                  description="Live code examples with Monaco Editor and Sandpack integration"
                />
                <FeatureCard
                  icon={Copy}
                  title="Copy-Paste"
                  description="Easily integrate hooks into your projects with simple copy and paste functionality"
                />
            
          <FeatureCard
            icon={Code2}
            title="Well-Documented"
            description="Each hook comes with clear documentation and usage examples."
          />
        
              </div>
            </TabsContent>
            <TabsContent value="tech" className="space-y-4">
              <Card>
                <CardContent className="pt-6 dark:bg-gray-900 dark:border-gray-800">
                  <div className="flex items-center gap-2 ">
                    <Package className="h-4 w-4" />
                    <h3 className="font-semibold">Technology Stack</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <TechBadge>Next.js 15</TechBadge>
                    <TechBadge>React 19</TechBadge>
                    <TechBadge>TypeScript</TechBadge>
                    <TechBadge>Tailwind CSS</TechBadge>
                    <TechBadge>Monaco Editor</TechBadge>
                    <TechBadge>Sandpack</TechBadge>
                    <TechBadge>MDX</TechBadge>
                    <TechBadge>Framer Motion</TechBadge>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border bg-card p-4 dark:bg-gray-900 dark:border-gray-800">
                <p className="text-sm text-card-foreground">
                  <span className="font-medium">Pro Tip:</span> Each hook comes with 
                  interactive examples powered by Monaco Editor and Sandpack, allowing 
                  you to test and modify the code directly in your browser.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="border-blue-500/20 bg-blue-500/10">
            <CardContent className="pt-6">
              <p className="text-sm">
                <span className="font-medium">Getting Started:</span> Browse through 
                categories like State, Performance, Form, and Layout in the sidebar 
                to find the hook you need. Each hook includes detailed documentation, 
                usage examples, and live code playgrounds.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="rounded-full">
      {children}
    </Badge>
  )
}

