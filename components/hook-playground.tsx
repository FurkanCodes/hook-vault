"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Card } from "./ui/card";
import { Hook } from "@/types/types";

const Sandpack = dynamic(
  () => import("@codesandbox/sandpack-react").then((mod) => mod.Sandpack),
  { ssr: false }
);

function generateSandpackCode(hook: Hook): string {
  return `import React from 'react';
import {useState, useEffect, useRef, useCallback} from 'react';
// Hook Definition
${hook.code}

// Example Usage
${hook.examples?.[0]?.code || ""}
`;
}

interface HookPlaygroundProps {
  hook: Hook;
}

export function HookPlayground({ hook }: HookPlaygroundProps) {
  const sandpackCode = useMemo(() => generateSandpackCode(hook), [hook]);

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
              "/App.tsx": sandpackCode,
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