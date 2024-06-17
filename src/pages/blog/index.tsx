import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

/** Components */
import Seo from '../../components/seo';
import ArticlePostCard from '../../components/articlePostCard';
import Pill from '../../components/pill';
import ContentRibbon from '../../components/ContentRibbon/ContentRibbon';

/**
 * Generate the topics section on the blogs main page
 */
const Topics: React.FC<{ topics }> = ({ topics }) => {
  const topicList = Object.keys(topics);
  const linksText = topicList
    .sort()
    .map((topic) => (
      <Pill
        key={topic}
        topic={topic}
        count={topics[topic]}
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

const BlogPosts = styled.section`
  width: 100%;
  padding: var(--spacing-4) var(--spacing-0) var(--spacing-4) var(--spacing-0);

  h2 {
    margin: 0 1.25rem;
  }

  @media (max-width: 940px) {
    padding: var(--spacing-4) var(--spacing-0);
  }
`;

/**
 * Generate all posts in blog main page
 */
const MorePosts: React.FC<{ posts }> = ({ posts }) => {
  let postsText;

  if (posts.length === 0) {
    postsText = (
      <article>
        <p>
          No blog posts found. Add markdown posts to &quot;content/blog&quot;
          (or the directory you specified for the
          &quot;gatsby-source-filesystem&quot; plugin in gatsby-config.js).
        </p>
      </article>
    );
  } else {
    postsText = posts.map((post) => (
      <ArticlePostCard
        key={post.id}
        postDate={post.frontmatter.date}
        readTime={post.frontmatter.read_time}
        title={
          post.frontmatter.title || post.headings[0].value || post.fields.slug
        }
        image={post.frontmatter.hero_image}
        slug={`/blog${post.frontmatter.pathDate}${post.fields.slug}`}
        tags={post.frontmatter.tags}
      />
    ));
  }

  return (
    <BlogPosts>
      <h2>Posts:</h2>
      <section className='flex wrap my-6'>{postsText}</section>
    </BlogPosts>
  );
};

/**
 * Extracts a list of topics from all posts
 * @param posts
 */
const getTopics = (posts) =>
  posts.reduce((topics, post) => {
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

const BlogPage: React.FC<{ data; location }> = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <section className='flex flex-column wrap flex-start'>
      <Topics topics={getTopics(posts)} />
      <MorePosts posts={posts} />
    </section>
  );
};

// Queries the blog directory for file names
export const query = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
  }
`;

export default BlogPage;

export const Head: React.FC = () => <Seo title='All posts' />;
