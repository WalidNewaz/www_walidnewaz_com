import React, { useState } from "react";
import styled from "styled-components";
import { Highlight, themes } from "prism-react-renderer";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useCodeMeta, parseHighlightRanges } from "../../hooks/useCodeMeta";

const StyledPre = styled.pre`
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  margin: 1.25rem 0;
  background: #1e1e1e;
  color: #f8f8f2;
  font-family: var(--font-mono, "Fira Code", monospace);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2d2d2d;
    border-bottom: 1px solid #444;
    padding: 0.6rem 1rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #e6e6e6;
    letter-spacing: 0.02em;
  }

  .header span {
    font-family: var(--font-mono, "Fira Code", monospace);
    font-size: 0.9rem;
    opacity: 0.95;
  }

  button.copy {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, transform 0.1s ease;
  }

  button.copy:hover {
    color: #fff;
    transform: scale(1.1);
  }

  button.copy svg {
    stroke-width: 2.25;
  }

  /* Code body */
  .code-content-wrapper {
    overflow: hidden;
    padding: 1rem;
  }

  .code-body {
    overflow-x: auto;
  }

  code {
    display: block;
    padding: 1rem;
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .line {
    display: block;
    white-space: pre;
  }

  .highlight-line {
    background: rgba(255, 255, 255, 0.12);
    border-left: 3px solid #50fa7b;
  }

  .line span {
    transition: background 0.2s ease;
  }

  /* Line numbers */
  .line-number {
    display: inline-block;
    width: 2em;
    text-align: right;
    margin-right: 1em;
    opacity: 0.45;
    user-select: none;
    color: #888;
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
    <Highlight code={cleanCode.trim()} language={language}>
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
