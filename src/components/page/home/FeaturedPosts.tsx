import * as React from 'react';

/** Components */
import EmptyPosts from './EmptyPosts';
import ArticleWidePostCard from '../../articleWidePostCard';

const excerptStr = (post) =>
  post.excerpt.slice(post.headings[0].value.length + 1, post.excerpt.length);

/**
 * Renders the featured posts
 * @param params
 * @returns
 */
const FeaturedPosts: React.FC<{ posts }> = ({ posts }) => {
  if (!posts || posts.length == 0) {
    return <EmptyPosts />;
  }
  return posts.map((post) => (
    <ArticleWidePostCard
      key={post.id}
      image={post.frontmatter.image}
      title={post.headings[0].value}
      postDate={post.frontmatter.postDate}
      readTime={post.frontmatter.readTime}
      tags={post.frontmatter.tags}
      description={excerptStr(post)}
      slug={`/blog${post.frontmatter.pathDate}${post.fields.slug}`}
    />
  ));
};

export default FeaturedPosts;
