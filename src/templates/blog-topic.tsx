/**
 * This file contains all logic to render individual pages
 * that filter based on the selected topic. The URL path
 * to this page follows the following pattern:
 * 
 * /blog/{topic}
 * 
 * Currently there is no pagination support. 
 */

import * as React from 'react'
import { graphql } from 'gatsby'

import Seo from "../../src/components/seo"
import ArticlePostCard from "../../src/components/articlePostCard"

const Topics: React.FC<{ topics }> = ({ topics }) => {
    const topicList = Object.keys(topics)
    return (
        <ul>
            {
                topicList
                    .sort()
                    .map(topic => <li key={topic}><a href='#'>{topic} ({topics[topic]})</a></li>)
            }
        </ul>
    )
}

const MorePosts: React.FC<{ posts }> = ({ posts }) => {

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

const BlogTopicPage: React.FC<{ data, location }> = ({ data }) => {
    const posts = data.allMarkdownRemark.nodes
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

    return (
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
  }
`

export default BlogTopicPage

export const Head: React.FC = () => <Seo title="All posts" />