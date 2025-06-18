import React from "react";

/** Components */
import ArticlePostCard from "../molecules/articlePostCard";

const ArticlePostCardGroup: React.FC<{ posts: any[]; className?: string }> = ({
  posts,
  className = "",
}) => {
  return posts.map((post: any) => (
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
      className={className}
    />
  ));
};

export default ArticlePostCardGroup;
