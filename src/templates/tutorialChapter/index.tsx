import React, { useRef, useEffect, useState } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import ArticleHeader from "../../components/article/ArticleHeader";
import HeroImage from "../../components/article/HeroImage";
import PostTags from "../../components/article/PostTags";
import ChronologicalNav from "../../components/tutorial/ChronologicalNav";
import ChapterTOC from "../../components/tutorial/ChapterTOC";
import TutorialTOC from "../../components/tutorial/TutorialTOC";
import ChapterQuiz from "../../components/organisms/ChapterQuiz";

/** Types */
type ChapterHeading = {
  value: string;
  depth: number;
  id: string;
};
import { QuizType } from "../../components/organisms/ChapterQuiz/";

/** Styles */
import "./tutorial-chapter.css";

const StyledTutorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--spacing-6);

  @media screen and (max-width: 480px) {
  }
`;

const StyledArticleBody = styled.section`
  grid-column: span 9;

  p {
    margin-top: var(--spacing-2);
    margin-bottom: var(--spacing-2);
  }

  a,
  li {
    color: var(--text1);
    font-family: var(--fontFamily-sans);
  }

  img {
    border-radius: 0.25rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul, ol {
    list-style-position: inside;
    margin-top: var(--spacing-2);
    margin-bottom: var(--spacing-2);
    padding-left: var(--spacing-2);
  }

  li::before {
    content: "";
    margin-left: 0.25rem;
  }

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
    margin-bottom: var(--spacing-6);
  }

  h1 {
    font-size: var(--fontSize-5);
    margin-top: var(--spacing-8);
  }

  h2 {
    font-size: var(--fontSize-4);
    margin-top: var(--spacing-6);
  }

  h3 {
    font-size: var(--fontSize-3);
    margin-top: var(--spacing-5);
  }

  h4 {
    font-size: var(--fontSize-2);
    margin-top: var(--spacing-4);
  }

  h5 {
    font-size: var(--fontSize-1);
    margin-top: var(--spacing-3);
  }

  @media screen and (min-width: 800px) and (max-width: 975px) {
    grid-column: span 8;
  }

  @media screen and (min-width: 480px) and (max-width: 800px) {
    grid-column: span 8;
  }

  @media screen and (max-width: 480px) {
    grid-column: span 12;
  }
`;

const StyledBlogPostNav = styled.nav`
  margin-top: 1.25rem;

  ul {
    margin: var(--spacing-0);
  }
`;

const StyledBlankDiv = styled.div`
  grid-column: span 3;
  @media screen and (min-width: 800px) and (max-width: 975px) {
    grid-column: span 4;
  }

  @media screen and (min-width: 480px) and (max-width: 800px) {
    grid-column: span 4;
  }

  @media screen and (max-width: 480px) {
    grid-column: span 12;
  }
`;

/**
 * Component used to display a tutorial chapter
 * @param params
 * @returns
 */
const TutorialChapter: React.FC<any> = ({
  data: {
    previous,
    next,
    markdownRemark: post,
    allTutorialHeroes,
    heroImage,
    allSeriesPosts,
    relatedPosts,
  },
  pageContext,
}) => {
  const articleBody = useRef<HTMLDivElement>(null);
  const seriesDir = post.fields.slug.split("/").filter((str: string) => str !== "")[0]; // e.g. react-native
  const heroImagePattern = allTutorialHeroes.nodes.find((hero: any) => {
    return hero.relativeDirectory === seriesDir;
  });
  // console.log(pageContext);
  // console.log("Quiz:", pageContext?.quiz);

  // Scroll to top of article when navigating to a new page
  useEffect(() => {
    if (articleBody.current) {
      articleBody.current.scrollIntoView();
    }
  }, [post.id]);

  return (
    <>
      <article
        className="tutorial-chapter"
        itemScope
        itemType="http://schema.org/Article"
        ref={articleBody}
      >
        {/* <ArticleHeader>
          <div className="article-post-date">{post.frontmatter.date}</div>
          <div className="article-read-time">
            {post.frontmatter.read_time} read
          </div>
        </ArticleHeader> */}
        <HeroImage {...{ post, heroImage: heroImagePattern }} className="article-hero-img" />
        <StyledTutorialGrid>
          <ChapterTOC chapter={post} maxDeth={3} />
          <StyledArticleBody
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />

        </StyledTutorialGrid>
        <StyledTutorialGrid>
          <StyledBlankDiv></StyledBlankDiv>
          {pageContext?.quiz && (
            <StyledArticleBody className="chapter-quiz">
              <ChapterQuiz quiz={pageContext.quiz as QuizType} />
            </StyledArticleBody>
          )}
        </StyledTutorialGrid>
        {/* <PostTags tags={post.frontmatter.tags} /> */}
      </article>
      <TutorialTOC allSeriesPosts={allSeriesPosts} post={post} />
      <StyledBlogPostNav>
        <ChronologicalNav previous={previous} next={next} />
      </StyledBlogPostNav>
    </>
  );
};

export const Head: React.FC<{ data: any }> = ({
  data: { markdownRemark: post },
}) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  );
};

export default TutorialChapter;

export const pageQuery = graphql`
  query TutorialChapterBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $series: String
    $heroImagePattern: String
    $related: [String]
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        series
        part
        chapter
        description
        date(formatString: "MMMM DD, YYYY")
        read_time
        tags
      }
      headings {
        value
        depth
        id
      }
      fields {
        slug
      }
    }
    allTutorialHeroes: allFile(
      filter: { relativePath: { regex: ".*/hero-image.png$/" } }
    ) {
      nodes {
        id
        relativeDirectory
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        chapter
        pathDate: date(formatString: "/YYYY/MM/DD")
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        chapter
        pathDate: date(formatString: "/YYYY/MM/DD")
      }
    }
    heroImage: file(relativePath: { regex: $heroImagePattern }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    allSeriesPosts: allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      nodes {
        frontmatter {
          series
          part
          chapter
          tags
          title
          description
          pathDate: date(formatString: "/YYYY/MM/DD")
        }
        fields {
          slug
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { title: { in: $related } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      posts: nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          pathDate: date(formatString: "/YYYY/MM/DD")
          title
          description
          tags
          read_time
        }
        headings(depth: h1) {
          value
        }
        id
      }
    }
  }
`;
