import React from "react";
import styled, { css } from "styled-components";

type CalloutType = "note" | "tip" | "warning" | "info" | "default";

const calloutColors: Record<CalloutType, { bg: string; border: string; icon: string }> = {
  note: { bg: "var(--surface4, #f5f9ff)", border: "var(--note-border, #0070f3)", icon: "📝" },
  tip: { bg: "var(--surface4, #f6fff8)", border: "var(--tip-border, #22c55e)", icon: "💡" },
  warning: { bg: "var(--surface4, #fff8e1)", border: "var(--warn-border, #facc15)", icon: "⚠️" },
  info: { bg: "var(--surface4, #eef6ff)", border: "var(--info-border, #0ea5e9)", icon: "ℹ️" },
  default: { bg: "var(--surface4, #f5f5f5)", border: "var(--border, #ccc)", icon: "💬" },
};

/**
 * Styled outer blockquote wrapper.
 * Provides margin, border, and subtle shadow to visually separate notes.
 */
const StyledBlockquote = styled.blockquote<{ $type: CalloutType }>`
  ${({ $type }) => {
    const colors = calloutColors[$type];
    return css`
      margin: 1.5rem 0;
      padding: 0;
      border-left: 5px solid ${colors.border};
      border-radius: var(--borderRadius-lg);
      overflow: hidden;
      background: none;
      background: ${colors.bg};

      p {
        padding: 1rem 1.2rem;
        border-radius: 1rem;
        margin: 0 !important;
        line-height: 1.6;
        color: var(--text, #222);
        position: relative;

        &::before {
          content: "${colors.icon}";
          font-size: 1.2rem;
          margin-right: 0.5rem;
          display: inline-block;
        }

        @media (prefers-color-scheme: dark) {
          color: var(--text-dark, #eee);
        }
      }

      @media (prefers-color-scheme: dark) {
        background: color-mix(in srgb, ${colors.bg} 70%, #111);
      }
    `;
  }}
`;

/**
 * Detects the callout type (Note, Tip, Warning, Info) from the first paragraph.
 */
const detectCalloutType = (children: React.ReactNode): CalloutType => {
  if (!children) return "default";

  const text = React.Children.toArray(children)
    .map((child) =>
      typeof child === "string"
        ? child
        : React.isValidElement(child)
        ? String((child.props.children || "")).trim()
        : ""
    )
    .join(" ")
    .trim()
    .toLowerCase();

  if (text.startsWith("note:")) return "note";
  if (text.startsWith("tip:")) return "tip";
  if (text.startsWith("warning:")) return "warning";
  if (text.startsWith("info:")) return "info";
  return "default";
};

const removePrefixFromText = (text: string): string => {
  return text.replace(/^(Note|Tip|Warning|Info)\:\s*/igm, "").trim();
};

/**
 * MDX-compatible blockquote replacement.
 * This replaces the default <blockquote> tag in MDX rendering.
 */
export const MdxBlockquote: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const type = detectCalloutType(children);

  // Remove the "Note:", "Tip:" etc. prefix if present
  const cleanedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (typeof child.props.children === "string") {
      return React.cloneElement(child, {
        children: removePrefixFromText(child.props.children),
      });
    } else if (Array.isArray(child.props.children)) {
      const newChildren = child.props.children.map((grandChild: any, index: number) => {
        if (typeof grandChild === "string" && index === 0) {
          return removePrefixFromText(grandChild);
        }
        return grandChild;
      });
      return React.cloneElement(child, {
        children: newChildren,
      });
    }
    return child;
  });

  return <StyledBlockquote $type={type}>{cleanedChildren}</StyledBlockquote>;
};
