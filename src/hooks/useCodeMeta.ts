/**
 * Universal metadata header parser for multi-language code blocks.
 * Supports:
 *  - /** ... *\/   (JS, Java, C, Go, PHP)
 *  - /* ... *\/    (CSS)
 *  - """ ... """   (Python)
 *  - ''' ... '''   (Python)
 *  - # lines       (Python, Bash)
 *  - -- lines      (SQL)
 *  - <!-- ... -->  (HTML/XML)
 *  - /// lines     (Rust, C# doc comments)
 *  - // lines      (C-like)
 */

export interface CodeMeta {
  [key: string]: any;
  file?: string;
  showLineNumbers?: boolean;
  highlight?: string;
  copy?: boolean;
  exec?: boolean;
}

/**
 * Extracts @key: value directives from the first comment block.
 */
export function useCodeMeta(rawCode: string): {
  meta: CodeMeta;
  cleanCode: string;
} {
  if (!rawCode) return { meta: {}, cleanCode: "" };

  const meta: CodeMeta = {};
  let header = "";
  let cleanCode = rawCode;

  // Common top-comment regex patterns
  const patterns: { type: string; regex: RegExp }[] = [
    { type: "jsdoc", regex: /^\/\*\*([\s\S]*?)\*\/\n?/ }, // /** ... */
    { type: "css", regex: /^\/\*([\s\S]*?)\*\/\n?/ } /* ... */,
    { type: "py-doc", regex: /^"""\s*([\s\S]*?)\s*"""\n?/ }, // """ ... """
    { type: "py-doc-alt", regex: /^'''\s*([\s\S]*?)\s*'''\n?/ }, // ''' ... '''
    { type: "hash", regex: /^(#.*\n)+/ }, // # ...
    { type: "sql", regex: /^(--.*\n)+/ }, // -- ...
    { type: "html", regex: /^<!--([\s\S]*?)-->\n?/ }, // <!-- ... -->
    { type: "triple-slash", regex: /^(\/\/\/.*\n)+/ }, // /// ...
    { type: "slash", regex: /^(\/\/.*\n)+/ }, // // ...
  ];

  // Try matching the first recognized comment pattern
  for (const { type, regex } of patterns) {
    const match = rawCode.match(regex);
    if (!match) continue;

    // Extract the inner content (for block comments)
    if (
      type === "hash" ||
      type === "sql" ||
      type === "slash" ||
      type === "triple-slash"
    ) {
      header = match[0];
    } else {
      header = match[1] || "";
    }

    // 🔧 Normalize line prefixes (handles *, #, --, //, etc.)
    header = header
      .split("\n")
      .map((line) =>
        line
          // remove leading comment markers and asterisks
          .replace(/^\s*(\*|#|\/\/\/?|--|<!--|-->)+\s?/, "")
          // trim whitespace
          .trim()
      )
      .filter(Boolean)
      .join("\n");

    cleanCode = rawCode.replace(regex, ""); // remove header from source
    break;
  }

  // Parse the header lines
  if (header) {
    const lines = header.split("\n").map((l) => l.trim());
    for (const line of lines) {
      if (!line.startsWith("@")) continue;
      const [, key, value] = line.match(/^@([\w-]+)\s*:? ?(.+)?$/) || [];
      if (key) {
        const normalizedKey = key.trim();
        let normalizedValue: any = true;

        if (value) {
          const val = value.trim().toLowerCase();
          if (["false", "no"].includes(val)) normalizedValue = false;
          else if (["true", "yes"].includes(val)) normalizedValue = true;
          else normalizedValue = value.trim();
        }

        meta[normalizedKey] = normalizedValue;
      }
    }
  }

  return { meta, cleanCode };
}

/**
 * Parses highlight ranges like "1,3-5" into an array of line numbers.
 */
export function parseHighlightRanges(raw?: string): number[] {
  if (!raw) return [];
  const lines: number[] = [];
  raw.split(",").forEach((range) => {
    if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      for (let i = start; i <= end; i++) lines.push(i);
    } else {
      const n = Number(range);
      if (!isNaN(n)) lines.push(n);
    }
  });
  return lines;
}
