import React, { useState } from "react";
import styled from "styled-components";
import { Highlight, themes } from "prism-react-renderer";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useCodeMeta, parseHighlightRanges } from "../../hooks/useCodeMeta";

const StyledPre = styled.pre`
  position: relative;
  border-radius: 0.5rem 0.5rem 0 0;
  overflow: hidden;
  margin: 1.25rem 0;
  background: #1e1e1e;
  color: #f8f8f2;
  font-family: var(--font-mono, "Fira Code", monospace);
  background: #f5f5f7;
  color: #222;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 0.95rem;

  /* === DARK MODE === */
  @media (prefers-color-scheme: dark) {
    background: #1e1e1e;
    color: #f8f8f2;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }

  /* === HEADER === */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #eaeaea;
    border-bottom: 1px solid #ccc;
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #333;
    letter-spacing: 0.02em;

    @media (prefers-color-scheme: dark) {
      background: #2b2b2b;
      border-bottom: 1px solid #444;
      color: #e6e6e6;
    }
  }

  .header span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono, "Fira Code", monospace);
    font-size: 0.9rem;
    opacity: 0.95;
    overflow-x: auto;
  }

  .header span::before {
    content: "📜";
    // opacity: 0.9;
    font-size: 1.1rem;
    // filter: brightness(0.4); /* makes emoji darker in light mode */
    margin-right: 0.3em;

    @media (prefers-color-scheme: dark) {
      filter: brightness(1.2); /* lightens emoji for dark backgrounds */
    }
  }

  /* === COPY BUTTON === */
  button.copy {
    background: transparent;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, transform 0.1s ease;

    @media (prefers-color-scheme: dark) {
      color: #bbb;
    }
  }

  button.copy:hover {
    color: #fff;
    transform: scale(1.1);

    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }

  button.copy svg {
    stroke-width: 2.25;
  }

  /* === CODE BODY === */
  .code-content-wrapper {
    // overflow: hidden;
    padding: 1rem;
    max-height: 24rem;
    overflow: auto;
  }

  .code-body {
    // overflow-x: auto;
    // overflow-y: auto;
  }

  code {
    display: block;
    padding: 1rem;
    font-size: 0.9rem;
    line-height: 1.55;
  }

  /* === LINE LAYOUT === */
  .line {
    display: flex;            /* allows line number + code alignment */
    align-items: baseline;
    min-width: 100%;          /* ensures line background stretches full width */
  }

  .line span {
    transition: background 0.2s ease;
  }

  /* === LINE NUMBERS === */
  .line-number {
    display: inline-block;
    width: 2em;
    text-align: right;
    margin-right: 1em;
    opacity: 0.45;
    user-select: none;
    color: #888;
  }

  /* === HIGHLIGHTED LINES === */
  .highlight-line {
    background: rgba(255, 255, 255, 0.12);
    border-left: 3px solid #50fa7b;
    width: 100%;              /* extra safeguard */
    
    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.12);
      border-left: 3px solid #50fa7b;
    }
  }

  /* === SCROLLBAR === */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;

    @media (prefers-color-scheme: dark) {
      background: #444;
    }
  }
`;


export const CodeBlock: React.FC<any> = ({ className, children }) => {
  const language = className?.replace(/language-/, "") || "text";
  const { meta, cleanCode } = useCodeMeta(children);
  const usedCode = Object.keys(meta).length ? cleanCode : children;

  const highlighted = parseHighlightRanges(meta.highlight);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(usedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Highlight code={usedCode.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <StyledPre style={style}>
          <div className="header">
            <span>{meta.file || language}</span>
            {meta.copy !== false && (
              <button className="copy" onClick={handleCopy}>
                {copied ? <FiCheck /> : <FiCopy />}
              </button>
            )}
          </div>

          <div className="code-content-wrapper">
            <div className="code-body">
              {tokens.map((line, i) => {
                const lineNumber = i + 1;
                const isHighlighted = highlighted.includes(lineNumber);

                const lineProps = getLineProps({ line, key: i });
                const mergedClassName = [
                  lineProps.className,
                  "line",
                  isHighlighted && "highlight-line",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={i}
                    {...lineProps} className={mergedClassName}
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
            </div>
          </div>


        </StyledPre>
      )}
    </Highlight>
  );
};
