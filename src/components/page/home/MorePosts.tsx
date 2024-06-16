import * as React from 'react';
import styled from 'styled-components';

/** Components */
import ArticlePostCard from '../../articlePostCard';

const StyledHeading = styled.h2`
  margin: 0 1.25rem;
`;
const StyledMorePosts = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  margin-left: 0.5rem;
`;

/**
 * Populates the homepage more posts section
 * @param params
 * @returns
 */
const MorePosts: React.FC<{ posts }> = ({ posts }) => {
  let morePostsText;

  if (posts.length === 0) {
    morePostsText = (
      <article>
        <p>
          No blog posts found. Add markdown posts to &quot;content/blog&quot;
          (or the directory you specified for the
          &quot;gatsby-source-filesystem&quot; plugin in gatsby-config.js).
        </p>
      </article>
    );
  } else {
    morePostsText = posts.map((post) => (
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
    <section>
      <StyledHeading>More Posts</StyledHeading>
      <StyledMorePosts>{morePostsText}</StyledMorePosts>
    </section>
  );
};

export default MorePosts;
