import React from "react";
import { Highlight, themes } from "prism-react-renderer";
// import theme from "prism-react-renderer/themes/nightOwl";

/** Styles */
import "./code-block.css";


export const CodeBlock = ({ className, children }: any) => {
  const language = className?.replace(/language-/, "") || "bash";
  return (
    <Highlight code={children.trim()} language={language} theme={themes.nightOwl}>
      {({ style, tokens, getLineProps, getTokenProps }: any) => (
        <pre style={{ ...style, padding: "1em", borderRadius: "0.5rem" }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
