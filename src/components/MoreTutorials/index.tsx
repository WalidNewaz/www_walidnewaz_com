import * as React from "react";
import styled from "styled-components";

/** Components */
import ArticlePostCard from "../molecules/articlePostCard";

const StyledBlogPostsSection = styled.section`
  width: 100%;
  padding: var(--spacing-4) var(--spacing-2);

  h1, h2, h3, h4, h5, h6 {
    color: var(--heading2);
    font-family: var(--fontFamily-sans);
    font-weight: var(--fontWeight-bold);
    transition: color 300ms linear;
    line-height: var(--lineHeight-normal);
  }
  
  h1 {
    font-size: var(--fontSize-5);
  }

  h2 {
    font-size: var(--fontSize-4);
  }

  h3 {
    font-size: var(--fontSize-2);
  }

  section > h2 {
    margin: 0 1.25rem;
  }

  @media (max-width: 940px) {
    padding: var(--spacing-4) var(--spacing-0);
  }
`;

const StyledHeading = styled.h2`
  margin: 0 1.25rem;
  color: var(--heading2);
  font-family: var(--fontFamily-sans);
  font-weight: var(--fontWeight-bold);
  transition: color 300ms linear;
`;

/**
 * Generate all tutorials in the homepage
 */
const MoreTutorials: React.FC<{ posts: any; heroes: any; heading?: string }> = ({
  posts,
  heroes,
  heading = "Posts",
}) => {
  let postsText;

  if (posts.length === 0) {
    postsText = (
      <article
        style={{
          maxWidth: "700px",
          textAlign: "center",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#e3e3e3",
          borderRadius: "4px",
          backgroundColor: "rgb(249, 250, 251)",
          margin: "1.15rem",
          padding: "40px",
          width: "100%",
          color: "rgb(104, 104, 104)",
          justifyContent: "center",
        }}
      >
        <p style={{ margin: 0 }}>No posts found!</p>
      </article>
    );
  } else {
    postsText = posts.map((post: any) => {
      const seriesDir = post.fields.slug.split("/").filter((str: string) => str !== "")[0]; // e.g. react-native
      const heroImagePattern = post.frontmatter.hero_image || heroes.find((hero: any) => {
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
        slug={`/tutorials${post.fields.slug}`}
        tags={post.frontmatter.tags}
      />
    )});
  }

  return (
    <StyledBlogPostsSection>
      <StyledHeading>{heading}</StyledHeading>
      <section className="col flex wrap my-6">{postsText}</section>
    </StyledBlogPostsSection>
  );
};

export default MoreTutorials;
