import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import ArticlePostCard from "../../components/articlePostCard"

const Topics = ({ posts }) => (
    posts.map(post => <p key={post.id}>{post.frontmatter.title}</p>)
)

const MorePosts = ({ posts }) => {

    if (posts.length === 0) {
      return (
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      )
    }
  
    return (
      posts.map(post => <ArticlePostCard
        key={post.id}
        postDate={post.frontmatter.post_date}
        readTime={post.frontmatter.read_time}
        title={post.frontmatter.title || post.fields.slug}
        image={post.frontmatter.hero_image}
        slug={post.fields.slug}
        tags={post.frontmatter.tags} />
      )
    )
  }

const BlogPage = ({ data }) => {
    const posts = data.allMarkdownRemark.nodes

    return (
        <Layout location={location}>
            <div id='blog-page-container'>
                <div id='blog-topics'>
                    <h3>Topics:</h3>
                </div>
                <div id='blog-posts'>
                    <h3>Posts:</h3>
                    <MorePosts posts={posts} />
                </div>
            </div>
        </Layout>
    )
}

// Queries the blog directory for file names
export const query = graphql`
  {
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
        nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              hero_image
              tags
              post_date
              read_time
            }
            id
          }
    }
  }
`

export default BlogPage

export const Head = () => <Seo title="All posts" />