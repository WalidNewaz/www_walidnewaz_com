import React, { useState } from "react";
import styled from "styled-components";

/** Components */

/** Types */
type ChapterHeading = {
  value: string;
  depth: number;
  id: string;
};

const StyledTOC = styled.div`
  grid-column: span 3;
  position: sticky;
  top: 5rem;
  max-height: fit-content;
  border: 1px solid black var(--border);
  padding: var(--spacing-6);
  margin-bottom: 6rem;
  border-radius: 0.75rem;
  border-color: hsl(var(--brand-text-hue) 0% 80%);
  border-style: solid;
  border-width: 2px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--heading2);
    font-family: var(--fontFamily-sans);
    font-weight: var(--fontWeight-bold);
    transition: color 300ms linear;
  }

  h1 {
    font-size: 1.5rem;
  }
  ul {
    margin: 0;
  }
  a {
    color: var(--text1);
    font-size: 0.85rem;
    font-family: var(--fontFamily-sans);
    font-weight: var(--fontWeight-bold);
    transition: color 300ms linear;
    max-width: 15rem;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const IndentedHeadings = ({
  headings,
  maxDeth = 2,
}: {
  headings: ChapterHeading[];
  maxDeth?: number;
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      setSelectedId(targetId.substring(1));

      if (targetElement) {
        window.scrollTo({
          top: (targetElement as HTMLElement).offsetTop - 75,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <ul
      style={{
        listStyleType: "disc",
        listStylePosition: "outside",
        listStyle: "none",
        marginLeft: "0",
      }}
    >
      {headings.map((heading: ChapterHeading) => {
        return (
          heading.depth <= maxDeth && (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={handleTOCClick}
                style={{
                  paddingLeft: 1 * (heading.depth - 1) + "rem",
                  ...(selectedId === heading.id && {
                    color: "var(--brand)",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    borderRadius: "0.25rem",
                  }),
                }}
              >
                {heading.value.replaceAll(/<\/?code.*?>/g, "")}
              </a>
            </li>
          )
        );
      })}
    </ul>
  );
};

/**
 * Chapter Table of Contents
 * @param props
 */
const ChapterTOC: React.FC<{ chapter: any; maxDeth?: number }> = ({
  chapter,
  maxDeth,
}) => {
  return (
    <StyledTOC>
      <h1>Table of contents</h1>
      <IndentedHeadings headings={chapter.headings} maxDeth={maxDeth} />
    </StyledTOC>
  );
};

export default ChapterTOC;
