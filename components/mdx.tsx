import { useMemo } from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { motion } from "framer-motion";
import { CodeBlock } from "./code-block";
import { HookPlayground } from "./hook-playground";
import { ExampleProps, ParameterProps, ParsedContent } from "@/types/types";

function CustomMDX(props: React.JSX.IntrinsicAttributes & MDXRemoteProps & { hook?: ParsedContent }) {
  const components = useMemo(
    () => ({
      motion,
      CodeBlock,
      HookPlayground: (hpProps: any) => (
        <section className="mb-6">
          <HookPlayground hook={props.hook} {...hpProps} />
        </section>
      ),
      h1: (props: any) => <h1 className="text-4xl font-bold mb-4" {...props} />,
      h2: (props: any) => <h2 className="text-2xl font-semibold mb-4" {...props} />,
      h3: (props: any) => <h3 className="text-xl font-medium mb-2" {...props} />,
      p: (props: any) => <p className="text-xl text-muted-foreground mb-8" {...props} />,
      Parameter: ({ name, type, required, description }: ParameterProps) => (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{name}</span>
            <span className="text-sm text-muted-foreground">{type}</span>
            {required && <span className="text-sm text-red-500">required</span>}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      ),
      ParameterList: (props: any) => (
        <section className="mb-6">
          <div className="space-y-4" {...props} />
        </section>
      ),
      ExampleBlock: ({ title, description, code }: ExampleProps) => (
        <section className="mb-6">
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <CodeBlock code={code} />
        </section>
      ),
      BestPractices: (props: any) => (
        <section className="mb-6">
          <ul className="list-disc pl-6 space-y-2" {...props} />
        </section>
      ),
      BestPracticeItem: (props: any) => <li className="text-muted-foreground" {...props} />,
      Performance: (props: any) => (
        <section className="mb-6">
          <ul className="list-disc pl-6 space-y-2" {...props} />
        </section>
      ),
      PerformanceItem: (props: any) => <li className="text-muted-foreground" {...props} />,
      section: (props: any) => <section className="mb-8" {...props} />,
    }),
    [props.hook]
  );

  return <MDXRemote {...props} components={components} />;
}

export default CustomMDX;