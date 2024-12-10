import React from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-content: space-between;
  list-style: none;
  padding: 0;

  a,
  li {
    color: var(--text1);
  }

  li {
    border-radius: 0.25rem;
    border-width: 1px;
    border-color: var(--surface2-light);
    border-style: solid;
    padding: 0.5rem;
  }
  a {
    text-decoration: none;
  }
  .nav-arrow {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .prev-next {
    font-family: var(--fontFamily-sans);
    text-transform: uppercase;
  }
`;

/**
 * Displays the previous and next blog post links
 * @param params
 * @returns
 */
const ChronologicalNav: React.FC<{ previous: any; next: any }> = ({
  previous,
  next,
}) => (
  <StyledList>
    {previous && (
      <li>
        <a
          href={`/blog${previous.frontmatter.pathDate}${previous.fields.slug}`}
          rel="prev"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div className="nav-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right",
              }}
            >
              <div className="prev-next">Previous</div>
              <span>{previous.frontmatter.title}</span>
            </div>
          </div>
        </a>
      </li>
    )}

    {next && (
      <li>
        <a
          href={`/blog${next.frontmatter.pathDate}${next.fields.slug}`}
          rel="next"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div className="nav-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div className="prev-next">Next</div>
              <span>{next.frontmatter.title}</span>
            </div>
          </div>
        </a>
      </li>
    )}
  </StyledList>
);

export default ChronologicalNav;
