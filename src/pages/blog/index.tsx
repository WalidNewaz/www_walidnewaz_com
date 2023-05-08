import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import ArticlePostCard from "../../components/articlePostCard"

const Topics = ({ topics }): any => {
    console.log("Topics", topics)
    const topicList = Object.keys(topics)
    console.log("topicList", topicList)
    return (
        <ul>
            {
                topicList
                    .sort()
                    .map(topic => <li key={topic}><Link to='#'>{topic} ({topics[topic]})</Link></li>)
            }
        </ul>
    )
}

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
    console.log(posts)
    const topics = posts.reduce((topics, post) => {
        const { tags } = post.frontmatter
        
        tags.forEach(tag => {
            if (topics?.[tag]) {
                topics[tag]++
            } else {
                topics = {
                    ...topics,
                    [tag]: 1
                }
            }
        });
        
        return topics
    }, {});

    console.log("topics", topics)

    return (
        <Layout location={location}>
            <div id='blog-page-container'>
                <div id='blog-topics'>
                    <h3>Topics:</h3>
                    <Topics topics={topics} />
                </div>
                <div id='blog-posts'>
                    <h3>Posts:</h3>
                    <div id="posts">
                        <MorePosts posts={posts} />                        
                    </div>
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