import * as React from 'react';

/** Components */
import EmptyPosts from './EmptyPosts';
import ArticleWidePostCard from '../../articleWidePostCard';

const excerptStr = (post: any) =>
  post.excerpt.slice(post.frontmatter.title.length + 1, post.excerpt.length);

interface FeaturedPostsProps {
  posts: any[];
}

/**
 * Renders the featured posts
 * @param params
 * @returns
 */
const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  if (!posts || posts.length == 0) {
    return <EmptyPosts />;
  }
  return posts.map((post) => (
    <ArticleWidePostCard
      key={post.id}
      image={post.frontmatter.image}
      title={post.frontmatter.title}
      postDate={post.frontmatter.postDate}
      readTime={post.frontmatter.readTime}
      tags={post.frontmatter.tags}
      description={post.excerpt}
      slug={`/blog${post.frontmatter.pathDate}${post.fields.slug}`}
    />
  ));
};

export default FeaturedPosts;
