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
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from "../../components/mdx/MDXComponents";
import BlogFeedbackSection from "../../components/organisms/BlogFeedbackSection";
import CourseActions from "../../components/tutorial/CourseActions";
import {
  Mapping,
  BooleanString,
  InputPosition,
  Loading,
} from "@giscus/react";

/** Utilities */
import { flattenToc } from "../../utils/templates/flattenToc";

/** Types */
import { QuizType } from "../../components/organisms/ChapterQuiz";

/** Constants */
const GISCUS_USERNAME = process.env.GATSBY_GISCUS_USERNAME || "";
const GISCUS_REPO = process.env.GATSBY_GISCUS_REPO || "";
const GISCUS_REPO_ID = process.env.GATSBY_GISCUS_REPO_ID || "";
const GISCUS_CATEGORY = process.env.GATSBY_GISCUS_CATEGORY || "";
const GISCUS_CATEGORY_ID = process.env.GATSBY_GISCUS_CATEGORY_ID || "";
const GISCUS_MAPPING = process.env.GATSBY_GISCUS_MAPPING || "";
const GISCUS_STRICT = process.env.GATSBY_GISCUS_STRICT || "";
const GISCUS_REACTIONS_ENABLED =
  process.env.GATSBY_GISCUS_REACTIONS_ENABLED || "";
const GISCUS_EMIT_METADATA = process.env.GATSBY_GISCUS_EMIT_METADATA || "";
const GISCUS_INPUT_POSITION = process.env.GATSBY_GISCUS_INPUT_POSITION || "";
const GISCUS_THEME = process.env.GATSBY_GISCUS_THEME || "";
const GISCUS_LANG = process.env.GATSBY_GISCUS_LANG || "";
const GISCUS_LOADING = process.env.GATSBY_GISCUS_LOADING || "";
const GISCUS_TERM = process.env.GATSBY_GISCUS_TERM || "";

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
    post,
    allTutorialHeroes,
    heroImage,
    allSeriesPosts,
    relatedPosts,
  },
  pageContext,
  children,
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

  const headings = flattenToc(post.tableOfContents || {});
  post.headings = headings;

  return (
    <>
      <article
        className="tutorial-chapter"
        itemScope
        itemType="http://schema.org/Article"
        ref={articleBody}
      >
        <HeroImage
          {...{ post, heroImage: heroImagePattern }}
          className="article-hero-img"
        />
        <StyledTutorialGrid>
          <ChapterTOC chapter={post} maxDeth={3} />
          <StyledArticleBody>
            <div className="w-full flex justify-end gap-4">
              <CourseActions
                  githubUrl={post.frontmatter.github_url}
                  colabUrl={post.frontmatter.drive_url}
                  liveDemoUrl={post.frontmatter.live_demo_url}
                />
            </div>
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </StyledArticleBody>
        </StyledTutorialGrid>
        <StyledTutorialGrid>
          <StyledBlankDiv></StyledBlankDiv>
          {pageContext?.quiz && (
            <StyledArticleBody className="chapter-quiz">
              <ChapterQuiz quiz={pageContext.quiz as QuizType} />
            </StyledArticleBody>
          )}
        </StyledTutorialGrid>
        <PostTags tags={post.frontmatter.tags} section="learn/f" />

        <BlogFeedbackSection
          post={post}
          giscusConfig={{
            username: GISCUS_USERNAME,
            repo: GISCUS_REPO,
            repoId: GISCUS_REPO_ID,
            category: GISCUS_CATEGORY,
            categoryId: GISCUS_CATEGORY_ID,
            mapping: GISCUS_MAPPING as Mapping,
            strict: GISCUS_STRICT as BooleanString,
            term: GISCUS_TERM,
            reactionsEnabled: GISCUS_REACTIONS_ENABLED as BooleanString,
            emitMetadata: GISCUS_EMIT_METADATA as BooleanString,
            inputPosition: GISCUS_INPUT_POSITION as InputPosition,
            theme: GISCUS_THEME,
            lang: GISCUS_LANG,
            loading: GISCUS_LOADING as Loading,
          }}
        />
      </article>
      <TutorialTOC
        allSeriesPosts={{ nodes: filteredSeriesPosts }}
        post={post}
        seriesIntro={pageContext?.seriesIntro}
        section="learn"
      />
      <StyledBlogPostNav>
        <ChronologicalNav previous={previous} next={next} section="learn" />
      </StyledBlogPostNav>
    </>
  );
};

export const Head: React.FC<{ data: any }> = ({
  data: { post },
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
    post: mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        series
        part
        chapter
        description
        date(formatString: "MMMM DD, YYYY")
        read_time
        tags
        github_url
        drive_url
        live_demo_url
      }
      tableOfContents
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
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        chapter
        pathDate: date(formatString: "/YYYY/MM/DD")
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
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
    allSeriesPosts: allMdx(
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
    relatedPosts: allMdx(
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
        id
      }
    }
  }
`;
