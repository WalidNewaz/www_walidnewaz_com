import * as React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import HomePageFeatures from "../components/homepageFeature"
import HomePageNewsletter from "../components/homepageNewsletter"
import HomePageMorePosts from "../components/homepagePosts"

import profileImg from "../images/walid-profile.jpeg"

const profile = {
  image: profileImg,
  description: "I'm Walid Newaz, a software engineer who enjoys writing about learning, programming, the outdoors, and my obeservations.",
  detailLink: "#",
  detailLinkLabel: "Read more &gt;"
}

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const featuredPosts = data.allFeaturedPostsJson.nodes

  return (
    <Layout location={location} title={siteTitle}>
      {/* <Bio /> */}
      <HomePageFeatures featuredPosts={featuredPosts} profile={profile} />
      <HomePageNewsletter />
      <HomePageMorePosts posts={posts} />
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allFeaturedPostsJson {
      nodes {
        description
        image
        postDate
        readTime
        tags
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
