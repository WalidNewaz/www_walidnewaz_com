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
    underline-offset: 2px;
    text-decoration-thickness: 2px;
    text-decoration-color: var(--heading1);
  }

  a:hover {
    text-decoration: underline;
    text-decoration-color: var(--heading1);
  }
`;

/**
 * Navigation for series.
 * @param params
 * @returns
 */
const TutorialToc: React.FC<{
  post: any;
  allSeriesPosts: any;
  seriesIntro?: any;
  isIntro?: boolean;
  section?: string;
}> = ({
  post,
  allSeriesPosts,
  seriesIntro,
  isIntro,
  section = "tutorials",
}) => {
  const chapters = useMemo(
    () =>
      allSeriesPosts.nodes.reduce((acc: any, article: any) => {
        const { part, chapter } = article.frontmatter;
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
  const seriesIntroLink = seriesIntro
    ? `/${section}${seriesIntro.fields?.slug}`
    : null;

  return (
    seriesName &&
    seriesName.length > 0 && (
      <StyledSeriesNav>
        <div className="block-header">
          {allSeriesPosts && allSeriesPosts.nodes[0].frontmatter.series}
        </div>

        {seriesIntro && (
          <div className="series-intro">
            <a href={seriesIntroLink!}>
              <h4
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: isIntro ? "bold" : "normal",
                  backgroundColor: isIntro ? "var(--surface3)" : "transparent",
                  borderRadius: isIntro ? "0.25rem" : "none",
                  padding: isIntro ? "0.25rem 0.5rem" : "0",
                }}
              >
                Introduction
              </h4>
            </a>
          </div>
        )}

        <div>
          {chapters && (
            <ol style={{ listStyle: "none" }}>
              {Object.keys(chapters).map((part: string, partIndex: number) => (
                <li key={partIndex}>
                  <span className="part-name">{part}</span>
                  <ol style={{ listStyle: "none" }} className="chapters">
                    {chapters[part].map((chapter: any, chapterIndex: number) =>
                      post.frontmatter.chapter === chapter.title ? (
                        <li
                          key={chapterIndex}
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "var(--surface3)",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "0.25rem",
                          }}
                        >
                          <span>{chapter.title}</span>
                        </li>
                      ) : (
                        <li key={chapterIndex}>
                          <a href={chapter.articlePath}>{chapter.title}</a>
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
