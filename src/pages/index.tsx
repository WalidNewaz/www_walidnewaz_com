import * as React from "react"
import { graphql } from "gatsby"

/** Components */
import Seo from "../components/seo"
import HomePageFeatures from '../components/page/home/HomePageFeatures'
import HomePageMorePosts from '../components/page/home/MorePosts'

/**
 * This is the homepage of the blog
 * @param params
 * @returns 
 */
const Index: React.FC<{ data }> = ({ data }) => {
  const posts = data.allPosts.nodes
  const featuredPosts = data.featuredPosts.nodes
  const profileImg = data.profilePhotos

  return (
    <>
      <HomePageFeatures featuredPosts={featuredPosts} profileImg={profileImg} />
      <HomePageMorePosts posts={posts} />
    </>
  )
}

export default Index

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head: React.FC = () => <Seo title="Home" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    featuredPosts: allMarkdownRemark(filter: {frontmatter: {featured: {eq: true}}}, limit: 2) {
      nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          image: hero_image {
            id
            childImageSharp {
              gatsbyImageData
            }
          }
          postDate: date(formatString: "MMMM DD, YYYY")
          pathDate: date(formatString: "/YYYY/MM/DD")
          readTime: read_time
          title
          tags
        }
        headings(depth: h1) {
          value
        }
      }
    }
    allPosts: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
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
    profilePhotos: file(relativePath: {regex: "/walid-profile.jpeg/"}) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
