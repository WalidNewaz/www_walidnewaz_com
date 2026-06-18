import React from "react";

/** Utilities */
import { makeHeadingId } from "../../utils/posts";

/**
 * Component that renders a heading (h1, h2, etc.) with a unique ID
 * based on its text content.
 * @param params
 * @returns
 */
export function HeadingWithId({ as: Tag, children, ...props }: any) {
  const depth = Tag.replace("h", "");
  const text =
    typeof children === "string"
      ? children
      : React.Children.toArray(children).join(" ");
  const id = makeHeadingId(depth, text);
  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
}
