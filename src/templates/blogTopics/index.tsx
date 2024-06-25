/**
 * This file contains all logic to render individual pages
 * that filter based on the selected topic. The URL path
 * to this page follows the following pattern:
 *
 * /blog/{topic}
 *
 * Currently there is no pagination support.
 */

import * as React from "react";
import { graphql, PageProps } from "gatsby";
import styled from "styled-components";

/** Components */
import Seo from "../../components/seo";
import MorePosts from "../../components/MorePosts";
import Topics from "./Topics";

/**
 * Counts the number of each topic and maps them
 * @param postTopics
 * @returns
 */
const mapTopicsCount = (postTopics: PostTopic[]) =>
  postTopics.reduce((topics: Record<string, number>, post) => {
    const { tags } = post.frontmatter;

    tags.forEach((tag) => {
      if (topics?.[tag]) {
        topics[tag]++;
      } else {
        topics = {
          ...topics,
          [tag]: 1,
        };
      }
    });

    return topics;
  }, {});

const BlogPostContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

type PostTopic = {
  frontmatter: {
    tags: string[];
  };
};

type AllPosts = {
  allPosts: {
    posts: {
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        date: string;
        pathDate: string;
        title: string;
        description: string;
        hero_image: {
          id: string;
          childImageSharp: {
            gatsbyImageData: any;
          };
        };
        tags: string[];
        read_time: string;
      };
      headings: {
        value: string;
      }[];
      id: string;
    }[];
  };
  postTopics: {
    nodes: PostTopic[];
  };
};

type PageContext = {
  topic: string;
};

/**
 * Page template for displaying all posts for a selected topic
 * @param params
 * @returns 
 */
const BlogTopicPage: React.FC<PageProps<AllPosts, PageContext>> = ({
  data,
  pageContext,
}) => {
  const { posts } = data.allPosts;
  const { postTopics } = data;
  const { topic } = pageContext;

  return (
    <BlogPostContainer>
      <Topics topics={mapTopicsCount(postTopics.nodes)} currentTopic={topic} />
      <MorePosts posts={posts} />
    </BlogPostContainer>
  );
};

// Queries the blog directory for selected topics
export const pageQuery = graphql`
  query ($topic: String) {
    allPosts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { eq: $topic } } }
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
        headings(depth: h1) {
          value
        }
        id
      }
    }
    postTopics: allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { tags: { eq: $topic } } }
    ) {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`;

export default BlogTopicPage;

export const Head: React.FC = () => <Seo title="All posts" />;
