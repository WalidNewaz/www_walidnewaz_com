import React from "react";

/** Components */
import Pill from "../atoms/pill";
import ContentRibbon from "../ContentRibbon/ContentRibbon";

/**
 * Component used to display the blog post tags
 * @param params
 * @returns
 */
const PostTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  const showContent = true;
  const linksText = tags
    .sort()
    .map((topic) => (
      <Pill key={topic} topic={topic} style={{
        margin: "0.25rem",
        padding: "0.5rem 1.5rem",
        fontFamily: "var(--fontFamily-sans)",
        fontSize: "var(--fontSize-1)",
      }} />
    ));
  return (
    tags && (
      <section
        className=""
        style={{ width: "100%", paddingBottom: "1rem" }}
      >
        <ContentRibbon
          className={`transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
          scrollContainerClassName="gap-4"
        >
          {linksText}
        </ContentRibbon>
      </section>
    )
  );
};

export default PostTags;
