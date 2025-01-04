import { useCallback, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface LiveEditorProps {
  code: string;
  onResult: (result: any) => void;
}

export function LiveEditor({ code, onResult }: LiveEditorProps) {
  const [editorContent, setEditorContent] = useState(code);

  const handleRun = useCallback(() => {
    try {
      // Safety: Only allow certain hooks to be executed
      const allowedHooks = ["useState", "useEffect", "useRef", "useCallback", "useMemo"];
      const sanitizedCode = editorContent.replace(/use[A-Z]\w+/g, (match) => (allowedHooks.includes(match) ? match : "/* blocked */"));

      const result = new Function(`
        return function() {
          const React = require('react');
          const { ${allowedHooks.join(", ")} } = React;
          ${sanitizedCode}
          return { result: eval(${JSON.stringify(sanitizedCode)}) };
        }
      `)();

      onResult(result);
      toast({
        title: "Code executed successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error executing code",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [editorContent, onResult]);

  return (
    <div className="space-y-4">
      <Editor
        height="400px"
        defaultLanguage="typescript"
        defaultValue={code}
        onChange={(val) => setEditorContent(val || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
      <Button onClick={handleRun}>Run Code</Button>
    </div>
  );
}
