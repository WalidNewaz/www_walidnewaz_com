import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Seo from "../components/seo"
import ArticlePostCard from "../components/articlePostCard"
import ArticleWidePostCard from '../components/articleWidePostCard'

const excerptStr = (post) => (
  post.excerpt.slice(post.headings[0].value.length + 1, post.excerpt.length)
)

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
      title={post.headings[0].value}
      postDate={post.frontmatter.postDate}
      readTime={post.frontmatter.readTime}
      tags={post.frontmatter.tags}
      description={excerptStr(post)}
      slug={`/blog${post.frontmatter.pathDate}${post.fields.slug}`}
    />)
  )
}

/**
 * Renders empty message when no featured posts are available
 * @returns 
 */
const EmptyPosts: React.FC = () => ( <article>
  <p>No fatured posts yet.</p>
  </article> )

/**
 * Renders the About Me section of the homepage
 * @param params
 * @returns 
 */
const AboutMe: React.FC<{ profileImg }> = ({ profileImg }) => {
  return (
    <article className="about inline-flex margin-5 bg-surface-2">
      <GatsbyImage
        image={profileImg.childImageSharp.gatsbyImageData}
        alt="Walid Newaz"
        className="hero margin-5"
      />
      <section className="padding-inline-5">
        <p className="margin-block-0">I&apos;m Walid Newaz, a software engineer who enjoys writing and learning about
          software programming, the outdoors, and common observations.
        </p>
        <p className="padding-block-5 margin-block-0">
          <Link to="/about">Read more about me &gt;</Link>
        </p>
      </section>
    </article>
  )
}

const StyledHomePageFeaturesSection = styled.section`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;

  .featured-posts.col {
    width: 100%;
    flex: 65%;
  }

  .featured-posts h2 {
    margin: 0;
  }

  .profile.col {
    flex: 30%;
  }

  .profile h2 {
    margin: 0;
  }
`

/**
 * Renders the top of the index page containing the featured posts and
 * short bio.
 * @param params
 * @returns 
 */
const HomePageFeatures: React.FC<{ featuredPosts, profileImg }> = ({ featuredPosts, profileImg }) => {
  return (
    <StyledHomePageFeaturesSection className="margin-0 padding-0">
      <section className="featured-posts col">
        <h2>Featured Posts</h2>
        <FeaturedPosts posts={featuredPosts} />
      </section>
      <section className="profile col">
        <h2>About Me</h2>
        <AboutMe profileImg={profileImg} />
      </section>
    </StyledHomePageFeaturesSection>
  )
}

const StyledNewspaperSection = styled.section`
  div {
    display: inline-flex;
    justify-content: space-between;
    align-content: center;
    background-color: #F4F4F4;
    min-height: 4.5rem;
  }

  div>p {
    font-family: var(--font-heading);
    margin: 5px;
    text-align: center;
    padding-left: 35px;
    font-size: 30px;
  }

  iframe[data-w-type="trigger"] {
    height: 105px;
  }
`

/**
 * Newsletter signup section on the homepage.
 * @returns 
 */
const HomePageNewsletter: React.FC = () => {
  return (
    <StyledNewspaperSection>
      <div>
        <p>Never Miss a New Post.</p>
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
            style={{ height: '60px', width: '150px' }}></iframe>
        </div>
      </div>
    </StyledNewspaperSection>
  )
}


/**
 * Populates the homepage more posts section
 * @param params
 * @returns 
 */
const HomePageMorePosts: React.FC<{ posts }> = ({ posts }) => {
  let morePostsText;

  if (posts.length === 0) {
    morePostsText = (
      <article>
        <p>
          No blog posts found. Add markdown posts to &quot;content/blog&quot; (or the
          directory you specified for the &quot;gatsby-source-filesystem&quot; plugin in
          gatsby-config.js).
        </p>
      </article>
    )
  } else {
    morePostsText = posts.map(post => <ArticlePostCard
      key={post.id}
      postDate={post.frontmatter.date}
      readTime={post.frontmatter.read_time}
      title={post.frontmatter.title || post.headings[0].value || post.fields.slug}
      image={post.frontmatter.hero_image}
      slug={`/blog${post.frontmatter.pathDate}${post.fields.slug}`}
      tags={post.frontmatter.tags} />
    )
  }

  return (
    <section>
      <h2 className="margin">More Posts</h2>
      <section className="flex wrap mb-6">
        {morePostsText}
      </section>
    </section>
  )
}

const Index: React.FC<{ data }> = ({ data }) => {
  const posts = data.allPosts.nodes
  const featuredPosts = data.featuredPosts.nodes
  const profileImg = data.profilePhotos

  return (
    <>
      <HomePageFeatures featuredPosts={featuredPosts} profileImg={profileImg} />
      {/* <HomePageNewsletter /> */}
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
