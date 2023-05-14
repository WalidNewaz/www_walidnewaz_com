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
import { Link, graphql } from 'gatsby'

import Seo from "../../src/components/seo"
import ArticlePostCard from "../../src/components/articlePostCard"

const Topics: React.FC<{ topics, currentTopic }> = ({ topics, currentTopic }) => {
    const topicList = Object.keys(topics)
    return (
        <ul>
            {
                topicList
                    .sort()
                    .map(topic => <li key={topic}>
                        {
                            topic === currentTopic
                                ? <strong>{topic} ({topics[topic]})</strong>
                                : <Link to={`/blog/${topic}`}>{topic} ({topics[topic]})</Link>
                        }
                    </li>)
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

/**
 * Counts the number of each topic and maps them
 * @param postTopics 
 * @returns 
 */
const mapTopicsCount = (postTopics) => postTopics.reduce((topics, post) => {
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

const BlogTopicPage: React.FC<{ data, location, pageContext }> = ({ data, pageContext }) => {
    const { posts } = data.allPosts
    const { postTopics } = data
    const { topic } = pageContext
    const topics = mapTopicsCount(postTopics.nodes)

    return (
        <div id='blog-page-container'>
            <div id='blog-topics'>
                <h3>Topics:</h3>
                <Topics topics={topics} currentTopic={topic} />
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

// Queries the blog directory for selected topics
export const pageQuery = graphql`
  query ($topic: String) {
    allPosts: allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {eq: $topic}}}
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
        id
      }
    }
    postTopics: allMarkdownRemark(limit: 1000) {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`

export default BlogTopicPage

export const Head: React.FC = () => <Seo title="All posts" />