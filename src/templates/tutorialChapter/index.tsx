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
import { QuizType } from "../../components/organisms/ChapterQuiz/";

/** Styles */
import "./tutorial-chapter.css";
import "katex/dist/katex.min.css"
import StyledSection from "../../components/shared/styled/StyledSection";
import StyledAnchor from "../../components/shared/styled/StyledAnchor";
import StyledList from "../../components/shared/styled/StyledList";

const StyledTutorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--spacing-6);

  @media screen and (max-width: 480px) {
  }
`;

const StyledArticleBody = styled.section`
  ${StyledSection}
  ${StyledAnchor}
  ${StyledList}

  ul, ol {
    list-style-position: inside;
    margin-top: var(--spacing-2);
    margin-bottom: var(--spacing-2);
    padding-left: var(--spacing-2);
  }
  
  grid-column: span 9;

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
  const seriesDir = post.fields.slug
    .split("/")
    .filter((str: string) => str !== "")[0]; // e.g. react-native
  const heroImagePattern = allTutorialHeroes.nodes.find((hero: any) => {
    return hero.relativeDirectory === seriesDir;
  });

  const filteredSeriesPosts = allSeriesPosts.nodes.filter((post: any) => {
    return post.frontmatter.chapter !== null;
  });

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
        <HeroImage
          {...{ post, heroImage: heroImagePattern }}
          className="article-hero-img"
        />
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
      <TutorialTOC allSeriesPosts={{ nodes: filteredSeriesPosts }} post={post} />
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
