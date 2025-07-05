import React, { useState, useEffect } from "react";
import styled from "styled-components";

/** Components */
import { FaBars, FaXmark } from "react-icons/fa6";

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
    color: rgb(63 63 70);
    font-family: var(--fontFamily-sans);
    font-weight: var(--fontWeight-bold);
    transition: color 300ms linear;
  }

  h1 {
    font-size: 1.5rem;
    padding-top: 0.25rem;
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
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media screen and (min-width: 800px) and (max-width: 975px) {
    grid-column: span 4;
  }

  @media screen and (min-width: 480px) and (max-width: 800px) {
    grid-column: span 4;
  }

  @media screen and (max-width: 480px) {
    grid-column: span 12;
    margin-bottom: 0;
    background-color: rgb(226 232 240);
    z-index: 2;
    top: 3.65rem;
    border-radius: 0;

    h1 {
      margin: 0;
    }

    @media screen and (prefers-color-scheme: dark) {
      background-color: rgb(16 23 34);

      h1 {
        color: rgb(191 191 191);
      }
    }
  }

  @media screen and (prefers-color-scheme: dark) {
    h1 {
      color: rgb(191 191 191);
    }
  }
`;

const StyledHanburgerMenu = styled.div`
  display: none;

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    margin-top: -0.25rem;
    margin-right: -0.25rem;
  }

  @media screen and (max-width: 480px) {
    display: block;
  }
`;

/** Styles */

type clickHandler =
  | ((
      event: React.MouseEvent<
        HTMLAnchorElement | HTMLButtonElement | HTMLDivElement
      >
    ) => void)
  | (() => Promise<void>)
  | (() => void)
  | undefined;

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: clickHandler;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => (
  <StyledHanburgerMenu id="chapter-ham-menu">
    <button onClick={onClick} aria-label="Toggle menu">
      <span className="hamburger-label">Open main menu</span>
      <FaBars
        className={`icon ${isOpen ? "text-indigo-600" : "text-slate-100"}`}
        aria-label="Toggle icon"
      />
    </button>
  </StyledHanburgerMenu>
);

const StyledHeadings = styled.ul`
  list-style-type: disc;
  list-style-position: outside;
  list-style: none;
  margin-left: 0;
  margin-top: 1rem !important;
`;

const IndentedHeadings: React.FC<{
  headings: ChapterHeading[];
  maxDeth?: number;
  isOpen?: boolean;
}> = ({ headings, maxDeth = 2, isOpen = false }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      setSelectedId(targetId.substring(1));

      if (targetElement) {
        window.scrollTo({
          top: (targetElement as HTMLElement).offsetTop - (isOpen ? 175 : 75),
          behavior: "smooth",
        });
      }
    }
  };

  return (
    isOpen && (
      <StyledHeadings>
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
                  {heading.value.replace(/(<\/?code.*?>|&lt;|&gt;|<|>)/g, "")}
                </a>
              </li>
            )
          );
        })}
      </StyledHeadings>
    )
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
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  function getHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

  useEffect(() => {
    if (getWidth() > 480) {
      setIsOpen(true);
    }

    const handleResize = () => {
      if (getWidth() > 480) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledTOC>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Chapter Outline</h1>
        <HamburgerMenu isOpen={false} onClick={() => toggleMenu()} />
      </div>
      <IndentedHeadings
        headings={chapter.headings}
        maxDeth={maxDeth}
        isOpen={isOpen}
      />
    </StyledTOC>
  );
};

export default ChapterTOC;
