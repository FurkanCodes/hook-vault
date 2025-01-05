import { Hook } from "@/types/types";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Card } from "./ui/card";
function generateSandpackCode(hook: Hook): string {
  return `import React from 'react';
import {useState, useEffect, useRef, useCallback} from 'react';
// Hook Definition
${hook.code}

// Example Usage

  ${
    hook.examples?.[0]?.code ||
    `

  `
  }
`;
}

interface HookPlaygroundProps {
  hook: Hook;
}
export function HookPlayground({ hook }: HookPlaygroundProps) {
  console.log("hook?.codeSandbox", hook);
  return (
    <Card className="p-6">
      <Tabs defaultValue="editor">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Live Editor</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <Sandpack
            template="react-ts"
            files={{
              "/App.tsx": generateSandpackCode(hook),
              "/styles.css": `
                .app {
                  padding: 1rem;
                }
              `,
            }}
            theme="dark"
            options={{
              showNavigator: true,
              showTabs: true,
            }}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
