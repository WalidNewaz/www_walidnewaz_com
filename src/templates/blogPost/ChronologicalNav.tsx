import React from 'react';
import { Link } from "gatsby";
import styled from "styled-components";

const StyledList = styled.ul`
  a, li {
    color: var(--text1);
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
  <StyledList
    style={{
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-between`,
      listStyle: `none`,
      padding: 0,
    }}
  >
    <li>
      {previous && (
        <Link
          to={`/blog${previous.frontmatter.pathDate}${previous.fields.slug}`}
          rel="prev"
        >
          ← {previous.frontmatter.title}
        </Link>
      )}
    </li>
    <li>
      {next && (
        <Link
          to={`/blog${next.frontmatter.pathDate}${next.fields.slug}`}
          rel="next"
        >
          {next.frontmatter.title} →
        </Link>
      )}
    </li>
  </StyledList>
);

export default ChronologicalNav;