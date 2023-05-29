import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from 'styled-components'

import Seo from "../components/seo"

const HeroImage: React.FC<{ post, heroImage }> = ({ post, heroImage }) => (
  !heroImage ? null : (
    <GatsbyImage
      image={heroImage.childImageSharp.gatsbyImageData}
      alt={post.frontmatter.title}
      style={{ height: "300px", marginBottom: "25px" }}
    />
  )
)

const ArticleHeader = styled.header`
  div {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-4) var(--spacing-0) var(--spacing-4) var(--spacing-4);
  }  
`

const BlogPostTemplate: React.FC<{ data }> = ({
  data: { previous, next, markdownRemark: post, heroImage },
}) => {

  return (
    <>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <ArticleHeader>
          {/* <h1 itemProp="headline">{post.frontmatter.title}</h1> */}
          <div>
            <div className="article-post-date">{post.frontmatter.date}</div>
            <div className="article-read-time">{post.frontmatter.read_time} read</div>
          </div>
        </ArticleHeader>
        <section>
          <HeroImage {...{post, heroImage}} />
        </section>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        {/* <hr /> */}
        {/* <footer> */}
          {/* <Bio /> */}
        {/* </footer> */}
      </article>
      <nav className="blog-post-nav">
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
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  )
}

export const Head: React.FC<{ data }> = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

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
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    heroImage: file(relativePath: {regex: $heroImagePattern}) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
