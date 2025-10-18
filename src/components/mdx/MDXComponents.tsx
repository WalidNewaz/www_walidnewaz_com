import React from "react";
import { CodeBlock } from "./CodeBlock";
import { HeadingWithId } from "./HeadingWithId";
import { InlineCode } from "./InlineCode";

/**
 * MDXComponents — custom renderers for MDX elements
 *
 * - h1–h6 → HeadingWithId (adds automatic IDs)
 * - pre   → intercepts <pre><code>...</code></pre> and passes metastring to CodeBlock
 */
export const MDXComponents = {
  h1: (props: any) => <HeadingWithId as="h1" {...props} />,
  h2: (props: any) => <HeadingWithId as="h2" {...props} />,
  h3: (props: any) => <HeadingWithId as="h3" {...props} />,
  h4: (props: any) => <HeadingWithId as="h4" {...props} />,
  h5: (props: any) => <HeadingWithId as="h5" {...props} />,
  h6: (props: any) => <HeadingWithId as="h6" {...props} />,

  /**
   * The <pre> wrapper allows us to extract meta info from fenced code blocks.
   * Example MDX input:
   * ```python {1,3-4} showLineNumbers
   * print("Hello")
   * ```
   */
  pre: (preProps: any) => {
    const { children, ...rest } = preProps;

    // If the direct child is a <code> block (which it will be for MDX code fences)
    if (children?.props?.className) {
      const { className, children: codeString, metastring } = children.props;

      return (
        <CodeBlock className={className} metastring={metastring} {...rest}>
          {codeString}
        </CodeBlock>
      );
    }

    // Otherwise, render <pre> normally
    return <pre {...rest}>{children}</pre>;
  },
  code: (props: any) => <InlineCode {...props} />,
};
