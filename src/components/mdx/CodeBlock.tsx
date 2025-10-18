import React, { useState } from "react";
import styled from "styled-components";
import { Highlight, themes } from "prism-react-renderer";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useCodeMeta, parseHighlightRanges } from "../../hooks/useCodeMeta";

const StyledPre = styled.pre`
  position: relative;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  background: #1e1e1e;
  color: white;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    font-family: var(--font-mono);
    margin-bottom: 0.5rem;
    opacity: 0.85;
  }

  .line {
    display: block;
    white-space: pre;
  }

  .highlight-line {
    background: rgba(255, 255, 255, 0.1);
  }

  button.copy {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

export const CodeBlock: React.FC<any> = ({ className, children }) => {
  const language = className?.replace(/language-/, "") || "text";
  const { meta, cleanCode } = useCodeMeta(children);
  // console.log('children', children, 'meta', meta);

  const highlighted = parseHighlightRanges(meta.highlight);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Highlight theme={themes.dracula} code={cleanCode.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <StyledPre style={style}>
          <div className="header">
            <span>{meta.file || language}</span>
            {meta.copy && (
              <button className="copy" onClick={handleCopy}>
                {copied ? <FiCheck /> : <FiCopy />}
              </button>
            )}
          </div>

          {tokens.map((line, i) => {
            const lineNumber = i + 1;
            const isHighlighted = highlighted.includes(lineNumber);

            return (
              <div
                key={i}
                className={`line ${isHighlighted ? "highlight-line" : ""}`}
                {...getLineProps({ line, key: i })}
              >
                {meta.showLineNumbers && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "2em",
                      opacity: 0.4,
                      userSelect: "none",
                    }}
                  >
                    {lineNumber}
                  </span>
                )}
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </StyledPre>
      )}
    </Highlight>
  );
};
