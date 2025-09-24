import matter from "gray-matter";

export type MarkdownEntry<T> = {
  data: T;
  body: string;
  slug: string;
  path: string;
  relativePath: string;
  segments: string[];
};

type OrderLike = "order" | "weight" | "position";
const ORDER_KEYS: OrderLike[] = ["order", "weight", "position"];

function normalizePath(path: string): string {
  return path.replace(/\\+/g, "/");
}

function stripExtension(path: string): string {
  return path.replace(/\.(md|mdx)$/i, "");
}

function stripLeadingSlash(path: string): string {
  return path.replace(/^\//, "");
}

function removePrefix(path: string, prefix: string): string {
  if (!prefix) return path;
  const normalisedPath = path.startsWith(prefix) ? path.slice(prefix.length) : path;
  return stripLeadingSlash(normalisedPath);
}

function deriveRelativePath(fullPath: string, baseDir: string): string {
  const normalised = normalizePath(fullPath);
  if (baseDir) {
    const normalisedBase = normalizePath(baseDir).replace(/\/$/, "");
    const withoutBase = removePrefix(normalised, normalisedBase);
    if (withoutBase !== normalised) {
      return withoutBase;
    }
  }

  const srcPagesPrefix = normalizePath("/src/pages");
  const withoutSrcPages = removePrefix(normalised, srcPagesPrefix);
  return withoutSrcPages;
}

export function parseMarkdownCollection<T>(
  files: Record<string, string>,
  options?: { baseDir?: string },
): MarkdownEntry<T>[] {
  const baseDir = options?.baseDir ?? "";

  return Object.entries(files).map(([path, rawContent]) => {
    const { data, content } = matter(rawContent);
    const relativePath = deriveRelativePath(path, baseDir);
    const slugSegments = stripExtension(relativePath)
      .split("/")
      .filter(Boolean);
    const slug = slugSegments.at(-1) ?? "";

    return {
      data: data as T,
      body: content.trim(),
      slug,
      path,
      relativePath,
      segments: slugSegments,
    };
  });
}

function getOrderValue(data: unknown): number {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    for (const key of ORDER_KEYS) {
      const value = record[key];
      if (typeof value === "number" && Number.isFinite(value)) {
        return value;
      }
    }
  }

  return Number.POSITIVE_INFINITY;
}

export function sortByFrontmatterOrder<T>(entries: MarkdownEntry<T>[]): MarkdownEntry<T>[] {
  return [...entries].sort((a, b) => {
    const orderA = getOrderValue(a.data);
    const orderB = getOrderValue(b.data);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.slug.localeCompare(b.slug);
  });
}
