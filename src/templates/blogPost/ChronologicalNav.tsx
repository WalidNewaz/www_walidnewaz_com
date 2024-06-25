import React from 'react';
import { Link } from "gatsby";

/**
 * Displays the previous and next blog post links
 * @param params
 * @returns 
 */
const ChronologicalNav: React.FC<{ previous: any; next: any }> = ({
  previous,
  next,
}) => (
  <ul
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
  </ul>
);

export default ChronologicalNav;