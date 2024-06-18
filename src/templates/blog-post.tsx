import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

/** Components */
import Seo from '../components/seo';
import MorePosts from '../components/MorePosts';

import './blog-post.css';

const StyledArticleBody = styled.section`
  p {
    margin-bottom: var(--spacing-6);
  }

  img {
    border-radius: 0.25rem;
  }

  li::before {
    content: '';
    margin-left: 0.25rem;
  }
`;

const HeroImage: React.FC<{ post; heroImage }> = ({ post, heroImage }) =>
  !heroImage ? null : (
    <GatsbyImage
      image={heroImage.childImageSharp.gatsbyImageData}
      alt={post.frontmatter.title}
      style={{ height: '300px', marginBottom: '25px', borderRadius: '0.25rem' }}
    />
  );

const ArticleHeader = styled.header`
  div.article-header {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-4) var(--spacing-0) var(--spacing-4) var(--spacing-0);
  }
`;

const BlogPostContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const BlogPostTemplate: React.FC<{ data: any }> = ({
  data: { previous, next, markdownRemark: post, heroImage, relatedPosts },
}) => {
  const { posts } = relatedPosts;
  console.log('posts', posts);
  return (
    <>
      <article
        className='blog-post'
        itemScope
        itemType='http://schema.org/Article'
      >
        <ArticleHeader>
          {/* <h1 itemProp="headline">{post.frontmatter.title}</h1> */}
          <div className='article-header'>
            <div className='article-post-date'>{post.frontmatter.date}</div>
            <div className='article-read-time'>
              {post.frontmatter.read_time} read
            </div>
          </div>
        </ArticleHeader>
        <section>
          <HeroImage {...{ post, heroImage }} />
        </section>
        <StyledArticleBody
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp='articleBody'
        />
        {/* <hr /> */}
        {/* <footer> */}
        {/* <Bio /> */}
        {/* </footer> */}
      </article>
      <nav className='blog-post-nav'>
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
                rel='prev'
              >
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link
                to={`/blog${next.frontmatter.pathDate}${next.fields.slug}`}
                rel='next'
              >
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        {relatedPosts && posts.length > 0 && (
          <>
            <MorePosts posts={posts} heading={`You may also like`} />
          </>
        )}
      </nav>
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
