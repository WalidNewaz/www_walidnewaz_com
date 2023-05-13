import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Seo from "../components/seo"
import ArticlePostCard from "../components/articlePostCard"
import ArticleWidePostCard from '../components/articleWidePostCard'

/**
 * Renders the featured posts
 * @param params
 * @returns 
 */
const FeaturedPosts: React.FC<{ posts }> = ({ posts }) => {
  if (!posts || posts.length == 0) {
    return <EmptyPosts />
  }
  return (
    posts.map(post => <ArticleWidePostCard
      key={post.id}
      image={post.frontmatter.image}
      title={post.frontmatter.title}
      postDate={post.frontmatter.postDate}
      readTime={post.frontmatter.readTime}
      tags={post.frontmatter.tags}
      description={post.excerpt}
      slug={`/blog${post.fields.slug}`}
    />)
  )
}

/**
 * Renders empty message when no featured posts are available
 * @returns 
 */
const EmptyPosts: React.FC = () => <p>No fatured posts yet.</p>

/**
 * Renders the About Me section of the homepage
 * @param param0 
 * @returns 
 */
const AboutMe: React.FC<{ profileImg }> = ({ profileImg }) => {
  return (
    <div className="section">
      <h2>About Me</h2>
      <GatsbyImage
        image={profileImg.childImageSharp.gatsbyImageData}
        alt="Walid Newaz"
        style={{ float: "left", marginRight: "1rem" }}
      />
      <p>I&apos;m Walid Newaz, a software engineer who enjoys writing about learning,
        programming, the outdoors, and my obeservations.</p>
      <div>
        <Link to="/about">Read More &gt;</Link>
      </div>
    </div>
  )
}

/**
 * Renders the top of the index page containing the featured posts and
 * short bio.
 * @param params
 * @returns 
 */
const HomePageFeatures: React.FC<{ featuredPosts, profileImg }> = ({ featuredPosts, profileImg }) => {
  return (
    <>
      <div id="featured-posts" className="column">
        <h2>Featured Posts</h2>
        <FeaturedPosts posts={featuredPosts} />
      </div>
      <div id="homepage-profile" className="column">
        <AboutMe profileImg={profileImg} />
      </div>
    </>
  )
}

/**
 * Newsletter signup section on the homepage.
 * @returns 
 */
const HomePageNewsletter: React.FC = () => {
  return (
    <div>
      <div>
        <p>Never Miss a New Post.</p>
      </div>
      <div>
        <iframe
          data-w-token="bfcc24aa21ef34249119"
          data-w-type="pop-in"
          frameBorder="0"
          scrolling="yes"
          src="https://07w6k.mjt.lu/wgt/07w6k/z9g/form?c=e9ed7cf1"
          width="100%"
          style={{ height: 0 }}></iframe>
        <iframe
          data-w-token="bfcc24aa21ef34249119"
          data-w-type="trigger"
          frameBorder="0"
          scrolling="no"
          src="https://07w6k.mjt.lu/wgt/07w6k/z9g/trigger?c=590ebb63"
          width="100%"
          style={{ height: '55px' }}></iframe>
      </div>
    </div>
  )
}

/**
 * Populates the homepage more posts section
 * @param params
 * @returns 
 */
const HomePageMorePosts: React.FC<{ posts }> = ({ posts }) => {

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to &quot;content/blog&quot; (or the
        directory you specified for the &quot;gatsby-source-filesystem&quot; plugin in
        gatsby-config.js).
      </p>
    )
  }

  return (
    posts.map(post => <ArticlePostCard
      key={post.id}
      postDate={post.frontmatter.date}
      readTime={post.frontmatter.read_time}
      title={post.frontmatter.title || post.fields.slug}
      image={post.frontmatter.hero_image}
      slug={`/blog${post.fields.slug}`}
      tags={post.frontmatter.tags} />
    )
  )
}

const Index: React.FC<{ data }> = ({ data }) => {
  const posts = data.allPosts.nodes
  const featuredPosts = data.featuredPosts.nodes
  const profileImg = data.profilePhotos

  return (
    <>
      <section id="homepage-features" className="row">
        <HomePageFeatures featuredPosts={featuredPosts} profileImg={profileImg} />
      </section>
      <section id="newsletter-subscribe">
        <HomePageNewsletter />
      </section>
      <section id="more-posts" className="row">
        <h2>More Posts</h2>
        <div id="posts">
          <HomePageMorePosts posts={posts} />
        </div>
      </section>
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
    featuredPosts: allMarkdownRemark(filter: {frontmatter: {featured: {eq: true}}}) {
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
          readTime: read_time
          title
          tags
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
