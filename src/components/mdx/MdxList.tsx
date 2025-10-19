import React from "react";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    .checkbox {
      width: 1em;
      height: 1em;
      margin-right: 0.5em;
      border: 2px solid var(--border, #ccc);
      border-radius: 3px;
      display: inline-block;
      text-align: center;
      line-height: 1em;
      font-weight: bold;
      font-size: 0.8em;
    }

    .checked {
      background: var(--accent, #0070f3);
      color: white;
      border-color: var(--accent, #0070f3);
    }
  }

  li.check-list-item:before {
    content: none !important;
  }
`;

export const MdxUl: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const processedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const inner = child.props.children;
    console.log("Processing list item:", inner);
    let textContent = "";
    if (!inner[0].startsWith("[") || !inner[0].endsWith("] ")) {
      return child;
    }

    // Normalize to array for consistent handling
    const innerArray = React.Children.toArray(inner);

    if (innerArray.length === 0) return child;

    // Find first string token
    const first = innerArray[0];
    const firstStr = typeof first === "string" ? first.trim() : "";

    // Match [ ] or [x] at beginning
    const match = firstStr.match(/^\[( |x|X)\]\s*$/);
    if (!match) return child;

    const isChecked = match[1].toLowerCase() === "x";

    // Drop the checkbox token (first string)
    const remaining = innerArray.slice(1);

    return (
      <li className="check-list-item">
        <span className={`checkbox ${isChecked ? "checked" : ""}`}>
          {isChecked ? "✓" : ""}
        </span>
        {remaining}
      </li>
    );
  });

  return <StyledUl>{processedChildren}</StyledUl>;
};
