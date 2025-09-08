import React from "react";

/** Components */
import ArticlePostCard from "../molecules/articlePostCard";

const ArticlePostCardGroup: React.FC<{
  posts: any[];
  className?: string;
  postHeroes?: any[];
  section?: string;
}> = ({ posts, className = "", postHeroes = [], section = "blog" }) => {
  return posts.map((post: any) => {
    const seriesDir = post.fields.slug
      .split("/")
      .filter((str: string) => str !== "")[0]; // e.g. react-native
    const heroImagePattern =
      post.frontmatter.hero_image ||
      postHeroes.find((hero: any) => {
        return hero.relativeDirectory === seriesDir;
      });
    return (
      <ArticlePostCard
        key={post.id}
        postDate={post.frontmatter.date}
        readTime={post.frontmatter.read_time}
        title={
          post.frontmatter.title || post.headings[0].value || post.fields.slug
        }
        image={heroImagePattern}
        slug={`/${section}${post.frontmatter.pathDate}${post.fields.slug}`}
        tags={post.frontmatter.tags}
        className={className}
      />
    );
  });
};

export default ArticlePostCardGroup;
