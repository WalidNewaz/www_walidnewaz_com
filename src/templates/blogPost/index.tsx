import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import HeroImage from "./HeroImage";
import ArticleHeader from "./ArticleHeader";
import ChronologicalNav from "./ChronologicalNav";
import PostTags from "./PostTags";
import SeriesNav from "./SeriesNav";
import RelatedPosts from "./RelatedPosts";

/** Styles */
import "./blog-post.css";

const StyledArticleBody = styled.section`
  p {
    margin-bottom: var(--spacing-6);
  }

  a,
  li {
    color: var(--text1);
  }

  img {
    border-radius: 0.25rem;
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
  }
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
const BlogPostTemplate: React.FC<{ data: any }> = ({
  data: {
    previous,
    next,
    markdownRemark: post,
    heroImage,
    allSeriesPosts,
    relatedPosts,
  },
}) => {
  const { posts } = relatedPosts;

  return (
    <>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <ArticleHeader>
          {/* <h1 itemProp="headline">{post.frontmatter.title}</h1> */}
          <div className="article-post-date">{post.frontmatter.date}</div>
          <div className="article-read-time">
            {post.frontmatter.read_time} read
          </div>
        </ArticleHeader>
        <HeroImage {...{ post, heroImage }} className="article-hero-img" />
        <StyledArticleBody
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <PostTags tags={post.frontmatter.tags} />
      </article>
      <SeriesNav allSeriesPosts={allSeriesPosts} post={post} />
      <StyledBlogPostNav>
        <ChronologicalNav previous={previous} next={next} />
        <RelatedPosts posts={posts} />
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

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
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
        series
        chapter
        title
        date(formatString: "MMMM DD, YYYY")
        description
        read_time
        hero_image {
          id
          childImageSharp {
            gatsbyImageData
          }
        }
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        pathDate: date(formatString: "/YYYY/MM/DD")
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
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
    allSeriesPosts: allMarkdownRemark(
      sort: { frontmatter: { date: ASC } }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      nodes {
        frontmatter {
          series
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
          hero_image {
            id
            childImageSharp {
              gatsbyImageData
            }
          }
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
