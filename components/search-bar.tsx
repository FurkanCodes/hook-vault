"use client";
import { Input } from "@/components/ui/input";
import { hooks } from "@/lib/hooks";
import { Hook } from "@/types/types";
import { Link } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [results, setResults] = useState<Hook[]>([]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = hooks.filter((hook) => hook.name.toLowerCase().includes(query.toLowerCase()) || hook.description.toLowerCase().includes(query.toLowerCase()));
    setResults(searchResults);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 relative">
      <Input type="search" placeholder="Search hooks..." className="w-full" onChange={(e) => handleSearch(e.target.value)} />
      {results.length > 0 && (
        <div className="absolute w-full bg-background border rounded-md mt-2 shadow-lg">
          {results.map((hook) => (
            <Link key={hook.id} href={`/docs/hooks/${hook.id}`} className="block p-3 hover:bg-muted">
              <div className="font-medium">{hook.name}</div>
              <div className="text-sm text-muted-foreground">{hook.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
