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

const Topics = ({ topics }): any => {
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
            postDate={post.frontmatter.date}
            readTime={post.frontmatter.read_time}
            title={post.frontmatter.title || post.fields.slug}
            image={post.frontmatter.hero_image}
            slug={`/blog${post.fields.slug}`}
            tags={post.frontmatter.tags} />
        )
    )
}

const BlogTopicPage = ({ data, location }) => {
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
              hero_image
              tags
              read_time
            }
            id
          }
    }
  }
`

export default BlogTopicPage

export const Head = () => <Seo title="All posts" />