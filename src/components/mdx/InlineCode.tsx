import React from "react";
import styled from "styled-components";

const StyledCode = styled.code`
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: var(--font-mono, "Fira Code", monospace);
  font-size: 0.9em;
  color: #c7254e;
  background-color: #f9f2f4;

  @media (prefers-color-scheme: dark) {
    color: #ff79c6;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const InlineCode = ({ children, ...props }: any) => {
  // Check if the element has *no attributes* other than children
  const hasExtraAttributes = Object.keys(props).length > 0;

  if (hasExtraAttributes) {
    // Render as-is (e.g. MDX code fences or plugins)
    return <code {...props}>{children}</code>;
  }

  // Otherwise, force class="language-text" and styled presentation
  return (
    <StyledCode className="language-text">
      {children}
    </StyledCode>
  );
};
