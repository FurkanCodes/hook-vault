import { Metadata, ParsedContent } from "@/types/types";
import fs from "fs/promises";
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

async function getMDXFiles(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir);
  return files.filter((file) => path.extname(file) === ".mdx");
}

async function readMDXFile(filePath: string): Promise<ParsedContent & { slug: string }> {
  const rawContent = await fs.readFile(filePath, "utf-8");
  const { metadata, content } = parseFrontmatter(rawContent);
  const slug = path.basename(filePath, path.extname(filePath));

  return {
    metadata,
    slug,
    content,
  };
}

export async function getAllHooks(): Promise<Array<ParsedContent & { slug: string }>> {
  const postsDirectory = path.join(process.cwd(), "content");
  const mdxFiles = await getMDXFiles(postsDirectory);

  const hooks = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(postsDirectory, file);
      return await readMDXFile(filePath);
    })
  );

  return hooks;
}