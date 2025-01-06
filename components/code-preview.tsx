"use client";
import { AppWindow, Code2 } from 'lucide-react';
import { useState } from "react";
import { highlight } from "sugar-high";

const tabs = [
  { id: "hook", label: "useLocalStorage.tsx", icon: Code2 },
  { id: "usage", label: "App.tsx", icon: AppWindow },
];

const codeSnippets = {
  hook: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
  usage: `import { useLocalStorage } from './useLocalStorage';

function App() {
  const [name, setName] = useLocalStorage<string>("name", "");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default App;`,
};

export function CodePreview() {
  const [activeTab, setActiveTab] = useState("hook");

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/10"
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <pre className="p-4 text-sm text-left overflow-x-auto">
          <code
            dangerouslySetInnerHTML={{
              __html: highlight(codeSnippets[activeTab as keyof typeof codeSnippets]),
            }}
          />
        </pre>
       
      </div>
    </div>
  );
}

