"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { highlight } from "sugar-high";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Use sugar-high to highlight the code
  const highlightedCode = highlight(code);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-lg overflow-hidden my-4">
      <button onClick={copyToClipboard} className="absolute right-8 top-8 p-2 rounded-md bg-background/10 hover:bg-background/20 transition-colors dark:bg-[#151550]" >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-white " />}
      </button>
     
      <pre className="p-4  text-sm text-white overflow-x-auto rounded-lg">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </motion.div>
  );
}


