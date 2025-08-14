// const visit = require("unist-util-visit")
// const toString = require("mdast-util-to-string")
// import { visit } from "unist-util-visit";
// import { toString } from "mdast-util-to-string";
// import slugify from "slugify";

import type { Root, Table } from "mdast";
import type { Parent, Literal } from "unist";
import { visit } from "unist-util-visit";
import { toHast } from "mdast-util-to-hast";
import { toHtml } from "hast-util-to-html";

interface PluginOptions {
  /** Optional CSS class for the wrapper div. Defaults to "table-container". */
  containerClass?: string;
}

/**
 * Gatsby Remark plugin: wrap Markdown tables in a <div class="table-container">…</div>
 * so they can scroll horizontally on small screens.
 *
 * Requires GFM to be enabled upstream so pipe tables become `mdast` `table` nodes.
 * - For gatsby-transformer-remark: add `gatsby-remark-gfm`
 * - For gatsby-plugin-mdx: add `remark-gfm`
 */
export default ({ markdownAST }: { markdownAST: Root }, pluginOptions: PluginOptions = {}): Root => {
  const containerClass = pluginOptions.containerClass || "table-container";

  visit(markdownAST, "table", (node: Table, index: number | undefined, parent: Parent | undefined) => {
    if (parent === undefined || index === undefined) return;

    // Convert mdast `table` -> hast -> HTML string
    const tableHast = toHast(node, { allowDangerousHtml: true });
    const tableHtml = toHtml(tableHast as any, { allowDangerousHtml: true });

    // Replace with an HTML node that wraps the table
    const htmlNode: Literal & { type: "html" } = {
      type: "html",
      value: `<div class="${containerClass}">${tableHtml}</div>`,
    };

    parent.children[index] = htmlNode as any;
  });

  return markdownAST;
};
