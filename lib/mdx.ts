import { Metadata, ParsedContent } from "@/types/types";
import fs from "fs";

import path from "path";

function parseFrontmatter(fileContent: string): ParsedContent {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("No frontmatter found in the MDX file");
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");

    if (key.trim() === "tags") {
      metadata.tags = value.split(",").map((tag) => tag.trim());
    } else {
      metadata[key.trim() as keyof Metadata] = value;
    }
  });

  return {
    metadata: metadata as Metadata,
    content,
  };
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string): ParsedContent & { slug: string } {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { metadata, content } = parseFrontmatter(rawContent);
  const slug = path.basename(filePath, path.extname(filePath));

  return {
    metadata,
    slug,
    content,
  };
}

export function getAllHooks() {
  const postsDirectory = path.join(process.cwd(), "content");
  const mdxFiles = getMDXFiles(postsDirectory);

  return mdxFiles.map((file) => {
    return readMDXFile(path.join(postsDirectory, file));
  });
}
export function getFormattedHooks() {
  const mdxHooks = getAllHooks();

  return mdxHooks.map((hook) => ({
    id: hook.slug,
    name: hook.metadata.title,
    category: hook.metadata.category,
    description: hook.metadata.description,
  }));
}
