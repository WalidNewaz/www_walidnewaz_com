/**
 * This file contains all logic to render individual pages
 * that filter based on the selected topic. The URL path
 * to this page follows the following pattern:
 *
 * /blog/{topic}
 *
 * Currently there is no pagination support.
 */

import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

/** Components */
import Seo from '../../src/components/seo';
import Pill from '../../src/components/pill';
import ContentRibbon from '../../src/components/ContentRibbon/ContentRibbon';
import MorePosts from '../../src/components/MorePosts';

const Topics: React.FC<{ topics; currentTopic }> = ({
  topics,
  currentTopic,
}) => {
  const topicList = Object.keys(topics);
  const linksText = topicList
    .sort()
    .map((topic) => (
      <Pill
        key={topic}
        topic={topic}
        count={topics[topic]}
        currentTopic={currentTopic}
        style={{ margin: '0.25rem' }}
      />
    ));
  const showContent = true;

  return (
    <section
      className='border-color-heading2 border-block-end-dashed border-thin'
      style={{ width: '100%', paddingBottom: '1rem' }}
    >
      <ContentRibbon
        className={`transition-opacity duration-500 h-[28rem] md:h-[20rem] lg:h-[21rem] dt_small:h-[22rem] ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
        scrollContainerClassName='h-[28rem] md:h-[20rem] lg:h-[21rem] dt_small:h-[22rem] gap-6'
      >
        <Pill topic='All' style={{ margin: '0.25rem' }} />
        {linksText}
      </ContentRibbon>
    </section>
  );
};

/**
 * Counts the number of each topic and maps them
 * @param postTopics
 * @returns
 */
const mapTopicsCount = (postTopics) =>
  postTopics.reduce((topics, post) => {
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

const BlogTopicPage: React.FC<{ data; location; pageContext }> = ({
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

export const Head: React.FC = () => <Seo title='All posts' />;
