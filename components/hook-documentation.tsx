"use client";
import { CodeBlock } from "@/components/code-block";
import { Hook } from "@/types/types";
import { motion } from "framer-motion";

interface HookDocumentationProps {
  hook: Hook;
}

export function HookDocumentation({ hook }: HookDocumentationProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-4">{hook.name}</h1>
      <p className="text-xl text-muted-foreground mb-8">{hook.description}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <CodeBlock code={hook.code} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Parameters</h2>
        <div className="space-y-4">
          {hook.parameters.map((param) => (
            <div key={param.name} className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{param.name}</span>
                <span className="text-sm text-muted-foreground">{param.type}</span>
                {param.required && <span className="text-sm text-red-500">required</span>}
              </div>
              <p className="text-sm text-muted-foreground">{param.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        {hook.examples.map((example) => (
          <div key={example.title} className="mb-6">
            <h3 className="text-xl font-medium mb-2">{example.title}</h3>
            <p className="text-muted-foreground mb-4">{example.description}</p>
            <CodeBlock code={example.code} />
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <ul className="list-disc pl-6 space-y-2">
          {hook.bestPractices.map((practice) => (
            <li key={practice} className="text-muted-foreground">
              {practice}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Performance Considerations</h2>
        <ul className="list-disc pl-6 space-y-2">
          {hook.performance.map((item) => (
            <li key={item} className="text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}
