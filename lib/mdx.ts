"use server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Hook } from "@/types/types";

export async function getMdxHooks() {
  const hooksDirectory = path.join(process.cwd(), "hooks");
  const hookFolders = fs.readdirSync(hooksDirectory);

  return hookFolders.map((folder) => {
    const mdxPath = path.join(hooksDirectory, folder, "index.mdx");
    const fileContents = fs.readFileSync(mdxPath, "utf8");
    const { data } = matter(fileContents);

    return {
      id: folder,
      name: data.name,
      category: data.category,
      description: data.description,
      code: data.code,
      usage: data.usage,
      parameters: data.parameters,
      returnValue: data.returnValue,
      bestPractices: data.bestPractices,
      pitfalls: data.pitfalls,
      examples: data.examples,
      performance: data.performance,
    } as Hook;
  });
}
