import { useState } from "react";

import { CodeBlock } from "@/components/code-block";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hook } from "@/types/types";
import { LiveEditor } from "./live-editor";

export function HookPlayground({ hook }: { hook: Hook }) {
  const [result, setResult] = useState<any>(null);

  return (
    <Card className="p-6">
      <Tabs defaultValue="editor">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Live Editor</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="result">Result</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <LiveEditor code={hook.code} onResult={setResult} />
        </TabsContent>

        <TabsContent value="examples">
          <div className="space-y-4">
            {hook.examples.map((example, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-2">{example.title}</h3>
                <p className="text-muted-foreground mb-2">{example.description}</p>
                <CodeBlock code={example.code} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="result">
          <pre className="p-4 bg-muted rounded-lg">{JSON.stringify(result, null, 2)}</pre>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
