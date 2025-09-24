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

type FrontmatterParseResult = {
  data: Record<string, unknown>;
  body: string;
};

const FRONTMATTER_PATTERN = /^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/;

function coerceFrontmatterValue(value: string): unknown {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    const numeric = Number(trimmed);
    if (Number.isFinite(numeric)) {
      return numeric;
    }
  }

  if (/^(true|false)$/i.test(trimmed)) {
    return trimmed.toLowerCase() === "true";
  }

  return trimmed;
}

function parseFrontmatter(raw: string): FrontmatterParseResult {
  const match = raw.match(FRONTMATTER_PATTERN);

  if (!match) {
    return { data: {}, body: raw.trim() };
  }

  const frontmatterBlock = match[1];
  const rest = raw.slice(match[0].length);

  const data: Record<string, unknown> = {};

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1);

    if (!key) {
      continue;
    }

    data[key] = coerceFrontmatterValue(value);
  }

  return { data, body: rest.trim() };
}

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
    const { data, body } = parseFrontmatter(rawContent);
    const relativePath = deriveRelativePath(path, baseDir);
    const slugSegments = stripExtension(relativePath)
      .split("/")
      .filter(Boolean);
    const slug = slugSegments.at(-1) ?? "";

    return {
      data: data as T,
      body,
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
