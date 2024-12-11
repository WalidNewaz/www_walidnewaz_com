import * as React from "react";
import styled from "styled-components";

/** Components */
import ArticlePostCard from "../articlePostCard";

const StyledBlogPostsSection = styled.section`
  width: 100%;
  padding: var(--spacing-4) var(--spacing-2);

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
const MoreTutorials: React.FC<{ posts: any; heading?: string }> = ({
  posts,
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
    postsText = posts.map((post: any) => (
      <ArticlePostCard
        key={post.id}
        postDate={post.frontmatter.date}
        readTime={post.frontmatter.read_time}
        title={
          post.frontmatter.title || post.headings[0].value || post.fields.slug
        }
        image={post.frontmatter.hero_image}
        slug={`/tutorials${post.fields.slug}`}
        tags={post.frontmatter.tags}
      />
    ));
  }

  return (
    <StyledBlogPostsSection>
      <StyledHeading>{heading}:</StyledHeading>
      <section className="col flex wrap my-6">{postsText}</section>
    </StyledBlogPostsSection>
  );
};

export default MoreTutorials;
