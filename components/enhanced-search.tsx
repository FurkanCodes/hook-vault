import { useState, useEffect } from "react";
import { hooks } from "@/lib/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { motion, AnimatePresence } from "framer-motion";
import { HookCategory, Hook } from "@/types/types";

export function EnhancedSearch() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<HookCategory[]>([]);
  const [results, setResults] = useState<Hook[]>([]);

  const categories = [...new Set(hooks.map((hook) => hook.category))];

  useEffect(() => {
    const filteredHooks = hooks.filter((hook) => {
      const matchesQuery = query === "" || hook.name.toLowerCase().includes(query.toLowerCase()) || hook.description.toLowerCase().includes(query.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(hook.category);

      return matchesQuery && matchesCategory;
    });

    setResults(filteredHooks);
  }, [query, selectedCategories]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search hooks..." className="flex-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Categories</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c !== category)));
                }}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((hook) => (
            <motion.div key={hook.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-4 border rounded-lg hover:border-primary transition-colors">
              <h3 className="text-lg font-medium mb-2">{hook.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{hook.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{hook.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
