import React from "react";

/** Components */
import ArticlePostCard from "../molecules/articlePostCard";

/** Utils */
import { getHeroImageDataInDir } from "../../utils/posts";


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
    const heroImageData = getHeroImageDataInDir(post, postHeroes, seriesDir);
    return (
      <ArticlePostCard
        key={post.id}
        postDate={post.frontmatter.date}
        readTime={post.frontmatter.read_time}
        title={
          post.frontmatter.title || post.headings[0].value || post.fields.slug
        }
        image={heroImageData}
        slug={`/${section}${post.frontmatter.pathDate}${post.fields.slug}`}
        tags={post.frontmatter.tags}
        className={className}
      />
    );
  });
};

export default ArticlePostCardGroup;
