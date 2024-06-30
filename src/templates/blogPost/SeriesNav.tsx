import React, { useMemo } from "react";
import styled from "styled-components";

const StyledSeriesNav = styled.nav`
  background-color: var(--surface2);
  border-radius: 0.25rem;
  margin: 1.25rem 0;
  padding: 1.5rem 1.25rem 1.5rem 2rem;
  font-family: var(--fontFamily-sans);
  font-size: 1rem;

  .block-header {
    color: var(--heading2);
    font-family: var(--fontFamily-sans);
    font-weight: var(--fontWeight-bold);
    font-size: 1.75rem;
    padding: 0.75rem 0;
  }
  .series-title {
    color: var(--heading2);
  }
  .chapter-name {
    display: block;
    padding: 0.5rem 0;
    margin: 0.5rem 0rem;
    color: var(--text2);
    font-weight: var(--fontWeight-bold);
  }
  .articles li {
    overflow: hidden;
    margin-left: 1.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a {
    color: var(--heading1);
  }
`;

/**
 * Navigation for series.
 * @param params
 * @returns 
 */
const SeriesNav: React.FC<{ post: any; allSeriesPosts: any }> = ({
  post,
  allSeriesPosts,
}) => {
  const chapters = useMemo(
    () =>
      allSeriesPosts.nodes.reduce((acc: any, article: any) => {
        const { chapter, title, pathDate } = article.frontmatter;
        const articlePath = `/blog${pathDate}${article.fields?.slug}`;
        if (Object.hasOwn(acc, chapter)) {
          const currChapter = [
            ...acc[chapter],
            {
              title,
              articlePath,
            },
          ];
          return {
            ...acc,
            [chapter]: currChapter,
          };
        } else {
          acc[chapter] = [
            {
              title,
              articlePath,
            },
          ];
        }
        return acc;
      }, {}),
    [allSeriesPosts]
  );

  const seriesName = allSeriesPosts.nodes[0].frontmatter.series;

  return seriesName && seriesName.length > 0 && (
    <StyledSeriesNav>
      <div className="block-header">View all posts in series:</div>
      <h3 className="series-title">
        {allSeriesPosts && allSeriesPosts.nodes[0].frontmatter.series}
      </h3>
      <div>
        {chapters && (
          <ol style={{ listStyle: "none" }}>
            {Object.keys(chapters).map((chapter: string) => (
              <>
                <li>
                  <span className="chapter-name">{chapter}</span>
                  <ol style={{ listStyle: "none" }} className="articles">
                    {chapters[chapter].map((article: any) => (
                      <li>
                        {post.frontmatter.title === article.title ? (
                          <span>{article.title}</span>
                        ) : (
                          <a href={article.articlePath}>{article.title}</a>
                        )}
                      </li>
                    ))}
                  </ol>
                </li>
              </>
            ))}
          </ol>
        )}
      </div>
    </StyledSeriesNav>
  );
};

export default SeriesNav;
