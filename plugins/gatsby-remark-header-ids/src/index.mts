// const visit = require("unist-util-visit")
// const toString = require("mdast-util-to-string")
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import slugify from "slugify";

export default ({ markdownAST }: { markdownAST: any }, pluginOptions: any) => {
  // highlight-next-line
  visit(markdownAST, "heading", (node) => {
    // Do stuff with heading nodes
    let { depth } = node;

    // Grab the innerText of the heading node
    let text = toString(node);

    node.data = {
      hProperties: {
        id: `heading-${depth}-${slugify(
          text.replace(/[\:\.\(\)]/g, "").toLocaleLowerCase()
        )}`,
      },
    };
  });

  return markdownAST;
};
