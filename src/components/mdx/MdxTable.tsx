import React from "react";
import styled from "styled-components";
import { marked } from "marked";

/**
 * Parse GFM table block text into headers, rows, and alignment info.
 * Supports:
 * | Field | Type | Desc |
 * | :--- | :---: | ---: |
 * | left | center | right |
 */
function parseGfmTable(text: string) {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter((line) => /^\s*\|/.test(line));

  if (lines.length < 2) return null;

  const splitRow = (line: string) =>
    line
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim());

  const header = splitRow(lines[0]);
  const alignment = splitRow(lines[1]).map((cell) => {
    if (/^:\s*-+\s*:$/.test(cell)) return "center";
    if (/^:\s*-+/.test(cell)) return "left";
    if (/-+\s*:$/.test(cell)) return "right";
    return "left";
  });
  const bodyLines = lines.slice(2);
  const rows = bodyLines.map(splitRow);

  return { header, rows, alignment };
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.95rem;
  border: 1px solid var(--table-border, #ddd);
  border-radius: 0.5rem;
  overflow: hidden;

  th,
  td {
    border: 1px solid var(--table-border, #ddd);
    padding: 0.6rem 0.8rem;
  }

  thead th {
    background: var(--table-head-bg, #f6f8fa);
    font-weight: 600;
  }

  tbody tr:nth-child(odd) {
    background: var(--table-row-alt, #fafafa);
  }

  code {
    font-family: "Fira Code", monospace;
    background: var(--code-bg, #f2f2f2);
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  a {
    color: var(--link-color, #0366d6);
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    --table-border: #2d2f34;
    --table-head-bg: #1e2024;
    --table-row-alt: #181a1f;
    --code-bg: #24272c;
    --link-color: #4ea3ff;
    color: #e6e6e6;
  }
`;

/**
 * Converts Markdown text into sanitized HTML for cell content.
 * We rely on marked to render inline markdown (bold, italics, links, code).
 */
function renderMarkdownInline(md: string) {
  const html = marked.parseInline(md);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export const MdxTable: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  let text: string | undefined;

  // Case 1: Direct string
  if (typeof children === "string") {
    text = children;
  }

  // Case 2: Array of strings (joined)
  else if (Array.isArray(children)) {
    text = children.join("");
  }

  // Case 3: React element (e.g., <p>...</p>)
  else if (React.isValidElement(children)) {
    const inner = children.props?.children;

    if (typeof inner === "string") {
      text = inner;
    } else if (Array.isArray(inner)) {
      // Safe cast because ReactNode array can contain strings or nodes
      text = (inner as any[]).join("");
    }
  }

  if (typeof text !== "string") {
    console.warn("MdxTable: unexpected children type", children);
    return <pre>{String(children)}</pre>;
  }

  const parsed = parseGfmTable(text);
  if (!parsed) return <pre>{text}</pre>;

  return (
    <StyledTable>
      <thead>
        <tr>
          {parsed.header.map((cell, i) => (
            <th key={i} style={{ textAlign: parsed.alignment[i] }}>
              {renderMarkdownInline(cell)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {parsed.rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ textAlign: parsed.alignment[ci] }}>
                {renderMarkdownInline(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};
