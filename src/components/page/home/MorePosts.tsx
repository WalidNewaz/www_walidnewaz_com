import * as React from 'react';

/** Components */
import ArticlePostCard from '../../articlePostCard';

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
      <h2
        className='margin'
        style={{
          margin: '0 1.25rem',
        }}
      >
        More Posts
      </h2>
      <section className='flex wrap mb-6'>{morePostsText}</section>
    </section>
  );
};

export default MorePosts;
