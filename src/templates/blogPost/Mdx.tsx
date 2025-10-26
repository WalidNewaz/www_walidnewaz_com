import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import HeroImage from "../../components/article/HeroImage";
import ArticleHeader from "../../components/article/ArticleHeader";
import ChronologicalNav from "../../components/article/ChronologicalNav";
import PostTags from "../../components/article/PostTags";
import SeriesNav from "../../components/article/SeriesNav";
import RelatedPosts from "./RelatedPosts";
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from "../../components/mdx/MDXComponents";

/** Styles */
import "./blog-post.css";
import StyledSection from "../../components/shared/styled/StyledSection";
import StyledAnchor from "../../components/shared/styled/StyledAnchor";
import StyledList from "../../components/shared/styled/StyledList";

const StyledArticleBody = styled.section`
  ${StyledSection}
  ${StyledAnchor}
  ${StyledList}
`;

const StyledBlogPostNav = styled.nav`
  margin-top: 1.25rem;

  ul {
    margin: var(--spacing-0);
  }
`;

/**
 * Component used to display the blog post
 * @param params
 * @returns
 */
const BlogPostTemplate: React.FC<any> = ({
  data: {
    previous,
    next,
    post,
    heroImage,
    allSeriesPosts,
    relatedPosts,
  },
  pageContext,
  children,
}) => {
  // const { posts } = relatedPosts;

  console.log("children:", children);

  return (
    <>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <ArticleHeader>
          {/* <h1 itemProp="headline">{post.frontmatter.title}</h1> */}
          <div
            className="article-post-date"
            style={{
              fontFamily: "var(--fontFamily-sans)",
              fontSize: "var(--fontSize-1)",
            }}
          >
            {post.frontmatter.date}
          </div>
          <div
            className="article-read-time"
            style={{
              fontFamily: "var(--fontFamily-sans)",
              fontSize: "var(--fontSize-1)",
            }}
          >
            {post.frontmatter.read_time} read
          </div>
        </ArticleHeader>
        <HeroImage {...{ post, heroImage }} className="article-hero-img" />
        <StyledArticleBody>
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </StyledArticleBody>
        {/* <StyledArticleBody
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        /> */}
        {/* <PostTags tags={post.frontmatter.tags} /> */}
      </article>
      {/* <SeriesNav allSeriesPosts={allSeriesPosts} post={post} /> */}
      <StyledBlogPostNav>
        <ChronologicalNav previous={previous} next={next} />
        {/* <RelatedPosts posts={posts} /> */}
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

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $heroImagePattern: String
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
        series
        chapter
        title
        date(formatString: "MMMM DD, YYYY")
        description
        read_time
        hero_image {
          id
          base
          childImageSharp {
            gatsbyImageData
          }
        }
        tags
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        pathDate: date(formatString: "/YYYY/MM/DD")
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        pathDate: date(formatString: "/YYYY/MM/DD")
      }
    }
    heroImage: file(relativePath: { regex: $heroImagePattern }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;
