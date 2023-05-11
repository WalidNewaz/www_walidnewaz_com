import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Seo from "../../components/seo"
import ArticlePostCard from "../../components/articlePostCard"

const Topics = ({ topics }): any => {
    const topicList = Object.keys(topics)
    return (
        <ul>
            {
                topicList
                    .sort()
                    .map(topic => <li key={topic}>
                        <Link to={`/blog/${topic}`}>
                            {topic} ({topics[topic]})
                        </Link>
                    </li>)
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

/**
 * Extracts a list of topics from all posts
 * @param posts 
 */
const getTopics = (posts) => posts.reduce((topics, post) => {
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

const BlogPage = ({ data, location }) => {
    const posts = data.allMarkdownRemark.nodes
    const topics = getTopics(posts);

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

export default BlogPage

export const Head = () => <Seo title="All posts" />