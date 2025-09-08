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
  .part-name {
    display: block;
    padding: 0.5rem 0;
    margin: 0.5rem 0rem;
    color: var(--text2);
    font-weight: var(--fontWeight-bold);
  }
  .chapters li {
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
const TutorialToc: React.FC<{ post: any; allSeriesPosts: any; section?: string }> = ({
  post,
  allSeriesPosts,
  section = "tutorials",
}) => {
  const chapters = useMemo(
    () =>
      allSeriesPosts.nodes.reduce((acc: any, article: any) => {
        const { part, chapter, pathDate } = article.frontmatter;
        const articlePath = `/${section}${article.fields?.slug}`;
        if (Object.hasOwn(acc, part)) {
          const currChapter = [
            ...acc[part],
            {
              title: chapter,
              articlePath,
            },
          ];
          return {
            ...acc,
            [part]: currChapter,
          };
        } else {
          acc[part] = [
            {
              title: chapter,
              articlePath,
            },
          ];
        }
        return acc;
      }, {}),
    [allSeriesPosts]
  );

  const seriesName = allSeriesPosts.nodes[0].frontmatter.series;

  return (
    seriesName &&
    seriesName.length > 0 && (
      <StyledSeriesNav>
        <div className="block-header">
          {allSeriesPosts && allSeriesPosts.nodes[0].frontmatter.series}
        </div>
        {/* <h3 className="series-title">
        {allSeriesPosts && allSeriesPosts.nodes[0].frontmatter.series}
      </h3> */}
        {/* <pre>{JSON.stringify(allSeriesPosts, null, 2)}</pre> */}

        <div>
          {chapters && (
            <ol style={{ listStyle: "none" }}>
              {Object.keys(chapters).map((part: string, partIndex: number) => (
                <li key={partIndex}>
                  <span className="part-name">{part}</span>
                  <ol style={{ listStyle: "none" }} className="chapters">
                    {chapters[part].map(
                      (chapter: any, chapterIndex: number) => (
                        <li key={chapterIndex}>
                          {post.frontmatter.chapter === chapter.title ? (
                            <span>{chapter.title}</span>
                          ) : (
                            <a href={chapter.articlePath}>{chapter.title}</a>
                          )}
                        </li>
                      )
                    )}
                  </ol>
                </li>
              ))}
            </ol>
          )}
        </div>
      </StyledSeriesNav>
    )
  );
};

export default TutorialToc;
